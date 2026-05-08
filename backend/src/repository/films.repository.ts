import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateOrderDto, OrderItemDto } from '../order/dto/order.dto';
import { Film, FilmDocument } from '../films/schemas/film.schema';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<FilmDocument>,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmModel.find().lean().exec();
  }

  async findScheduleByFilmId(filmId: string): Promise<Film['schedule']> {
    const film = await this.filmModel.findOne({ id: filmId }).lean().exec();

    if (!film) {
      throw new NotFoundException('Film not found');
    }

    return film.schedule;
  }

  async bookTickets(orderItems: CreateOrderDto[]): Promise<OrderItemDto[]> {
    const bookedTickets: OrderItemDto[] = [];

    for (const orderItem of orderItems) {
      const seatKey = `${orderItem.row}:${orderItem.seat}`;

      const film = await this.filmModel.findOne({
        id: orderItem.film,
        'schedule.id': orderItem.session,
      });

      if (!film) {
        throw new NotFoundException('Film or session not found');
      }

      const session = film.schedule.find(
        (scheduleItem) => scheduleItem.id === orderItem.session,
      );

      if (!session) {
        throw new NotFoundException('Session not found');
      }

      if (session.taken.includes(seatKey)) {
        throw new BadRequestException('Seat already booked');
      }

      session.taken.push(seatKey);

      await film.save();

      bookedTickets.push({
        ...orderItem,
        id: crypto.randomUUID(),
      });
    }

    return bookedTickets;
  }
}