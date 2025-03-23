import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsInt, Min } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 'product-uuid-id', description: 'Mahsulot ID si' })
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @ApiProperty({ example: 'color-uuid-id', description: 'Rang ID si' })
  @IsNotEmpty()
  @IsUUID()
  colorId: string;

  @ApiProperty({ example: 2, description: 'Buyurtma soni' })
  @IsInt()
  @Min(1)
  count: number;
}
