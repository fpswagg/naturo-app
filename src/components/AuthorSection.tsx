import Image from 'next/image'
import Link from 'next/link'
import { Facebook, MessageCircle, ArrowRight, Sparkles, Star } from 'lucide-react'
import { getAuthor } from '@/actions/authorActions'

export async function AuthorSection() {
  const author = await getAuthor()

  return (
    <section className="relative py-24 lg:py-40 overflow-hidden bg-pattern">
      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-accent/15 to-transparent rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Photo Section */}
          <div className="relative flex-shrink-0 animate-fade-in-up">
            {/* Decorative Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 blur-2xl scale-110" />
            
            {/* Main Photo Container */}
            <div className="relative w-72 h-72 lg:w-96 lg:h-96">
              {/* Photo */}
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl ring-4 ring-primary/20 relative z-10">
                <Image
                  src={author.picture}
                  alt={author.name}
                  width={384}
                  height={384}
                  className="object-cover w-full h-full transform transition-transform duration-700 hover:scale-110"
                  priority
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-2xl animate-pulse-glow ring-4 ring-white">
                <span className="text-5xl">🌿</span>
              </div>

              {/* Decorative Dots */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-accent rounded-full opacity-40 blur-xl" />
              <div className="absolute -bottom-8 left-1/4 w-16 h-16 bg-primary rounded-full opacity-30 blur-lg" />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 text-center lg:text-left max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20 text-primary px-5 py-2.5 rounded-full mb-8 animate-fade-in-up shadow-lg backdrop-blur-sm">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold text-sm uppercase tracking-wide">Produits 100% naturels</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up stagger-1">
              Bonjour, je suis{' '}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                {author.name}
              </span>
            </h1>
            
            {/* Bio */}
            <p className="text-lg sm:text-xl lg:text-2xl text-base-content/80 mb-10 max-w-3xl leading-relaxed animate-fade-in-up stagger-2 font-light">
              {author.bio}
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10 animate-fade-in-up stagger-3">
              {author.links.facebook && (
                <a
                  href={author.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group btn btn-outline btn-primary border-2 gap-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Facebook</span>
                </a>
              )}
              {author.links.whatsapp && (
                <a
                  href={`https://wa.me/${author.links.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group btn btn-success border-2 border-success gap-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">WhatsApp</span>
                </a>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in-up stagger-4">
              <Link 
                href="/produits" 
                className="group btn btn-primary btn-lg gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <span className="font-bold">Voir les produits</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              <Link 
                href="/contact" 
                className="group btn btn-outline btn-lg gap-3 border-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <span className="font-bold">Me contacter</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start mt-12 pt-8 border-t border-base-300/50 animate-fade-in-up stagger-5">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center ring-2 ring-white text-white font-bold text-xs">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
                <span className="text-base-content/70 font-medium">15+ ans d'expérience</span>
              </div>
              <div className="h-6 w-px bg-base-300" />
              <div className="text-sm text-base-content/70 font-medium">
                🇨🇲 Produits d'Afrique centrale
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
