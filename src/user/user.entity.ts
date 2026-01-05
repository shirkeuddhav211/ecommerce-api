import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false }) // 🔒 CRITICAL
  password: string;

  @Column({ default: 'USER' })
  role: 'USER' | 'ADMIN';
}
