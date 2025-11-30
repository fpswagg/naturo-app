import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Naturo - Produits Naturels',
    template: '%s | Naturo'
  },
  description: 'Découvrez notre sélection de produits naturels pour votre bien-être. Des produits sélectionnés avec soin pour une vie plus saine.',
  keywords: ['naturo', 'produits naturels', 'bien-être', 'santé', 'bio'],
  authors: [{ name: 'Naturo' }],
  openGraph: {
    title: 'Naturo - Produits Naturels',
    description: 'Découvrez notre sélection de produits naturels pour votre bien-être.',
    type: 'website',
    locale: 'fr_FR'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" data-theme="naturo">
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  )
}
