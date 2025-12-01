'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Rating } from '@/components/ui/Rating'
import { formatPriceFCFA } from '@/lib/utils'
import type { ProductWithCategory } from '@/types'

interface ProductCardProps {
  product: ProductWithCategory
  showStock?: boolean
  onToggleStock?: () => void
}

export function ProductCard({ product, showStock = false, onToggleStock }: ProductCardProps) {
  const cardContent = (
    <div
      className={`card-naturo overflow-hidden group cursor-pointer ${
        !product.inStock && showStock ? 'out-of-stock' : ''
      }`}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            unoptimized={product.images[0].startsWith('http')}
          />
        ) : (
          <div className="w-full h-full bg-base-300 flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-base-content/30" />
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="badge badge-primary">{product.category.name}</span>
        </div>

        {/* Stock Badge */}
        {showStock && !product.inStock && (
          <div className="absolute top-3 right-3">
            <span className="badge badge-error">Rupture</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        <div className="flex items-center justify-between">
          <Rating value={product.averageRating} size="sm" showValue />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-base-300">
          <span className="text-xl font-bold text-primary">
            {formatPriceFCFA(product.price)}
          </span>

          {showStock && onToggleStock ? (
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onToggleStock()
              }}
              className={`btn btn-sm ${product.inStock ? 'btn-success' : 'btn-outline'}`}
            >
              {product.inStock ? 'En stock' : 'Activer'}
            </button>
          ) : (
            <span className="btn btn-primary btn-sm pointer-events-none">
              Voir
            </span>
          )}
        </div>
      </div>
    </div>
  )

  if (showStock && onToggleStock) {
    return cardContent
  }

  return (
    <Link href={`/produits/${product.id}`} className="block">
      {cardContent}
    </Link>
  )
}
