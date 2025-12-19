import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

// 加载 .env 环境变量
config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'pass123',
  database: process.env.DB_DATABASE || 'postgres',
  entities: [__dirname + '/**/*.entity{.ts,.js}'], // 生产环境指向编译后的 js
  migrations: [__dirname + '/migrations/*{.ts,.js}'], // 生产环境指向编译后的迁移文件
  logging: true,
  synchronize: false, // ！！！开发迁移时必须为 false，否则迁移失去意义
});
