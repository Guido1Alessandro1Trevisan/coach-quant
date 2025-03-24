"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, AudioLines } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import janeStreet from "@/public/images/brand/janestreet.png"
import coachQuant from "@/public/images/brand/coach.svg"

import { signIn } from "next-auth/react";


export function SignInModal({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => signIn("google");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogOverlay className="bg-black/30" />
      <DialogContent className="w-[325px] lg:w-[425px] py-14 flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">CoachQuant</DialogTitle>
          <DialogDescription className="text-center">Elevate your quantitative skills</DialogDescription>
        </DialogHeader>

            <Image 
                alt="Coach Quant Logo"
                src={coachQuant}
                className="w-24 h-24 text-primary self-center" />

        <div className="flex flex-col items-center justify-center space-y-4 mb-6 mt-4">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-6 h-6 text-primary" />
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">1200+ </span>
              free quant questions
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Image 
                alt="Jane Street Logo"
                src={janeStreet}
                className="w-6 h-6 text-primary" />
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">15+ </span>
              featured companies
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <AudioLines className="w-6 h-6 text-primary" />
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">AI-powered </span>
              conversational prep
            </p>
          </div>
        </div>

        <Button
          onClick={handleLogin}
          variant="outline"
          className="w-2/3 self-center h-12 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="24px"
            height="24px"
            className="mr-2"
            aria-label="Google icon"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          Sign in with Google
        </Button>

        <p className="text-xs text-center text-muted-foreground mt-4">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </DialogContent>
    </Dialog>
  )
}

