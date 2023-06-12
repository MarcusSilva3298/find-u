import { Injectable } from '@nestjs/common';
import { Movie } from '../entities/movie.entity';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { MoviesFactoryService } from './movies.factory.service';
import { MoviesQueryService } from './movies.query.service';
import { ListMoviesDto } from '../dto/list-movies.dto';

@Injectable()
export class MoviesService {
  constructor(
    private moviesFactoryService: MoviesFactoryService,
    private moviesQueryService: MoviesQueryService,
  ) {}

  create(createMovieInput: CreateMovieDto): Promise<Movie> {
    return this.moviesFactoryService.create(createMovieInput);
  }

  list(query: ListMoviesDto) {
    return this.moviesQueryService.list(query);
  }

  findOne(id: string) {
    return this.moviesQueryService.findById(id);
  }

  update(updateMovieInput: UpdateMovieDto) {
    return this.moviesFactoryService.update(updateMovieInput);
  }

  remove(id: string): Promise<Movie> {
    return this.moviesFactoryService.remove(id);
  }
}
