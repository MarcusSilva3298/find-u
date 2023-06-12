import { useForm } from "react-hook-form"
import FormDialog from "./Dialog/FormDialog"
import { IoCloseOutline } from "react-icons/io5"
import { BiSearchAlt2 } from "react-icons/bi"
import { useState, useEffect } from "react"
import { useMovies } from "@/context/movies"
import { AiOutlineCheck } from "react-icons/ai"
import Image from "next/image"
import Loading from "./Loading"

interface addMoviesDialogProps {
  cancelClose: () => void
  isOpen: boolean
}

export default function AddMoviesDialog({
  cancelClose,
  isOpen
}: addMoviesDialogProps) {
  const { findMoviesApi, addMovie, getMovies, loadingMDB } = useMovies()
  const { register, handleSubmit, reset } = useForm()

  const [filterString, setFilterString] = useState<string>("")
  const [filterActive, setFilterActive] = useState<boolean>()
  const [movies, setMovies] = useState<any>([])
  const [movieData, setMovieData] = useState<any>({})
  const [focusMovieList, setFocusMovieList] = useState<boolean>(false)

  async function handleSearchMovies(event: any) {
    event.preventDefault()
    setMovies(await findMoviesApi(filterString))
    setFocusMovieList(true)
  }

  function handleFilterString(value: string) {
    setFilterString(value)
  }

  function handleResetFilter() {
    setFilterString("")
    setMovies([])
  }

  function handleSaveMovie(formData: any) {
    addMovie(formData).then(() => {
      getMovies()
      cancelClose()
    })
    setMovieData({})
  }

  function handleSelectMovie(movie: any) {
    setMovieData(movie)
    setFocusMovieList(false)
    setFilterString("")
  }

  useEffect(() => {
    switch (filterString) {
      case "":
        setFilterActive(false)
        break

      default:
        setFilterActive(true)
        break
    }
  }, [filterString])

  useEffect(() => {
    if (movieData.title !== undefined) {
      reset({
        title: movieData.title,
        year_of_release: movieData.year_of_release,
        image_url: movieData.image_url,
        pg: "",
        genre: "",
        rating: "",
        duration: "",
        synopsis: ""
      })
    } else {
      reset({
        title: "",
        year_of_release: "",
        image_url: "",
        pg: "",
        genre: "",
        rating: "",
        duration: "",
        synopsis: ""
      })
    }
  }, [movieData])

  return (
    <FormDialog
      cancelClose={cancelClose}
      headerTitle="Add Movie Suggestion"
      isOpen={isOpen}
    >
      <div className="flex flex-col gap-y-2.5">
        <div className="flex flex-col pb-2.5 border-b border-white-f5 gap-y-2.5">
          <form className="relative w-full " onSubmit={handleSearchMovies}>
            <input
              type="text"
              placeholder="Search Title on Movies Database"
              value={filterString}
              className="py-1 pl-3 pr-[4rem] w-full rounded bg-white outline-none focus:ring-2 focus:ring-blue-200 text-black"
              onChange={(e) => handleFilterString(e.target.value)}
            />

            <div className="absolute flex flex-row right-[0.5rem] top-[0.3rem] text-2xl text-black gap-x-1">
              <IoCloseOutline
                className={!filterActive ? "hidden" : "cursor-pointer"}
                onClick={() => handleResetFilter()}
              />

              <BiSearchAlt2
                className="cursor-pointer"
                onClick={handleSearchMovies}
              />
            </div>
          </form>

          <div className="flex flex-row flex-wrap gap-x-5 gap-y-2 max-h-[20rem] overflow-y-auto justify-center items-center">
            {loadingMDB ? (
              <Loading />
            ) : !focusMovieList ? null : movies.length > 0 ? (
              movies.map((movie: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex flex-row w-[20rem] h-[10rem] cursor-pointer items-center p-1 gap-x-2 rounded hover:bg-[#2e2e2e]"
                    onClick={() => handleSelectMovie(movie)}
                  >
                    <Image
                      src={movie.image_url}
                      width={100}
                      height={64}
                      alt="movie image"
                    />
                    <p>
                      {movie.title}
                      <br />
                      {movie.year_of_release}
                    </p>
                  </div>
                )
              })
            ) : (
              <p>No movie found</p>
            )}
          </div>
        </div>

        {movieData.title === undefined ? null : (
          <div className="flex flex-row w-full justify-center items-center">
            <p>
              Provide the rest of the data searching on{" "}
              <a
                className="font-bold text-blue-400 hover:underline"
                href={`https://www.imdb.com/find/?q=${movieData.title}`}
                target="_blank"
              >
                IDMB
              </a>
            </p>
          </div>
        )}

        <form
          className="flex flex-col gap-y-2 text-black"
          onSubmit={handleSubmit(handleSaveMovie)}
        >
          <input
            placeholder="Title"
            className="w-full rounded py-1 px-2"
            {...register("title", {
              required: true
            })}
          />

          <div className="flex flex-row gap-x-2">
            <input
              placeholder="Genre"
              className="w-full rounded py-1 px-2"
              {...register("genre", { required: true })}
            />
            <input
              placeholder="Rating"
              className="w-full rounded py-1 px-2"
              {...register("rating", { required: true })}
            />
          </div>

          <div className="flex flex-row gap-x-2">
            <input
              placeholder="Duration"
              className="w-full rounded py-1 px-2"
              {...register("duration", { required: true })}
            />
            <input
              placeholder="Year of release"
              className="w-full rounded py-1 px-2"
              {...register("year_of_release", {
                required: true
              })}
            />
            <input
              placeholder="PG"
              className="w-full rounded py-1 px-2"
              {...register("pg", { required: true })}
            />
            <input
              // placeholder="image_url"
              className="hidden"
              {...register("image_url", {
                required: true
              })}
            />
          </div>

          <input
            placeholder="Synopsis"
            className="flex w-full rounded py-1 px-2 h-20 justify-start items-start flex-wrap"
            {...register("synopsis")}
          />

          <div className="flex flex-row justify-end items-center gap-x-2.5 pt-2.5">
            <button
              type="button"
              className="flex p-2 text-red-500 hover:underline items-center justify-center cursor pointer"
              onClick={cancelClose}
            >
              <p>Cancelar</p>
            </button>

            <button
              type="submit"
              className="flex flex-row py-2 px-2 rounded items-center justify-center gap-x-1 cursor-pointer transition ease hover:scale-95 active:scale-90 select-none bg-green-700"
            >
              <p>Confirm</p>
              <AiOutlineCheck />
            </button>
          </div>
        </form>
      </div>
    </FormDialog>
  )
}
