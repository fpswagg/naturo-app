import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, MessageCircle, ShoppingBag } from 'lucide-react'
import { Rating } from '@/components/ui/Rating'
import { ReviewForm } from '@/components/forms/ReviewForm'
import { getProductById } from '@/actions/productActions'
import { getAuthor } from '@/actions/authorActions'
import { formatPriceFCFA } from '@/lib/utils'
import { WhatsAppButton } from './WhatsAppButton'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  const product = await getProductById(id)
  const author = await getAuthor()
  
  if (!product) {
    return { title: 'Produit non trouvé' }
  }

  return {
    title: product.title,
    description: product.description || `Découvrez ${product.title} - un produit naturel de qualité.`,
    openGraph: {
      title: product.title,
      description: product.description || undefined,
      images: product.images[0] ? [product.images[0]] : undefined
    }
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const [product, author] = await Promise.all([
    getProductById(id),
    getAuthor()
  ])

  if (!product || !product.inStock) {
    notFound()
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(date))
  }

  return (
    <div className="bg-pattern min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Back Link */}
        <Link
          href="/produits"
          className="inline-flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux produits
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-base-200">
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                  unoptimized={product.images[0].startsWith('http')}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag className="w-24 h-24 text-base-content/20" />
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 border-primary"
                  >
                    <Image
                      src={image}
                      alt={`${product.title} - ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized={image.startsWith('http')}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="badge badge-primary mb-2">{product.category.name}</span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.title}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <Rating value={product.averageRating} showValue size="lg" />
                <span className="text-base-content/50">
                  ({product.reviews.length} avis)
                </span>
              </div>

              <p className="text-4xl font-bold text-primary">
                {formatPriceFCFA(product.price)}
              </p>
            </div>

            {product.description && (
              <div>
                <h2 className="font-semibold text-lg mb-2">Description</h2>
                <p className="text-base-content/70 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {/* WhatsApp CTA */}
            <div className="card bg-success/10 border border-success p-6">
              <h3 className="font-semibold text-lg mb-2">Intéressé par ce produit ?</h3>
              <p className="text-base-content/70 mb-4">
                Contactez-moi directement sur WhatsApp pour passer commande ou poser vos questions.
              </p>
              <WhatsAppButton
                whatsapp={author.links.whatsapp}
                productId={product.id}
                productTitle={product.title}
              />
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Review Form */}
          <div className="lg:col-span-1">
            <ReviewForm productId={product.id} />
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">
              Avis clients ({product.reviews.length})
            </h2>

            {product.reviews.length === 0 ? (
              <div className="card-naturo p-8 text-center">
                <p className="text-base-content/70">
                  Aucun avis pour le moment. Soyez le premier à donner votre avis !
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <div key={review.id} className="card-naturo p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold">{review.client_name}</p>
                        <p className="text-sm text-base-content/50">
                          {formatDate(review.createdAt)}
                        </p>
                      </div>
                      <Rating value={review.rating} size="sm" />
                    </div>
                    {review.comment && (
                      <p className="text-base-content/70">{review.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
