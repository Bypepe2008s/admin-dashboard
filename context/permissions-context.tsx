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
    const [role, setRole] = useState<Role>(() => {
        const stored = localStorage.getItem('userRole')
        return (stored as Role) || 'admin'
    })

    useEffect(() => {
        localStorage.setItem('userRole', role)
    }, [role])

    const permissions = rolePermissions[role]

    const hasPermission = (key: keyof Permission) => permissions[key]

    return (
        <PermissionsContext.Provider value={{ role, setRole, permissions, hasPermission }}>
            {children}
        </PermissionsContext.Provider>
    )
}

export const usePermissions = () => useContext(PermissionsContext)