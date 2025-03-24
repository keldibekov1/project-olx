import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateTypeDto } from './dto/update-type.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('Type') 
@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Yangi type qoshish' })
  @ApiResponse({ status: 201, description: 'type muvaffaqiyatli qoshildi.' })
  @ApiResponse({ status: 409, description: 'Bu type allaqachon mavjud!' })
  create(@Body() createTypeDto: CreateTypeDto) {
    return this.typeService.create(createTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha typeni olish' })
  @ApiResponse({ status: 200, description: 'Barcha type royxati' })
  findAll() {
    return this.typeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta type haqida malumot' })
  @ApiResponse({ status: 200, description: 'type topildi.' })
  @ApiResponse({ status: 404, description: 'Bunday type mavjud emas!' })
  findOne(@Param('id') id: string) {
    return this.typeService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'type ochirish' })
  @ApiResponse({ status: 200, description: 'type muvaffaqiyatli ochirildi.' })
  @ApiResponse({ status: 404, description: 'Bunday type mavjud emas!' })
  remove(@Param('id') id: string) {
    return this.typeService.remove(id);
  }

  @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiOperation({ summary: 'Typeni yangilash' })
    @ApiResponse({ status: 200, description: 'Type yangilandi' })
    @ApiResponse({ status: 400, description: 'Xatolik: Malumotlar notogri' })
    @ApiResponse({ status: 404, description: 'Type topilmadi' })
    update(@Param('id') id: string, @Body() update: UpdateTypeDto) {
      return this.typeService.update(id, update);
    }
}
