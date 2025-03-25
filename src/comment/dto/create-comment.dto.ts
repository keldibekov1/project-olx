import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'Bu juda zo‘r mahsulot!', description: 'Komment matni' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Mahsulot ID' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 4.5, description: 'Mahsulotga berilgan baho (1 dan 5 gacha)' })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  star: number;
}
