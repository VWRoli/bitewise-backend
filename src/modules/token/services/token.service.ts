import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ExpirationStrategy } from '../../token/enum';
import { CookieOptions, Response } from 'express';
import { UserService } from '../../user/service';
import { config } from '../../../config';

@Injectable()
export class TokenService {
  private readonly accessTokenExpiration: number;
  private readonly refreshTokenExpiration: number;

  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    private userService: UserService,
  ) {
    this.accessTokenExpiration =
      this.config.get('ACCESS_TOKEN_EXPIRATION') * 1000;
    this.refreshTokenExpiration =
      this.config.get('REFRESH_TOKEN_EXPIRATION') * 1000;
  }

  async getTokens(
    id: number,
    email: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { email, sub: id };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: this.accessTokenExpiration,
        secret: this.config.get('ACCESS_TOKEN_SECRET'),
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: this.refreshTokenExpiration,
        secret: this.config.get('REFRESH_TOKEN_SECRET'),
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async hashString(password: string): Promise<string> {
    return await bcrypt.hash(password, config.SALT_WORK_FACTOR);
  }

  returnTokensAsCookies(
    accessToken: string,
    refreshToken: string,
    message: string,
    res: Response,
    expirationStrategy: ExpirationStrategy = ExpirationStrategy.DEFAULT,
  ) {
    const cookieOptions = this.getDefaultCookieOptions();

    const { accessExpiration, refreshExpiration } =
      this.calculateExpirationTimes(expirationStrategy);

    this.setCookie(res, 'accessToken', accessToken, {
      ...cookieOptions,
      expires: new Date(accessExpiration),
    });

    this.setCookie(res, 'refreshToken', refreshToken, {
      ...cookieOptions,
      expires: new Date(refreshExpiration),
    });

    return this.sendResponse(res, message);
  }

  private getDefaultCookieOptions(): CookieOptions {
    return {
      secure: true,
      sameSite: 'strict',
      httpOnly: true,
      path: '/',
    };
  }

  private calculateExpirationTimes(expirationStrategy: ExpirationStrategy): {
    accessExpiration: number;
    refreshExpiration: number;
  } {
    const now = Date.now();

    let accessExpiration = now + this.accessTokenExpiration;
    let refreshExpiration = now + this.refreshTokenExpiration;

    if (expirationStrategy === ExpirationStrategy.IMMEDIATE) {
      accessExpiration = refreshExpiration = now;
    }

    return { accessExpiration, refreshExpiration };
  }

  private setCookie(
    res: Response,
    name: string,
    value: string,
    options: CookieOptions,
  ) {
    res.cookie(name, value, options);
  }

  private sendResponse(res: Response, message: string): Response {
    return res.status(HttpStatus.OK).json({ message });
  }

  async updateRefreshTokenHash(
    id: number,
    refreshToken: string,
  ): Promise<void> {
    const hash = await this.hashString(refreshToken);

    await this.userService.update(id, { refreshToken: hash });
  }
}
