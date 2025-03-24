"use client"
import Image from "next/image"
import WaveformSvg from "@/public/images/brand/waveform.svg"


import { useSession } from "next-auth/react"
import { useState, useEffect, useCallback } from "react"
import { Notification } from "./notification"

import AudioWaveform from "./audio-waveform"


export default function WaveForm() {
    const { data: session } = useSession()
    const [showNotification, setShowNotification] = useState(false)
    const [notificationMessage, setNotificationMessage] = useState("")
    const [notificationIcon, setNotificationIcon] = useState<"alert" | "megaphone">("alert")
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
    const [activeVote, setActiveVote] = useState<"thumbsUp" | "thumbsDown" | null>(null)
    const [isCompleted, setIsCompleted] = useState(false)
  
    const handleVote = useCallback(
      (vote: "thumbsUp" | "thumbsDown") => {
        if (!session) {
          showNotificationWithTimer("Please sign in to save progress", "alert")
        } else {
          setActiveVote((prevVote) => (prevVote === vote ? null : vote))
        }
      },
      [session],
    )
  
    const handleCompletion = useCallback(() => {
      if (!session) {
        showNotificationWithTimer("Please sign in to save progress", "alert")
      } else {
        setIsCompleted((prev) => !prev)
      }
    }, [session])
  
    const showNotificationWithTimer = useCallback(
      (message: string, icon: "alert" | "megaphone") => {
        setNotificationMessage(message)
        setNotificationIcon(icon)
        setShowNotification(true)
  
        if (timer) {
          clearTimeout(timer)
        }
  
        const newTimer = setTimeout(() => {
          setShowNotification(false)
        }, 3000)
  
        setTimer(newTimer)
      },
      [timer],
    )
  
    const handleCloseNotification = useCallback(() => {
      setShowNotification(false)
      if (timer) {
        clearTimeout(timer)
      }
    }, [timer])

    const handleVoiceFeatureClick = useCallback(() => {
        if (session) {
          showNotificationWithTimer("Interview Simulation Coming Soon", "megaphone")
        } else {
          showNotificationWithTimer("Please sign in to save progress", "alert")
        }
      }, [session, showNotificationWithTimer])

      
  return (
    <div onClick={handleVoiceFeatureClick} className="cursor-pointer">
        <AudioWaveform/>
        <Notification
        message={notificationMessage}
        isVisible={showNotification}
        onClose={handleCloseNotification}
      />
    </div>
  )
}
