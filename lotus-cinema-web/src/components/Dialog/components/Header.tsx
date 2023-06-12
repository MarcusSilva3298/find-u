import { IoCloseOutline } from "react-icons/io5"

interface dialogHeaderProps {
  closeFunction: () => void
  title: string
}

export default function DialogHeader({
  closeFunction,
  title
}: dialogHeaderProps) {
  return (
    <div className="flex flex-row justify-between items-center text-primary-regular pb-2.5">
      <h1 className="font-bold text-2xl">{title}</h1>
      <IoCloseOutline
        className="text-3xl text-neutral-5a5 cursor-pointer"
        onClick={() => closeFunction()}
      />
    </div>
  )
}
