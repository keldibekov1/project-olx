import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('Foydalanuvchilar uchun autentifikatsiya API')
    .setVersion('1.0')
    .addTag('Authentication')
    .addSecurityRequirements('bearer',["bearer"])
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log("server 3000");
  
  
}
bootstrap();
