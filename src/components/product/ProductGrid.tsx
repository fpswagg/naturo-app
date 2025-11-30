import { ProductCard } from './ProductCard'
import type { ProductWithCategory } from '@/types'

interface ProductGridProps {
  products: ProductWithCategory[]
  showStock?: boolean
}

export function ProductGrid({ products, showStock = false }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🌿</div>
        <p className="text-base-content/70 text-lg">
          Aucun produit trouvé
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`animate-fade-in-up opacity-0 stagger-${(index % 5) + 1}`}
        >
          <ProductCard product={product} showStock={showStock} />
        </div>
      ))}
    </div>
  )
}

