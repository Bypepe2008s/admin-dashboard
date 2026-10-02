'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { useTheme } from './theme-provider'
import { useLanguage } from '@/context/language-context'
import { Download, Calendar } from 'lucide-react'

type DateRange = '7d' | '30d' | '3m' | '1y'

const dataByRange: Record<DateRange, { name: string; revenue: number; users: number; orders: number }[]> = {
    '7d': [
        { name: 'Lun', revenue: 1200, users: 320, orders: 45 },
        { name: 'Mar', revenue: 1800, users: 450, orders: 62 },
        { name: 'Mié', revenue: 1500, users: 380, orders: 51 },
        { name: 'Jue', revenue: 2200, users: 520, orders: 78 },
        { name: 'Vie', revenue: 2800, users: 680, orders: 95 },
        { name: 'Sáb', revenue: 1900, users: 420, orders: 58 },
        { name: 'Dom', revenue: 1400, users: 310, orders: 42 },
    ],
    '30d': Array.from({ length: 30 }, (_, i) => ({
        name: `D${i + 1}`,
        revenue: Math.floor(Math.random() * 3000) + 1000,
        users: Math.floor(Math.random() * 500) + 200,
        orders: Math.floor(Math.random() * 100) + 30,
    })),
    '3m': [
        { name: 'Sem 1', revenue: 12000, users: 2400, orders: 320 },
        { name: 'Sem 2', revenue: 15000, users: 2800, orders: 380 },
        { name: 'Sem 3', revenue: 18000, users: 3200, orders: 420 },
        { name: 'Sem 4', revenue: 22000, users: 3800, orders: 510 },
        { name: 'Sem 5', revenue: 19000, users: 3400, orders: 450 },
        { name: 'Sem 6', revenue: 25000, users: 4200, orders: 580 },
    ],
    '1y': [
        { name: 'Ene', revenue: 45000, users: 8200, orders: 1200 },
        { name: 'Feb', revenue: 52000, users: 9100, orders: 1350 },
        { name: 'Mar', revenue: 48000, users: 8800, orders: 1280 },
        { name: 'Abr', revenue: 61000, users: 10500, orders: 1520 },
        { name: 'May', revenue: 58000, users: 10200, orders: 1480 },
        { name: 'Jun', revenue: 67000, users: 11800, orders: 1680 },
        { name: 'Jul', revenue: 72000, users: 12500, orders: 1820 },
        { name: 'Ago', revenue: 69000, users: 12100, orders: 1750 },
        { name: 'Sep', revenue: 75000, users: 13200, orders: 1920 },
        { name: 'Oct', revenue: 81000, users: 14100, orders: 2050 },
        { name: 'Nov', revenue: 78000, users: 13800, orders: 1980 },
        { name: 'Dic', revenue: 92000, users: 15500, orders: 2280 },
    ],
}

const pieData = [
    { name: 'Directo', value: 35, color: '#3b82f6' },
    { name: 'Orgánico', value: 28, color: '#10b981' },
    { name: 'Referido', value: 20, color: '#f97316' },
    { name: 'Social', value: 12, color: '#8b5cf6' },
    { name: 'Email', value: 5, color: '#ec4899' },
]

export function ReportsPage() {
    const [dateRange, setDateRange] = useState<DateRange>('30d')
    const { theme } = useTheme()
    const { t } = useLanguage()

    const data = dataByRange[dateRange]
    const axisColor = theme === 'dark' ? '#94a3b8' : '#64748b'
    const gridColor = theme === 'dark' ? '#334155' : '#e2e8f0'

    const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0)
    const totalUsers = data.reduce((sum, d) => sum + d.users, 0)
    const totalOrders = data.reduce((sum, d) => sum + d.orders, 0)
    const avgRevenue = Math.round(totalRevenue / data.length)

    const rangeLabels: Record<DateRange, string> = {
        '7d': 'Últimos 7 días',
        '30d': 'Últimos 30 días',
        '3m': 'Últimos 3 meses',
        '1y': 'Último año',
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Reportes Avanzados</h2>
                <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2 text-foreground">
                    <Download size={20} />
                    Exportar PDF
                </button>
            </div>

            <div className="flex gap-2 flex-wrap">
                {(Object.keys(rangeLabels) as DateRange[]).map(range => (
                    <button
                        key={range}
                        onClick={() => setDateRange(range)}
                        className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-2 ${dateRange === range
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'border-border hover:bg-accent text-foreground'
                            }`}
                    >
                        <Calendar size={16} />
                        {rangeLabels[range]}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-card border border-border rounded-lg p-6">
                    <p className="text-sm text-muted-foreground mb-1">Ingresos Totales</p>
                    <p className="text-2xl font-bold text-foreground">${totalRevenue.toLocaleString()}</p>
                    <p className="text-xs text-green-600 mt-2">+12.5% vs período anterior</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                    <p className="text-sm text-muted-foreground mb-1">Nuevos Usuarios</p>
                    <p className="text-2xl font-bold text-foreground">{totalUsers.toLocaleString()}</p>
                    <p className="text-xs text-green-600 mt-2">+8.3% vs período anterior</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                    <p className="text-sm text-muted-foreground mb-1">Pedidos</p>
                    <p className="text-2xl font-bold text-foreground">{totalOrders.toLocaleString()}</p>
                    <p className="text-xs text-green-600 mt-2">+15.7% vs período anterior</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                    <p className="text-sm text-muted-foreground mb-1">Ingreso Promedio</p>
                    <p className="text-2xl font-bold text-foreground">${avgRevenue.toLocaleString()}</p>
                    <p className="text-xs text-green-600 mt-2">+5.2% vs período anterior</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Ingresos por período</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
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
                            <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Usuarios activos</h3>
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
                            <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Fuentes de tráfico</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Top productos</h3>
                    <div className="space-y-3">
                        {[
                            { name: 'Producto A', sales: 1250, revenue: 37500 },
                            { name: 'Producto B', sales: 980, revenue: 29400 },
                            { name: 'Producto C', sales: 756, revenue: 22680 },
                            { name: 'Producto D', sales: 623, revenue: 18690 },
                            { name: 'Producto E', sales: 445, revenue: 13350 },
                        ].map((product, i) => (
                            <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                                <div>
                                    <p className="font-medium text-foreground">{product.name}</p>
                                    <p className="text-sm text-muted-foreground">{product.sales} ventas</p>
                                </div>
                                <p className="font-bold text-foreground">${product.revenue.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}