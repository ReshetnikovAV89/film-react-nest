import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmScheduleResponseDto, FilmsResponseDto } from './dto/films.dto';

describe('FilmsController', () => {
  let controller: FilmsController;
  let filmsService: jest.Mocked<FilmsService>;

  beforeEach(() => {
    filmsService = {
      getFilms: jest.fn(),
      getFilmSchedule: jest.fn(),
    } as unknown as jest.Mocked<FilmsService>;

    controller = new FilmsController(filmsService);
  });

  it('should return films list from service', async () => {
    const response = {
      total: 1,
      items: [],
    } as FilmsResponseDto;

    filmsService.getFilms.mockResolvedValue(response);

    await expect(controller.getFilms()).resolves.toBe(response);
    expect(filmsService.getFilms).toHaveBeenCalledTimes(1);
  });

  it('should return film schedule by id from service', async () => {
    const filmId = '550e8400-e29b-41d4-a716-446655440000';
    const response = {
      total: 1,
      items: [],
    } as FilmScheduleResponseDto;

    filmsService.getFilmSchedule.mockResolvedValue(response);

    await expect(controller.getFilmSchedule(filmId)).resolves.toBe(response);
    expect(filmsService.getFilmSchedule).toHaveBeenCalledWith(filmId);
  });

  it('should support misspelled shedule route from service', async () => {
    const filmId = '550e8400-e29b-41d4-a716-446655440000';
    const response = {
      total: 1,
      items: [],
    } as FilmScheduleResponseDto;

    filmsService.getFilmSchedule.mockResolvedValue(response);

    await expect(controller.getFilmShedule(filmId)).resolves.toBe(response);
    expect(filmsService.getFilmSchedule).toHaveBeenCalledWith(filmId);
  });
});
