import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  BookTicketsError,
  FilmsRepository,
} from '../repository/films.repository';
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

    const result = await this.filmsRepository.bookTickets(orderItems);

    if (result.error === BookTicketsError.SessionNotFound) {
      throw new NotFoundException('Session not found');
    }

    if (result.error === BookTicketsError.FilmNotFound) {
      throw new NotFoundException('Film not found');
    }

    if (result.error === BookTicketsError.SeatAlreadyBooked) {
      throw new BadRequestException('Seat already booked');
    }

    return {
      total: result.items.length,
      items: result.items,
    };
  }
}
