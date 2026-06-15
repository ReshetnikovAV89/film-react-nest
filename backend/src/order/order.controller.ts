import { Body, Controller, Post } from '@nestjs/common';

import { OrderService } from './order.service';
import {
  CreateOrderDto,
  CreateOrderRequestDto,
  OrderResponseDto,
} from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(
    @Body() order: CreateOrderDto[] | CreateOrderRequestDto,
  ): Promise<OrderResponseDto> {
    return this.orderService.createOrder(order);
  }
}
