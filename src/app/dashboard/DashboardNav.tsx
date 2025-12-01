'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  Leaf, 
  Package, 
  FolderTree, 
  MessageSquare, 
  Mail, 
  User, 
  LogOut,
  LayoutDashboard,
  Menu,
  X
} from 'lucide-react'
import { useState, useTransition } from 'react'
import { logout } from '@/lib/auth'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/products', label: 'Produits', icon: Package },
  { href: '/dashboard/categories', label: 'Catégories', icon: FolderTree },
  { href: '/dashboard/testimonies', label: 'Témoignages', icon: MessageSquare },
  { href: '/dashboard/messages', label: 'Messages', icon: Mail },
  { href: '/dashboard/author', label: 'Profil', icon: User },
]

export function DashboardNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    startTransition(async () => {
      await logout()
      router.push('/login')
    })
  }

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-base-100/90 border-b border-base-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold">Naturo</span>
              <span className="text-xs text-base-content/50 block">Dashboard</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                    isActive(item.href)
                      ? 'bg-primary text-white'
                      : 'hover:bg-primary/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link href="/" className="btn btn-ghost btn-sm hidden sm:flex">
              Voir le site
            </Link>
            <ThemeToggle />
            <button
              onClick={handleLogout}
              disabled={isPending}
              className="btn btn-ghost btn-sm text-error"
            >
              <LogOut className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-ghost btn-circle lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-base-300">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive(item.href)
                      ? 'bg-primary text-white'
                      : 'hover:bg-primary/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              )
            })}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium hover:bg-primary/10 mt-2 border-t border-base-300 pt-4"
            >
              Voir le site
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

