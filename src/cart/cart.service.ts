import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';
import { Product } from '../product/entity/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepo: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly itemRepo: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async getCart(userId: number): Promise<Cart> {
    let cart = await this.cartRepo.findOne({ where: { userId } });

    if (!cart) {
      cart = this.cartRepo.create({ userId, items: [] });
      cart = await this.cartRepo.save(cart);
    }

    return cart;
  }

  async addToCart(
    userId: number,
    productId: number,
    quantity: number,
  ): Promise<Cart> {
    if (quantity < 1) {
      throw new BadRequestException('Quantity must be at least 1');
    }

    const cart = await this.getCart(userId);

    const product = await this.productRepo.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    let item = cart.items.find(i => i.product.id === productId);

    if (item) {
      item.quantity += quantity;
    } else {
      item = this.itemRepo.create({ cart, product, quantity });
      cart.items.push(item);
    }

    return this.cartRepo.save(cart);
  }

  async removeItem(userId: number, productId: number): Promise<Cart> {
    const cart = await this.getCart(userId);

    const exists = cart.items.some(i => i.product.id === productId);
    if (!exists) {
      throw new NotFoundException('Product not found in cart');
    }

    cart.items = cart.items.filter(i => i.product.id !== productId);
    return this.cartRepo.save(cart);
  }

  async clearCart(userId: number): Promise<Cart> {
    const cart = await this.getCart(userId);
    cart.items = [];
    return this.cartRepo.save(cart);
  }
}
