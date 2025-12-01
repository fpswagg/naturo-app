import type { Metadata } from 'next'
import { Phone, Facebook, Clock, MapPin } from 'lucide-react'
import { ContactForm } from '@/components/forms/ContactForm'
import { getAuthor } from '@/actions/authorActions'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez-nous pour toute question sur nos produits naturels.'
}

export default async function ContactPage() {
  const author = await getAuthor()

  return (
    <div className="bg-pattern min-h-screen py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Contactez-{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              moi
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            Une question sur un produit ? Besoin de conseils personnalisés ? 
            <br className="hidden sm:block" />
            N'hésitez pas à me contacter, je vous répondrai dans les plus brefs délais.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Contact Form - Larger on desktop */}
          <div className="lg:col-span-3 animate-fade-in-up stagger-1">
            <ContactForm />
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 space-y-6 animate-fade-in-up stagger-2">
            {/* Contact Methods */}
            <div className="card-naturo p-6 lg:p-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                Autres moyens de contact
              </h2>
              
              <div className="space-y-4">
                {author.links.whatsapp && (
                  <a
                    href={`https://wa.me/${author.links.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border-2 border-success/20 hover:border-success/40 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-success to-success/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Phone className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-base-content mb-1">WhatsApp</p>
                      <p className="text-sm text-base-content/70 font-medium">{author.links.whatsapp}</p>
                    </div>
                  </a>
                )}

                {author.links.facebook && (
                  <a
                    href={author.links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-2 border-blue-500/20 hover:border-blue-500/40 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Facebook className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-base-content mb-1">Facebook</p>
                      <p className="text-sm text-base-content/70 font-medium">Page Facebook</p>
                    </div>
                  </a>
                )}
              </div>
            </div>

            {/* Response Time */}
            <div className="card-naturo p-6 lg:p-8">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Horaires de réponse
              </h3>
              <div className="space-y-3 text-sm text-base-content/70">
                <p className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Je réponds généralement dans les <strong className="text-base-content">24 à 48 heures</strong> ouvrées</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-success mt-1">•</span>
                  <span>Pour une réponse plus rapide, <strong className="text-base-content">contactez-moi sur WhatsApp</strong></span>
                </p>
              </div>
            </div>

            {/* Location Info */}
            <div className="card-naturo p-6 lg:p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Localisation
              </h3>
              <div className="flex items-center gap-3">
                <div className="text-4xl">🇨🇲</div>
                <div className="text-sm text-base-content/70">
                  <p className="font-semibold text-base-content mb-1">Cameroun</p>
                  <p>Produits naturels d'Afrique centrale</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
