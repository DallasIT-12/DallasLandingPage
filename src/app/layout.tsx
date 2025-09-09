import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dallas Company',
  description: 'Dallas Company Landing Page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}