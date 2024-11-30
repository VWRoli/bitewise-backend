import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from '../dto';
import { User } from '../entities';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { UserService } from '../../user/service';
import { ExpirationStrategy } from '../../token/enum';
import { TokenService } from '../../token/services';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  async signUp(dto: CreateUserDto, res: Response) {
    const existingUser = await this.repository.findOne({
      where: { email: dto.email },
    });
    if (existingUser) throw new ForbiddenException('Credentials taken');

    const hash = await this.tokenService.hashString(dto.password);

    const user = this.repository.create({
      email: dto.email,
      hash,
    });

    try {
      const savedUser = await this.repository.save(user);
      delete savedUser.hash;
      delete savedUser.refreshToken;

      const { accessToken, refreshToken } = await this.tokenService.getTokens(
        savedUser.id,
        savedUser.email,
      );

      await this.tokenService.updateRefreshTokenHash(
        savedUser.id,
        refreshToken,
      );

      return this.tokenService.returnTokensAsCookies(
        accessToken,
        refreshToken,
        res,
        savedUser,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'User creation failed due to a server error',
      );
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

    const { accessToken, refreshToken } = await this.tokenService.getTokens(
      user.id,
      email,
    );

    await this.tokenService.updateRefreshTokenHash(user.id, refreshToken);

    return this.tokenService.returnTokensAsCookies(
      accessToken,
      refreshToken,
      res,
      user,
    );
  }

  public async signOut(id: number, res: Response): Promise<Response> {
    await this.userService.update(id, { refreshToken: null });

    return this.tokenService.returnTokensAsCookies(
      '',
      '',
      res,
      null,
      ExpirationStrategy.IMMEDIATE,
    );
  }

  public async validateGoogleUser(googleuser: CreateUserDto) {
    const user = await this.userService.findByEmail(googleuser.email);

    if (user) return user;

    return await this.userService.createUser(googleuser);
  }

  async googleSignIn(email: string, res: Response) {
    const user = await this.repository.findOne({
      where: { email },
    });

    if (!user) throw new ForbiddenException('Credentials incorrect');

    const { accessToken, refreshToken } = await this.tokenService.getTokens(
      user.id,
      email,
    );

    await this.tokenService.updateRefreshTokenHash(user.id, refreshToken);

    return this.tokenService.setTokensAsCookies(accessToken, refreshToken, res);
  }
}
