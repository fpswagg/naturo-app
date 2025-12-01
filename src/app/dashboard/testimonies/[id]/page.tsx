import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getTestimonyById } from '@/actions/testimonyActions'
import { EditTestimonyForm } from './EditTestimonyForm'

interface EditTestimonyPageProps {
  params: Promise<{ id: string }>
}

export default async function EditTestimonyPage({ params }: EditTestimonyPageProps) {
  const { id } = await params
  const testimony = await getTestimonyById(id)

  if (!testimony) {
    redirect('/dashboard/testimonies')
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
          <h1 className="text-3xl font-bold mb-2">Modifier le témoignage</h1>
          <p className="text-base-content/70 mb-6">Mettez à jour le témoignage</p>

          <EditTestimonyForm testimony={testimony} />
        </div>
      </div>
    </div>
  )
}
