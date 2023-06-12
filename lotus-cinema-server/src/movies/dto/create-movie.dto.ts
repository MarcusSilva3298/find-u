import { IsNotEmpty, IsString } from 'class-validator';

export abstract class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  genre?: string;

  @IsString()
  rating?: string;

  @IsString()
  duration?: string;

  @IsString()
  synopsis?: string;

  @IsString()
  year_of_release?: string;
}
