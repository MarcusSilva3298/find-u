"use client"

import { IMoviesDTO } from "@/dtos/IMoviesDTO"
import { mainApi } from "@/services/api"
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
  loadingList: boolean

  getMovies: () => void
  filterMovies: (filterString: string, filters: ICheckboxes) => void
}

interface ContextType {
  children: ReactNode
}

const MoviesContext = createContext<MoviesContextData>({} as MoviesContextData)

export function MoviesProvider({ children }: ContextType) {
  const [loadingList, setLoadingList] = useState<boolean>(true)
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

  return (
    <MoviesContext.Provider
      value={{ getMovies, movies, loadingList, filterMovies }}
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
