import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstname: data.firstname,
        lastname: data.lastname,
        img: data.img,
        verified: true,
        regionId: data.regionId,
      },
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    page = Math.max(1, page);  
    limit = Math.max(1, Math.min(100, limit));  
  
    const skip = (page - 1) * limit;
    
    const totalUsers = await this.prisma.user.count();  
    const totalPages = Math.ceil(totalUsers / limit); 
    
    const users = await this.prisma.user.findMany({
      skip: skip,
      take: limit,
    });
    
    return {
      users,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers,
        limit,
      },
    };
  }
  
  

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('Foydalanuvchi topilmadi');
    }
    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.findOne(id);

    const updatedData: any = {
      email: data.email ?? user.email,
      firstname: data.firstname ?? user.firstname,
      lastname: data.lastname ?? user.lastname,
      img: data.img ?? user.img,
    };

    if (data.password) {
      updatedData.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: updatedData,
    });

    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.prisma.user.delete({
      where: { id: user.id },
    });
  }
}
