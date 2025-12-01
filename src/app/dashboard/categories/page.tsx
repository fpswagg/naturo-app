'use client'

import { useState, useTransition, useEffect } from 'react'
import { Plus, Pencil, Trash2, FolderTree, Check, X } from 'lucide-react'
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/actions/categoryActions'

interface Category {
  id: string
  name: string
  _count: { products: number }
}

export default function CategoriesPage() {
  const [isPending, startTransition] = useTransition()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    const cats = await getCategories()
    setCategories(cats as Category[])
    setLoading(false)
  }

  const handleCreate = () => {
    if (!newName.trim()) return
    setError('')

    startTransition(async () => {
      try {
        await createCategory(newName.trim())
        setNewName('')
        loadCategories()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur')
      }
    })
  }

  const handleUpdate = (id: string) => {
    if (!editName.trim()) return
    setError('')

    startTransition(async () => {
      try {
        await updateCategory(id, editName.trim())
        setEditingId(null)
        loadCategories()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur')
      }
    })
  }

  const handleDelete = (id: string, name: string, productCount: number) => {
    if (productCount > 0) {
      setError(`Impossible de supprimer "${name}" car elle contient ${productCount} produit(s)`)
      return
    }

    if (confirm(`Supprimer la catégorie "${name}" ?`)) {
      startTransition(async () => {
        try {
          await deleteCategory(id)
          loadCategories()
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Erreur')
        }
      })
    }
  }

  const startEdit = (cat: Category) => {
    setEditingId(cat.id)
    setEditName(cat.name)
    setError('')
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Catégories</h1>
        <p className="text-base-content/70">{categories.length} catégorie{categories.length > 1 ? 's' : ''}</p>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
          <button onClick={() => setError('')} className="btn btn-ghost btn-sm">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Add Category */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body p-6">
          <h2 className="text-xl font-semibold mb-4">Nouvelle catégorie</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              className="input input-bordered input-lg flex-1"
              placeholder="Nom de la catégorie"
            />
            <button
              onClick={handleCreate}
              disabled={isPending || !newName.trim()}
              className="btn btn-primary btn-lg gap-2"
            >
              <Plus className="w-5 h-5" />
              Ajouter
            </button>
          </div>
        </div>
      </div>

      {/* Categories List */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body p-0">
          {categories.length === 0 ? (
            <div className="p-12 text-center">
              <FolderTree className="w-16 h-16 text-base-content/20 mx-auto mb-4" />
              <p className="text-base-content/70 mb-2">Aucune catégorie</p>
              <p className="text-sm text-base-content/50">Créez votre première catégorie ci-dessus</p>
            </div>
          ) : (
            <ul className="divide-y divide-base-200">
              {categories.map((cat) => (
                <li key={cat.id} className="flex items-center gap-4 p-4 hover:bg-base-200/50 transition-colors">
                  {editingId === cat.id ? (
                    <>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleUpdate(cat.id)}
                        className="input input-bordered flex-1"
                        autoFocus
                      />
                      <button
                        onClick={() => handleUpdate(cat.id)}
                        disabled={isPending}
                        className="btn btn-success btn-sm"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="btn btn-ghost btn-sm"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex-1">
                        <span className="font-semibold text-lg">{cat.name}</span>
                        <span className="text-sm text-base-content/50 ml-3">
                          ({cat._count.products} produit{cat._count.products > 1 ? 's' : ''})
                        </span>
                      </div>
                      <button
                        onClick={() => startEdit(cat)}
                        className="btn btn-ghost btn-sm"
                        title="Modifier"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id, cat.name, cat._count.products)}
                        disabled={isPending}
                        className="btn btn-ghost btn-sm text-error"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
