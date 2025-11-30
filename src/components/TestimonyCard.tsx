import { Quote } from 'lucide-react'
import type { Testimony } from '@/types'

interface TestimonyCardProps {
  testimony: Testimony
}

export function TestimonyCard({ testimony }: TestimonyCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(date))
  }

  return (
    <div className="card-naturo p-6 h-full flex flex-col">
      <Quote className="w-8 h-8 text-primary mb-4" />
      
      <p className="text-base-content/80 flex-1 italic leading-relaxed">
        "{testimony.message}"
      </p>
      
      <div className="mt-4 pt-4 border-t border-base-300">
        <p className="font-semibold text-primary">{testimony.client_name}</p>
        <p className="text-sm text-base-content/50">
          {formatDate(testimony.createdAt)}
        </p>
      </div>
    </div>
  )
}

