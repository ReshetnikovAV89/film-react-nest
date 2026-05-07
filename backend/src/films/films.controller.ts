import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsResponseDto, FilmScheduleResponseDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  getFilms(): FilmsResponseDto {
    return this.filmsService.getFilms();
  }

  @Get(':id/schedule')
  getFilmSchedule(@Param('id') filmId: string): FilmScheduleResponseDto {
    return this.filmsService.getFilmSchedule(filmId);
  }

  @Get(':id/shedule')
  getFilmShedule(@Param('id') filmId: string): FilmScheduleResponseDto {
    return this.filmsService.getFilmSchedule(filmId);
  }
}
