import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ example: 'Hello, how are you?', description: 'Xabar matni' })
  @IsString()
  text: string;

  @ApiProperty({ example: '52de3a77-12e7-494f-9af5-79baa412d169', description: 'Mahsulot ID si' })
  @IsUUID()
  productId: string;
}
