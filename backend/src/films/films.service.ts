import { Injectable, NotFoundException } from '@nestjs/common';

import { FilmsRepository } from '../repository/films.repository';
import {
  FilmDto,
  FilmsResponseDto,
  FilmScheduleResponseDto,
} from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async getFilms(): Promise<FilmsResponseDto> {
    const films = await this.filmsRepository.findAll();

    const filmItems: FilmDto[] = films.map((film) => ({
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      title: film.title,
      about: film.about,
      description: film.description,
      image: film.image,
      cover: film.cover,
    }));

    return {
      total: filmItems.length,
      items: filmItems,
    };
  }

  async getFilmSchedule(filmId: string): Promise<FilmScheduleResponseDto> {
    const schedule = await this.filmsRepository.findScheduleByFilmId(filmId);

    if (!schedule) {
      throw new NotFoundException('Film not found');
    }

    return {
      total: schedule.length,
      items: schedule,
    };
  }
}
