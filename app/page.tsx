'use client'

import { useAuth } from '@/context/auth-context'
import { LoginPage } from '@/components/login-page'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { StatsCard } from '@/components/stats-card'
import { RevenueChart, UsersChart } from '@/components/chart'
import { UsersPage } from '@/components/users-page'
import { ProfilePage } from '@/components/profile-page'
import { BillingPage } from '@/components/billing-page'
import { ProductsPage } from '@/components/products-page'
import { CalendarPage } from '@/components/calendar-page'
import { SettingsPage } from '@/components/settings-page'
import { ReportsPage } from '@/components/reports-page'
import { ActivityPage } from '@/components/activity-page'
import { DraggableDashboard } from '@/components/draggable-dashboard'
import { NavigationProvider, useNavigation } from '@/components/navigation'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { DollarSign, Users, TrendingUp, Activity } from 'lucide-react'
import { useLanguage } from '@/context/language-context'

function DashboardContent() {
  const { currentPage } = useNavigation()
  const { t } = useLanguage()

  if (currentPage === 'perfil') return <ProfilePage />
  if (currentPage === 'usuarios') return <UsersPage />
  if (currentPage === 'facturacion') return <BillingPage />
  if (currentPage === 'productos') return <ProductsPage />
  if (currentPage === 'calendario') return <CalendarPage />
  if (currentPage === 'configuracion') return <SettingsPage />
  if (currentPage === 'reportes') return <ReportsPage />
  if (currentPage === 'actividad') return <ActivityPage />

  if (currentPage === 'analiticas') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">{t('analytics')}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart />
          <UsersChart />
        </div>
      </div>
    )
  }

  return <DraggableDashboard />
}

export default function Home() {
  const { user } = useAuth()

  if (!user) {
    return <LoginPage />
  }

  return (
    <NavigationProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-8">
            <Breadcrumbs />
            <DashboardContent />
          </main>
        </div>
      </div>
    </NavigationProvider>
  )
}