import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { Movie } from './entities/movie.entity';
import { ListMoviesDto } from './dto/list-movies.dto';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesRepository {
  constructor(private prisma: PrismaService) {}

  async create({
    duration,
    genre,
    rating,
    synopsis,
    title,
    year_of_release,
    image_url,
    pg,
  }: CreateMovieDto): Promise<Movie> {
    return await this.prisma.movie.create({
      data: {
        id: v4(),
        title,
        genre,
        duration,
        rating,
        synopsis,
        year_of_release,
        image_url,
        pg,
      },
    });
  }

  async list(query: ListMoviesDto): Promise<Movie[]> {
    const filtros = [];

    const aux_query = Object.assign(
      Object.create(Object.getPrototypeOf(query)),
      query,
    );
    for (const key in aux_query) {
      if (aux_query.hasOwnProperty(key)) {
        if (aux_query[key])
          filtros.push({
            [`${key}`]: { contains: aux_query[key], mode: 'insensitive' },
          });
      }
    }

    return await this.prisma.movie.findMany({
      orderBy: { created_at: 'desc' },
      where: filtros.length > 0 ? { OR: filtros } : {},
    });
  }

  async remove(id: string): Promise<Movie> {
    return await this.prisma.movie.delete({
      where: { id },
    });
  }

  async findByTitle(title: string): Promise<Movie> {
    return await this.prisma.movie.findUnique({
      where: { title },
    });
  }

  async findById(id: string): Promise<Movie> {
    return await this.prisma.movie.findUnique({
      where: { id },
    });
  }

  async update({
    title,
    duration,
    genre,
    id,
    rating,
    synopsis,
    year_of_release,
  }: any): Promise<Movie> {
    return await this.prisma.movie.update({
      where: { id },
      data: { title, duration, genre, rating, synopsis, year_of_release },
    });
  }
}
