import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl mb-6">🌿</div>
        <h1 className="text-4xl font-bold mb-4">Page non trouvée</h1>
        <p className="text-base-content/70 mb-8 max-w-md mx-auto">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/" className="btn btn-primary gap-2">
            <Home className="w-4 h-4" />
            Accueil
          </Link>
          <Link href="/produits" className="btn btn-outline gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voir les produits
          </Link>
        </div>
      </div>
    </div>
  )
}

