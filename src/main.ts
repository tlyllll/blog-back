import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { HttpExceptionFilter } from './utils/allException.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(
    cors({
      origin: 'http://192.168.1.102:8080',
      credentials: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
