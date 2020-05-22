import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function setupSwagger(app: any, config: ConfigService) {
  const options = new DocumentBuilder()
    .setTitle(config.get('swagger.title'))
    .setDescription(config.get('swagger.description'))
    .setVersion(config.get('swagger.version'))
    .addTag(config.get('swagger.tag'))
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);

  const port = config.get('app.port');

  setupSwagger(app, config);

  await app.listen(port).then(() => {
    Logger.log(
      `Server running on http://localhost:${port}`,
      'Bootstrap',
    );
  });
}

bootstrap();
