import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IProductsCategoriesModel } from './interfaces/products-categories.model.interface';
import { PRODUCTS_CATEGORIES_SCHEMA_TOKEN } from 'src/common/utils/constant.util';

@Injectable()
export class ProductsCategoriesService {
  constructor(
    @InjectModel(PRODUCTS_CATEGORIES_SCHEMA_TOKEN)
    private readonly productsCategoriesModel: Model<IProductsCategoriesModel>,
  ) {}

  async create(data: { name: string; parent?: string | Types.ObjectId }) {
    const result = await this.productsCategoriesModel.create(data);
    return result;
  }

  /**
   * Find one food and beverage category
   * @param filters
   * @param filters.name String
   * @param filters.parent String | ObjectId
   * @param filters._id String | ObjectId
   * @param populates String[] - Ex: ["parent"]
   * @returns productsCategories
   */
  async findOne(
    filters: {
      name?: string;
      // parent?: string | Types.ObjectId;
      _id?: string | Types.ObjectId;
      isDeleted?: boolean;
    },
    // populates?: string[],
  ) {
    let query = this.productsCategoriesModel.findOne(filters);
    // if (populates && populates.length) {
    //   populates.forEach((key) => {
    //     query = query.populate(key);
    //   });
    // }
    const rs = await query;
    return rs;
  }

  /**
   * Find many food and beverage category
   * @param filters
   * @param filters.name String
   * @param filters._id String | ObjectId
   * @param filters.order Object
   * @param filters.order.orderBy String
   * @param filters.order.sort 'asc' | 'desc'
   * @param populates String[] - Ex: ["parent"]
   * @returns List of productsCategories
   */
  async findMany(
    filters: {
      name?: string;
      // parent?: string | Types.ObjectId;
      _id?: string | Types.ObjectId;
      isDeleted?: boolean;
      order?: {
        orderBy: string;
        sort: 'asc' | 'desc';
      };
    },
    // populates?: string[],
  ) {
    let conditions: any = {};
    if (filters.name) {
      conditions.name = { $regex: filters.name, $options: 'i' };
    }
    // if (filters.parent) {
    //   conditions.parent = filters.parent;
    // }
    if (filters._id) {
      conditions._id = filters._id;
    }
    if (filters.isDeleted === false || filters.isDeleted) {
      conditions.isDeleted = filters.isDeleted;
    }
    // Run query
    let query = this.productsCategoriesModel.find(conditions);
    // if (populates && populates.length) {
    //   populates.forEach((key) => {
    //     query = query.populate(key);
    //   });
    // }
    if (filters.order && Object.keys(filters.order).length) {
      if (filters.order.sort === 'asc') {
        query = query.sort({ [filters.order.orderBy]: 1 });
      }
      if (filters.order.sort === 'desc') {
        query = query.sort({ [filters.order.orderBy]: -1 });
      }
    }
    const categories = await query;
    return categories;
  }

  /**
   * Update one food and beverage category
   * @param filters
   * @param filters.name String
   * @param filters._id String | ObjectId
   * @param data
   * @param data.name String
   * @param data.parent String | ObjectId
   * @returns updated productsCategories
   */
  async updateOne(
    filters: {
      name?: string;
      // parent?: string | Types.ObjectId;
      _id?: string | Types.ObjectId;
    },
    data: {
      name?: string;
      parent?: string | Types.ObjectId;
      isDeleted?: boolean;
      deletedAt?: number;
    },
  ) {
    const updated = await this.productsCategoriesModel
      .findOneAndUpdate(filters, data, { new: true });
    return updated;
  }
}