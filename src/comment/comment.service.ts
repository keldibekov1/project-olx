import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateCommentDto) {
    return await this.prisma.comment.create({
      data: {
        text: dto.text,
        star: dto.star, 
        productId: dto.productId,
        userId,
      },
    });
  }
  

  async findAll(productId: string) {
    return await this.prisma.comment.findMany({
      where: { productId },
      include: {
        user: {
          select: {
            firstname: true,
            lastname: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            firstname: true,
            lastname: true,
            email: true,
          },
        },
      },
    });

    if (!comment) throw new NotFoundException('Komment topilmadi');
    
    return comment;
  }

  async remove(id: string) {
    return await this.prisma.comment.delete({ where: { id } });
  }
}
