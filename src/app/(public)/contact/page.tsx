import type { Metadata } from 'next'
import { Mail, Phone, Facebook } from 'lucide-react'
import { ContactForm } from '@/components/forms/ContactForm'
import { getAuthor } from '@/actions/authorActions'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez-nous pour toute question sur nos produits naturels.'
}

export default async function ContactPage() {
  const author = await getAuthor()

  return (
    <div className="bg-pattern min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Contactez-{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              moi
            </span>
          </h1>
          <p className="text-base-content/70 max-w-xl mx-auto">
            Une question sur un produit ? Besoin de conseils ? 
            N'hésitez pas à me contacter, je vous répondrai dans les plus brefs délais.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="card-naturo p-6">
              <h2 className="text-xl font-bold mb-6">Autres moyens de contact</h2>
              
              <div className="space-y-4">
                {author.links.whatsapp && (
                  <a
                    href={`https://wa.me/${author.links.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-success/10 hover:bg-success/20 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-base-content/70">{author.links.whatsapp}</p>
                    </div>
                  </a>
                )}

                {author.links.facebook && (
                  <a
                    href={author.links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                      <Facebook className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Facebook</p>
                      <p className="text-base-content/70">Page Facebook</p>
                    </div>
                  </a>
                )}
              </div>
            </div>

            <div className="card-naturo p-6">
              <h3 className="font-semibold mb-3">Horaires de réponse</h3>
              <p className="text-base-content/70">
                Je réponds généralement dans les 24 à 48 heures ouvrées.
                Pour une réponse plus rapide, contactez-moi sur WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
