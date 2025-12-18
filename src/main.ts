import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 去除DTO中没有的属性
      forbidNonWhitelisted: true, // 有非DTO中的属性时抛出错误
      transform: true, // 自动转换参数类型
      transformOptions: {
        enableImplicitConversion: true, // 启用隐式类型转换
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
