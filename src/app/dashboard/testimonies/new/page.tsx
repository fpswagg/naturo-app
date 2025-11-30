'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
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
    <div className="max-w-2xl mx-auto">
      <Link
        href="/dashboard/testimonies"
        className="inline-flex items-center gap-2 text-base-content/70 hover:text-primary mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour
      </Link>

      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h1 className="card-title">Nouveau témoignage</h1>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Nom du client *</span>
              </label>
              <input
                type="text"
                name="client_name"
                required
                className="input input-bordered"
                placeholder="Marie D."
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Message *</span>
              </label>
              <textarea
                name="message"
                required
                rows={5}
                className="textarea textarea-bordered resize-none"
                placeholder="Témoignage du client..."
              />
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
                  'Créer le témoignage'
                )}
              </button>
              <Link href="/dashboard/testimonies" className="btn btn-ghost">
                Annuler
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

