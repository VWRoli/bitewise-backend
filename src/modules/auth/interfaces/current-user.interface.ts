export interface ICurrentUser {
  email: string;
  sub: string;
  iat: number;
  exp: number;
  refreshToken: string;
}
