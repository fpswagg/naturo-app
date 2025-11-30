import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ProductGrid } from '@/components/product/ProductGrid'
import { ProductFilters } from '@/components/product/ProductFilters'
import { getProducts } from '@/actions/productActions'
import { getCategories } from '@/actions/categoryActions'
import type { SortOption } from '@/types'

export const metadata: Metadata = {
  title: 'Produits',
  description: 'Découvrez notre gamme complète de produits naturels pour votre bien-être.'
}

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string
    sort?: string
    search?: string
  }>
}

async function ProductsContent({ searchParams }: ProductsPageProps) {
  const params = await searchParams
  const [products, categories] = await Promise.all([
    getProducts({
      inStockOnly: true,
      categoryId: params.category,
      search: params.search,
      sort: (params.sort as SortOption) || 'newest'
    }),
    getCategories()
  ])

  return (
    <>
      <ProductFilters categories={categories} />
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </>
  )
}

export default async function ProductsPage(props: ProductsPageProps) {
  const categories = await getCategories()

  return (
    <div className="bg-pattern min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Nos{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Produits
            </span>
          </h1>
          <p className="text-base-content/70 max-w-xl mx-auto">
            Découvrez notre sélection de produits naturels de qualité
          </p>
        </div>

        <Suspense
          fallback={
            <div className="space-y-6">
              <ProductFilters categories={categories} />
              <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg text-primary" />
              </div>
            </div>
          }
        >
          <ProductsContent searchParams={props.searchParams} />
        </Suspense>
      </div>
    </div>
  )
}

