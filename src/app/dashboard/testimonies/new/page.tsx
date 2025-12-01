'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { createTestimony } from '@/actions/testimonyActions'

export default function NewTestimonyPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const client_name = formData.get('client_name') as string
    const message = formData.get('message') as string

    startTransition(async () => {
      await createTestimony({ client_name, message })
      router.push('/dashboard/testimonies')
    })
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link
          href="/dashboard/testimonies"
          className="inline-flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux témoignages
        </Link>
      </div>

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body p-8">
          <h1 className="text-3xl font-bold mb-2">Nouveau témoignage</h1>
          <p className="text-base-content/70 mb-6">Ajoutez un nouveau témoignage client</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Nom du client *</span>
              </label>
              <input
                type="text"
                name="client_name"
                required
                className="input input-bordered input-lg"
                placeholder="Ex: Marie D."
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Message *</span>
              </label>
              <textarea
                name="message"
                required
                rows={6}
                className="textarea textarea-bordered resize-none"
                placeholder="Témoignage du client..."
              />
            </div>

            <div className="flex gap-3 pt-4 border-t border-base-300">
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
              <Link href="/dashboard/testimonies" className="btn btn-ghost btn-lg">
                Annuler
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
