import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 15' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Apple smartphone', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1200 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'Electronics', required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ example: 'iphone.jpg', required: false })
  @IsOptional()
  @IsString()
  image?: string;
}
