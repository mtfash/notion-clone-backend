import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreatePageDto {
  @ApiProperty({ example: 'New Page' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: '6599488aa3e46c4851c39c25' })
  @IsString()
  @IsOptional()
  parentId?: string;
}
