import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin | All Things Automated',
  robots: { index: false, follow: false },
}

// Standalone layout — no site nav or footer
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
