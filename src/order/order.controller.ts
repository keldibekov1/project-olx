import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';

@ApiTags('Order')
@Controller('order')
@UseGuards(JwtAuthGuard) 
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi buyurtma yaratish' })
  @ApiResponse({ status: 201, description: 'Buyurtma muvaffaqiyatli yaratildi' })
  create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    const userId = req.user.id; 
    return this.orderService.create(userId, createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha buyurtmalarni olish' })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID boyicha buyurtmani olish' })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Buyurtmani yangilash' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Buyurtmani ochirish' })
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
