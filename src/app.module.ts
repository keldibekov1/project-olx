import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // ConfigModule qo'shildi
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { RegionModule } from './region/region.module';
import { TypeModule } from './type/type.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { ColorModule } from './color/color.module';
import { ProductModule } from './product/product.module';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
import { SocketGateway } from './socket/socket.gateway';
import { MessageModule } from './message/message.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    AuthModule, 
    PrismaModule, 
    RegionModule, 
    TypeModule, 
    CategoryModule, 
    OrderModule, 
    ColorModule, ProductModule, UploadModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/file'
    }),
    LikeModule,
    CommentModule,
    MessageModule,
    UserModule,
    
  ],
  controllers: [AppController],
  providers: [AppService,SocketGateway],
  exports: [SocketGateway], 

})
export class AppModule {}
