'use client'

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal, X } from 'lucide-react'

interface Category {
  id: string
  name: string
}

interface ProductFiltersProps {
  categories: Category[]
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [showFilters, setShowFilters] = useState(false)

  const currentCategory = searchParams.get('category') || ''
  const currentSort = searchParams.get('sort') || 'newest'
  const currentSearch = searchParams.get('search') || ''

  const [search, setSearch] = useState(currentSearch)

  const updateFilters = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    startTransition(() => {
      router.push(`/produits?${params.toString()}`)
    })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters({ search })
  }

  const clearFilters = () => {
    setSearch('')
    startTransition(() => {
      router.push('/produits')
    })
  }

  const hasActiveFilters = currentCategory || currentSearch || currentSort !== 'newest'

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/50" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full pl-10"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isPending}>
          Rechercher
        </button>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className={`btn btn-outline ${showFilters ? 'btn-primary' : ''}`}
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </form>

      {/* Filters Panel */}
      {showFilters && (
        <div className="card bg-base-200 p-4 animate-fade-in-up">
          <div className="flex flex-wrap gap-4">
            {/* Category */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Catégorie</span>
              </label>
              <select
                value={currentCategory}
                onChange={(e) => updateFilters({ category: e.target.value })}
                className="select select-bordered"
              >
                <option value="">Toutes les catégories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Trier par</span>
              </label>
              <select
                value={currentSort}
                onChange={(e) => updateFilters({ sort: e.target.value })}
                className="select select-bordered"
              >
                <option value="newest">Plus récents</option>
                <option value="oldest">Plus anciens</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="rating">Meilleures notes</option>
              </select>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="form-control justify-end">
                <button
                  onClick={clearFilters}
                  className="btn btn-ghost btn-sm gap-2"
                >
                  <X className="w-4 h-4" />
                  Effacer les filtres
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {isPending && (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-sm text-primary" />
        </div>
      )}
    </div>
  )
}

