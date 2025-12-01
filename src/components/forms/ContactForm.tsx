'use client'

import { useState, useTransition } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { createMessage } from '@/actions/messageActions'

export function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const message = formData.get('message') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string

    const contact = email || phone

    if (!contact) {
      setError('Veuillez fournir un email ou un numéro de téléphone')
      return
    }

    startTransition(async () => {
      try {
        await createMessage({ name, message, contact })
        setSuccess(true)
        ;(e.target as HTMLFormElement).reset()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      }
    })
  }

  if (success) {
    return (
      <div className="card bg-success/10 border border-success p-8 text-center animate-fade-in-up">
        <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-success mb-2">Message envoyé !</h3>
        <p className="text-base-content/70 mb-6">
          Merci pour votre message. Je vous répondrai dans les plus brefs délais.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="btn btn-primary"
        >
          Envoyer un autre message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card-naturo p-8 space-y-6">
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Votre nom *</span>
        </label>
        <input
          type="text"
          name="name"
          required
          className="input input-bordered focus:input-primary"
          placeholder="Jean Dupont"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Votre message *</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="textarea textarea-bordered focus:textarea-primary resize-none"
          placeholder="Bonjour, je souhaite en savoir plus sur..."
        />
      </div>

      <div className="divider">Au moins un contact requis</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <input
            type="email"
            name="email"
            className="input input-bordered focus:input-primary"
            placeholder="jean@exemple.fr"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Téléphone</span>
          </label>
          <input
            type="tel"
            name="phone"
            className="input input-bordered focus:input-primary"
            placeholder="06 12 34 56 78"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="btn btn-primary btn-lg w-full gap-2"
      >
        {isPending ? (
          <>
            <span className="loading loading-spinner loading-sm" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Envoyer le message
          </>
        )}
      </button>
    </form>
  )
}

