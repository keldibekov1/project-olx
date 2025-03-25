import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module'; 
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { SocketGateway } from 'src/socket/socket.gateway';

@Module({
  imports: [AuthModule], 
  controllers: [OrderController],
  providers: [OrderService, PrismaService, JwtAuthGuard, JwtService,SocketGateway], 
})
export class OrderModule {}
