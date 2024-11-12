import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,//to take just the values that found inside type classes
    forbidNonWhitelisted:true // to send error for uncorrect value types or additional values that not found inside type classes
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
