import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToCartDto {
  @ApiProperty()
  @IsInt()
  productId: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  quantity: number;
}
