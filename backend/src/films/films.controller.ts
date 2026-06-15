import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';

import { FilmsService } from './films.service';
import { FilmsResponseDto, FilmScheduleResponseDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  getFilms(): Promise<FilmsResponseDto> {
    return this.filmsService.getFilms();
  }

  @Get(':id/schedule')
  getFilmSchedule(
    @Param('id', new ParseUUIDPipe()) filmId: string,
  ): Promise<FilmScheduleResponseDto> {
    return this.filmsService.getFilmSchedule(filmId);
  }

  @Get(':id/shedule')
  getFilmShedule(
    @Param('id', new ParseUUIDPipe()) filmId: string,
  ): Promise<FilmScheduleResponseDto> {
    return this.filmsService.getFilmSchedule(filmId);
  }
}
