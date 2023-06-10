import { BadRequestException, Injectable } from '@nestjs/common';
import { Movie } from '../entities/movie.entity';
import { MoviesRepository } from '../movies.repository';
import { MoviesQueryService } from './movies.query.service';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';

@Injectable()
export class MoviesFactoryService {
  constructor(
    private moviesRepository: MoviesRepository,
    private moviesQueryService: MoviesQueryService,
  ) {}

  async create(createMovieInput: CreateMovieDto): Promise<Movie> {
    const { title } = createMovieInput;

    if (await this.moviesRepository.findByTitle(title))
      throw new BadRequestException(`Title: ${title} is already in use`);

    return this.moviesRepository.create(createMovieInput);
  }

  async remove(id: string): Promise<Movie> {
    await this.moviesQueryService.findById(id);

    return this.moviesRepository.remove(id);
  }

  async update(updateMovieInput: UpdateMovieDto): Promise<Movie> {
    const { id, title } = updateMovieInput;

    await this.moviesQueryService.findById(id);

    if (title) {
      const titleInUse = await this.moviesRepository.findByTitle(title);

      if (titleInUse)
        throw new BadRequestException(`Title: ${title} already in use`);
    }

    return this.moviesRepository.update(updateMovieInput);
  }
}
