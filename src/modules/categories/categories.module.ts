import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsCategoriesSchema } from './products/schemas/products-categories.schema';
import { ProductsCategoriesController } from './products/products-categories.controller';
import { ProductsCategoriesService } from './products/products-categories.service';
import { PRODUCTS_CATEGORIES_SCHEMA_TOKEN } from 'src/common/utils/constant.util';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PRODUCTS_CATEGORIES_SCHEMA_TOKEN,
        schema: ProductsCategoriesSchema,
      },
    ]),
  ],
  controllers: [ProductsCategoriesController],
  providers: [ProductsCategoriesService],
  exports: [ProductsCategoriesService],
})
export class CategoriesModule {}
