'use client'

import { useState, useTransition } from 'react'
import { Send, User, Mail as MailIcon, MessageSquare, Loader2, CheckCircle } from 'lucide-react'
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
    const contact = formData.get('contact') as string
    const message = formData.get('message') as string

    startTransition(async () => {
      try {
        await createMessage({ name, contact, message })
        setSuccess(true)
        e.currentTarget.reset()
        setTimeout(() => setSuccess(false), 5000)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="card-naturo p-8 space-y-6">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-base-content mb-2">Envoyez-moi un message</h2>
        <p className="text-base-content/60">Je vous répondrai dans les plus brefs délais</p>
      </div>

      {success && (
        <div className="alert alert-success shadow-lg">
          <CheckCircle className="w-5 h-5" />
          <div>
            <div className="font-bold">Message envoyé !</div>
            <div className="text-sm">Je vous répondrai bientôt.</div>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-error shadow-lg">
          <span>{error}</span>
        </div>
      )}

      {/* Name Field */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold text-base flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Votre nom *
          </span>
        </label>
        <input
          type="text"
          name="name"
          required
          className="input input-bordered input-lg focus:input-primary transition-all"
          placeholder="Ex: Marie Dubois"
        />
      </div>

      {/* Contact Field */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold text-base flex items-center gap-2">
            <MailIcon className="w-4 h-4 text-primary" />
            Email ou Téléphone *
          </span>
        </label>
        <input
          type="text"
          name="contact"
          required
          className="input input-bordered input-lg focus:input-primary transition-all"
          placeholder="Ex: marie@example.com ou +237..."
        />
      </div>

      {/* Message Field */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold text-base flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" />
            Votre message *
          </span>
        </label>
        <textarea
          name="message"
          required
          rows={6}
          className="textarea textarea-bordered textarea-lg focus:textarea-primary resize-none transition-all"
          placeholder="Décrivez votre besoin ou posez votre question..."
        />
        <label className="label">
          <span className="label-text-alt text-base-content/60">
            Minimum 10 caractères
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="btn btn-primary btn-lg w-full gap-3 shadow-xl hover:shadow-2xl transition-all duration-300"
      >
        {isPending ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="font-bold">Envoi en cours...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span className="font-bold">Envoyer le message</span>
          </>
        )}
      </button>

      <p className="text-xs text-center text-base-content/50 mt-4">
        En envoyant ce formulaire, vous acceptez d'être contacté par email ou téléphone
      </p>
    </form>
  )
}
