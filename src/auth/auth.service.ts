import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth-dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
    private jwtService: JwtService,
  ) {}

  async sendOtp(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

  if (user) {
    if (user.verified) {
      throw new BadRequestException('Siz allaqachon ro‘yxatdan o‘tgansiz');
    }
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    await this.prisma.user.upsert({
      where: { email },
      update: { otp, verified: false }, 
      create: { email, otp, verified: false }, 
    });

    await this.mailerService.sendMail({
      to: email,
      subject: 'Tasdiqlash kodi',
      text: `Sizning tasdiqlash kodingiz: ${otp}`,
    });

    return { message: 'OTP yuborildi' };
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || user.otp !== otp) {
      throw new BadRequestException('Notogri OTP');
    }

    await this.prisma.user.update({
      where: { email },
      data: { verified: true, otp: null }, 
    });

    return { message: 'OTP tasdiqlandi' };
  }

  async register(data: RegisterDto) {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } });
  
    if (!user || !user.verified) {
      throw new BadRequestException('Foydalanuvchi OTP tasdiqlanmagan');
    }
  
    const hashedPassword = await bcrypt.hash(data.password, 10);
  
    await this.prisma.user.update({
      where: { email: data.email },
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        regionId: data.regionId, 
        password: hashedPassword,
        img: data.img,
      },
    });
  
    return { message: 'Royxatdan otish muvaffaqiyatli!' };
  }
  

  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } });

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Email yoki parol notogri');
    }

    const token = this.jwtService.sign({ id: user.id, email: user.email, role: user.role });

    return { token };
  }
}
