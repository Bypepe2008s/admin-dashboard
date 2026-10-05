'use client'

import { useState } from 'react'
import { DollarSign, Users, TrendingUp, Activity, GripVertical } from 'lucide-react'
import { StatsCard } from './stats-card'
import { RevenueChart, UsersChart } from './chart'
import { useLanguage } from '@/context/language-context'

interface Widget {
    id: string
    type: 'stats' | 'chart' | 'users-chart'
    titleKey: string
    visible: boolean
}

const defaultWidgets: Widget[] = [
    { id: 'revenue', type: 'stats', titleKey: 'revenue', visible: true },
    { id: 'users', type: 'stats', titleKey: 'users', visible: true },
    { id: 'conversion', type: 'stats', titleKey: 'conversion', visible: true },
    { id: 'response', type: 'stats', titleKey: 'response', visible: true },
    { id: 'revenue-chart', type: 'chart', titleKey: 'revenueChart', visible: true },
    { id: 'users-chart', type: 'users-chart', titleKey: 'usersChart', visible: true },
]

export function DraggableDashboard() {
    const [widgets, setWidgets] = useState<Widget[]>(defaultWidgets)
    const [draggedWidget, setDraggedWidget] = useState<string | null>(null)
    const { t } = useLanguage()

    const handleDragStart = (id: string) => {
        setDraggedWidget(id)
    }

    const handleDragOver = (e: React.DragEvent, id: string) => {
        e.preventDefault()
        if (draggedWidget === null || draggedWidget === id) return

        const draggedIndex = widgets.findIndex(w => w.id === draggedWidget)
        const dropIndex = widgets.findIndex(w => w.id === id)

        const newWidgets = [...widgets]
        const [removed] = newWidgets.splice(draggedIndex, 1)
        newWidgets.splice(dropIndex, 0, removed)
        setWidgets(newWidgets)
    }

    const handleDragEnd = () => {
        setDraggedWidget(null)
    }

    const toggleWidget = (id: string) => {
        setWidgets(widgets.map(w => w.id === id ? { ...w, visible: !w.visible } : w))
    }

    const renderWidget = (widget: Widget) => {
        switch (widget.type) {
            case 'stats':
                const statsMap: Record<string, { titleKey: string; value: string; change: string; icon: any; trend: 'up' | 'down' }> = {
                    revenue: { titleKey: 'totalRevenue', value: '$45,231', change: '+20.1%', icon: DollarSign, trend: 'up' },
                    users: { titleKey: 'activeUsers', value: '2,350', change: '+15.3%', icon: Users, trend: 'up' },
                    conversion: { titleKey: 'conversionRate', value: '12.5%', change: '+4.2%', icon: TrendingUp, trend: 'up' },
                    response: { titleKey: 'responseTime', value: '1.2s', change: '-8.1%', icon: Activity, trend: 'down' },
                }
                const stat = statsMap[widget.id]
                return stat ? <StatsCard title={t(stat.titleKey)} value={stat.value} change={stat.change} icon={stat.icon} trend={stat.trend} /> : null
            case 'chart':
                return <RevenueChart />
            case 'users-chart':
                return <UsersChart />
            default:
                return null
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">{t('dashboardCustomizable')}</h2>
                <p className="text-sm text-muted-foreground">{t('dragWidgets')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {widgets.filter(w => w.visible && w.type === 'stats').map(widget => (
                    <div
                        key={widget.id}
                        draggable
                        onDragStart={() => handleDragStart(widget.id)}
                        onDragOver={(e) => handleDragOver(e, widget.id)}
                        onDragEnd={handleDragEnd}
                        className={`relative cursor-move ${draggedWidget === widget.id ? 'opacity-50' : ''}`}
                    >
                        <div className="absolute -top-2 -left-2 p-1 bg-muted rounded cursor-move opacity-0 hover:opacity-100 transition-opacity z-10">
                            <GripVertical size={14} />
                        </div>
                        {renderWidget(widget)}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {widgets.filter(w => w.visible && w.type !== 'stats').map(widget => (
                    <div
                        key={widget.id}
                        draggable
                        onDragStart={() => handleDragStart(widget.id)}
                        onDragOver={(e) => handleDragOver(e, widget.id)}
                        onDragEnd={handleDragEnd}
                        className={`relative cursor-move ${draggedWidget === widget.id ? 'opacity-50' : ''}`}
                    >
                        <div className="absolute -top-2 -left-2 p-1 bg-muted rounded cursor-move opacity-0 hover:opacity-100 transition-opacity z-10">
                            <GripVertical size={14} />
                        </div>
                        {renderWidget(widget)}
                    </div>
                ))}
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">{t('personalizeWidgets')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {widgets.map(widget => (
                        <button
                            key={widget.id}
                            onClick={() => toggleWidget(widget.id)}
                            className={`px-4 py-2 rounded-lg border transition-colors text-sm ${widget.visible
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'border-border hover:bg-accent text-foreground'
                                }`}
                        >
                            {t(widget.titleKey)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}