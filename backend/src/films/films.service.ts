import { Injectable } from '@nestjs/common';
import { FilmsResponseDto, FilmScheduleResponseDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  getFilms(): FilmsResponseDto {
    return {
      total: 0,
      items: [],
    };
  }

  getFilmSchedule(filmId: string): FilmScheduleResponseDto {
    console.log(filmId);

    return {
      total: 0,
      items: [],
    };
  }
}
