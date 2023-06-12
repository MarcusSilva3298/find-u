import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
