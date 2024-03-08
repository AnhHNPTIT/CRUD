import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cors from "cors";
import * as process from "process";
import * as httpContext from 'express-http-context';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin: process.env.FRONT_END_URL
  }));
  app.use(httpContext.middleware);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));
  await app.listen(3001);
}

bootstrap();
