"use client"

import { IMoviesDTO } from "@/dtos/IMoviesDTO"
import { mainApi, moviesApi } from "@/services/api"
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react"
import { toast } from "react-toastify"
import { ICheckboxes } from "../components/SideContentMenu/components/Filter"

interface MoviesContextData {
  movies: IMoviesDTO[]

  loadingMDB: boolean
  loadingList: boolean

  getMovies: () => void
  findMoviesApi: (title: string) => any
  filterMovies: (filterString: string, filters: ICheckboxes) => void
  addMovie: any
}

interface ContextType {
  children: ReactNode
}

const MoviesContext = createContext<MoviesContextData>({} as MoviesContextData)

export function MoviesProvider({ children }: ContextType) {
  const [loadingList, setLoadingList] = useState<boolean>(true)
  const [loadingMDB, setLoadingMDB] = useState<boolean>(false)
  const [movies, setMovies] = useState<IMoviesDTO[]>([])

  const getMovies = useCallback(async () => {
    setLoadingList(true)

    await mainApi
      .get("/movies")
      .then(({ data }) => setMovies(data))
      .catch((err) => {
        console.log(err)
      })

    setTimeout(() => {
      setLoadingList(false)
    }, 1000)
  }, [])

  const filterMovies = useCallback(
    async (filterString: string, filters: ICheckboxes) => {
      setLoadingList(true)

      let requestQuery = "/movies?"

      const aux_filters = Object.assign(
        Object.create(Object.getPrototypeOf(filters)),
        filters
      )
      for (let key in aux_filters) {
        if (aux_filters.hasOwnProperty(key)) {
          if (aux_filters[key]) requestQuery += `${key}=${filterString}&`
        }
      }

      await mainApi
        .get(requestQuery)
        .then(({ data }) => setMovies(data))
        .catch((err) => {
          console.log(err)
        })

      setTimeout(() => {
        setLoadingList(false)
      }, 300)
    },
    []
  )

  const findMoviesApi = useCallback(async (title: string) => {
    setLoadingMDB(true)

    let results: any[] = []

    await moviesApi
      .get<any>(`/titles/search/title/${title}`, {
        params: {
          exact: "false",
          titleType: "movie"
        }
      })
      .then(({ data }) => {
        data.results.map((result: any) => {
          results.push({
            title: result.titleText.text,
            year_of_release: result.releaseYear.year,
            image_url: result.primaryImage.url
          })
        })
      })
      .catch((err) => console.log(err))

    setLoadingMDB(false)
    return results
  }, [])

  const addMovie = useCallback(async (data: any) => {
    await mainApi
      .post("/movies", {
        title: data.title,
        genre: data.genre,
        rating: data.rating,
        duration: data.duration,
        synopsis: data.synopsis,
        year_of_release: data.year_of_release,
        image_url: data.image_url,
        pg: data.pg
      })
      .then(({ data }) => console.log(data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <MoviesContext.Provider
      value={{
        loadingMDB,
        getMovies,
        movies,
        loadingList,
        filterMovies,
        findMoviesApi,
        addMovie
      }}
    >
      {children}
    </MoviesContext.Provider>
  )
}

export function useMovies() {
  const context = useContext(MoviesContext)

  if (!context)
    throw new Error("UseMovies must be used within a MoviesProvider")

  return context
}
