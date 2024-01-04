import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AuthModule, {
    rawBody: true,
  });
  app.useBodyParser('json', { limit: '10mb' });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const configService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.get('PORT'), () =>
    console.log('Auth-App listening on part', configService.get('PORT')),
  );
}
bootstrap();
