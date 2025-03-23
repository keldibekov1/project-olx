import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsInt, Min } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty({ example: 'user-uuid-id', description: 'Foydalanuvchi ID si', required: false })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({ example: 'product-uuid-id', description: 'Mahsulot ID si', required: false })
  @IsOptional()
  @IsUUID()
  productId?: string;

  @ApiProperty({ example: 'color-uuid-id', description: 'Rang ID si', required: false })
  @IsOptional()
  @IsUUID()
  colorId?: string;

  @ApiProperty({ example: 3, description: 'Buyurtma soni', required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  count?: number;
}
