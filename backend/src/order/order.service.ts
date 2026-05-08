import { Injectable } from '@nestjs/common';

import { FilmsRepository } from '../repository/films.repository';
import { CreateOrderDto, OrderResponseDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(orderItems: CreateOrderDto[]): Promise<OrderResponseDto> {
    const bookedTickets = await this.filmsRepository.bookTickets(orderItems);

    return {
      total: bookedTickets.length,
      items: bookedTickets,
    };
  }
}
