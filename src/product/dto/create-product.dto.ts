import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 15', description: 'Mahsulot nomi' })
  name: string;

  @ApiProperty({ example: 1200, description: 'Narxi' })
  price: number;

  @ApiProperty({ example: 'image-url.jpg', description: 'Mahsulot rasmi' })
  img: string;

  @ApiProperty({ example: 'Mahsulot haqida qisqacha', description: 'Tavsifi', required: false })
  description?: string;

  @ApiProperty({ example: 10, description: 'Mahsulot soni' })
  count: number;

  @ApiProperty({ example: 5, description: 'Chegirma foizi', required: false })
  skidka?: number;

  @ApiProperty({ example: 'category-uuid', description: 'Kategoriya ID' })
  categoryId: string;

  @ApiProperty({ example: 'color-uuid', description: 'Color ID' })
  colorId: string;
}

export class UpdateProductDto {
  @ApiProperty({ example: 'iPhone 15 Pro', description: 'Mahsulot nomi', required: false })
  name?: string;

  @ApiProperty({ example: 1300, description: 'Narxi', required: false })
  price?: number;

  @ApiProperty({ example: 'image-url.jpg', description: 'Mahsulot rasmi', required: false })
  img?: string;

  @ApiProperty({ example: 'Yangilangan mahsulot haqida', description: 'Tavsifi', required: false })
  description?: string;

  @ApiProperty({ example: 15, description: 'Mahsulot soni', required: false })
  count?: number;

  @ApiProperty({ example: 10, description: 'Chegirma foizi', required: false })
  skidka?: number;

  @ApiProperty({ example: 'category-uuid', description: 'Kategoriya ID', required: false })
  categoryId?: string;

  @ApiProperty({ example: 'color-uuid', description: 'Color ID', required: false })
  colorId?: string;
}
