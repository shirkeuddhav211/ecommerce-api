import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from '../product/entity/product.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, cart => cart.items, { onDelete: 'CASCADE' })
  cart: Cart;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column()
  quantity: number;
}
