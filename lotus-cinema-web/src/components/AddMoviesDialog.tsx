import { useForm } from "react-hook-form"
import FormDialog from "./Dialog/FormDialog"
import { IoCloseOutline } from "react-icons/io5"
import { BiSearchAlt2 } from "react-icons/bi"
import { useState, useEffect } from "react"
import { useMovies } from "@/context/movies"
import { AiOutlineCheck } from "react-icons/ai"
import Image from "next/image"

interface addMoviesDialogProps {
  cancelClose: () => void
  isOpen: boolean
}

export default function AddMoviesDialog({
  cancelClose,
  isOpen
}: addMoviesDialogProps) {
  const { findMoviesApi, addMovie, getMovies } = useMovies()
  const { register, handleSubmit } = useForm()

  const [filterString, setFilterString] = useState<string>("")
  const [filterActive, setFilterActive] = useState<boolean>()
  const [movies, setMovies] = useState<any>([])

  async function handleSearchMovies(event: any) {
    event.preventDefault()
    setMovies(await findMoviesApi(filterString))
  }

  function handleFilterString(value: string) {
    setFilterString(value)
  }

  function handleResetFilter() {
    setFilterString("")
  }

  function handleSaveMovie(formData: any) {
    console.log(formData)
    addMovie(formData).then(() => {
      getMovies()
      cancelClose()
    })
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
              placeholder="Search on Movies Database"
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

          <div className="flex flex-row flex-wrap gap-x-5 gap-y-2 max-h-[20rem] overflow-y-auto">
            {movies.length > 0
              ? movies.map((movie: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="w-[9.375rem] cursor-pointer border-[1px] p-1"
                    >
                      <Image
                        src={movie.image_url}
                        width={64}
                        height={64}
                        alt="movie image"
                      />
                      <p>{movie.title}</p>
                      <p>{movie.year_of_release}</p>
                    </div>
                  )
                })
              : null}
          </div>
        </div>

        <form
          className="flex flex-col gap-y-2 text-black"
          onSubmit={handleSubmit(handleSaveMovie)}
        >
          <input
            placeholder="Title"
            className="w-full rounded py-1 px-2"
            {...register("title")}
          />

          <div className="flex flex-row gap-x-2">
            <input
              placeholder="Genre"
              className="w-full rounded py-1 px-2"
              {...register("genre")}
            />
            <input
              placeholder="Rating"
              className="w-full rounded py-1 px-2"
              {...register("rating")}
            />
          </div>

          <div className="flex flex-row gap-x-2">
            <input
              placeholder="Duration"
              className="w-full rounded py-1 px-2"
              {...register("duration")}
            />
            <input
              placeholder="Year of release"
              className="w-full rounded py-1 px-2"
              {...register("year_of_release")}
            />
          </div>

          <input
            placeholder="Synopsis"
            className="flex w-full rounded py-1 px-2 h-20 justify-start items-start flex-wrap"
            {...register("synopsis")}
          />

          <div className="flex flex-row justify-end items-center gap-x-2.5 pt-2.5">
            <button
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
