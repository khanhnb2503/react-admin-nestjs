import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ServiceAccount } from 'firebase-admin';
import * as admin from 'firebase-admin';

import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';

const validationPipeOptions = {
  transform: true,
  validationError: {
    target: false,
    value: false,
  },
  whitelist: true,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Set the config options
  const adminConfig: ServiceAccount = {
    projectId: configService.get<string>('firebase.projectId'),
    privateKey: configService
      .get<string>('firebase.privateKey')
      .replace(/\\n/g, '\n'),
    clientEmail: configService.get<string>('firebase.clientEmail'),
  };
  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    storageBucket: configService.get<string>('firebase.storageBucket'),
  });

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true
  })
  app.setGlobalPrefix(configService.get('service.baseUrl'));
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

  const config = new DocumentBuilder()
    .setTitle('Admin')
    .setDescription('TEST_API_REACT_ADMIN')
    .setVersion('0.0.1')
    .addTag('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(configService.get<number>('server.port') || 4000, '0.0.0.0')
}
bootstrap();
