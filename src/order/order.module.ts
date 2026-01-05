import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Cart } from '../cart/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Cart])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
