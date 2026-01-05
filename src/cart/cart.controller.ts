import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { RemoveFromCartDto } from './dto/remove-from-cart.dto';

@ApiTags('Cart')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('cart')
export class CartController {
  constructor(private readonly service: CartService) {}

  @Get()
  getCart(@Req() req) {
    return this.service.getCart(req.user.userId);
  }

  @Post('add')
  addToCart(@Req() req, @Body() dto: AddToCartDto) {
    return this.service.addToCart(
      req.user.userId,
      dto.productId,
      dto.quantity,
    );
  }

  @Delete('remove')
  remove(@Req() req, @Body() dto: RemoveFromCartDto) {
    return this.service.removeItem(req.user.userId, dto.productId);
  }

  @Delete('clear')
  clear(@Req() req) {
    return this.service.clearCart(req.user.userId);
  }
}
