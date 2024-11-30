import { registerAs } from '@nestjs/config';
import { config } from 'src/config';

export default registerAs('googleOAuth', () => ({
  clientId: config.GOOGLE.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE.GOOGLE_SECRET,
  callbackURL: config.GOOGLE.GOOGLE_CALLBACK_URL,
}));
