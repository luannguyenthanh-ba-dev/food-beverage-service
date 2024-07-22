import { Injectable } from '@nestjs/common';
import { IFoods } from './interfaces/foods.interface';

@Injectable()
export class FoodsService {
  constructor() {}

  async create(data: IFoods): Promise<IFoods> {
    return data;
    // return {
    //   name: 'Bánh Bao',
    //   expiry_date: 123456789,
    //   price: 10000,
    //   provenance: 'Việt Nam',
    //   geographical_indication: 'Bình Dương/Việt Nam',
    //   category: 'fast_food',
    //   stock: 10,
    // };
  }
}
