import Image from 'next/image'
import Link from 'next/link'
import { Facebook, MessageCircle, ArrowRight, Sparkles } from 'lucide-react'
import { getAuthor } from '@/actions/authorActions'

export async function AuthorSection() {
  const author = await getAuthor()

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-pattern">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Photo */}
          <div className="relative flex-shrink-0">
            <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-primary glow-green shadow-2xl">
              <Image
                src={author.picture}
                alt={author.name}
                width={320}
                height={320}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-full flex items-center justify-center animate-pulse-glow shadow-lg">
              <span className="text-3xl">🌿</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 animate-fade-in-up">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Produits 100% naturels</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up stagger-1">
              Bonjour, je suis{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {author.name}
              </span>
            </h1>
            
            {/* Bio */}
            <p className="text-lg md:text-xl text-base-content/70 mb-6 max-w-2xl leading-relaxed animate-fade-in-up stagger-2">
              {author.bio}
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8 animate-fade-in-up stagger-3">
              {author.links.facebook && (
                <a
                  href={author.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-primary gap-2"
                >
                  <Facebook className="w-5 h-5" />
                  Facebook
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
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in-up stagger-4">
              <Link href="/produits" className="btn btn-primary btn-lg gap-2 group">
                Voir les produits
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="btn btn-outline btn-lg gap-2 group">
                Me contacter
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
    </section>
  )
}
