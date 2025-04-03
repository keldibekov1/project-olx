import { 
  Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Query 
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { SetMetadata } from '@nestjs/common';
import { OwnerGuard } from 'src/guards/owner.guard';

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
  @ApiQuery({ name: 'categoryId', required: false, description: 'Kategoriya ID boyicha filter' })
  @ApiQuery({ name: 'colorId', required: false, description: 'Rang ID bo yicha filter' })
  @ApiQuery({ name: 'minPrice', required: false, example: 100, description: 'Minimal narx filtri' })
  @ApiQuery({ name: 'maxPrice', required: false, example: 500, description: 'Maksimal narx filtri' })
  async getAllProducts(@Query() query) {
    return this.productService.findAll(query);
  }

  @Get('myproducts')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Mening mahsulotlarimni olish' })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Qaysi sahifa (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, example: 10, description: 'Nechta mahsulot olish (default: 10)' })
  async myProducts(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.productService.myProducts(req.user.id, Number(page), Number(limit));
  }

  @ApiOperation({ summary: 'Bitta mahsulot olish' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @ApiOperation({ summary: 'Mahsulotni yangilash' })
  @Patch(':id')
  @SetMetadata('model', 'product')
  @UseGuards(JwtAuthGuard, OwnerGuard)
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(id, dto);
  }

  @ApiOperation({ summary: 'Mahsulotni ochirish' })
  @Delete(':id')
  @SetMetadata('model', 'product')
  @UseGuards(JwtAuthGuard, OwnerGuard)
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
