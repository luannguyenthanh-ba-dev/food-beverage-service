import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Currency, MassUnit } from '../products.const';

class Mass {
  @ApiProperty({
    type: Number,
    default: 1,
    required: true,
    minimum: 0,
  })
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @Min(0)
  value: number;

  @ApiProperty({
    type: String,
    enum: MassUnit,
    default: MassUnit.G,
    required: true,
  })
  @IsEnum(MassUnit)
  @IsDefined()
  @IsNotEmpty()
  unit: MassUnit;
}

export class UpdateProductInfoDto {
  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(1)
  name: string;

  @ApiProperty({
    type: Number,
    required: false,
    minimum: 0,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  price: number;

  @ApiProperty({
    type: Number,
    required: false,
    minimum: 1,
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  amount: number;

  @ApiProperty({
    type: Mass,
    required: false,
  })
  @IsObject()
  @IsOptional()
  mass: Mass;

  @ApiProperty({
    type: String,
    enum: Currency,
    required: false,
  })
  @IsEnum(Currency)
  @IsOptional()
  currency: Currency;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  provenance: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  geographicalIndication: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  categories: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  thumbnail: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  avatar: string;

  @ApiProperty({
    type: [String],
    required: false,
  })
  @IsArray()
  @IsOptional()
  imagesList?: string[];

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(1)
  description: string;
}
