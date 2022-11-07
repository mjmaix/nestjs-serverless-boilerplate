import { NestFactory } from '@nestjs/core';
import { env } from 'process';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = env.PORT || 3000;
  await app.listen(port);
  console.log(`Now listening on port ${port}`);
}

bootstrap();
