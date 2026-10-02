'use client'

import { createContext, useContext, useState } from 'react'

type Page = 'dashboard' | 'usuarios' | 'analiticas' | 'configuracion' | 'perfil' | 'facturacion' | 'productos' | 'calendario' | 'reportes' | 'actividad'

const NavigationContext = createContext<{
    currentPage: Page
    setCurrentPage: (page: Page) => void
}>({
    currentPage: 'dashboard',
    setCurrentPage: () => null,
})

export function NavigationProvider({ children }: { children: React.ReactNode }) {
    const [currentPage, setCurrentPage] = useState<Page>('dashboard')

    return (
        <NavigationContext.Provider value={{ currentPage, setCurrentPage }}>
            {children}
        </NavigationContext.Provider>
    )
}

export const useNavigation = () => useContext(NavigationContext)