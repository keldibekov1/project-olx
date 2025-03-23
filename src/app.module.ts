import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { RegionModule } from './region/region.module';
import { TypeModule } from './type/type.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { ColorModule } from './color/color.module';

@Module({
  imports: [AuthModule, PrismaModule, RegionModule, TypeModule, CategoryModule, OrderModule, ColorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
