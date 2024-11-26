import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PRODUCTS_SCHEMA_TOKEN } from 'src/common/utils/constant.util';
import { ProductsSchema } from './schemas/products.schema';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PRODUCTS_SCHEMA_TOKEN, schema: ProductsSchema },
    ]),
    CategoriesModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
