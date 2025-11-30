import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { getTestimonyById, updateTestimony } from '@/actions/testimonyActions'
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
          <h1 className="card-title">Modifier le témoignage</h1>

          <EditTestimonyForm testimony={testimony} />
        </div>
      </div>
    </div>
  )
}
