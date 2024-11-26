import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
dotenv.config(); // Read base environment (.env) from root

async function bootstrap() {
  const logger = new Logger();

  try {
    const environment = process.env.environment ?? '';
    logger.debug(`./environments/${environment}.env`);
    dotenv.config({ path: `./environments/${environment}.env` });
  } catch (error) {
    logger.error(`Init source met error with environment: ${error.message}`);
  }

  const config = new DocumentBuilder()
    .setTitle('Users Service APIs')
    .setDescription('APIs Document')
    .setVersion('1.0')
    .addBearerAuth({
      description: `Please enter token in following format: Bearer JWT`,
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    })
    .build();

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const PORT = process.env.PORT || 3000;
  // Use this pipe for handle validation input error at DTO - If not have custom pipe
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({});

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(PORT, () =>
    logger.debug(`Service is listening on Port: ${PORT}`),
  );
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
