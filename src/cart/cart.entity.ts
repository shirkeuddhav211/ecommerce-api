import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @OneToMany(() => CartItem, item => item.cart, {
    cascade: true,
    eager: true,
  })
  items: CartItem[];
}
