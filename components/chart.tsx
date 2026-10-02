'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { useTheme } from './theme-provider'

const data = [
    { name: 'Ene', ingresos: 4000, usuarios: 2400 },
    { name: 'Feb', ingresos: 3000, usuarios: 1398 },
    { name: 'Mar', ingresos: 2000, usuarios: 9800 },
    { name: 'Abr', ingresos: 2780, usuarios: 3908 },
    { name: 'May', ingresos: 1890, usuarios: 4800 },
    { name: 'Jun', ingresos: 2390, usuarios: 3800 },
    { name: 'Jul', ingresos: 3490, usuarios: 4300 },
]

export function RevenueChart() {
    const { theme } = useTheme()
    const axisColor = theme === 'dark' ? '#94a3b8' : '#64748b'
    const gridColor = theme === 'dark' ? '#334155' : '#e2e8f0'

    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Ingresos Mensuales</h3>
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
    const axisColor = theme === 'dark' ? '#94a3b8' : '#64748b'
    const gridColor = theme === 'dark' ? '#334155' : '#e2e8f0'

    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Usuarios Activos</h3>
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