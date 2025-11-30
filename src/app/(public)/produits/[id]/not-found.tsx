import Link from 'next/link'
import { ArrowLeft, ShoppingBag } from 'lucide-react'

export default function ProductNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <ShoppingBag className="w-20 h-20 text-base-content/20 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Produit non trouvé</h1>
        <p className="text-base-content/70 mb-8 max-w-md mx-auto">
          Ce produit n'existe pas ou n'est plus disponible.
        </p>
        <Link href="/produits" className="btn btn-primary gap-2">
          <ArrowLeft className="w-4 h-4" />
          Voir tous les produits
        </Link>
      </div>
    </div>
  )
}

