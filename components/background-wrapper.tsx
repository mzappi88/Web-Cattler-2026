import type React from "react"
import type { ReactNode } from "react"

interface BackgroundWrapperProps {
  children: ReactNode
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
  return (
    <div
      className="py-10 flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1631CMT20240411LIMBAL-r5oKA8G5EkZfVMbUz5LDe3rbRVZOzF.jpg')",
      }}
    >
      {children}
    </div>
  )
}

export default BackgroundWrapper
