// src/app/layout.js
import './globals.css'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ 
  subsets: ['latin'], 
  weight: ['300', '400', '700'],
  display: 'swap' 
})

export const metadata = {
  title: 'Abhishek Anand - Portfolio',
  description: 'Portfolio website of Abhishek Anand',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}