import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePageDto {
  @ApiPropertyOptional({ example: 'New Page' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: '6599488aa3e46c4851c39c25' })
  @IsString()
  @IsOptional()
  parentId?: string;
}
