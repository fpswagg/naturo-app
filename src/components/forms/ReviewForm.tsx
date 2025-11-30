'use client'

import { useState, useTransition } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { Rating } from '@/components/ui/Rating'
import { createReview } from '@/actions/reviewActions'

interface ReviewFormProps {
  productId: string
}

export function ReviewForm({ productId }: ReviewFormProps) {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [rating, setRating] = useState(5)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    const formData = new FormData(e.currentTarget)
    const client_name = formData.get('client_name') as string
    const comment = formData.get('comment') as string

    startTransition(async () => {
      try {
        await createReview({
          productId,
          client_name,
          rating,
          comment: comment || undefined
        })
        setSuccess(true)
        ;(e.target as HTMLFormElement).reset()
        setRating(5)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      }
    })
  }

  if (success) {
    return (
      <div className="card bg-success/10 border border-success p-6 text-center animate-fade-in-up">
        <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
        <h3 className="text-xl font-bold text-success mb-2">Merci pour votre avis !</h3>
        <p className="text-base-content/70 mb-4">
          Votre avis a été publié avec succès.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="btn btn-primary btn-sm"
        >
          Laisser un autre avis
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card-naturo p-6 space-y-4">
      <h3 className="font-semibold text-lg">Laisser un avis</h3>

      {error && (
        <div className="alert alert-error text-sm">
          <span>{error}</span>
        </div>
      )}

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Votre nom *</span>
        </label>
        <input
          type="text"
          name="client_name"
          required
          className="input input-bordered input-sm focus:input-primary"
          placeholder="Jean D."
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Note *</span>
        </label>
        <Rating
          value={rating}
          interactive
          size="lg"
          onChange={setRating}
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Commentaire (optionnel)</span>
        </label>
        <textarea
          name="comment"
          rows={3}
          className="textarea textarea-bordered textarea-sm focus:textarea-primary resize-none"
          placeholder="Partagez votre expérience..."
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="btn btn-primary btn-sm gap-2"
      >
        {isPending ? (
          <>
            <span className="loading loading-spinner loading-xs" />
            Envoi...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Publier
          </>
        )}
      </button>
    </form>
  )
}

