import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TestConnectionService } from './config/testConnection';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('zypaws/api');

  const openApi = new DocumentBuilder()
    .setTitle('Zypaws open API document and testing')
    .setDescription('This is the open API document for Zypaws')
    .setVersion('1.0')
    .addTag('Zypaws')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, openApi);
  SwaggerModule.setup('api', app, documentFactory());

  const testConnectionService = app.get(TestConnectionService);
  await testConnectionService.testConnection();
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
  app.enableCors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });
  await app.listen(process.env.PORT ?? 3000);
}
console.log(`Application is running on port ${process.env.PORT ?? 3000}`);
bootstrap();
