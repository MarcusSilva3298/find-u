import { v4 } from 'uuid';

export class Movie {
  id: string;

  title: string;

  genre?: string;
  rating?: string;
  duration?: string;
  synopsis?: string;
  year_of_release?: string;

  created_at?: Date;
  updated_at?: Date;

  constructor(props: Omit<Movie, 'id'>, id?: string) {
    Object.assign(this, { props, id: id ? id : v4() });
  }
}
