import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true, // 自动加载实体
      synchronize: true, // 在开发环境中使用，自动同步实体到数据库，生产环境中应禁用
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
