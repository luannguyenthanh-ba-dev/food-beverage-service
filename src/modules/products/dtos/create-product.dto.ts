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

export class CreateProductDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Number,
    default: 10000,
    required: true,
    minimum: 0,
  })
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @Min(0)
  price: number;

  @ApiProperty({
    type: Number,
    default: 1,
    required: true,
    minimum: 1,
  })
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @Min(1)
  amount: number;

  @ApiProperty({
    type: Mass,
    required: true,
  })
  @IsObject()
  @IsDefined()
  @IsNotEmpty()
  mass: Mass;

  @ApiProperty({
    type: String,
    enum: Currency,
    default: Currency.VND,
    required: true,
  })
  @IsEnum(Currency)
  @IsDefined()
  @IsNotEmpty()
  currency: Currency;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  provenance: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  geographicalIndication: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  categories: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  thumbnail: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
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
    required: true,
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  description: string;

  ownerId: string;
}
