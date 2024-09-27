import { LoginUserDto } from './index';

export const stubLoginUserDto = (): LoginUserDto => {
  return {
    email: 'email@bitewise.com',
    password: 'StrongPassword1',
  };
};
