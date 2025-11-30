import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { DashboardNav } from './DashboardNav'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authenticated = await isAuthenticated()
  
  if (!authenticated) {
    redirect('/dashboard/login')
  }

  return (
    <div className="min-h-screen bg-base-200">
      <DashboardNav />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}

