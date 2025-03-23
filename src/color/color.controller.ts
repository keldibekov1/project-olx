import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ColorService } from './color.service';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  
@Post()
  @ApiOperation({ summary: 'Yangi color qoshish' })
  @ApiResponse({ status: 201, description: 'color muvaffaqiyatli qoshildi.' })
  @ApiResponse({ status: 409, description: 'Bu color allaqachon mavjud!' })
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorService.create(createColorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha colorni olish' })
  @ApiResponse({ status: 200, description: 'Barcha color royxati' })
  findAll() {
    return this.colorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta color haqida malumot' })
  @ApiResponse({ status: 200, description: 'color topildi.' })
  @ApiResponse({ status: 404, description: 'Bunday color mavjud emas!' })
  findOne(@Param('id') id: string) {
    return this.colorService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'color ochirish' })
  @ApiResponse({ status: 200, description: 'color muvaffaqiyatli ochirildi.' })
  @ApiResponse({ status: 404, description: 'Bunday color mavjud emas!' })
  remove(@Param('id') id: string) {
    return this.colorService.remove(id);
  }

  @Patch(':id')
    @ApiOperation({ summary: 'colorni yangilash' })
    @ApiResponse({ status: 200, description: 'color yangilandi' })
    @ApiResponse({ status: 400, description: 'Xatolik: Malumotlar notogri' })
    @ApiResponse({ status: 404, description: 'color topilmadi' })
    update(@Param('id') id: string, @Body() update: UpdateColorDto) {
      return this.colorService.update(id, update);
    }
  
}
