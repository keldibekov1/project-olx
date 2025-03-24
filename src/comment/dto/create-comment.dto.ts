import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'Bu juda zor mahsulot!', description: 'Komment matni' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Mahsulot ID' })
  @IsString()
  @IsNotEmpty()
  productId: string;
}
