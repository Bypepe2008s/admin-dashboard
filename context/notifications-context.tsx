'use client'

import { createContext, useContext, useState } from 'react'

export interface Notification {
    id: number
    title: string
    message: string
    read: boolean
    timestamp: string
}

interface NotificationsContextType {
    notifications: Notification[]
    unreadCount: number
    markAsRead: (id: number) => void
    markAllAsRead: () => void
}

const initialNotifications: Notification[] = [
    { id: 1, title: 'Nuevo usuario', message: 'Juan Pérez se ha registrado', read: false, timestamp: 'Hace 5 min' },
    { id: 2, title: 'Venta completada', message: 'Se procesó una venta de $299', read: false, timestamp: 'Hace 1 hora' },
    { id: 3, title: 'Actualización del sistema', message: 'Nueva versión disponible', read: true, timestamp: 'Hace 2 horas' },
    { id: 4, title: 'Backup completado', message: 'Respaldo automático exitoso', read: true, timestamp: 'Hace 5 horas' },
]

const NotificationsContext = createContext<NotificationsContextType>({
    notifications: [],
    unreadCount: 0,
    markAsRead: () => { },
    markAllAsRead: () => { },
})

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

    const unreadCount = notifications.filter(n => !n.read).length

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ))
    }

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })))
    }

    return (
        <NotificationsContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead }}>
            {children}
        </NotificationsContext.Provider>
    )
}

export const useNotifications = () => useContext(NotificationsContext)