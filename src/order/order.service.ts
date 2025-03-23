import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        ...data,
        userId, 
      },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: { user: true, product: true, color: true },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { user: true, product: true, color: true },
    });

    if (!order) throw new NotFoundException('Buyurtma topilmadi!');
    return order;
  }

  async update(id: string, data: UpdateOrderDto) {
    const existingOrder = await this.prisma.order.findUnique({ where: { id } });
    if (!existingOrder) throw new NotFoundException('Buyurtma topilmadi!');

    return this.prisma.order.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const existingOrder = await this.prisma.order.findUnique({ where: { id } });
    if (!existingOrder) throw new NotFoundException('Buyurtma topilmadi!');

    return this.prisma.order.delete({ where: { id } });
  }
}
