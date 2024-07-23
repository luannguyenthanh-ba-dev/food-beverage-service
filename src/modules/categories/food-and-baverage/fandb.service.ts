import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FANDB_CATEGORIES_SCHEMA_TOKEN } from './fandb.const';
import { Model } from 'mongoose';
import { IFAndBModel } from './interfaces/fandb.model.interface';

@Injectable()
export class FAndBCategoriesService {
  constructor(
    @InjectModel(FANDB_CATEGORIES_SCHEMA_TOKEN)
    private readonly fandbCategoriesModel: Model<IFAndBModel>,
  ) {}

  async create(data: { name: string; parent?: string }) {
    const result = await this.fandbCategoriesModel.create(data);
    return result;
  }
}
