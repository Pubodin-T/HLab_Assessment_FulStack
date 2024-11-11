import { IsString, IsInt, Min, Max } from 'class-validator';

export class SearchProductDto {
  @IsString()
  languageCode: string;

  @IsString()
  searchQuery: string;

  @IsInt()
  @Min(1)
  page: number;

  @IsInt()
  @Min(1)
  limit: number;
}
