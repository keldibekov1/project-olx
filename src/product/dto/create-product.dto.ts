import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 15', description: 'Mahsulot nomi' })
  name: string;

  @ApiProperty({ example: 1200, description: 'Narxi' })
  price: number;

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

  @ApiProperty({ example: 'category-uuid', description: 'Kategoriya ID', required: false })
  categoryId?: string;

  @ApiProperty({ example: 'user-uuid', description: 'User ID', required: false })
  userId?: string;

  @ApiProperty({ example: 'color-uuid', description: 'Color ID', required: false })
  colorId?: string;
}
