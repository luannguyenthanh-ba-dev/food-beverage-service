import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class FindProductCategoriesDto {
  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

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
