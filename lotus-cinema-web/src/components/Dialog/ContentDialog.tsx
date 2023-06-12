import { AnimatePresence, motion } from "framer-motion"
import { useRef, useEffect, ReactNode } from "react"
import DialogHeader from "./components/Header"

type DialogProps = {
  stepDialog?: boolean

  isOpen: boolean
  cancelClose: () => void

  headerTitle: string

  children: ReactNode
}

export default function ContentDialog({
  cancelClose,
  children,
  headerTitle,
  isOpen,
  stepDialog
}: DialogProps) {
  const contentRef = useRef(null)

  useEffect(() => {
    function handleClickOutsideDialogContent(event: any) {
      // @ts-ignore
      if (contentRef.current && !contentRef.current?.contains(event.target)) {
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
      <motion.div
        ref={contentRef}
        className="bg-white z-20 p-4 w-[720px] max-h-[880px] relative space-y-2.5"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.3 }}
      >
        <DialogHeader closeFunction={cancelClose} title={headerTitle} />

        {children}
      </motion.div>
    </AnimatePresence>
  )
}
