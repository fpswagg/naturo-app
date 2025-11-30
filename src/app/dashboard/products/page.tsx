import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getProducts } from '@/actions/productActions'
import { ProductList } from './ProductList'

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Produits</h1>
          <p className="text-base-content/70">{products.length} produit{products.length > 1 ? 's' : ''}</p>
        </div>
        <Link href="/dashboard/products/new" className="btn btn-primary gap-2">
          <Plus className="w-4 h-4" />
          Nouveau produit
        </Link>
      </div>

      <ProductList products={products} />
    </div>
  )
}

