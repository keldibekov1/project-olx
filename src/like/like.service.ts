import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateLikeDto) {
    return await this.prisma.like.create({
      data: {
        userId,
        productId: dto.productId,
      },
    });
  }

  async findAll() {
    return await this.prisma.like.findMany({
      include: {
        user: {
          select: { firstname: true, lastname: true, email: true },
        },
        product: {
          select: { name: true, price: true },
        },
      },
    });
  }

  async findOne(id: string) {
    const like = await this.prisma.like.findUnique({
      where: { id },
      include: {
        user: { select: { firstname: true, lastname: true, email: true } },
        product: { select: { name: true, price: true } },
      },
    });

    if (!like) throw new NotFoundException('Like topilmadi');
    return like;
  }

  async remove(id: string) {
    return await this.prisma.like.delete({ where: { id } });
  }
}
