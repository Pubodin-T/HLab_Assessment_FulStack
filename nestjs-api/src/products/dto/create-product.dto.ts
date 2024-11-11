import { IsString, IsNumber, IsObject, ValidateNested } from 'class-validator';

export class CreateProductDto {
  @IsString()
  sku: string;

  @IsNumber()
  price: number;

  @IsObject()
  @ValidateNested()
  translations: { [key: string]: { name: string; description: string } };
}
