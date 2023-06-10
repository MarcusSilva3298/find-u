"use client"

import Loading from "@/components/Loading"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push("/home")
  }, [])

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-[#3a3a3a]">
      <Loading />
    </div>
  )
}
