import { Injectable } from '@nestjs/common';

import { FilmsRepository } from '../repository/films.repository';
import {
  CreateOrderDto,
  CreateOrderRequestDto,
  OrderResponseDto,
} from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(
    order: CreateOrderDto[] | CreateOrderRequestDto,
  ): Promise<OrderResponseDto> {
    const orderItems = Array.isArray(order) ? order : order.tickets;

    const bookedTickets = await this.filmsRepository.bookTickets(orderItems);

    return {
      total: bookedTickets.length,
      items: bookedTickets,
    };
  }
}
