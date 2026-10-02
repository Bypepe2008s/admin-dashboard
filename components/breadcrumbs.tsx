'use client'

import { useNavigation } from './navigation'
import { ChevronRight, Home } from 'lucide-react'

const pageLabels: Record<string, string> = {
    dashboard: 'Dashboard',
    usuarios: 'Usuarios',
    analiticas: 'Analíticas',
    configuracion: 'Configuración',
    perfil: 'Mi Perfil',
}

export function Breadcrumbs() {
    const { currentPage } = useNavigation()

    return (
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Home size={16} />
            <ChevronRight size={16} />
            <span className="text-foreground font-medium">{pageLabels[currentPage] || 'Dashboard'}</span>
        </nav>
    )
}