import { 
  Controller, Get, Post, Body, Param, Delete, 
  Patch
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi kategoriya qoshish' })
  @ApiResponse({ status: 201, description: 'Kategoriya muvaffaqiyatli qoshildi.' })
  @ApiResponse({ status: 400, description: 'Xatolik: Malumotlar notogri.' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha kategoriyalarni olish' })
  @ApiResponse({ status: 200, description: 'Barcha kategoriyalar listi.' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID boyicha kategoriya olish' })
  @ApiParam({ name: 'id', example: 'category-uuid-id' })
  @ApiResponse({ status: 200, description: 'Kategoriya topildi.' })
  @ApiResponse({ status: 404, description: 'Kategoriya topilmadi.' })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ID boyicha kategoriya ochirish' })
  @ApiParam({ name: 'id', example: 'category-uuid-id' })
  @ApiResponse({ status: 200, description: 'Kategoriya muvaffaqiyatli ochirildi.' })
  @ApiResponse({ status: 404, description: 'Kategoriya topilmadi.' })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'ID boyicha kategoriya yangilash' })
  @ApiParam({ name: 'id', example: 'category-uuid-id' })
  @ApiResponse({ status: 200, description: 'Kategoriya muvaffaqiyatli yangilandi.' })
  @ApiResponse({ status: 404, description: 'Kategoriya topilmadi.' })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }
}
