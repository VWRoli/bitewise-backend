import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeSwagger } from './swagger';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import { config } from 'src/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = config.PORT;

  //secure app by setting HTTP response headers
  app.use(helmet());

  //enable cors
  app.enableCors({ origin: config.FRONTEND_URL, credentials: true });

  //validation pipeline
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.use(json({ limit: '20kb' }));

  initializeSwagger(app);
  await app.listen(port);
}
bootstrap();
