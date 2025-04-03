import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { SocketGateway } from 'src/socket/socket.gateway';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService, private socketGateway: SocketGateway) {}

  async create(userId: string, data: CreateOrderDto) {
    const order = await this.prisma.order.create({
      data: {
        ...data,
        userId,
      },
      include: {
        product: { select: { userId: true } },
      },
    });
    
    if (order.product.userId) {
      this.socketGateway.sendNotification(order.product.userId, {
        message: `Yangi buyurtma tushdi!`,
        orderId: order.id,
      });
    }

    return order;
  }
  async myOrders(userId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const orders = await this.prisma.order.findMany({
      where: { userId },
      include: { 
        user: {
          select: {
            firstname: true,
            lastname: true,
            email: true,
          }
        },
        product: true,
        color: true
      },
      skip,
      take: limit,
    });

    const total = await this.prisma.order.count({ where: { userId } });

    return {
      data: orders,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  
  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const orders = await this.prisma.order.findMany({
      include: { 
        user: {
          select: {
            firstname: true,
            lastname: true,
            email: true,
          }
        }, 
        product: true, 
        color: true 
      },
      skip,
      take: limit,
    });

    const total = await this.prisma.order.count();

    return {
      data: orders,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { user: {
        select: {
            firstname: true,
            lastname: true,
            email: true,
        }
    },      product: true,
            color: true },
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
