'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { useTheme } from './theme-provider'
import { useLanguage } from '@/context/language-context'
import { Download, Calendar } from 'lucide-react'

type DateRange = '7d' | '30d' | '3m' | '1y'

const dataByRange: Record<DateRange, { key: string; revenue: number; users: number; orders: number }[]> = {
    '7d': [
        { key: 'mon', revenue: 1200, users: 320, orders: 45 },
        { key: 'tue', revenue: 1800, users: 450, orders: 62 },
        { key: 'wed', revenue: 1500, users: 380, orders: 51 },
        { key: 'thu', revenue: 2200, users: 520, orders: 78 },
        { key: 'fri', revenue: 2800, users: 680, orders: 95 },
        { key: 'sat', revenue: 1900, users: 420, orders: 58 },
        { key: 'sun', revenue: 1400, users: 310, orders: 42 },
    ],
    '30d': Array.from({ length: 30 }, (_, i) => ({
        key: `d${i + 1}`,
        revenue: Math.floor(Math.random() * 3000) + 1000,
        users: Math.floor(Math.random() * 500) + 200,
        orders: Math.floor(Math.random() * 100) + 30,
    })),
    '3m': [
        { key: 'week1', revenue: 12000, users: 2400, orders: 320 },
        { key: 'week2', revenue: 15000, users: 2800, orders: 380 },
        { key: 'week3', revenue: 18000, users: 3200, orders: 420 },
        { key: 'week4', revenue: 22000, users: 3800, orders: 510 },
        { key: 'week5', revenue: 19000, users: 3400, orders: 450 },
        { key: 'week6', revenue: 25000, users: 4200, orders: 580 },
    ],
    '1y': [
        { key: 'jan', revenue: 45000, users: 8200, orders: 1200 },
        { key: 'feb', revenue: 52000, users: 9100, orders: 1350 },
        { key: 'mar', revenue: 48000, users: 8800, orders: 1280 },
        { key: 'apr', revenue: 61000, users: 10500, orders: 1520 },
        { key: 'may', revenue: 58000, users: 10200, orders: 1480 },
        { key: 'jun', revenue: 67000, users: 11800, orders: 1680 },
        { key: 'jul', revenue: 72000, users: 12500, orders: 1820 },
        { key: 'aug', revenue: 69000, users: 12100, orders: 1750 },
        { key: 'sep', revenue: 75000, users: 13200, orders: 1920 },
        { key: 'oct', revenue: 81000, users: 14100, orders: 2050 },
        { key: 'nov', revenue: 78000, users: 13800, orders: 1980 },
        { key: 'dec', revenue: 92000, users: 15500, orders: 2280 },
    ],
}

const dayTranslations: Record<string, string> = {
    mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun',
    week1: 'Week 1', week2: 'Week 2', week3: 'Week 3', week4: 'Week 4', week5: 'Week 5', week6: 'Week 6',
}

const pieDataKeys = ['direct', 'organic', 'referred', 'social', 'emailTraffic']
const pieDataValues = [35, 28, 20, 12, 5]
const pieDataColors = ['#3b82f6', '#10b981', '#f97316', '#8b5cf6', '#ec4899']

export function ReportsPage() {
    const [dateRange, setDateRange] = useState<DateRange>('30d')
    const { theme } = useTheme()
    const { t } = useLanguage()

    const data = dataByRange[dateRange].map(d => ({
        ...d,
        name: dayTranslations[d.key] || t(d.key) || d.key,
    }))

    const axisColor = theme === 'dark' ? '#94a3b8' : '#64748b'
    const gridColor = theme === 'dark' ? '#334155' : '#e2e8f0'

    const totalRevenue = data.reduce((sum: number, d) => sum + d.revenue, 0)
    const totalUsers = data.reduce((sum: number, d) => sum + d.users, 0)
    const totalOrders = data.reduce((sum: number, d) => sum + d.orders, 0)
    const avgRevenue = Math.round(totalRevenue / data.length)

    const rangeLabels: Record<DateRange, string> = {
        '7d': t('last7Days'),
        '30d': t('last30Days'),
        '3m': t('last3Months'),
        '1y': t('lastYear'),
    }

    const pieData = pieDataKeys.map((key, i) => ({
        name: t(key),
        value: pieDataValues[i],
        color: pieDataColors[i],
    }))

    const topProducts = [
        { name: 'Product A', sales: 1250, revenue: 37500 },
        { name: 'Product B', sales: 980, revenue: 29400 },
        { name: 'Product C', sales: 756, revenue: 22680 },
        { name: 'Product D', sales: 623, revenue: 18690 },
        { name: 'Product E', sales: 445, revenue: 13350 },
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">{t('advancedReports')}</h2>
                <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2 text-foreground">
                    <Download size={20} />
                    {t('exportPDF')}
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
                    <p className="text-sm text-muted-foreground mb-1">{t('totalRevenuePeriod')}</p>
                    <p className="text-2xl font-bold text-foreground">${totalRevenue.toLocaleString()}</p>
                    <p className="text-xs text-green-600 mt-2">+12.5% {t('vsPreviousPeriod')}</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                    <p className="text-sm text-muted-foreground mb-1">{t('newUsers')}</p>
                    <p className="text-2xl font-bold text-foreground">{totalUsers.toLocaleString()}</p>
                    <p className="text-xs text-green-600 mt-2">+8.3% {t('vsPreviousPeriod')}</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                    <p className="text-sm text-muted-foreground mb-1">{t('orders')}</p>
                    <p className="text-2xl font-bold text-foreground">{totalOrders.toLocaleString()}</p>
                    <p className="text-xs text-green-600 mt-2">+15.7% {t('vsPreviousPeriod')}</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                    <p className="text-sm text-muted-foreground mb-1">{t('avgRevenue')}</p>
                    <p className="text-2xl font-bold text-foreground">${avgRevenue.toLocaleString()}</p>
                    <p className="text-xs text-green-600 mt-2">+5.2% {t('vsPreviousPeriod')}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">{t('revenuePerPeriod')}</h3>
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
                    <h3 className="text-lg font-semibold text-foreground mb-4">{t('activeUsersPeriod')}</h3>
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
                    <h3 className="text-lg font-semibold text-foreground mb-4">{t('trafficSources')}</h3>
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
                                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
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
                    <h3 className="text-lg font-semibold text-foreground mb-4">{t('topProducts')}</h3>
                    <div className="space-y-3">
                        {topProducts.map((product, i) => (
                            <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                                <div>
                                    <p className="font-medium text-foreground">{product.name}</p>
                                    <p className="text-sm text-muted-foreground">{product.sales} {t('sales')}</p>
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