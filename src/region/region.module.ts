import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Module({
  imports: [JwtModule],
  controllers: [RegionController],
  providers: [RegionService, PrismaService, JwtAuthGuard, JwtService], 

})
export class RegionModule {}
