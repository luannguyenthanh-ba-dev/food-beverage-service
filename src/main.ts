import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config(); // Read base environment (.env) from root

async function bootstrap() {
  const logger = new Logger();

  try {
    const environment = process.env.environment ?? '';
    logger.debug(`./environments/${environment}.env`);
    dotenv.config({ path: `./environments/${environment}.env` });
  } catch (error) {
    logger.error(`Init source met error with enviroment: ${error.message}`);
  }

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () =>
    logger.debug(`Service is listening on Port: ${PORT}`),
  );
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
