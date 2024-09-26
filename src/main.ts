import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');

  app.setGlobalPrefix('api');
  app.use(cors());
  app.useGlobalPipes(new ValidationPipe({
    forbidUnknownValues: true,
    transformOptions:{
      enableImplicitConversion:true
    }
  }));

  const config = new DocumentBuilder()
    .setTitle(`Apis ${AppModule.nameproyect}`)
    .setDescription(`Documentación del API ${AppModule.nameproyect}`)
    .addBearerAuth({
      description: `[just text field] Please enter token in following format: Bearer <JWT>`,
      name: 'Authorization',
      scheme: 'Bearer',
      type: 'http',
      bearerFormat: 'JWT'
    }, 'access-token')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
      persistAuthorization: true,
      docExpansion: 'none',
    }
  });
  await app.listen(AppModule.port);
  logger.debug(`Server running on http://localhost:${AppModule.port}/api`)
  logger.debug(`Swagger UI running on http://localhost:${AppModule.port}/api/docs`)
}
bootstrap();
