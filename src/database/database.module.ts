import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../product/entity/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'ecommerce',
      entities: [Product],
      synchronize: true, // ❗ disable in production
    }),
  ],
})
export class DatabaseModule {}
