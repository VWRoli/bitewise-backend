import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import 'dotenv/config';
import { config } from 'src/config';

const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: config.TYPEORM.HOST,
  port: config.TYPEORM.PORT,
  username: config.TYPEORM.USERNAME,
  password: config.TYPEORM.PASSWORD,
  database: config.TYPEORM.DATABASE_DEV,
  entities: [join(__dirname, '**/**.entity{.ts,.js}')],
  logging: false,
  synchronize: true,
};

export default databaseConfig;
