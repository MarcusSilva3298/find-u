import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesRepository } from './movies.repository';
import { MoviesFactoryService } from './services/movies.factory.service';
import { MoviesQueryService } from './services/movies.query.service';
import { MoviesService } from './services/movies.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MoviesController],
  providers: [
    MoviesService,
    MoviesRepository,
    MoviesFactoryService,
    MoviesQueryService,
  ],
})
export class MoviesModule {}
