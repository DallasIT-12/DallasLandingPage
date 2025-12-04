import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '../context/CartContext'
import CartModal from '../components/cart/CartModal'

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
      <body>
        <CartProvider>
          {children}
          <CartModal />
        </CartProvider>
      </body>
    </html>
  )
}