import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpStatus,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { res } from 'src/common/utils';
import { Roles, User } from '../auth/auth.decorator';
import { ROLES } from '../auth/auth.const';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { CanManageObjects } from 'src/common/utils/constant.util';
import {
  CreateProductDto,
  GetListProductsFiltersDto,
  UpdateProductInfoDto,
} from './dtos';
import { ProductsService } from './products.service';
import { ProductsCategoriesService } from '../categories/products/products-categories.service';

@Controller('v1/products')
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);
  constructor(
    private readonly productsService: ProductsService,
    private readonly productsCategoriesService: ProductsCategoriesService,
  ) {}

  @ApiOperation({
    summary: 'Create new product',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success!',
    type: Object,
  })
  @ApiBearerAuth()
  @Roles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.VENDOR)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('')
  async createProduct(@Body() data: CreateProductDto, @User() user: any) {
    if (!data.ownerId) {
      data.ownerId = user._id;
    }
    return res(HttpStatus.CREATED, {});
  }

  @ApiOperation({
    summary: 'Get list products for all users',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success!',
    type: Object,
  })
  @Get('')
  async getListProductsForAllUsers(
    @Query() filters: GetListProductsFiltersDto,
  ) {
    return res(HttpStatus.OK, []);
  }

  @ApiOperation({
    summary: 'Get list products for owner',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success!',
    type: Object,
  })
  @ApiBearerAuth()
  @Roles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.VENDOR)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('for-owners')
  async getListProductsForOwner(
    @Query() filters: GetListProductsFiltersDto,
    @User() user: any,
  ) {
    if (user.role === ROLES.VENDOR) {
      filters.ownerId = user._id;
    }
    return res(HttpStatus.OK, []);
  }

  @ApiOperation({
    summary: 'View product detail',
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
  async viewProductDetail(@Param('_id') _id: string) {
    return res(HttpStatus.OK, {});
  }

  @ApiOperation({
    summary: 'Update product info',
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
  @Roles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.VENDOR)
  @UseGuards(AuthGuard, RolesGuard)
  @Put(':_id')
  async updateProductInfo(
    @Param('_id') _id: string,
    @Body() data: UpdateProductInfoDto,
    @User() user: any,
  ) {
    const existProduct = await this.productsService.findOne({ _id });
    if (!existProduct) {
      throw new NotFoundException(
        'ERROR: Not found your request Product to update!',
      );
    }
    if (!CanManageObjects(user, existProduct)) {
      throw new ForbiddenException(
        'ERROR: Can not update product info with this user!',
      );
    }
    this.logger.log(`User ${user.email} update product ${_id}`);
    return res(HttpStatus.OK, {});
  }

  @ApiOperation({
    summary: 'Delete product info',
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
  @Roles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.VENDOR)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':_id')
  async deleteProduct(@Param('_id') _id: string, @User() user: any) {
    const existProduct = await this.productsService.findOne({ _id });
    if (!existProduct) {
      throw new NotFoundException(
        'ERROR: Not found your request Product for delete!',
      );
    }
    if (!CanManageObjects(user, existProduct)) {
      throw new ForbiddenException(
        'ERROR: Can not delete product info with this user!',
      );
    }
    this.logger.log(`User ${user.email} delete product ${_id}`);
    return res(HttpStatus.OK, { deleted: true });
  }
}
