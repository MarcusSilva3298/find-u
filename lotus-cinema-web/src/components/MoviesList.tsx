import MovieCard from "./MovieCard"
import { IMoviesDTO } from "../dtos/IMoviesDTO"
import { useMovies } from "@/context/movies"
import Loading from "./Loading"

interface movieListProps {
  movies: IMoviesDTO[]
}

export default function MoviesList({ movies }: movieListProps) {
  const { loadingList } = useMovies()

  return (
    <div className="flex flex-col gap-y-2.5 pr-2">
      {loadingList ? (
        <Loading />
      ) : (
        movies.map((movie, index) => (
          <MovieCard key={`${movie.id} - index`} movie={movie} />
        ))
      )}
    </div>
  )
}
