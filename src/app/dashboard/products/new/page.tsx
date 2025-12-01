'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, Save } from 'lucide-react'
import { createProduct } from '@/actions/productActions'
import { createCategory, getCategories } from '@/actions/categoryActions'
import { ImageUploader } from '@/components/forms/ImageUploader'
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
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

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
          <h1 className="text-3xl font-bold mb-2">Nouveau produit</h1>
          <p className="text-base-content/70 mb-6">Remplissez les informations du produit</p>

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
                  className="input input-bordered input-lg"
                  placeholder="Ex: Huile essentielle de lavande"
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
                    className="input input-bordered input-lg pl-16"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Catégorie *</span>
                </label>
                <div className="flex gap-2">
                  <select name="categoryId" className="select select-bordered select-lg flex-1" required>
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
                    className="btn btn-outline btn-lg"
                    title="Ajouter une catégorie"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                
                {showNewCategory && (
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
                      className="input input-bordered flex-1"
                      placeholder="Nom de la nouvelle catégorie"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={handleAddCategory}
                      className="btn btn-primary"
                    >
                      Ajouter
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Images */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Images du produit *</span>
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
                    Création en cours...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Créer
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
