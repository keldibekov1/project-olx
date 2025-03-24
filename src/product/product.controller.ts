import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('Mahsulotlar')
@Controller('products')

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Yangi mahsulot yaratish' })
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req, @Body() createProductDto: CreateProductDto) {
    const userId = req.user.id; 
    return this.productService.create(userId, createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha mahsulotlarni olish (pagination, sort, filter)' })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Qaysi sahifa (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, example: 10, description: 'Nechta mahsulot olish (default: 10)' })
  @ApiQuery({ name: 'sortBy', required: false, example: 'price', description: 'Saralash ustuni (masalan: name, price, createdAt)' })
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'], description: 'Saralash tartibi (asc | desc)' })
  @ApiQuery({ name: 'categoryId', required: false, description: 'Kategoriya ID bo‘yicha filter' })
  @ApiQuery({ name: 'minPrice', required: false, example: 100, description: 'Minimal narx filtri' })
  @ApiQuery({ name: 'maxPrice', required: false, example: 500, description: 'Maksimal narx filtri' })
  async getAllProducts(@Query() query: GetProductsDto){
    return this.productService.findAll(query);
  }


  @ApiOperation({ summary: 'Bitta mahsulot olish' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @ApiOperation({ summary: 'Mahsulotni yangilash' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(id, dto);
  }

  @ApiOperation({ summary: 'Mahsulotni ochirish' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
