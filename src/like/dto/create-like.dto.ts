import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty({
    example: 'b6c2f7d4-3f2a-4f45-9c28-1a7b5f2d6c99',
    description: 'Like qoshilayotgan mahsulotning ID-si',
  })
  @IsUUID()
  @IsNotEmpty()
  productId: string;
}
