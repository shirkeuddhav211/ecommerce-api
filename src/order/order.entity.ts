import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'PAID', 'CANCELLED'],
    default: 'PENDING',
  })
  status: 'PENDING' | 'PAID' | 'CANCELLED';

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => OrderItem, item => item.order, { cascade: true })
  items: OrderItem[];

  @Column({
    type: 'enum',
    enum: ['PLACED', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
    default: 'PLACED',
  })
  trackingStatus: 'PLACED' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

}
