import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FAndBCategoriesSchema } from './food-and-baverage/schemas/fandb.schema';
import { FAndBCategoriesController } from './food-and-baverage/fandb.controller';
import { FAndBCategoriesService } from './food-and-baverage/fandb.service';
import { FANDB_CATEGORIES_SCHEMA_TOKEN } from 'src/common/utils/constant.util';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FANDB_CATEGORIES_SCHEMA_TOKEN, schema: FAndBCategoriesSchema },
    ]),
  ],
  controllers: [FAndBCategoriesController],
  providers: [FAndBCategoriesService],
  exports: [FAndBCategoriesService],
})
export class CategoriesModule {}
