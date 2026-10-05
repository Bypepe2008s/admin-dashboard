'use client'

import { useNavigation } from './navigation'
import { useLanguage } from '@/context/language-context'
import { ChevronRight, Home } from 'lucide-react'

const pageLabels: Record<string, string> = {
    dashboard: 'dashboard',
    usuarios: 'users',
    analiticas: 'analytics',
    configuracion: 'settings',
    perfil: 'myProfile',
    facturacion: 'billing',
    productos: 'products',
    calendario: 'calendar',
    reportes: 'reports',
    actividad: 'activity',
}

export function Breadcrumbs() {
    const { currentPage } = useNavigation()
    const { t } = useLanguage()

    return (
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Home size={16} />
            <ChevronRight size={16} />
            <span className="text-foreground font-medium">{t(pageLabels[currentPage] || 'dashboard')}</span>
        </nav>
    )
}