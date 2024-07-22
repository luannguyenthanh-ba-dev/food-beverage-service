import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodsController } from './modules/foods/foods.controller';
import { FoodsModule } from './modules/foods/foods.module';
import { MongoDBModule } from './databases/mongodb/mongodb.module';

@Module({
  imports: [FoodsModule, MongoDBModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
