import { IMoviesDTO } from "@/dtos/IMoviesDTO"
import Image from "next/image"
import { AiFillStar } from "react-icons/ai"

interface movieCardProps {
  movie: IMoviesDTO
}

export default function MovieCard({ movie }: movieCardProps) {
  return (
    <div className="flex flex-col p-2 bg-[#1C1C1C] text-white-f5 rounded">
      <div className="flex flex-row max-h-[244px] max-w-[657px] justify-center">
        <Image
          src={movie.image_url}
          alt="Image"
          width={165}
          height={244}
          className="border-2 border-black self-center"
        />

        <div className="flex flex-col ml-4 space-y-4">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col space-y-0.5">
              <h1 className="text-2xl">{movie.title}</h1>

              <div className="flex flex-row space-x-2">
                <p>{movie.year_of_release}</p>
                <p>{movie.pg}</p>
                <p>{movie.duration}</p>
              </div>

              <div className="flex flex-row space-x-2">{movie.genre}</div>
            </div>

            <div className="flex flex-row">
              <AiFillStar className="mt-1 text-yellow-400" />
              <p className="ml-2">{movie.rating}</p>
            </div>
          </div>

          <p className="overflow-hidden overflow-ellipsis">{movie.synopsis}</p>
        </div>
      </div>
    </div>
  )
}
