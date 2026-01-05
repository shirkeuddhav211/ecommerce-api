import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveFromCartDto {
  @ApiProperty()
  @IsInt()
  productId: number;
}
