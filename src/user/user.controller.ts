import { Controller, Get, Post, Body, Param, Put, Delete, Patch, UseGuards, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('Foydalanuvchilar')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Yangi foydalanuvchi yaratish' })
  @ApiResponse({ status: 201, description: 'Foydalanuvchi muvaffaqiyatli yaratildi' })
  @ApiResponse({ status: 400, description: 'Xato sorov' })
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Get()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiOperation({ summary: 'Barcha foydalanuvchilarni olish' })
@ApiResponse({ status: 200, description: 'Barcha foydalanuvchilarning royxati' })
@ApiQuery({ name: 'page', required: false, description: 'Sahifa raqami', type: Number, default: 1 })
@ApiQuery({ name: 'limit', required: false, description: 'Har sahifada foydalanuvchilar soni', type: Number, default: 10 })
async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
  return this.userService.findAll(page, limit);
}


  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Foydalanuvchini ID boyicha olish' })
  @ApiParam({ name: 'id', description: 'Foydalanuvchining ID raqami' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi malumotlari' })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi' })
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Foydalanuvchini yangilash' })
  @ApiParam({ name: 'id', description: 'Yangilanishi kerak bo\'lgan foydalanuvchining ID raqami' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi muvaffaqiyatli yangilandi' })
  @ApiResponse({ status: 400, description: 'Xato sorov' })
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Foydalanuvchini ochirish' })
  @ApiParam({ name: 'id', description: 'Ochirilishi kerak bolgan foydalanuvchining ID raqami' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi muvaffaqiyatli ochirildi' })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi' })
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
