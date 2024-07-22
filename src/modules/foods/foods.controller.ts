import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { res } from '../../common/utils';
import { CreateFoodDto } from './dtos/foods.dto';
import { FoodsService } from './foods.service';

@Controller('v1/foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Post()
  async create(@Body() data: CreateFoodDto) {
    const food = await this.foodsService.create(data);
    return res(HttpStatus.CREATED, food);
  }

  @Get()
  async getList(@Body() data: CreateFoodDto) {
    return res(HttpStatus.OK, []);
  }
}
