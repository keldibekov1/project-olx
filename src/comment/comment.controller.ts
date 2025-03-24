import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('Comment')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'Comment qoshish' })
  @ApiResponse({ status: 201, description: 'Comment muvaffaqiyatli qoshildi' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() dto: CreateCommentDto) {
    return this.commentService.create(req.user.id, dto);
  }

  @ApiOperation({ summary: 'Mahsulotga tegishli barcha commentlarni olish' })
  @ApiQuery({ name: 'productId', required: true })
  @ApiResponse({ status: 200, description: 'Commentlar royxati' })
  @Get()
  findAll(@Query('productId') productId: string) {
    return this.commentService.findAll(productId);
  }

  @ApiOperation({ summary: 'Bitta commentni olish' })
  @ApiResponse({ status: 200, description: 'Comment malumoti' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @ApiOperation({ summary: 'Commentni ochirish' })
  @ApiResponse({ status: 200, description: 'Comment ochirildi' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
}
