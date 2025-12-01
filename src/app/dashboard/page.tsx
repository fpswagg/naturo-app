import Link from 'next/link'
import { Package, MessageSquare, Eye } from 'lucide-react'

export default async function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-base-content/70">Bienvenue sur votre espace d'administration</p>
      </div>

      {/* Quick Actions */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body p-8">
          <h2 className="text-2xl font-bold mb-6">Actions rapides</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard/products/new" className="btn btn-primary btn-lg gap-3">
              <Package className="w-5 h-5" />
              Nouveau produit
            </Link>
            <Link href="/dashboard/testimonies/new" className="btn btn-outline btn-lg gap-3">
              <MessageSquare className="w-5 h-5" />
              Nouveau témoignage
            </Link>
            <Link href="/" target="_blank" className="btn btn-ghost btn-lg gap-3">
              <Eye className="w-5 h-5" />
              Voir le site
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
