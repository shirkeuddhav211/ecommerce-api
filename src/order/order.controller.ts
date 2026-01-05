import {
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('order')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Post('checkout')
  checkout(@Req() req) {
    return this.service.checkout(req.user.userId);
  }

  @Get()
  getMyOrders(@Req() req) {
    return this.service.getOrders(req.user.userId);
  }
}
