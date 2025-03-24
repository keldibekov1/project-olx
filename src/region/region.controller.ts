import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('Region') 
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Yangi region yaratish' })
  @ApiResponse({ status: 201, description: 'Region muvaffaqiyatli yaratildi' })
  @ApiResponse({ status: 400, description: 'Xatolik: Malumotlar notogri' })
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha regionlarni olish' })
  @ApiResponse({ status: 200, description: 'Barcha regionlar' })
  findAll() {
    return this.regionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta regionni olish' })
  @ApiResponse({ status: 200, description: 'Region topildi' })
  @ApiResponse({ status: 404, description: 'Region topilmadi' })
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Regionni yangilash' })
  @ApiResponse({ status: 200, description: 'Region yangilandi' })
  @ApiResponse({ status: 400, description: 'Xatolik: Malumotlar notogri' })
  @ApiResponse({ status: 404, description: 'Region topilmadi' })
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(id, updateRegionDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Regionni ochirish' })
  @ApiResponse({ status: 200, description: 'Region ochirildi' })
  @ApiResponse({ status: 404, description: 'Region topilmadi' })
  remove(@Param('id') id: string) {
    return this.regionService.remove(id);
  }
}
