import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const configService = app.get<ConfigService>(ConfigService);

  await app.listen(configService.get('PORT'), () => {
    console.log('Payments-App listening on part', configService.get('PORT'));
  });
}
bootstrap();
