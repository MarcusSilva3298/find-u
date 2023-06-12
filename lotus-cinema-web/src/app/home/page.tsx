"use client"

import MoviesList from "@/components/MoviesList"
import { useMovies } from "@/context/movies"
import { useEffect } from "react"

export default function HomePage() {
  const { movies, getMovies } = useMovies()

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <main className="flex flex-col h-full w-full pt-10 items-center">
      <MoviesList movies={movies} />
    </main>
  )
}
