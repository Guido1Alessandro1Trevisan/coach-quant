"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { SignInModal } from "./sign-in-modal"
import coach from "@/public/images/brand/coach.svg"
import { useSession, signOut } from "next-auth/react"
import { ButtonWindow } from "./button-window"
import XIcon from "@/public/images/brand/github.svg"


// Helper function to get the user's initials
function getInitials(name: string): string {
  const names = name.split(" ")
  const initials = names
    .map((n) => n[0])
    .join("")
    .toUpperCase()
  return initials
}

export default function Header() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
  const { data: session } : { data: any } = useSession();
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => setShowDropdown(true)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <>
    <div className="w-full bg-slate-700 text-neutral-300 flex items-center justify-between lg:justify-center lg:py-3 py-2 px-4 ">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lg:mr-2"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
          <path d="m18 15-2-2" />
          <path d="m15 18-2-2" />
        </svg>
        <span className="ml-2 text-xs lg:hidden">Help us out!</span>
      </div>
      <Link href="/submit" className="flex items-center justify-end text-right">
        <span className="hidden lg:inline text-sm">
          Help us out! Submit questions from your quant interviews <u className="ml-[1px]">here</u>
        </span>
        <span className="lg:hidden text-xs">
          Submit quant interview questions <u className="ml-[1px]">here</u>
        </span>
      </Link>
    </div>




    <header className="h-full px-2 lg:px-20 flex flex-row bg-slate-400 py-4 items-center justify-between border-b-2 border-slate-200">
      <div className="flex flex-row items-center">
        <Link href="/" className="flex flex-row items-center">
          <Image
            className="w-[60px] h-[60px]"
            src={coach || "/placeholder.svg"}
            alt="Voice Mode"
            width={300}
            height={300}
          />
          <h1 className="text-3xl font-medium">CoachQuant</h1>
        </Link>

        <ButtonWindow url="https://github.com/Guido1Alessandro1Trevisan/coach-quant">
          <Image
              className="w-[28px] h-[28px] ml-4 lg:block md:block hidden"
              src={XIcon}
              alt="Voice Mode"
              width={24}
              height={24}
            />
        </ButtonWindow>

      </div>

      {session ? (
        <div className="relative" onMouseEnter={handleMouseEnter} ref={dropdownRef}>
          <div className="rounded-full bg-gray-700 w-10 h-10 flex items-center justify-center text-xl font-medium text-neutral-300 cursor-pointer">
            {session.user.name ? getInitials(session.user.name) : "?"}
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-2 px-2">
              <div className="px-4 py-2 text-gray-800">{session.user.name}</div>
              <button
                onClick={() => {
                  signOut()
                  setShowDropdown(false)
                }}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setIsSignInModalOpen(true)}
          className="rounded-md bg-gray-700 px-4 lg:px-6 py-2 text-md lg:text-xl font-medium text-neutral-300 shadow-md hover:bg-gray-600 transition-colors"
        >
          Sign In
        </button>
      )}

      <SignInModal isOpen={isSignInModalOpen} setIsOpen={setIsSignInModalOpen} />
    </header>
    </>
  )
}
