"use client"

import { IoMdRefreshCircle } from "react-icons/io"
import { FaPoll, FaVoteYea } from "react-icons/fa"
import { MdLocalMovies } from "react-icons/md"
import { AiFillPlusSquare } from "react-icons/ai"
import MenuButton from "../MenuButton"
import { useMovies } from "@/context/movies"
import Filter from "./components/Filter"
import AddMoviesDialog from "../AddMoviesDialog"
import { useState } from "react"

export default function SideContentMenu() {
  const { getMovies } = useMovies()

  const [addMovieDialogShow, setAddMovieDialogShow] = useState<boolean>(false)

  function handleSetAddMovieDialogShow(value: boolean) {
    setAddMovieDialogShow(value)
  }

  return (
    <>
      <div className="hidden 2xl:flex flex-col h-fit px-4 py-6 bg-[#1C1C1C] text-white rounded gap-y-2.5 w-[400px]">
        <Filter />

        <div className="flex flex-col items-center border-b border-[#414141] pb-2 gap-y-2">
          <p className="font-bold text-xl">Menu</p>
          <div className="flex flex-row items-end gap-x-5 w-full justify-between">
            <MenuButton label="Movie List" icon={MdLocalMovies} />

            <MenuButton label="Poll List" icon={FaPoll} />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-y-2.5">
          <div className="flex flex-row justify-between gap-x-5 w-full">
            <MenuButton
              label="Refresh List"
              icon={IoMdRefreshCircle}
              onClick={getMovies}
            />

            <MenuButton
              label="Add Suggestion"
              icon={AiFillPlusSquare}
              onClick={() => handleSetAddMovieDialogShow(true)}
            />
          </div>

          <MenuButton label="Weekly Poll" icon={FaVoteYea} special="w-[50%]" />
        </div>
      </div>

      <div className="2xl:hidden flex flex-col w-fit h-fit px px-4 py-6 bg-[#1C1C1C] text-white rounded gap-y-2.5">
        <div className="flex flex-row w-full">
          <Filter />
        </div>

        <div className="flex flex-row gap-y-2">
          <div className="flex flex-row gap-x-5 w-full justify-between">
            <MenuButton label="Movie List" icon={MdLocalMovies} />

            <MenuButton label="Poll List" icon={FaPoll} />

            <MenuButton
              label="Refresh List"
              icon={IoMdRefreshCircle}
              onClick={getMovies}
            />

            <MenuButton
              label="Add Suggestion"
              icon={AiFillPlusSquare}
              onClick={() => handleSetAddMovieDialogShow(true)}
            />

            <MenuButton label="Weekly Poll" icon={FaVoteYea} />
          </div>
        </div>
      </div>

      <AddMoviesDialog
        cancelClose={() => handleSetAddMovieDialogShow(false)}
        isOpen={addMovieDialogShow}
      />
    </>
  )
}
