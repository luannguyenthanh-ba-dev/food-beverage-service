import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { FAndBCategoriesService } from './fandb.service';
import { CreateFAndBCategoryDto } from './dtos/create-fandb-categories.dto';
import { res } from 'src/common/utils';

@Controller('v1/fandb-categories')
export class FAndBCategoriesController {
  constructor(
    private readonly fAndBCategoriesService: FAndBCategoriesService,
  ) {}

  @Post()
  async create(@Body() data: CreateFAndBCategoryDto) {
    const result = await this.fAndBCategoriesService.create(data);
    return res(HttpStatus.CREATED, result);
  }
}
