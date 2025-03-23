import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTypeDto {
  @ApiProperty({ example: 'Phone', description: 'Tur nomi' })
  @IsString()
  name: string;
}
