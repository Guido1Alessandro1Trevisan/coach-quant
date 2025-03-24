import './globals.css'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import 'katex/dist/katex.min.css'

import Header from '@/components/header'
import Footer from '@/components/footer'
import { SessionProvider } from "next-auth/react";



import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Analytics/>
      <SpeedInsights/>
      <body className={inter.className}>
        <SessionProvider>
          <Header/>
            {children}
          <Footer/>
        </SessionProvider>
      </body>
    </html>
  )
}

