import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Foydalanuvchining email manzili',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Foydalanuvchining paroli',
    example: '12345678',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Foydalanuvchining ismi',
    example: 'Ali',
  })
  @IsOptional()
  @IsString()
  firstname?: string;

  @ApiProperty({
    description: 'Foydalanuvchining familiyasi',
    example: 'Valiyev',
  })
  @IsOptional()
  @IsString()
  lastname?: string;

  @ApiProperty({
    description: 'Foydalanuvchining rasmi',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsString()
  img?: string;

  @ApiProperty({
    description: 'Foydalanuvchining yashash joyi (Region ID)',
    example: '3365cd95-8062-4242-b033-85e4210d146a',
  })
  @IsOptional()
  @IsString()
  regionId?: string;

  @IsOptional()
  verified?: boolean;
}
