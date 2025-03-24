import { IsOptional, IsNumberString } from "class-validator";
import { Transform } from "class-transformer";

export class GetProductsDto {
  @IsOptional()
  @IsNumberString()
  @Transform(({ value }) => Number(value)) // Stringdan Numberga o‘giradi
  minPrice?: number;

  @IsOptional()
  @IsNumberString()
  @Transform(({ value }) => Number(value))
  maxPrice?: number;

  @IsOptional()
  @IsNumberString()
  @Transform(({ value }) => Number(value))
  take?: number;
}
