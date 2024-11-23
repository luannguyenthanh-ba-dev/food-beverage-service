import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoDBModule } from './databases/mongodb/mongodb.module';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [MongoDBModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
