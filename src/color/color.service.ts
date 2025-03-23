import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Injectable()
export class ColorService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateColorDto) {
    const existingType = await this.prisma.color.findUnique({
      where: { name: data.name }, 
    });

    if (existingType) {
      throw new ConflictException(`Bu rang allaqachon mavjud!`);
    }

    return this.prisma.color.create({ data });
  }

  async findAll() {
    return this.prisma.color.findMany();
  }

  async findOne(id: string) {
    return this.prisma.color.findUnique({ where: { id } });
  }

  async remove(id: string) {
    const existingType = await this.prisma.color.findUnique({
      where: { id },
    });

    if (!existingType) {
      throw new NotFoundException(`Bunday rang mavjud emas!`);
    }

    return this.prisma.color.delete({ where: { id } });
  }

  async update(id: string, UpdateTypeDto: UpdateColorDto) {
    return await this.prisma.color.update({
      where: { id },
      data: {
        name: UpdateTypeDto.name ?? undefined, 
      },
    });
  }
}
