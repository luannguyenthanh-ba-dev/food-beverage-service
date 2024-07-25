import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotAcceptableException,
  NotFoundException,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FAndBCategoriesService } from './fandb.service';
import { CreateFAndBCategoryDto, FindFAndBCategoriesDto } from './dtos';
import { res } from 'src/common/utils';
import { Logger } from '@nestjs/common';

@Controller('v1/fandb-categories')
export class FAndBCategoriesController {
  private logger = new Logger();
  constructor(
    private readonly fAndBCategoriesService: FAndBCategoriesService,
  ) {}

  @Post()
  async create(@Body() data: CreateFAndBCategoryDto) {
    if (data.parent) {
      const validParent = await this.fAndBCategoriesService.findOne({
        _id: data.parent,
      });
      if (!validParent) {
        this.logger.error(
          'ERROR: Not found your request parent FandB Category!',
        );
        throw new NotFoundException(
          'ERROR: Not found your request parent FandB Category!',
        );
      }
      if (validParent.parent) {
        this.logger.error('ERROR: We just accept 1 level child of Categories!');
        throw new NotAcceptableException(
          'ERROR: We just accept 1 level child of Categories!',
        );
      }
    }
    const result = await this.fAndBCategoriesService.create(data);
    return res(HttpStatus.CREATED, result);
  }

  @Get(':_id')
  async findOne(@Param('_id') _id: string) {
    const category = await this.fAndBCategoriesService.findOne(
      {
        _id,
      },
      ['parent'],
    );
    if (!category) {
      this.logger.error('ERROR: Not found your request FandB Category!');
      throw new NotFoundException(
        'ERROR: Not found your request FandB Category!',
      );
    }
    return res(HttpStatus.OK, category);
  }

  @Get()
  /**
   * To utilize the class-validator decorators, we need to use the ValidationPipe.
   * Additionally, to utilize the class-transformer decorators, we need to use ValidationPipe with its transform: true flag
   */
  @UsePipes(new ValidationPipe({ transform: true }))
  async findMany(@Query() filters: FindFAndBCategoriesDto) {
    const categories = await this.fAndBCategoriesService.findMany(
      filters,
      ['parent']
    );
    return categories;
  }
}
