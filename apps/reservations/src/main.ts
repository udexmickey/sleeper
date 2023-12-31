import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const configService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.get('PORT'), () =>
    console.log(
      'Reservations-App listening on part',
      configService.get('PORT'),
    ),
  );
}
bootstrap();
