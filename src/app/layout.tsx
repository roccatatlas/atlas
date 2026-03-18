import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'RunAtlas — Navigate the AI Universe',
  description: 'Discover, compare, and deploy the best AI tools. Build powerful AI stacks and ship faster.',
  keywords: ['AI tools', 'AI stack', 'ChatGPT', 'Midjourney', 'AI discovery'],
  openGraph: {
    title: 'RunAtlas — Navigate the AI Universe',
    description: 'Discover, compare, and deploy the best AI tools.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-black text-white antialiased font-sans min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
