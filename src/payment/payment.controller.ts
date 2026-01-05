import {
  Controller,
  Post,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('payment')
export class PaymentController {
  constructor(private readonly service: PaymentService) {}

  @Post('create/:orderId')
  create(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.service.createOrder(orderId);
  }

  @Post('verify')
  verify(@Body() body) {
    return this.service.verifyPayment(body);
  }
}
