'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Save } from 'lucide-react'
import { updateTestimony } from '@/actions/testimonyActions'

interface EditTestimonyFormProps {
  testimony: {
    id: string
    client_name: string
    message: string
  }
}

export function EditTestimonyForm({ testimony }: EditTestimonyFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const client_name = formData.get('client_name') as string
    const message = formData.get('message') as string

    startTransition(async () => {
      await updateTestimony(testimony.id, { client_name, message })
      router.push('/dashboard/testimonies')
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Nom du client *</span>
        </label>
        <input
          type="text"
          name="client_name"
          required
          defaultValue={testimony.client_name}
          className="input input-bordered"
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
          defaultValue={testimony.message}
          className="textarea textarea-bordered resize-none"
        />
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
        <Link href="/dashboard/testimonies" className="btn btn-ghost">
          Annuler
        </Link>
      </div>
    </form>
  )
}


