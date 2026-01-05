import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Razorpay from 'razorpay';
import * as crypto from 'crypto';
import { Order } from '../order/order.entity';

@Injectable()
export class PaymentService {
  private razorpay: Razorpay;

  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });
  }

  // 1️⃣ Create Razorpay Order
  async createOrder(orderId: number) {
    const order = await this.orderRepo.findOne({ where: { id: orderId } });

    if (!order) throw new NotFoundException('Order not found');

    const razorpayOrder = await this.razorpay.orders.create({
      amount: Math.round(Number(order.totalAmount) * 100), // paise
      currency: 'INR',
      receipt: `order_${order.id}`,
    });

    return {
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    };
  }

  // 2️⃣ Verify Payment
  async verifyPayment(body: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    orderId: number;
  }) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = body;

    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      throw new BadRequestException('Payment verification failed');
    }

    await this.orderRepo.update(orderId, {
      status: 'PAID',
      trackingStatus: 'PAID',
    });

    return { message: 'Payment successful, order confirmed' };
  }
}
