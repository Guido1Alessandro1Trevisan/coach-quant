import { useState, useEffect } from "react"
import { CircleAlert } from "lucide-react"

interface NotificationProps {
  message: string
  isVisible: boolean
  onClose: () => void
}

export function Notification({ message, isVisible, onClose }: NotificationProps) {
  const [isRendered, setIsRendered] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setIsRendered(true)
    } else {
      const timer = setTimeout(() => setIsRendered(false), 300) // Match transition duration
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  if (!isRendered) return null

  return (
    <div
      className={`fixed bottom-4 right-4 bg-slate-700 text-md px-4 py-2 lg;text-xl text-white lg:px-8 lg:py-4 flex rounded-md shadow-lg transition-all duration-300 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
      role="alert"
    >

      <button
        onClick={onClose}
        className="absolute top-1 right-1 text-white hover:text-gray-200 transition-colors duration-200"
        aria-label="Close notification"
      >

      </button>
      <CircleAlert className="mr-2"/>
      {message}
    </div>
  )
}

