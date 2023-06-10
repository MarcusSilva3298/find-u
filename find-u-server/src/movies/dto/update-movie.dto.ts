import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
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
