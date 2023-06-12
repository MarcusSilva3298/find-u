import { v4 } from 'uuid';

export class Movie {
  id: string;

  title: string;

  genre: string;
  rating: string;
  duration: string;
  synopsis: string;
  year_of_release: string;
  image_url: string;
  pg: string;

  created_at: Date;
  updated_at: Date;

  constructor(
    props: Omit<Movie, 'id' | 'created_at' | 'updated_at'>,
    id?: string,
  ) {
    Object.assign(this, { props, id: id ? id : v4() });
  }
}
