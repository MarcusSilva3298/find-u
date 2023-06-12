import { IsNotEmpty, IsString } from 'class-validator';

export abstract class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsString()
  @IsNotEmpty()
  rating: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsString()
  @IsNotEmpty()
  synopsis: string;

  @IsString()
  @IsNotEmpty()
  year_of_release: string;

  @IsString()
  @IsNotEmpty()
  image_url: string;

  @IsString()
  @IsNotEmpty()
  pg: string;
}
