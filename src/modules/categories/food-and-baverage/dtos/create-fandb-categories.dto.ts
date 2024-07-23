import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFAndBCategoryDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  parent: string;
}
