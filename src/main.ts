import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   /*The way of adding expres-type middlewares in Nest which avoiding typescript errors.*/
   (app as NestExpressApplication).use(helmet());
   await app.listen(3000);
}

bootstrap();
