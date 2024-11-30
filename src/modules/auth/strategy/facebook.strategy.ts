import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { AuthService } from '../services';
import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import facebookOAuth from '../config/facebook-oauth.config';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(facebookOAuth.KEY)
    private facebookConfiguration: ConfigType<typeof facebookOAuth>,
    private authService: AuthService,
  ) {
    super({
      clientID: facebookConfiguration.clientId,
      clientSecret: facebookConfiguration.clientSecret,
      callbackURL: facebookConfiguration.callbackURL,
      profileFields: ['id', 'emails', 'name'],
      scope: ['email', 'public_profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ) {
    const { emails, id } = profile;
    const user = {
      email: emails[0].value,
      facebookId: id,
    };

    done(null, user);
  }
}
