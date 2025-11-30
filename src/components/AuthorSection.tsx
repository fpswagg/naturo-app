import Image from 'next/image'
import Link from 'next/link'
import { Instagram, MessageCircle, Globe, ArrowRight } from 'lucide-react'
import { getAuthor } from '@/actions/authorActions'

export async function AuthorSection() {
  const author = await getAuthor()

  return (
    <section className="py-20 bg-pattern">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Photo */}
          <div className="relative">
            <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-primary glow-green">
              <Image
                src={author.picture}
                alt={author.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-full flex items-center justify-center animate-pulse-glow">
              <span className="text-3xl">🌿</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Bonjour, je suis{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {author.name}
              </span>
            </h2>
            
            <p className="text-lg text-base-content/70 mb-8 max-w-2xl leading-relaxed">
              {author.bio}
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              {author.links.instagram && (
                <a
                  href={author.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-primary gap-2"
                >
                  <Instagram className="w-5 h-5" />
                  Instagram
                </a>
              )}
              {author.links.whatsapp && (
                <a
                  href={`https://wa.me/${author.links.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              )}
              {author.links.site && (
                <a
                  href={author.links.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline gap-2"
                >
                  <Globe className="w-5 h-5" />
                  Site web
                </a>
              )}
            </div>

            <Link href="/contact" className="btn btn-primary btn-lg gap-2 group">
              Me contacter
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

