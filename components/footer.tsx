"use client"

import { useState } from "react"
import coach from "@/public/images/brand/coach.svg"
import Image from "next/image"
import Link from "next/link"
import { ButtonWindow } from "./button-window"
import InstaIcon from "@/public/images/brand/instagram.svg"
import XIcon from "@/public/images/brand/x.svg"



export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-400 px-4 py-8 border-t-2 border-slate-200 md:px-8 lg:px-40">
      <div className="flex flex-col space-y-8 md:flex-row md:items-start md:justify-between md:space-y-0">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex flex-row items-center">
            <Image
              className="w-[60px] h-[60px]"
              src={coach || "/placeholder.svg"}
              alt="Voice Mode"
              width={300}
              height={300}
            />
            <h1 className="text-3xl font-medium">CoachQuant</h1>
          </div>
          <div className="mt-4 space-x-4 text-center md:text-left">
            <Link href="/privacy" className="text-sm text-slate-700 hover:text-slate-900">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-slate-700 hover:text-slate-900">
              Terms of Service
            </Link>
          </div>
          <div className="mt-2 text-sm text-slate-700 text-center md:text-left">
            &copy; {currentYear} CoachQuant. All rights reserved.
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start gap-2 w-full md:w-auto">
          <h2 className="text-xl font-semibold text-slate-700">Stay Updated</h2>

          <div className="flex flex-row items-center justify-center md:justify-start gap-3 mt-1">
            <ButtonWindow url="https://www.linkedin.com/company/coachquant">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-8 h-8 md:w-9 md:h-9">
                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
              </svg>
            </ButtonWindow>
            <ButtonWindow url="https://www.youtube.com/@CoachQuant">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-8 h-8 md:w-9 md:h-9 mt-[6px]">
                <path d="M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z"></path>
              </svg>
            </ButtonWindow>
            <ButtonWindow url="mailto:coachquant203@gmail.com">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-8 h-8 md:w-9 md:h-9 mt-[6px]"
              >
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"></path>
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"></path>
              </svg>
            </ButtonWindow>
            <ButtonWindow url="https://x.com/RealCoachQuant">
            <Image
              className="w-[28px] h-[28px] mt-1"
              src={XIcon}
              alt="Voice Mode"
              width={24}
              height={24}
            />
            </ButtonWindow>
            <ButtonWindow url="https://www.instagram.com/coachquant/">
            <Image
              className="w-[35px] h-[35px] mt-1"
              src={InstaIcon}
              alt="Voice Mode"
              width={24}
              height={24}
            />
            </ButtonWindow>
          </div>
        </div>
      </div>
    </footer>
  )
}

