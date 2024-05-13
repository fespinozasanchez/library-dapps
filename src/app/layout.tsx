import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './provider'

export const metadata: Metadata = {
  title: {
    default: 'Biblioteca Informática, Universidad Católica de Temuco',
    template: '%s | Biblioteca Informática, Universidad Católica de Temuco'
  },
  description: 'Biblioteca Informática, Universidad Católica de Temuco',
  twitter: {
    card: 'summary_large_image'
  }
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="dark">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
