import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getTestimonies } from '@/actions/testimonyActions'
import { TestimonyList } from './TestimonyList'

export default async function TestimoniesPage() {
  const testimonies = await getTestimonies()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Témoignages</h1>
          <p className="text-base-content/70">{testimonies.length} témoignage{testimonies.length > 1 ? 's' : ''}</p>
        </div>
        <Link href="/dashboard/testimonies/new" className="btn btn-primary gap-2">
          <Plus className="w-4 h-4" />
          Nouveau
        </Link>
      </div>

      <TestimonyList testimonies={testimonies} />
    </div>
  )
}

