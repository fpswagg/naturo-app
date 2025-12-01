import type { Metadata } from 'next'
import './globals.css'
import { getAuthor } from '@/actions/authorActions'

export async function generateMetadata(): Promise<Metadata> {
  const author = await getAuthor()
  
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    title: {
      default: `${author.name} - Produits Naturels`,
      template: `%s | ${author.name}`
    },
    description: author.bio || 'Découvrez notre sélection de produits naturels pour votre bien-être. Des produits sélectionnés avec soin pour une vie plus saine.',
    keywords: ['produits naturels', 'bien-être', 'santé', 'bio', author.name.toLowerCase()],
    authors: [{ name: author.name }],
    openGraph: {
      title: `${author.name} - Produits Naturels`,
      description: author.bio || 'Découvrez notre sélection de produits naturels pour votre bien-être.',
      type: 'website',
      locale: 'fr_FR',
      images: [
        {
          url: '/images/logo.svg',
          width: 512,
          height: 512,
          alt: author.name,
        }
      ]
    },
    icons: {
      icon: '/images/logo.svg',
      apple: '/images/logo.svg',
    },
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
