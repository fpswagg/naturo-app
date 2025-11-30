'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTransition } from 'react'
import { Pencil, Trash2, ShoppingBag, ToggleLeft, ToggleRight } from 'lucide-react'
import { toggleProductStock, deleteProduct } from '@/actions/productActions'
import { Rating } from '@/components/ui/Rating'
import type { ProductWithCategory } from '@/types'

interface ProductListProps {
  products: ProductWithCategory[]
}

export function ProductList({ products }: ProductListProps) {
  const [isPending, startTransition] = useTransition()

  const handleToggleStock = (id: string) => {
    startTransition(async () => {
      await toggleProductStock(id)
    })
  }

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Supprimer "${title}" ?`)) {
      startTransition(async () => {
        await deleteProduct(id)
      })
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price)
  }

  if (products.length === 0) {
    return (
      <div className="card bg-base-100 p-12 text-center">
        <ShoppingBag className="w-16 h-16 text-base-content/20 mx-auto mb-4" />
        <p className="text-base-content/70 mb-4">Aucun produit pour le moment</p>
        <Link href="/dashboard/products/new" className="btn btn-primary btn-sm">
          Créer le premier produit
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div
          key={product.id}
          className={`card bg-base-100 shadow-sm ${
            !product.inStock ? 'opacity-60' : ''
          }`}
        >
          <div className="card-body p-4">
            <div className="flex items-center gap-4">
              {/* Image */}
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-base-200">
                {product.images[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-base-content/30" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold truncate">{product.title}</h3>
                  {!product.inStock && (
                    <span className="badge badge-error badge-sm">Rupture</span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-base-content/70">
                  <span className="badge badge-ghost badge-sm">{product.category.name}</span>
                  <span className="font-medium text-primary">{formatPrice(product.price)}</span>
                  <Rating value={product.averageRating} size="sm" />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleStock(product.id)}
                  disabled={isPending}
                  className={`btn btn-sm ${product.inStock ? 'btn-success' : 'btn-ghost'}`}
                  title={product.inStock ? 'Désactiver' : 'Activer'}
                >
                  {product.inStock ? (
                    <ToggleRight className="w-4 h-4" />
                  ) : (
                    <ToggleLeft className="w-4 h-4" />
                  )}
                </button>
                <Link
                  href={`/dashboard/products/${product.id}`}
                  className="btn btn-ghost btn-sm"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(product.id, product.title)}
                  disabled={isPending}
                  className="btn btn-ghost btn-sm text-error"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

