'use client'

import { MessageCircle } from 'lucide-react'
import { trackWhatsAppClick } from '@/actions/trackingActions'

interface WhatsAppButtonProps {
  whatsapp: string
  productId: string
  productTitle: string
}

export function WhatsAppButton({ whatsapp, productId, productTitle }: WhatsAppButtonProps) {
  const handleClick = async () => {
    await trackWhatsAppClick(productId)
    
    const phone = whatsapp.replace(/[^0-9]/g, '')
    const message = encodeURIComponent(
      `Bonjour ! Je suis intéressé(e) par le produit "${productTitle}". Pouvez-vous me donner plus d'informations ?`
    )
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="btn btn-success btn-lg w-full gap-2"
    >
      <MessageCircle className="w-5 h-5" />
      Commander sur WhatsApp
    </button>
  )
}

