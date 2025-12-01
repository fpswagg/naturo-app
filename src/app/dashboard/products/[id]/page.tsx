'use client'

import { useState, useTransition, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { getProductById, updateProduct } from '@/actions/productActions'
import { getCategories } from '@/actions/categoryActions'
import { ImageUploader } from '@/components/forms/ImageUploader'

interface Category {
  id: string
  name: string
}

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function EditProductPage({ params }: ProductPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [images, setImages] = useState<string[]>([])
  const [error, setError] = useState('')
  const [product, setProduct] = useState<{
    title: string
    description: string
    price: number
    categoryId: string
  } | null>(null)

  useEffect(() => {
    Promise.all([
      getProductById(id),
      getCategories()
    ]).then(([prod, cats]) => {
      if (prod) {
        setProduct({
          title: prod.title,
          description: prod.description || '',
          price: prod.price,
          categoryId: prod.categoryId
        })
        setImages(prod.images)
      }
      setCategories(cats)
      setLoading(false)
    })
  }, [id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    const formData = new FormData(e.currentTarget)
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const categoryId = formData.get('categoryId') as string

    startTransition(async () => {
      try {
        await updateProduct(id, {
          title,
          description: description || undefined,
          price,
          categoryId,
          images
        })
        router.push('/dashboard/products')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur')
      }
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-base-content/70 mb-4">Produit non trouvé</p>
        <Link href="/dashboard/products" className="btn btn-primary">
          Retour
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/dashboard/products"
          className="inline-flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux produits
        </Link>
      </div>

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body p-8">
          <h1 className="text-3xl font-bold mb-2">Modifier le produit</h1>
          <p className="text-base-content/70 mb-6">Mettez à jour les informations du produit</p>

          {error && (
            <div className="alert alert-error mb-6">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-semibold">Titre du produit *</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={product.title}
                  className="input input-bordered input-lg"
                />
              </div>

              {/* Description */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-semibold">Description</span>
                </label>
                <textarea
                  name="description"
                  rows={4}
                  defaultValue={product.description}
                  className="textarea textarea-bordered resize-none"
                  placeholder="Description détaillée du produit (optionnelle)"
                />
              </div>

              {/* Price */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Prix (FCFA) *</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50">FCFA</span>
                  <input
                    type="number"
                    name="price"
                    required
                    min="0"
                    step="1"
                    defaultValue={product.price}
                    className="input input-bordered input-lg pl-16"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Catégorie *</span>
                </label>
                <select
                  name="categoryId"
                  defaultValue={product.categoryId}
                  className="select select-bordered select-lg w-full"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Images */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Images du produit</span>
              </label>
              <ImageUploader
                images={images}
                onImagesChange={setImages}
                maxImages={10}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t border-base-300">
              <button
                type="submit"
                disabled={isPending}
                className="btn btn-primary btn-lg flex-1 gap-2"
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Enregistrer les modifications
                  </>
                )}
              </button>
              <Link href="/dashboard/products" className="btn btn-ghost btn-lg">
                Annuler
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
