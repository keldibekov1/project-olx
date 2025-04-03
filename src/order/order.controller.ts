import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Yangi buyurtma yaratish' })
  @ApiResponse({ status: 201, description: 'Buyurtma muvaffaqiyatli yaratildi' })
  create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    const userId = req.user.id; 
    return this.orderService.create(userId, createOrderDto);
  }
  @Get('myorders')
  @UseGuards(JwtAuthGuard) 
  @ApiOperation({ summary: 'Foydalanuvchining barcha buyurtmalarini olish' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchining buyurtmalari muvaffaqiyatli qaytarildi' })
  @ApiResponse({ status: 404, description: 'Foydalanuvchining buyurtmalari topilmadi' })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Sahifa raqami (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, example: 10, description: 'Sahifadagi elementlar soni (default: 10)' })
  async getMyOrders(
    @Request() req, 
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10
  ) {
    return this.orderService.myOrders(req.user.id, Number(page), Number(limit));
  }

  @Get()
  @ApiOperation({ summary: 'Barcha buyurtmalarni olish' })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Sahifa raqami (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, example: 10, description: 'Sahifadagi elementlar soni (default: 10)' })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.orderService.findAll(Number(page), Number(limit));
  }




  @Get(':id')
  @ApiOperation({ summary: 'ID boyicha buyurtmani olish' })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard) 
  @ApiOperation({ summary: 'Buyurtmani yangilash' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) 
  @ApiOperation({ summary: 'Buyurtmani ochirish' })
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
