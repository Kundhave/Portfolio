import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kundhave S — Systems Engineer',
  description: 'Backend & AI engineer who builds production-grade distributed systems.',
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
