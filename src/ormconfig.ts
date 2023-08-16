import { config } from 'dotenv';
config();

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

let sync = false;
const appMode = process.env.NODE_ENV;
if (appMode === 'development' || appMode === 'uat') {
  sync = true;
}
const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: sync,
};

export default dbConfig;
