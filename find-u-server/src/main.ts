import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

const PORT = 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => {
    Logger.verbose(`Server listening in port:${PORT}! 🚀`);
  });
}
bootstrap();
