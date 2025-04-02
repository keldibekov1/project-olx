import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async createMessage(data: CreateMessageDto, userId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: data.productId },
      select: { userId: true },
    });

    if (!product) {
      throw new NotFoundException('Mahsulot topilmadi!');
    }

    const message = await this.prisma.message.create({
      data: {
        text: data.text,
        productId: data.productId,
        fromId: userId, 
        toId: product.userId, 
      },
    });

    return {
      data: message,
    };
  }

  async getMessagesByProductId(productId: string) {
    const messages = await this.prisma.message.findMany({
      where: { productId },
      include: {
        from: { 
          select: {
            id: true,
            email: true,
            img: true,
            firstname: true,
            lastname: true,
          },
        },
        to: { 
          select: {
            id: true,
            email: true,
            img: true,
            firstname: true,
            lastname: true,
          },
        },
      },
    });

    return messages.map((message) => ({
      text: message.text,
      from: message.from,
      to: message.to,
      productId: message.productId,
    }));
  }
}
