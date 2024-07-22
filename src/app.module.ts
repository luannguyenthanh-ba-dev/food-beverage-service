import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodsController } from './foods/foods.controller';
import { FoodsModule } from './foods/foods.module';
import { MongoDBModule } from './databases/mongodb/mongodb.module';

@Module({
  imports: [FoodsModule, MongoDBModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
