'use client'

import { useActivity } from '@/context/activity-context'
import { useLanguage } from '@/context/language-context'
import { Trash2, UserPlus, UserCheck, UserX, LogIn, Download } from 'lucide-react'
import { useState } from 'react'

const typeIcons: Record<string, any> = {
    create: UserPlus,
    update: UserCheck,
    delete: UserX,
    login: LogIn,
    export: Download,
}

const typeColors: Record<string, string> = {
    create: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    update: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    delete: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    login: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    export: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
}

export function ActivityPage() {
    const { activities, clearActivities } = useActivity()
    const { t } = useLanguage()
    const [filterType, setFilterType] = useState<string>('all')

    const filteredActivities = activities.filter(a =>
        filterType === 'all' || a.type === filterType
    )

    const typeLabels: Record<string, string> = {
        create: t('creation'),
        update: t('update'),
        delete: t('deletion'),
        login: t('login'),
        export: t('exportAction'),
    }

    // Traducir las acciones de actividad
    const actionTranslations: Record<string, string> = {
        'inició sesión': t('startedSession'),
        'creó usuario': t('createdUser'),
        'actualizó': t('updated'),
        'exportó': t('exported'),
        'eliminó': t('deleted'),
    }

    const targetTranslations: Record<string, string> = {
        'Sistema': t('system'),
        'Usuarios CSV': 'Users CSV',
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">{t('recentActivity')}</h2>
                <button
                    onClick={clearActivities}
                    className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2 text-foreground"
                >
                    <Trash2 size={20} />
                    {t('clearActivity')}
                </button>
            </div>

            <div className="flex gap-2 flex-wrap">
                <button
                    onClick={() => setFilterType('all')}
                    className={`px-4 py-2 rounded-lg border transition-colors ${filterType === 'all' ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-accent text-foreground'
                        }`}
                >
                    {t('allActivities')}
                </button>
                {Object.entries({
                    create: t('creation'),
                    update: t('update'),
                    delete: t('deletion'),
                    login: t('login'),
                    export: t('exportAction'),
                }).map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => setFilterType(key)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${filterType === key ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-accent text-foreground'
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
                {filteredActivities.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        {t('noActivity')}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredActivities.map(activity => {
                            const Icon = typeIcons[activity.type] || UserCheck
                            const translatedAction = actionTranslations[activity.action] || activity.action
                            const translatedTarget = targetTranslations[activity.target] || activity.target
                            return (
                                <div key={activity.id} className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                                    <div className={`p-2 rounded-lg ${typeColors[activity.type]}`}>
                                        <Icon size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-foreground">
                                            <span className="font-medium">{activity.user}</span>
                                            {' '}{translatedAction}{' '}
                                            <span className="font-medium">{translatedTarget}</span>
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-1">{activity.timestamp}</p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs rounded-full ${typeColors[activity.type]}`}>
                                        {typeLabels[activity.type]}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}