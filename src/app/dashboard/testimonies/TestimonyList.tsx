'use client'

import Link from 'next/link'
import { useTransition } from 'react'
import { Pencil, Trash2, MessageSquare, Quote } from 'lucide-react'
import { deleteTestimony } from '@/actions/testimonyActions'
import type { Testimony } from '@/types'

interface TestimonyListProps {
  testimonies: Testimony[]
}

export function TestimonyList({ testimonies }: TestimonyListProps) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Supprimer le témoignage de "${name}" ?`)) {
      startTransition(async () => {
        await deleteTestimony(id)
      })
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(new Date(date))
  }

  if (testimonies.length === 0) {
    return (
      <div className="card bg-base-100 p-12 text-center">
        <MessageSquare className="w-16 h-16 text-base-content/20 mx-auto mb-4" />
        <p className="text-base-content/70 mb-4">Aucun témoignage pour le moment</p>
        <Link href="/dashboard/testimonies/new" className="btn btn-primary btn-sm">
          Ajouter un témoignage
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {testimonies.map((testimony) => (
        <div key={testimony.id} className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <Quote className="w-6 h-6 text-primary mb-2" />
            <p className="text-base-content/70 italic line-clamp-3">
              "{testimony.message}"
            </p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-base-200">
              <div>
                <p className="font-semibold">{testimony.client_name}</p>
                <p className="text-xs text-base-content/50">{formatDate(testimony.createdAt)}</p>
              </div>
              <div className="flex gap-1">
                <Link
                  href={`/dashboard/testimonies/${testimony.id}`}
                  className="btn btn-ghost btn-sm"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(testimony.id, testimony.client_name)}
                  disabled={isPending}
                  className="btn btn-ghost btn-sm text-error"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

