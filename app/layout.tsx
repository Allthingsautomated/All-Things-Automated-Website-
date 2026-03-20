import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'All Things Automated | Smart Home Automation in Sarasota, FL',
  description: 'Premium smart home automation for Sarasota, Manatee & Charlotte Counties. Smart lighting, security cameras, climate control & full home automation.',
  openGraph: {
    title: 'All Things Automated | Smart Home Automation in Sarasota, FL',
    description: 'Premium smart home automation for Sarasota, Manatee & Charlotte Counties.',
    type: 'website',
    url: 'https://itsallthingsautomated.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Things Automated | Smart Home Automation in Sarasota, FL',
    description: 'Premium smart home automation for Sarasota, Manatee & Charlotte Counties.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-zinc-950 text-zinc-100 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
