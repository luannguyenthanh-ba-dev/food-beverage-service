import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsCategoriesService } from './products-categories.service';
import {
  CreateProductCategoryDto,
  FindProductCategoriesDto,
  UpdateSpecificProductCategoryDto,
} from './dtos';
import { res } from 'src/common/utils';
import { Logger } from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { Roles } from 'src/modules/auth/auth.decorator';
import { ROLES } from 'src/modules/auth/auth.const';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('v1/products-categories')
export class ProductsCategoriesController {
  private logger = new Logger();
  constructor(
    private readonly productsCategoriesService: ProductsCategoriesService,
  ) {}

  @ApiOperation({
    summary: 'Create new products categories',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success!',
    type: Object,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLES.SUPER_ADMIN, ROLES.ADMIN)
  @Post('')
  async create(@Body() data: CreateProductCategoryDto) {
    const result = await this.productsCategoriesService.create(data);
    return res(HttpStatus.CREATED, result);
  }

  @ApiOperation({
    summary: 'View products categories info',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success!',
    type: Object,
  })
  @ApiParam({
    name: '_id',
    type: String,
    required: true,
  })
  @Get(':_id')
  async findOne(@Param('_id') _id: string) {
    const category = await this.productsCategoriesService.findOne(
      {
        _id,
        isDeleted: false,
      },
    );
    if (!category) {
      throw new NotFoundException(
        'ERROR: Not found your request Products Categories!',
      );
    }
    return res(HttpStatus.OK, category);
  }

  @ApiOperation({
    summary: 'Get list products categories info',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success!',
    type: Object,
  })
  @Get()
  /**
   * To utilize the class-validator decorators, we need to use the ValidationPipe.
   * Additionally, to utilize the class-transformer decorators, we need to use ValidationPipe with its transform: true flag
   */
  @UsePipes(new ValidationPipe({ transform: true }))
  async findMany(@Query() filters: FindProductCategoriesDto) {
    const categories = await this.productsCategoriesService.findMany(
      { ...filters, isDeleted: false },
    );
    return categories;
  }

  @ApiOperation({
    summary: 'Update products categories info',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success!',
    type: Object,
  })
  @ApiParam({
    name: '_id',
    type: String,
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLES.SUPER_ADMIN, ROLES.ADMIN)
  @Put(':_id')
  async updateOne(
    @Param('_id') _id: string,
    @Body() data: UpdateSpecificProductCategoryDto,
  ) {
    const category = await this.productsCategoriesService.findOne({ _id });
    if (!category) {
      throw new NotFoundException(
        'ERROR: Not found your request Products Categories to update!',
      );
    }
    const result = await this.productsCategoriesService.updateOne({ _id }, data);
    return res(HttpStatus.OK, result);
  }

  @ApiOperation({
    summary: 'Delete products categories',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success!',
    type: Object,
  })
  @ApiParam({
    name: '_id',
    type: String,
    required: true,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(ROLES.SUPER_ADMIN)
  @ApiParam({
    name: '_id',
    type: String,
    required: true,
  })
  @Delete(':_id')
  async deleteOne(@Param('_id') _id: string) {
    const category = await this.productsCategoriesService.findOne({
      _id,
      isDeleted: false,
    });
    if (!category) {
      throw new NotFoundException(
        'ERROR: Not found your request Products Categories to delete!',
      );
    }
    const result = await this.productsCategoriesService.updateOne(
      { _id },
      { isDeleted: true, deletedAt: Math.floor(Date.now() / 1000) },
    );
    return res(HttpStatus.OK, result);
  }
}
