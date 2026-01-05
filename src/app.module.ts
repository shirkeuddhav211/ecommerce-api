import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'ecommerce',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Set false for production migration
    }),
    ProductModule,
    AuthModule,
    CartModule,
    OrderModule,
    PaymentModule,
    // ...other modules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
 }
