import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateColorDto } from './create-color.dto';

export class UpdateColorDto extends PartialType(CreateColorDto) {
     @ApiProperty({ example: 'Sariq', description: 'Rang nomi' })
      @IsString()
      name: string;
}
