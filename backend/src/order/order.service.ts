import { Injectable } from '@nestjs/common';
import { CreateOrderDto, OrderResponseDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  createOrder(orderItems: CreateOrderDto[]): OrderResponseDto {
    return {
      total: orderItems.length,
      items: orderItems.map((orderItem, index) => ({
        ...orderItem,
        id: `temporary-order-id-${index + 1}`,
      })),
    };
  }
}
