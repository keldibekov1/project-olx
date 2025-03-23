import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateRegionDto {
  @ApiProperty({ example: 'Samarqand', description: 'Yangi region nomi', required: false })
  @IsString()
  @IsOptional()
  name?: string;
}
