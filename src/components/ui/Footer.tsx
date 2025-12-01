import Link from 'next/link'
import Image from 'next/image'
import { Facebook, MessageCircle } from 'lucide-react'
import { getAuthor } from '@/actions/authorActions'

export async function Footer() {
  const author = await getAuthor()

  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center relative overflow-hidden">
                <Image
                  src="/images/logo.svg"
                  alt={author.name}
                  width={40}
                  height={40}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {author.name}
              </span>
            </Link>
            <p className="text-base-content/70 text-sm">
              {author.bio}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-base-content mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-base-content/70 hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/produits" className="text-base-content/70 hover:text-primary transition-colors">
                  Produits
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-base-content/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-base-content mb-4">Suivez-nous</h3>
            <div className="flex gap-3">
              {author.links.facebook && (
                <a
                  href={author.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-ghost hover:bg-primary/10"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {author.links.whatsapp && (
                <a
                  href={`https://wa.me/${author.links.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-ghost hover:bg-primary/10"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-base-300 mt-8 pt-8 text-center text-sm text-base-content/50">
          <p>&copy; {new Date().getFullYear()} {author.name}. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
