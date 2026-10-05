'use client'

import { LayoutDashboard, Users, Settings, BarChart3, Moon, Sun, FileText, Package, Calendar, Activity, TrendingUp } from 'lucide-react'
import { useTheme } from './theme-provider'
import { useNavigation } from './navigation'
import { useLanguage } from '@/context/language-context'
import { usePermissions } from '@/context/permissions-context'

export function Sidebar() {
    const { theme, setTheme } = useTheme()
    const { currentPage, setCurrentPage } = useNavigation()
    const { t } = useLanguage()
    const { hasPermission } = usePermissions()

    const menuItems = [
        { id: 'dashboard' as const, label: 'dashboard', icon: LayoutDashboard, perm: 'canViewDashboard' as const },
        { id: 'usuarios' as const, label: 'users', icon: Users, perm: 'canManageUsers' as const },
        { id: 'facturacion' as const, label: 'billing', icon: FileText, perm: 'canViewBilling' as const },
        { id: 'productos' as const, label: 'products', icon: Package, perm: 'canManageProducts' as const },
        { id: 'calendario' as const, label: 'calendar', icon: Calendar, perm: 'canViewCalendar' as const },
        { id: 'reportes' as const, label: 'reports', icon: TrendingUp, perm: 'canViewAnalytics' as const },
        { id: 'analiticas' as const, label: 'analytics', icon: BarChart3, perm: 'canViewAnalytics' as const },
        { id: 'actividad' as const, label: 'activity', icon: Activity, perm: 'canViewDashboard' as const },
        { id: 'configuracion' as const, label: 'settings', icon: Settings, perm: 'canViewSettings' as const },
    ]

    const visibleItems = menuItems.filter(item => hasPermission(item.perm))

    return (
        <aside className="w-64 bg-card border-r border-border min-h-screen p-4">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-xl font-bold text-foreground">AdminPro</h1>
                <button
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    className="p-2 rounded-lg hover:bg-accent transition-colors"
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
            </div>

            <nav className="space-y-2">
                {visibleItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setCurrentPage(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${currentPage === item.id
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-accent text-foreground'
                            }`}
                    >
                        <item.icon size={20} />
                        <span>{t(item.label)}</span>
                    </button>
                ))}
            </nav>
        </aside>
    )
}