import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';
import { winstonLogger } from './common/logger/winston.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger, // ✅ USE WINSTON
  });

    // ✅ ENABLE CORS (FIXES OPTIONS 404)
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });
  
  // ✅ Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ✅ Global exception handling (ONLY ONE)
  app.useGlobalFilters(new GlobalExceptionFilter());

  // ✅ Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API endpoints and models')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3100;
  await app.listen(port);

  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📘 Swagger at http://localhost:${port}/api`);
}

bootstrap();
