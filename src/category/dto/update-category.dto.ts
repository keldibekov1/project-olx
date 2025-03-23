import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ example: 'Iphone', description: 'Kategoriya nomi', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  
}
