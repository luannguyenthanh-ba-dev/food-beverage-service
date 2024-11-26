import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IProductsModel } from './interfaces/products.model.interface';
import { PRODUCTS_SCHEMA_TOKEN } from 'src/common/utils/constant.util';
import { ICreateProductInfo } from './interfaces/products.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(PRODUCTS_SCHEMA_TOKEN)
    private readonly productsModel: Model<IProductsModel>,
  ) {}

  async create(data: ICreateProductInfo) {
    const product = await this.productsModel.create(data);
    return product;
  }

  async findOne(filters: { _id: string | Types.ObjectId }) {
    const result = await this.productsModel.findOne(filters);
    return result;
  }
}
