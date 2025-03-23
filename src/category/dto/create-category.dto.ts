import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Samsung' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'c7f5473e-a79f-42c7-9128-8479dea3116a' })
  @IsNotEmpty()
  @IsString()
  typeId: string;
}
