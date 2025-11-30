import Link from 'next/link'
import { Leaf, Instagram, Globe, MessageCircle } from 'lucide-react'
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
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Naturo
              </span>
            </Link>
            <p className="text-base-content/70 text-sm">
              Produits naturels sélectionnés avec soin pour votre bien-être quotidien.
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
              {author.links.instagram && (
                <a
                  href={author.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-ghost hover:bg-primary/10"
                >
                  <Instagram className="w-5 h-5" />
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
              {author.links.site && (
                <a
                  href={author.links.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-ghost hover:bg-primary/10"
                >
                  <Globe className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-base-300 mt-8 pt-8 text-center text-sm text-base-content/50">
          <p>&copy; {new Date().getFullYear()} Naturo. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

