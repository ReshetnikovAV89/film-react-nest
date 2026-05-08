import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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
}