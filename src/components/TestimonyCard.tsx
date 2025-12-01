import { MessageSquare, Quote } from 'lucide-react'

interface TestimonyCardProps {
  testimony: {
    id: string
    client_name: string
    message: string
    createdAt: Date
  }
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
    <div className="card-naturo p-8 h-full flex flex-col relative group">
      {/* Quote Icon Background */}
      <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
        <Quote className="w-24 h-24 text-primary" />
      </div>

      {/* Header */}
      <div className="flex items-start gap-4 mb-6 relative z-10">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-lg ring-4 ring-primary/10">
          <MessageSquare className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-base-content">{testimony.client_name}</h3>
          <p className="text-sm text-base-content/60 font-medium">{formatDate(testimony.createdAt)}</p>
        </div>
      </div>

      {/* Message */}
      <blockquote className="flex-1 relative z-10">
        <p className="text-base-content/80 leading-relaxed italic">
          "{testimony.message}"
        </p>
      </blockquote>

      {/* Bottom Accent */}
      <div className="mt-6 pt-6 border-t border-base-300 relative z-10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-yellow-400 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-base-content/50 font-medium ml-2">Client vérifié</span>
        </div>
      </div>
    </div>
  )
}
