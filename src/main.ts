import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(
    cors({
      origin: 'http://192.168.1.102:8082',
      credentials: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
