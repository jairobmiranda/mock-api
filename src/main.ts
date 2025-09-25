import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuração do CORS
  app.enableCors({
    origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Validação global automática
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // transforma automaticamente os tipos
      whitelist: true, // remove propriedades não definidas nos DTOs
      forbidNonWhitelisted: true, // lança erro se houver propriedades extras
    }),
  );

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Aplicação rodando em http://localhost:${port}`);
}
bootstrap();
