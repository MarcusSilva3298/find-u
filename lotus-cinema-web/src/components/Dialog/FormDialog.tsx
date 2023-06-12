import { AnimatePresence, motion } from "framer-motion"
import { useRef, useEffect, ReactNode } from "react"
import DialogHeader from "./components/Header"

type DialogProps = {
  isOpen: boolean
  cancelClose: () => void

  headerTitle: string

  children: ReactNode
}

export default function FormDialog({
  cancelClose,
  children,
  headerTitle,
  isOpen
}: DialogProps) {
  const contentRef = useRef(null)

  useEffect(() => {
    function handleClickOutsideDialogContent(event: any) {
      // @ts-ignore
      if (contentRef.current && !contentRef.current?.contains(event.target)) {
        console.log()
        cancelClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutsideDialogContent)

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDialogContent)
    }
  }, [isOpen, cancelClose])

  return (
    <AnimatePresence>
      {!isOpen ? null : (
        <div className="fixed z-10 inset-0 flex items-center justify-center bg-[#3a3a3a] bg-opacity-75">
          <motion.div
            ref={contentRef}
            className="bg-[#1C1C1C] text-white-f5 z-20 p-4 w-[720px] max-h-[880px] relative space-y-2.5"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DialogHeader closeFunction={cancelClose} title={headerTitle} />

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
