import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTypeDto } from './create-type.dto';
import { IsString } from 'class-validator';

export class UpdateTypeDto extends PartialType(CreateTypeDto) {
     @ApiProperty({ example: 'Phone', description: 'Type nomi' })
      @IsString()
      name: string;
}
