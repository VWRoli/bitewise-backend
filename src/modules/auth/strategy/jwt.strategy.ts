import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ICurrentUser } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('ACCESS_TOKEN_SECRET'),
    });
  }
  //TODO: test whats up with these two
  async validate(payload: ICurrentUser) {
    return payload;
  }
  // async validate(payload: { sub: number; email: string }) {
  //   const id = payload.sub;

  //   const user = await this.repository.findOne({
  //     where: { id },
  //   });

  //   delete user.hash;
  //   return user;
  // }
}
