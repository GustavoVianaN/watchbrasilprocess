import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

async function bootstrap() {

  const httpsOptions = {
    key: fs.readFileSync('certs/chave.privkey.pem'),
    cert: fs.readFileSync('certs/chave.fullchain.pem'),
  };

  // se quiser usar no https ative aqui
  //const app = await NestFactory.create(AppModule, {
  //  httpsOptions,
  //});

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Project Watch Brasil API')
    .setDescription('Project Watch Brasil API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.enableCors();

  await app.listen(3002);
}
bootstrap();
