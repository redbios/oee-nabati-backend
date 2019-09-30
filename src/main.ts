import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerBaseConfig = new DocumentBuilder()
    .setTitle('OEE Lanius - Nabati')
    .setDescription('PT.Nabati - OEE for Resource Optimations')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerBaseConfig);
  SwaggerModule.setup('api/v1/', app, swaggerDocument);

  app.enableCors();

  await app.listen(process.env.BACKEND_PORT);
}
bootstrap();
