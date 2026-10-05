'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { useTheme } from './theme-provider'
import { useLanguage } from '@/context/language-context'

const baseData = [
    { key: 'jan', ingresos: 4000, usuarios: 2400 },
    { key: 'feb', ingresos: 3000, usuarios: 1398 },
    { key: 'mar', ingresos: 2000, usuarios: 9800 },
    { key: 'apr', ingresos: 2780, usuarios: 3908 },
    { key: 'may', ingresos: 1890, usuarios: 4800 },
    { key: 'jun', ingresos: 2390, usuarios: 3800 },
    { key: 'jul', ingresos: 3490, usuarios: 4300 },
]

export function RevenueChart() {
    const { theme } = useTheme()
    const { t } = useLanguage()
    const axisColor = theme === 'dark' ? '#94a3b8' : '#64748b'
    const gridColor = theme === 'dark' ? '#334155' : '#e2e8f0'

    const data = baseData.map(d => ({ ...d, name: t(d.key) }))

    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t('monthlyRevenue')}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(221.2, 83.2%, 53.3%)" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="hsl(221.2, 83.2%, 53.3%)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="name" stroke={axisColor} tick={{ fill: axisColor }} />
                    <YAxis stroke={axisColor} tick={{ fill: axisColor }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                            border: `1px solid ${gridColor}`,
                            borderRadius: '8px',
                            color: theme === 'dark' ? '#f8fafc' : '#0f172a'
                        }}
                    />
                    <Area type="monotone" dataKey="ingresos" stroke="hsl(221.2, 83.2%, 53.3%)" fillOpacity={1} fill="url(#colorIngresos)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export function UsersChart() {
    const { theme } = useTheme()
    const { t } = useLanguage()
    const axisColor = theme === 'dark' ? '#94a3b8' : '#64748b'
    const gridColor = theme === 'dark' ? '#334155' : '#e2e8f0'

    const data = baseData.map(d => ({ ...d, name: t(d.key) }))

    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t('activeUsersChart')}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="name" stroke={axisColor} tick={{ fill: axisColor }} />
                    <YAxis stroke={axisColor} tick={{ fill: axisColor }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                            border: `1px solid ${gridColor}`,
                            borderRadius: '8px',
                            color: theme === 'dark' ? '#f8fafc' : '#0f172a'
                        }}
                    />
                    <Line type="monotone" dataKey="usuarios" stroke="hsl(221.2, 83.2%, 53.3%)" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}