'use client'

import { useState, useTransition, useEffect } from 'react'
import { Save, User, Instagram, MessageCircle, Globe, Lock } from 'lucide-react'
import { getAuthor } from '@/actions/authorActions'
import { updateAuthor } from '@/actions/authorActions'
import type { Author } from '@/types'

export default function AuthorPage() {
  const [isPending, startTransition] = useTransition()
  const [loading, setLoading] = useState(true)
  const [author, setAuthor] = useState<Author | null>(null)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getAuthor().then((data) => {
      setAuthor(data)
      setLoading(false)
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    const formData = new FormData(e.currentTarget)
    
    startTransition(async () => {
      try {
        const result = await updateAuthor({
          name: formData.get('name') as string,
          bio: formData.get('bio') as string,
          picture: formData.get('picture') as string,
          links: {
            instagram: formData.get('instagram') as string,
            whatsapp: formData.get('whatsapp') as string,
            site: formData.get('site') as string
          },
          password: formData.get('password') as string || undefined
        })

        if (result) {
          setSuccess(true)
          setTimeout(() => setSuccess(false), 3000)
        } else {
          setError('Erreur lors de la mise à jour')
        }
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

  if (!author) {
    return (
      <div className="text-center py-20">
        <p className="text-base-content/70">Erreur de chargement</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profil auteur</h1>
        <p className="text-base-content/70">Modifiez vos informations publiques</p>
      </div>

      {success && (
        <div className="alert alert-success">
          <span>Profil mis à jour avec succès !</span>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <User className="w-5 h-5" />
              Informations
            </h2>

            <div className="space-y-4 mt-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Nom</span>
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={author.name}
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Bio</span>
                </label>
                <textarea
                  name="bio"
                  rows={4}
                  defaultValue={author.bio}
                  className="textarea textarea-bordered resize-none"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Photo (URL)</span>
                </label>
                <input
                  type="text"
                  name="picture"
                  defaultValue={author.picture}
                  className="input input-bordered"
                  placeholder="/images/author.jpg"
                />
                <label className="label">
                  <span className="label-text-alt text-base-content/50">
                    Placez l'image dans /public/images/ et indiquez le chemin
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Liens sociaux</h2>

            <div className="space-y-4 mt-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </span>
                </label>
                <input
                  type="url"
                  name="instagram"
                  defaultValue={author.links.instagram}
                  className="input input-bordered"
                  placeholder="https://instagram.com/..."
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </span>
                </label>
                <input
                  type="text"
                  name="whatsapp"
                  defaultValue={author.links.whatsapp}
                  className="input input-bordered"
                  placeholder="+33612345678"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Site web
                  </span>
                </label>
                <input
                  type="url"
                  name="site"
                  defaultValue={author.links.site}
                  className="input input-bordered"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Sécurité
            </h2>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text font-medium">Nouveau mot de passe</span>
              </label>
              <input
                type="password"
                name="password"
                className="input input-bordered"
                placeholder="Laisser vide pour ne pas changer"
              />
              <label className="label">
                <span className="label-text-alt text-base-content/50">
                  Mot de passe actuel : ****
                </span>
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="btn btn-primary w-full gap-2"
        >
          {isPending ? (
            <>
              <span className="loading loading-spinner loading-sm" />
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Enregistrer les modifications
            </>
          )}
        </button>
      </form>
    </div>
  )
}

