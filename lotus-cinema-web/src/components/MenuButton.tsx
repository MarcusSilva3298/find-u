import { IconType } from "react-icons"

interface menuButtonProps {
  label: string
  icon: IconType

  type?: "regular" | "disabled" | "active"
  special?: string

  onClick?: () => void
}

export default function MenuButton(props: menuButtonProps) {
  const { label, special, type = "regular", onClick } = props

  function buttonStyle() {
    let style =
      special +
      " flex flex-row py-2 rounded items-center justify-center gap-x-3 h-full w-full cursor-pointer transition ease hover:scale-95 active:scale-90 select-none "

    switch (type) {
      case "active":
        style += "bg-blue-500"
        break

      case "disabled":
        style += "bg-[#DFE2EB] text-[#A7ABB3]"
        break

      default:
        style += "bg-slate-600"
        break
    }

    return style
  }

  return (
    <div className={buttonStyle()} onClick={onClick}>
      <props.icon className="text-2xl" />
      <p className="">{label}</p>
    </div>
  )
}
