import Link from 'next/link'
import { ArrowRight, Sparkles, TrendingUp, Heart } from 'lucide-react'
import { AuthorSection } from '@/components/AuthorSection'
import { ProductCard } from '@/components/product/ProductCard'
import { TestimonyCard } from '@/components/TestimonyCard'
import { getFeaturedProducts } from '@/actions/productActions'
import { getTestimonies } from '@/actions/testimonyActions'

export default async function HomePage() {
  const [featuredProducts, testimonies] = await Promise.all([
    getFeaturedProducts(6),
    getTestimonies()
  ])

  return (
    <div className="bg-pattern">
      {/* Author Section (merged with hero) - First thing visible */}
      <AuthorSection />

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-24 lg:py-32 relative">
          {/* Background Decoration */}
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-accent/10 to-transparent rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold uppercase tracking-wide">Nos meilleurs produits</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Produits{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  populaires
                </span>
              </h2>
              
              <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed">
                Découvrez nos produits les mieux notés et les plus appréciés par nos clients
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`animate-fade-in-up opacity-0 stagger-${(index % 5) + 1}`}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
              <Link 
                href="/produits" 
                className="group inline-flex items-center gap-3 btn btn-primary btn-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <span className="font-bold">Voir tous les produits</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonies */}
      {testimonies.length > 0 && (
        <section className="py-24 lg:py-32 bg-gradient-to-b from-base-100 to-base-200 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-20 left-0 w-96 h-96 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-0 w-96 h-96 bg-gradient-to-l from-accent/10 to-transparent rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-4">
                <Heart className="w-4 h-4 fill-current" />
                <span className="text-sm font-semibold uppercase tracking-wide">Témoignages</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Ce que disent nos{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  clients
                </span>
              </h2>
              
              <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed">
                Découvrez les témoignages de ceux qui nous font confiance au quotidien
              </p>
            </div>

            {/* Testimonies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonies.slice(0, 6).map((testimony, index) => (
                <div
                  key={testimony.id}
                  className={`animate-fade-in-up opacity-0 stagger-${(index % 5) + 1}`}
                >
                  <TestimonyCard testimony={testimony} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 lg:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-primary bg-[length:200%_200%] animate-gradient rounded-3xl shadow-2xl">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            
            <div className="relative z-10 p-12 md:p-20 text-center text-white">
              <Sparkles className="w-16 h-16 mx-auto mb-6 animate-pulse" />
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Prêt à découvrir nos produits ?
              </h2>
              
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
                Contactez-moi dès maintenant pour en savoir plus sur nos produits naturels 
                et trouver celui qui vous convient parfaitement.
              </p>
              
              <Link 
                href="/contact" 
                className="group inline-flex items-center gap-3 btn btn-lg bg-white text-primary hover:bg-white/95 border-0 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <span className="font-bold text-lg">Me contacter</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
