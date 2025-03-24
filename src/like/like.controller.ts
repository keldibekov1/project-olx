import { Controller, Post, Get, Param, Delete, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LikeService } from './like.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateLikeDto } from './dto/create-like.dto';

@ApiTags('Likes')
@ApiBearerAuth()
@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Yangi like qoshish' })
  create(@Request() req, @Body() dto: CreateLikeDto) {
    return this.likeService.create(req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha like-larni olish' })
  findAll() {
    return this.likeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta like-ni olish' })
  findOne(@Param('id') id: string) {
    return this.likeService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Like-ni ochirish' })
  remove(@Param('id') id: string) {
    return this.likeService.remove(id);
  }
}
