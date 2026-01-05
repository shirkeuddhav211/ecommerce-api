import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { Cart } from '../cart/cart.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly itemRepo: Repository<OrderItem>,
    @InjectRepository(Cart)
    private readonly cartRepo: Repository<Cart>,
  ) {}

  async checkout(userId: number): Promise<Order> {
    return this.orderRepo.manager.transaction(async manager => {
      const cart = await manager.findOne(Cart, {
        where: { userId },
        relations: ['items', 'items.product'],
      });

      if (!cart || cart.items.length === 0) {
        throw new BadRequestException('Cart is empty');
      }

      let total = 0;

      const orderItems = cart.items.map(item => {
        const price = Number(item.product.price);
        total += price * item.quantity;

        return this.itemRepo.create({
          productId: item.product.id,
          quantity: item.quantity,
          price,
        });
      });

      const order = manager.create(Order, {
        userId,
        status: 'PENDING',
        totalAmount: total,
        items: orderItems,
      });

      await manager.save(order);

      // clear cart
      cart.items = [];
      await manager.save(cart);

      return order;
    });
  }

  async getOrders(userId: number): Promise<Order[]> {
    return this.orderRepo.find({
      where: { userId },
      relations: ['items'],
      order: { createdAt: 'DESC' },
    });
  }
}
