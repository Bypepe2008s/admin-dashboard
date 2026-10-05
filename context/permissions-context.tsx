'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './auth-context'

type Role = 'admin' | 'editor' | 'viewer'

interface Permission {
    canViewDashboard: boolean
    canManageUsers: boolean
    canViewBilling: boolean
    canManageProducts: boolean
    canViewCalendar: boolean
    canViewAnalytics: boolean
    canViewSettings: boolean
    canExportData: boolean
}

const rolePermissions: Record<Role, Permission> = {
    admin: {
        canViewDashboard: true,
        canManageUsers: true,
        canViewBilling: true,
        canManageProducts: true,
        canViewCalendar: true,
        canViewAnalytics: true,
        canViewSettings: true,
        canExportData: true,
    },
    editor: {
        canViewDashboard: true,
        canManageUsers: true,
        canViewBilling: false,
        canManageProducts: true,
        canViewCalendar: true,
        canViewAnalytics: true,
        canViewSettings: false,
        canExportData: true,
    },
    viewer: {
        canViewDashboard: true,
        canManageUsers: false,
        canViewBilling: false,
        canManageProducts: false,
        canViewCalendar: true,
        canViewAnalytics: true,
        canViewSettings: false,
        canExportData: false,
    },
}

interface PermissionsContextType {
    role: Role
    setRole: (role: Role) => void
    permissions: Permission
    hasPermission: (key: keyof Permission) => boolean
}

const PermissionsContext = createContext<PermissionsContextType>({
    role: 'admin',
    setRole: () => { },
    permissions: rolePermissions.admin,
    hasPermission: () => true,
})

export function PermissionsProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth()

    // 1. Valor inicial seguro (sin localStorage)
    const [role, setRole] = useState<Role>('admin')
    const [mounted, setMounted] = useState(false)

    // 2. Leer localStorage SOLO cuando estamos en el navegador
    useEffect(() => {
        setMounted(true)
        const stored = typeof window !== 'undefined' ? localStorage.getItem('userRole') : null
        if (stored && ['admin', 'editor', 'viewer'].includes(stored)) {
            setRole(stored as Role)
        }
    }, [])

    const permissions = rolePermissions[role]
    const hasPermission = (key: keyof Permission) => permissions[key]

    // 3. Función segura para guardar
    const handleSetRole = (newRole: Role) => {
        setRole(newRole)
        if (typeof window !== 'undefined') {
            localStorage.setItem('userRole', newRole)
        }
    }

    // 4. Evitar renderizado en el servidor con datos incorrectos
    if (!mounted) {
        return (
            <PermissionsContext.Provider value={{ role: 'admin', setRole: handleSetRole, permissions: rolePermissions.admin, hasPermission }}>
                {children}
            </PermissionsContext.Provider>
        )
    }

    return (
        <PermissionsContext.Provider value={{ role, setRole: handleSetRole, permissions, hasPermission }}>
            {children}
        </PermissionsContext.Provider>
    )
}

export const usePermissions = () => useContext(PermissionsContext)