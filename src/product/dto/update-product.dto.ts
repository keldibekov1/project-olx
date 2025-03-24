import { ApiProperty, PartialType } from '@nestjs/swagger';


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
