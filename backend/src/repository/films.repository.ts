import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Film } from '../films/entities/film.entity';
import { Schedule } from '../films/entities/schedule.entity';
import { CreateOrderDto, OrderItemDto } from '../order/dto/order.dto';

export enum BookTicketsError {
  SessionNotFound = 'SESSION_NOT_FOUND',
  FilmNotFound = 'FILM_NOT_FOUND',
  SeatAlreadyBooked = 'SEAT_ALREADY_BOOKED',
}

export interface BookTicketsResult {
  items: OrderItemDto[];
  error?: BookTicketsError;
}

@Injectable()
export class FilmsRepository {
  private readonly filmsLimit: number;

  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    private readonly configService: ConfigService,
  ) {
    this.filmsLimit = Number(
      this.configService.get<string>('FILMS_LIMIT', '100'),
    );
  }

  async findAll(): Promise<Film[]> {
    return this.filmRepository.find({
      take: this.filmsLimit,
    });
  }

  async findScheduleByFilmId(filmId: string): Promise<Schedule[] | null> {
    const film = await this.filmRepository.findOneBy({ id: filmId });

    if (!film) {
      return null;
    }

    return this.scheduleRepository.find({
      where: {
        film: {
          id: filmId,
        },
      },
      order: {
        daytime: 'ASC',
      },
    });
  }

  async bookTickets(orderItems: CreateOrderDto[]): Promise<BookTicketsResult> {
    const sessionIds = [
      ...new Set(orderItems.map((orderItem) => orderItem.session)),
    ];

    const schedules = await this.scheduleRepository.find({
      where: {
        id: In(sessionIds),
      },
      relations: {
        film: true,
      },
    });

    const schedulesById = new Map<string, Schedule>(
      schedules.map((schedule) => [schedule.id, schedule]),
    );

    const changedSchedules = new Set<Schedule>();
    const bookedTickets: OrderItemDto[] = [];

    for (const orderItem of orderItems) {
      const session = schedulesById.get(orderItem.session);

      if (!session) {
        return {
          items: [],
          error: BookTicketsError.SessionNotFound,
        };
      }

      if (session.film.id !== orderItem.film) {
        return {
          items: [],
          error: BookTicketsError.FilmNotFound,
        };
      }

      const seatKey = `${orderItem.row}:${orderItem.seat}`;

      if (session.taken.includes(seatKey)) {
        return {
          items: [],
          error: BookTicketsError.SeatAlreadyBooked,
        };
      }

      session.taken.push(seatKey);
      changedSchedules.add(session);

      bookedTickets.push({
        ...orderItem,
        id: crypto.randomUUID(),
      });
    }

    await this.scheduleRepository.save([...changedSchedules]);

    return {
      items: bookedTickets,
    };
  }
}
