import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateOrderDto, OrderItemDto } from '../order/dto/order.dto';
import { Film, FilmDocument } from '../films/schemas/film.schema';

@Injectable()
export class FilmsRepository {
  private readonly filmsLimit: number;

  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<FilmDocument>,
    private readonly configService: ConfigService,
  ) {
    this.filmsLimit = Number(
      this.configService.get<string>('FILMS_LIMIT', '100'),
    );
  }

  async findAll(): Promise<Film[]> {
    return this.filmModel.find().limit(this.filmsLimit).lean().exec();
  }

  async findScheduleByFilmId(filmId: string): Promise<Film['schedule']> {
    const film = await this.filmModel.findOne({ id: filmId }).lean().exec();

    if (!film) {
      throw new NotFoundException('Film not found');
    }

    return film.schedule;
  }

  async bookTickets(orderItems: CreateOrderDto[]): Promise<OrderItemDto[]> {
    const filmIds = [...new Set(orderItems.map((orderItem) => orderItem.film))];

    const films = await this.filmModel.find({
      id: { $in: filmIds },
    });

    const filmsById = new Map<string, FilmDocument>(
      films.map((film) => [film.id, film]),
    );

    const changedFilms = new Set<FilmDocument>();
    const bookedTickets: OrderItemDto[] = [];

    for (const orderItem of orderItems) {
      const film = filmsById.get(orderItem.film);

      if (!film) {
        throw new NotFoundException('Film not found');
      }

      const session = film.schedule.find(
        (scheduleItem) => scheduleItem.id === orderItem.session,
      );

      if (!session) {
        throw new NotFoundException('Session not found');
      }

      const seatKey = `${orderItem.row}:${orderItem.seat}`;

      if (session.taken.includes(seatKey)) {
        throw new BadRequestException('Seat already booked');
      }

      session.taken.push(seatKey);
      changedFilms.add(film);

      bookedTickets.push({
        ...orderItem,
        id: crypto.randomUUID(),
      });
    }

    await Promise.all([...changedFilms].map((film) => film.save()));

    return bookedTickets;
  }
}
