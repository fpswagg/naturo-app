import Link from 'next/link'
import { Package, FolderTree, MessageSquare, Mail, TrendingUp, Eye } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { getWhatsAppClicksStats } from '@/actions/trackingActions'

async function getStats() {
  const [products, categories, testimonies, messages, unreadMessages, whatsappStats] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.testimony.count(),
    prisma.message.count(),
    prisma.message.count({ where: { isRead: false } }),
    getWhatsAppClicksStats()
  ])

  return {
    products,
    categories,
    testimonies,
    messages,
    unreadMessages,
    whatsappStats
  }
}

export default async function DashboardPage() {
  const stats = await getStats()

  const cards = [
    {
      title: 'Produits',
      value: stats.products,
      icon: Package,
      href: '/dashboard/products',
      color: 'bg-primary'
    },
    {
      title: 'Catégories',
      value: stats.categories,
      icon: FolderTree,
      href: '/dashboard/categories',
      color: 'bg-accent'
    },
    {
      title: 'Témoignages',
      value: stats.testimonies,
      icon: MessageSquare,
      href: '/dashboard/testimonies',
      color: 'bg-secondary'
    },
    {
      title: 'Messages',
      value: stats.messages,
      badge: stats.unreadMessages > 0 ? stats.unreadMessages : undefined,
      icon: Mail,
      href: '/dashboard/messages',
      color: 'bg-info'
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-base-content/70">Bienvenue sur votre espace d'administration</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.href}
              href={card.href}
              className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {card.badge && (
                    <span className="badge badge-error">{card.badge} nouveau{card.badge > 1 ? 'x' : ''}</span>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold">{card.value}</p>
                  <p className="text-base-content/70">{card.title}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* WhatsApp Stats */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-success" />
            Statistiques WhatsApp
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="stat bg-success/10 rounded-xl">
              <div className="stat-title">Total clics</div>
              <div className="stat-value text-success">{stats.whatsappStats.total}</div>
              <div className="stat-desc">Depuis le début</div>
            </div>
            <div className="stat bg-primary/10 rounded-xl">
              <div className="stat-title">7 derniers jours</div>
              <div className="stat-value text-primary">{stats.whatsappStats.last7Days}</div>
              <div className="stat-desc">Clics récents</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Actions rapides</h2>
          <div className="flex flex-wrap gap-3 mt-4">
            <Link href="/dashboard/products/new" className="btn btn-primary">
              <Package className="w-4 h-4" />
              Nouveau produit
            </Link>
            <Link href="/dashboard/testimonies/new" className="btn btn-outline">
              <MessageSquare className="w-4 h-4" />
              Nouveau témoignage
            </Link>
            <Link href="/" target="_blank" className="btn btn-ghost">
              <Eye className="w-4 h-4" />
              Voir le site
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

