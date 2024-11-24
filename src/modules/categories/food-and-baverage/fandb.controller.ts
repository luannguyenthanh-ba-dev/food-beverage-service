import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotAcceptableException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FAndBCategoriesService } from './fandb.service';
import {
  CreateFAndBCategoryDto,
  FindFAndBCategoriesDto,
  UpdateSpecificFAndBDto,
} from './dtos';
import { res } from 'src/common/utils';
import { Logger } from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { Roles } from 'src/modules/auth/auth.decorator';
import { ROLES } from 'src/modules/auth/auth.const';

@Controller('v1/fandb-categories')
export class FAndBCategoriesController {
  private logger = new Logger();
  constructor(
    private readonly fAndBCategoriesService: FAndBCategoriesService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLES.SUPER_ADMIN, ROLES.ADMIN)
  @Post()
  async create(@Body() data: CreateFAndBCategoryDto) {
    if (data.parent) {
      const validParent = await this.fAndBCategoriesService.findOne({
        _id: data.parent,
        isDeleted: false,
      });
      if (!validParent) {
        throw new NotFoundException(
          'ERROR: Not found your request parent FandB Category!',
        );
      }
      if (validParent.parent) {
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
        isDeleted: false,
      },
      ['parent'],
    );
    if (!category) {
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
      { ...filters, isDeleted: false },
      ['parent'],
    );
    return categories;
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLES.SUPER_ADMIN, ROLES.ADMIN)
  @Put(':_id')
  async updateOne(
    @Param('_id') _id: string,
    @Body() data: UpdateSpecificFAndBDto,
  ) {
    const fandb = await this.fAndBCategoriesService.findOne({ _id });
    if (!fandb) {
      throw new NotFoundException(
        'ERROR: Not found your request FandB Category for updating!',
      );
    }
    const result = await this.fAndBCategoriesService.updateOne({ _id }, data);
    return res(HttpStatus.OK, result);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLES.SUPER_ADMIN, ROLES.ADMIN)
  @Delete(':_id')
  async deleteOne(@Param('_id') _id: string) {
    const fandb = await this.fAndBCategoriesService.findOne({
      _id,
      isDeleted: false,
    });
    if (!fandb) {
      throw new NotFoundException(
        'ERROR: Not found your request FandB Category for delete!',
      );
    }
    const result = await this.fAndBCategoriesService.updateOne(
      { _id },
      { isDeleted: true, deletedAt: Math.floor(Date.now() / 1000) },
    );
    return res(HttpStatus.OK, result);
  }
}
