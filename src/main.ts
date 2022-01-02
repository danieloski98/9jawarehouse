import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { json } from 'express';
import * as morgan from 'morgan';
import * as Pusher from 'pusher';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSERHER_CLUSTER,
  key: process.env.PUSHER_KEY,
  useTLS: true,
});

async function bootstrap() {
  const port = process.env.PORT;
  const logger = new Logger();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: '*',
  });
  app.use(morgan('combined'));
  app.use(json({ limit: '60mb' }));
  // app.use(urlencoded({ limit: '60mb' }));

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  const config = new DocumentBuilder()
    .setTitle('9jawarehouse APP')
    .setDescription('The 9jawarehouse API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  logger.debug(`Server Started on Port ${port}`);
  await app.listen(port);
}
bootstrap();
