import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateProductDto) {
    return await this.prisma.product.create({
      data: {
        ...dto,
        userId, 
      },
    });
  }

  async findAll(query: { 
    page?: number; 
    limit?: number | string; 
    sortBy?: string; 
    order?: 'asc' | 'desc'; 
    categoryId?: string; 
    minPrice?: string | number; 
    maxPrice?: string | number;
}) {
    const { 
        page = 1, 
        limit = 10, 
        sortBy = 'createdAt', 
        order = 'desc', 
        categoryId, 
        minPrice, 
        maxPrice 
    } = query;

    const skip = (Number(page) - 1) * Number(limit);

    const products = await this.prisma.product.findMany({
        where: {
            categoryId: categoryId || undefined,
            price: {
                gte: minPrice ? Number(minPrice) : undefined, 
                lte: maxPrice ? Number(maxPrice) : undefined, 
            },
        },
        orderBy: {
            [sortBy]: order,
        },
        skip,
        take: Number(limit),
        include: {
            user: {
                select: {
                    firstname: true,
                    lastname: true,
                    email: true,
                }
            },
            color: {
                select: {
                    name: true
                }
            },
            category: {
              select: {
                  name: true
              }
            },
            likes: true,
            comments: {
               
            }
            
        }
    });

    return products.map(product => {
        const totalStars = product.comments?.reduce((sum, comment) => sum + comment.star, 0) || 0;
        const avgStars = product.comments?.length ? (totalStars / product.comments.length).toFixed(1) : "0"; 
        
        return {
            ...product,
            totalLikes: product.likes.length,
            discountedPrice: product.skidka ? product.price * (1 - product.skidka / 100) : product.price,
            avgStars
        };
    });
}


async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    firstname: true,
                    lastname: true,
                    email: true,
                }
            },
            color: {
                select: {
                    name: true
                }
            },
            category: {
                select: {
                    name: true
                }
            },
            likes: true,
            comments: {
                select: {
                    text: true,
                    star: true,
                    user: {
                        select: {
                            firstname: true,
                            lastname: true
                        }
                    }
                }
            }
        }
    });
  
    if (!product) throw new NotFoundException('Mahsulot topilmadi');
  
    const totalStars = product.comments?.reduce((sum, comment) => sum + comment.star, 0) || 0;
    const avgStars = product.comments?.length ? (totalStars / product.comments.length).toFixed(1) : "0";
  
    return {
        ...product,
        totalLikes: product.likes.length,
        discountedPrice: product.skidka ? product.price * (1 - product.skidka / 100) : product.price,
        avgStars
    };
  }
  
  
  
  
  


  async update(id: string, dto: UpdateProductDto) {
    return await this.prisma.product.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return await this.prisma.product.delete({ where: { id } });
  }
}
