import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Film } from '../films/entities/film.entity';
import { Schedule } from '../films/entities/schedule.entity';
import { CreateOrderDto, OrderItemDto } from '../order/dto/order.dto';

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

  async findScheduleByFilmId(filmId: string): Promise<Schedule[]> {
    const film = await this.filmRepository.findOneBy({ id: filmId });

    if (!film) {
      throw new NotFoundException('Film not found');
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

  async bookTickets(orderItems: CreateOrderDto[]): Promise<OrderItemDto[]> {
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
        throw new NotFoundException('Session not found');
      }

      if (session.film.id !== orderItem.film) {
        throw new NotFoundException('Film not found');
      }

      const seatKey = `${orderItem.row}:${orderItem.seat}`;

      if (session.taken.includes(seatKey)) {
        throw new BadRequestException('Seat already booked');
      }

      session.taken.push(seatKey);
      changedSchedules.add(session);

      bookedTickets.push({
        ...orderItem,
        id: crypto.randomUUID(),
      });
    }

    await this.scheduleRepository.save([...changedSchedules]);

    return bookedTickets;
  }
}
