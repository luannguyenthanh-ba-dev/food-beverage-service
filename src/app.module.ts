import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodsModule } from './modules/foods/foods.module';
import { MongoDBModule } from './databases/mongodb/mongodb.module';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [MongoDBModule, FoodsModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
