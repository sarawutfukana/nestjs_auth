import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config/configuration';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  await app.listen(configuration().app.port);
  console.log(`App start on port ${configuration().app.port}`);
}
bootstrap();

// wait for config rate-limiting
//https://docs.nestjs.com/security/rate-limiting
