'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Upload, X, Plus } from 'lucide-react'
import { createProduct } from '@/actions/productActions'
import { createCategory, getCategories } from '@/actions/categoryActions'
import { useEffect } from 'react'

interface Category {
  id: string
  name: string
}

export default function NewProductPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [categories, setCategories] = useState<Category[]>([])
  const [images, setImages] = useState<string[]>([])
  const [newImageUrl, setNewImageUrl] = useState('')
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()])
      setNewImageUrl('')
    }
  }

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return
    
    try {
      const category = await createCategory(newCategoryName.trim())
      setCategories([...categories, category])
      setNewCategoryName('')
      setShowNewCategory(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    const formData = new FormData(e.currentTarget)
    const title = formData.get('title') as string
    const price = parseFloat(formData.get('price') as string)
    const categoryId = formData.get('categoryId') as string

    if (!categoryId) {
      setError('Veuillez sélectionner une catégorie')
      return
    }

    if (images.length === 0) {
      setError('Veuillez ajouter au moins une image')
      return
    }

    startTransition(async () => {
      try {
        await createProduct({
          title,
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
          <h1 className="card-title">Nouveau produit</h1>

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
                className="input input-bordered"
                placeholder="Nom du produit"
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
                className="input input-bordered"
                placeholder="0.00"
              />
            </div>

            {/* Category */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Catégorie *</span>
              </label>
              <div className="flex gap-2">
                <select name="categoryId" className="select select-bordered flex-1">
                  <option value="">Sélectionner...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setShowNewCategory(!showNewCategory)}
                  className="btn btn-outline"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              {showNewCategory && (
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="input input-bordered input-sm flex-1"
                    placeholder="Nouvelle catégorie"
                  />
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="btn btn-primary btn-sm"
                  >
                    Ajouter
                  </button>
                </div>
              )}
            </div>

            {/* Images */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Images *</span>
              </label>
              
              {/* Image List */}
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

              {/* Add Image */}
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
              <label className="label">
                <span className="label-text-alt text-base-content/50">
                  Ajoutez les URLs des images du produit
                </span>
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="btn btn-primary flex-1"
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Création...
                  </>
                ) : (
                  'Créer le produit'
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

