import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port = config.get('app.port');
  await app.listen(port);
  Logger.log(`Server running on http://lcoalhost:${port}`, 'Bootstrap');
}

bootstrap();
