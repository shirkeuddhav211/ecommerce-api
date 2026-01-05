import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyPaymentDto {
  @ApiProperty()
  @IsString()
  razorpay_order_id: string;

  @ApiProperty()
  @IsString()
  razorpay_payment_id: string;

  @ApiProperty()
  @IsString()
  razorpay_signature: string;

  @ApiProperty()
  @IsNumber()
  orderId: number;
}
