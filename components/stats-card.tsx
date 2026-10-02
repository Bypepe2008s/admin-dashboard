import { LucideIcon } from 'lucide-react'
interface StatsCardProps { title: string; value: string; change: string; icon: LucideIcon; trend: 'up' | 'down' }
export function StatsCard({ title, value, change, icon: Icon, trend }: StatsCardProps) {
    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-primary/10 rounded-lg"><Icon className="text-primary" size={24} /></div>
                <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>{change}</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
            <p className="text-sm text-muted-foreground">{title}</p>
        </div>
    )
}