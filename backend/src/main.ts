import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TestConnectionService } from './config/testConnection';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  const testConnectionService = app.get(TestConnectionService);
  await testConnectionService.testConnection();
}
console.log(`Application is running on port ${process.env.PORT ?? 3000}`);
bootstrap();
