import { Carattere } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: 'Tersine Beyin Göçü',
  description: 'Tersine Beyin Göçü',
}

const carattere = Carattere({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className={carattere.className}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
