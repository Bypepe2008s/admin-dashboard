'use client'

import { createContext, useContext, useState } from 'react'

export interface Activity {
    id: number
    user: string
    action: string
    target: string
    timestamp: string
    type: 'create' | 'update' | 'delete' | 'login' | 'export'
}

interface ActivityContextType {
    activities: Activity[]
    addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void
    clearActivities: () => void
}

const initialActivities: Activity[] = [
    { id: 1, user: 'Admin', action: 'inició sesión', target: 'Sistema', timestamp: 'Hace 5 min', type: 'login' },
    { id: 2, user: 'Admin', action: 'creó usuario', target: 'Juan Pérez', timestamp: 'Hace 1 hora', type: 'create' },
    { id: 3, user: 'Admin', action: 'actualizó', target: 'María García', timestamp: 'Hace 2 horas', type: 'update' },
    { id: 4, user: 'Admin', action: 'exportó', target: 'Usuarios CSV', timestamp: 'Hace 3 horas', type: 'export' },
    { id: 5, user: 'Admin', action: 'eliminó', target: 'Carlos López', timestamp: 'Hace 5 horas', type: 'delete' },
]

const ActivityContext = createContext<ActivityContextType>({
    activities: [],
    addActivity: () => { },
    clearActivities: () => { },
})

export function ActivityProvider({ children }: { children: React.ReactNode }) {
    const [activities, setActivities] = useState<Activity[]>(initialActivities)

    const addActivity = (activity: Omit<Activity, 'id' | 'timestamp'>) => {
        const newActivity: Activity = {
            ...activity,
            id: Date.now(),
            timestamp: 'Ahora',
        }
        setActivities([newActivity, ...activities])
    }

    const clearActivities = () => {
        setActivities([])
    }

    return (
        <ActivityContext.Provider value={{ activities, addActivity, clearActivities }}>
            {children}
        </ActivityContext.Provider>
    )
}

export const useActivity = () => useContext(ActivityContext)