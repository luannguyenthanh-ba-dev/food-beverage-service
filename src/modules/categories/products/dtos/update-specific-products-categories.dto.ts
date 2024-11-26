import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSpecificProductCategoryDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsOptional()
  name?: string;
}
