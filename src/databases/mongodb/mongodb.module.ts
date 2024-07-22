import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        const logger = new Logger();
        logger.debug(`Database is: ${process.env.MONGODB_URL}`);
        return {
          uri: process.env.MONGODB_URL,
        };
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class MongoDBModule {}
