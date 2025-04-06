import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private prisma: PrismaService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request['user']; 
    if (!user) throw new ForbiddenException('Foydalanuvchi topilmadi');

    if (user.role === 'ADMIN') return true;

    const { params } = request;
    const resourceId = params.id; 
    if (!resourceId) throw new ForbiddenException('ID topilmadi');

    const modelName = this.reflector.get<string>('model', context.getHandler());
    if (!modelName) throw new ForbiddenException('Model nomi aniqlanmadi');

    const resource = await this.prisma[modelName].findUnique({
      where: { id: resourceId },
    });

    if (!resource) throw new ForbiddenException('Ma\'lumot topilmadi');

    if (resource.userId !== user.id) {
      throw new ForbiddenException("Sizga bu ma'lumot tegishli emas, tahrirlash yoki o‘chirish huquqiga ega emassiz");
    }

    return true;
  }
}
