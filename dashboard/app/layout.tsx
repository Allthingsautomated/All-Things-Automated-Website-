import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Dashboard - Account Settings",
  description: "Manage your account settings and subscription",
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
