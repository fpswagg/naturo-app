import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
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
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Produits{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  populaires
                </span>
              </h2>
              <p className="text-base-content/70 max-w-xl mx-auto">
                Nos produits les mieux notés et les plus appréciés par nos clients
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`animate-fade-in-up opacity-0 stagger-${(index % 5) + 1}`}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/produits" className="btn btn-primary btn-outline gap-2 group">
                Voir tous les produits
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonies */}
      {testimonies.length > 0 && (
        <section className="py-20 bg-base-200">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ce que disent nos{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  clients
                </span>
              </h2>
              <p className="text-base-content/70 max-w-xl mx-auto">
                Découvrez les témoignages de ceux qui nous font confiance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-naturo rounded-3xl p-8 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prêt à découvrir nos produits ?
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              Contactez-moi pour en savoir plus sur nos produits naturels 
              et trouver celui qui vous convient.
            </p>
            <Link href="/contact" className="btn btn-lg bg-white text-primary hover:bg-white/90 gap-2 group">
              Me contacter
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
