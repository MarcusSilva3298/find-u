import SideContentMenu from "@/components/SideContentMenu/SideContentMenu"
import { AiFillInfoCircle } from "react-icons/ai"
import { GiLotus } from "react-icons/gi"

export default function HomeLayout({ children }: any) {
  return (
    <>
      <>
        <div className="flex flex-row bg-[#C71585] fixed z-50 top-0 h-10 w-[100%] py-2 px-10 justify-between content-center">
          <div className="flex flex-row gap-x-2 items-center font-bold">
            <GiLotus className="text-2xl text-white-f5" />
            <p>Lotus Cinema</p>
          </div>
          <p>Entrar e Perfil</p>
        </div>
        <div className="flex fixed top-14 left-5 p-2 bg-[#1C1C1C] rounded hover:bg-[#2e2e2e]">
          <AiFillInfoCircle className="text-white-f5 text-xl hover:text-[#fcfafa]" />
        </div>
        <div className="flex flex-col fixed top-20 right-[9rem]">
          <SideContentMenu />
        </div>
      </>
      <div className="mt-10 h-[calc(100vh-2.5rem)] bg-[#3a3a3a] overflow-y-auto">
        {children}
      </div>
    </>
  )
}
