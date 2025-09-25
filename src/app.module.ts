// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma.module';
import { MockService } from './mock.service';
import { MockController } from './mock.controller';

@Module({
  imports: [
    // Configuração global de variáveis de ambiente
    ConfigModule.forRoot({
      isGlobal: true, // torna as configurações disponíveis globalmente
      envFilePath: '.env', // caminho para o arquivo .env
    }),
    PrismaModule, // <- importa o módulo que exporta PrismaService
  ],
  controllers: [MockController],
  providers: [MockService],
})
export class AppModule {}
