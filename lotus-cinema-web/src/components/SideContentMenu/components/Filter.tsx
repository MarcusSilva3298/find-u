"use client"

import { useState, useEffect } from "react"
import { AiFillFilter } from "react-icons/ai"
import { BiSearchAlt2 } from "react-icons/bi"
import { IoCloseOutline } from "react-icons/io5"
import Checkbox from "../../FormComponents/Checkbox"
import { useMovies } from "../../../context/movies"

export interface ICheckboxes {
  title: boolean
  genre: boolean
  year_of_release: boolean
  synopsis: boolean
  duration: boolean
}

export default function Filter() {
  const { filterMovies, getMovies } = useMovies()

  const [filterString, setFilterString] = useState<string>("")
  const [filterActive, setFilterActive] = useState<boolean>()
  const [advancedFilter, setAdvancedFilter] = useState<boolean>(false)
  const [checkboxes, setCheckboxes] = useState<ICheckboxes>({
    genre: true,
    synopsis: true,
    duration: true,
    title: true,
    year_of_release: true
  })

  function setAllCheckboxes(value: boolean): void {
    const newCheckboxes = Object.assign(
      Object.create(Object.getPrototypeOf(checkboxes)),
      checkboxes
    )

    for (const key in newCheckboxes) {
      if (newCheckboxes.hasOwnProperty(key)) {
        newCheckboxes[key] = value
      }
    }

    setCheckboxes(newCheckboxes)
  }

  function setOneChecbox(key: string, value: boolean) {
    const newCheckboxes = Object.assign(
      Object.create(Object.getPrototypeOf(checkboxes)),
      checkboxes
    )

    if (newCheckboxes.hasOwnProperty(key)) {
      newCheckboxes[key] = value
    }

    setCheckboxes(newCheckboxes)
  }

  function handleFilterString(value: string) {
    setFilterString(value)
  }

  function handleResetFilter() {
    setFilterString("")
    getMovies()
  }

  function handleAdvancedFilter() {
    setAdvancedFilter(!advancedFilter)
  }

  function handleFilterMovies(event: any) {
    event.preventDefault()
    filterMovies(filterString, checkboxes)
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
    if (advancedFilter) {
      setAllCheckboxes(false)
    } else {
      setAllCheckboxes(true)
    }
  }, [advancedFilter])

  return (
    <div className="flex flex-col border-b border-[#414141] gap-y-2 pb-2">
      <div className="flex flex-row gap-x-2">
        <form className="relative" onSubmit={handleFilterMovies}>
          <input
            type="text"
            placeholder="Search"
            value={filterString}
            className="py-1 pl-3 pr-[4rem] w-full rounded bg-white outline-none focus:ring-2 focus:ring-blue-200 text-black"
            onChange={(e) => handleFilterString(e.target.value)}
          />

          <div className="absolute flex flex-row right-[0.5rem] top-[0.3rem] text-2xl text-black gap-x-1">
            <IoCloseOutline
              className={!filterActive ? "hidden" : "cursor-pointer"}
              onClick={() => handleResetFilter()}
            />

            <BiSearchAlt2 />
          </div>
        </form>

        <div
          className="flex flex-row justify-center items-center rounded p-1 hover:bg-[#2e2e2e] space-x-1 cursor-pointer"
          onClick={handleAdvancedFilter}
        >
          <AiFillFilter />
          <p>Filters</p>
        </div>
      </div>

      <div
        className={
          (advancedFilter ? "flex" : "hidden") +
          "  flex-row flex-wrap justify-center items-center gap-x-4"
        }
      >
        <Checkbox
          label="Title"
          onChange={() => setOneChecbox("title", !checkboxes.title)}
          checked={checkboxes.title}
        />
        <Checkbox
          label="Genre"
          onChange={() => setOneChecbox("genre", !checkboxes.genre)}
          checked={checkboxes.genre}
        />
        <Checkbox
          label="Year of Release"
          onChange={() =>
            setOneChecbox("year_of_release", !checkboxes.year_of_release)
          }
          checked={checkboxes.year_of_release}
        />
        <Checkbox
          label="Synopsis"
          onChange={() => setOneChecbox("synopsis", !checkboxes.synopsis)}
          checked={checkboxes.synopsis}
        />
        <Checkbox
          label="Duration"
          onChange={() => setOneChecbox("duration", !checkboxes.duration)}
          checked={checkboxes.duration}
        />
      </div>
    </div>
  )
}
