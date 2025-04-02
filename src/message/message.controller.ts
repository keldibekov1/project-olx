import { Controller, Post, Body, Request, UseGuards, Param, Get } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Chat') 
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}


  @Get('product/:productId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Mahsulot bo\'yicha barcha xabarlarni olish' })
  @ApiParam({ name: 'productId', description: 'Mahsulotning ID raqami' })
  @ApiResponse({ status: 200, description: 'Mahsulotga tegishli xabarlar' })
  @ApiResponse({ status: 404, description: 'Xabarlar topilmadi' })
  async getMessagesByProductId(@Param('productId') productId: string) {
    return this.messageService.getMessagesByProductId(productId);
  }

  @ApiBearerAuth() 
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Yangi xabar yaratish' }) 
  @ApiBody({ type: CreateMessageDto }) 
  @ApiResponse({
    status: 201,
    description: 'Xabar muvaffaqiyatli yaratildi',
    schema: {
      example: {
        data: {
          id: '7469f357-d784-47b5-a70b-be8a0490ddfb',
          text: 'Hello, how are you?',
          from_id: 'ac343ff1-a06d-4c7f-b5c8-4ad4c25b137c',
          to_id: 'ac343ff1-a06d-4c7f-b5c8-4ad4c25b137c',
          product_id: '52de3a77-12e7-494f-9af5-79baa412d169',
          date: '2025-04-02T16:16:01.554Z'
        }
      }
    }
  })
  async createMessage(@Body() createMessageDto: CreateMessageDto, @Request() req) {
    return this.messageService.createMessage(createMessageDto, req.user.id);
  }
}
