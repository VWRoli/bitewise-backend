export const config: IConfig = {
  PORT: +process.env.PORT,
  FRONTEND_URL: process.env.FRONTEND_URL,
  THROTTLER: {
    LIMIT: +process.env.THROTTLER_LIMIT,
    TTL: +process.env.THROTTLER_TTL,
  },
  TYPEORM: {
    HOST: process.env.TYPEORM_HOST,
    PORT: +process.env.TYPEORM_PORT,
    USERNAME: process.env.TYPEORM_USERNAME,
    PASSWORD: process.env.TYPEORM_PASSWORD,
    DATABASE_DEV: process.env.TYPEORM_DATABASE_DEV,
  },
  MYSQL: {
    ROOT_PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
    DATABASE: process.env.MYSQL_DATABASE,
    USER: process.env.MYSQL_USER,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
    TOKEN_EXPIRY: process.env.TOKEN_EXPIRY,
  },
};

export interface IConfig {
  PORT: number;
  FRONTEND_URL: string;
  THROTTLER: {
    LIMIT: number;
    TTL: number;
  };
  TYPEORM: {
    HOST: string;
    PORT: number;
    USERNAME: string;
    PASSWORD: string;
    DATABASE_DEV: string;
  };
  MYSQL: {
    ROOT_PASSWORD: string;
    DATABASE: string;
    USER: string;
  };
  JWT: {
    SECRET: string;
    TOKEN_EXPIRY: string;
  };
}
