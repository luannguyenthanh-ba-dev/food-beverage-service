import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class GetListProductsFiltersDto {
  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @Optional()
  _id?: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @Optional()
  name?: string;

  @ApiProperty({
    type: Number,
    required: false,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @Optional()
  minPrice?: number;

  @ApiProperty({
    type: Number,
    required: false,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  @Optional()
  maxPrice?: number;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @Optional()
  categories?: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @Optional()
  ownerId?: string;

  // timestamp
  @ApiProperty({
    type: Object,
    required: false,
    example: class {
      orderBy: 'createdAt';
      sort: 'desc';
    },
  })
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  order?: {
    orderBy: string;
    sort: 'asc' | 'desc';
  };
}
