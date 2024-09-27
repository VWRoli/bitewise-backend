import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from '../dto';
import { User } from '../entities';
import { SALT_WORK_FACTOR } from '../auth.constants';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CookieOptions, Response } from 'express';
import { UserService } from '../../user/service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private jwtService: JwtService,
    private userService: UserService,
    private config: ConfigService,
  ) {}

  async signUp(dto: CreateUserDto): Promise<void> {
    try {
      const existingUser = await this.repository.findOne({
        where: { email: dto.email },
      });
      if (existingUser) throw new ForbiddenException('Credentials taken');

      const hash = await this.hashString(dto.password);

      const user = this.repository.create({
        email: dto.email,
        hash,
      });

      await this.repository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async signIn(dto: LoginUserDto, res: Response) {
    const { email } = dto;
    const user = await this.repository.findOne({
      where: { email: email },
    });

    if (!user) throw new ForbiddenException('Credentials incorrect');

    const pwMatches = await bcrypt.compare(dto.password, user.hash);

    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    const { accessToken, refreshToken } = await this.getTokens(user.id, email);

    await this.updateRefreshTokenHash(user.id, refreshToken);

    return this.returnTokensAsCookies(
      accessToken,
      refreshToken,
      'Sign in successful',
      res,
    );
  }

  private async getTokens(id: number, email: string) {
    const payload = {
      email,
      sub: id,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: this.config.get('ACCESS_TOKEN_EXPIRATION'),
        secret: this.config.get('ACCESS_TOKEN_SECRET'),
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: this.config.get('REFRESH_TOKEN_EXPIRATION'),
        secret: this.config.get('REFRESH_TOKEN_SECRET'),
      }),
    ]);

    return { accessToken, refreshToken };
  }

  private returnTokensAsCookies(
    accessToken: string,
    refreshToken: string,
    message: string,
    res: Response,
    expireNow: boolean = false,
  ) {
    const options: CookieOptions = {
      secure: true,
      sameSite: 'strict',
      httpOnly: true,
      path: '/',
    };
    const now = new Date().getTime();

    let accessExpiration =
      now + this.config.get('ACCESS_TOKEN_EXPIRATION') * 1000;
    let refreshExpiration =
      now + this.config.get('REFRESH_TOKEN_EXPIRATION') * 1000;
    if (expireNow) accessExpiration = refreshExpiration = Date.now();

    return res
      .status(HttpStatus.OK)
      .cookie('accessToken', accessToken, {
        ...options,
        expires: new Date(accessExpiration),
      })
      .cookie('refreshToken', refreshToken, {
        ...options,
        expires: new Date(refreshExpiration),
      })
      .json({ message });
  }

  private async updateRefreshTokenHash(
    id: number,
    refreshToken: string,
  ): Promise<void> {
    const hash = await this.hashString(refreshToken);

    await this.userService.update(id, { refreshToken: hash });
  }

  private async hashString(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_WORK_FACTOR);
  }
}
