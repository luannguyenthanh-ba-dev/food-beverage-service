import { IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateSpecificFAndBDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  parent?: string | Types.ObjectId;
}
