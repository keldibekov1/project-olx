import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

@Injectable()
export class TypeService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTypeDto) {
    const existingType = await this.prisma.type.findUnique({
      where: { name: data.name }, 
    });

    if (existingType) {
      throw new ConflictException(`Bu tur allaqachon mavjud!`);
    }

    return this.prisma.type.create({ data });
  }

  async findAll() {
    return this.prisma.type.findMany({ include: { categories: true } });
  }

  async findOne(id: string) {
    return this.prisma.type.findUnique({ where: { id }, include: { categories: true } });
  }

  async remove(id: string) {
    const existingType = await this.prisma.type.findUnique({
      where: { id },
    });

    if (!existingType) {
      throw new NotFoundException(`Bunday type mavjud emas!`);
    }

    return this.prisma.type.delete({ where: { id } });
  }

  async update(id: string, UpdateTypeDto: UpdateTypeDto) {
    return await this.prisma.type.update({
      where: { id },
      data: {
        name: UpdateTypeDto.name ?? undefined, 
      },
    });
  }
}
