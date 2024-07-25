import { NotAcceptableException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class FindFAndBCategoriesDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  parent?: string | Types.ObjectId;

  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  order?: {
    orderBy: string;
    sort: 'asc' | 'desc';
  };
}
