'use client'

import { useState, useTransition, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Upload, X, Save } from 'lucide-react'
import { getProductById, updateProduct } from '@/actions/productActions'
import { getCategories } from '@/actions/categoryActions'

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
  const [newImageUrl, setNewImageUrl] = useState('')
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

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()])
      setNewImageUrl('')
    }
  }

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

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
        <p className="text-base-content/70">Produit non trouvé</p>
        <Link href="/dashboard/products" className="btn btn-primary mt-4">
          Retour
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/dashboard/products"
        className="inline-flex items-center gap-2 text-base-content/70 hover:text-primary mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour
      </Link>

      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h1 className="card-title">Modifier le produit</h1>

          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Titre *</span>
              </label>
              <input
                type="text"
                name="title"
                required
                defaultValue={product.title}
                className="input input-bordered"
              />
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Description</span>
              </label>
              <textarea
                name="description"
                rows={4}
                defaultValue={product.description}
                className="textarea textarea-bordered resize-none"
                placeholder="Description du produit (optionnelle)"
              />
            </div>

            {/* Price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Prix (€) *</span>
              </label>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                defaultValue={product.price}
                className="input input-bordered"
              />
            </div>

            {/* Category */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Catégorie *</span>
              </label>
              <select
                name="categoryId"
                defaultValue={product.categoryId}
                className="select select-bordered"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Images */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Images</span>
              </label>
              
              {images.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {images.map((url, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-base-200">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 btn btn-circle btn-xs btn-error"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="input input-bordered flex-1"
                  placeholder="URL de l'image"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="btn btn-outline"
                >
                  <Upload className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="btn btn-primary flex-1 gap-2"
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Enregistrer
                  </>
                )}
              </button>
              <Link href="/dashboard/products" className="btn btn-ghost">
                Annuler
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

