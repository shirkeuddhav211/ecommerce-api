import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column('decimal')
  price: number;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  image: string;
}
