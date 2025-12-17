import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 去除DTO中没有的属性
      forbidNonWhitelisted: true, // 有非DTO中的属性时抛出错误
    }),
  );
  await app.listen(3000);
}
bootstrap();
