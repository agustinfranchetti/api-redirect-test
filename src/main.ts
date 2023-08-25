import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS. You might need to configure this for a production environment.
  await app.listen(process.env.PORT || 3000);
  app.setGlobalPrefix('v1');
}
bootstrap();
