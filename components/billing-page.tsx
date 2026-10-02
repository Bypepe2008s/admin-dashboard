'use client'

import { useState } from 'react'
import { Plus, Download, Filter } from 'lucide-react'
import { useToast } from '@/context/toast-context'

interface Invoice {
    id: number
    client: string
    amount: number
    date: string
    dueDate: string
    status: 'Pagada' | 'Pendiente' | 'Vencida'
}

const initialInvoices: Invoice[] = [
    { id: 1, client: 'Empresa ABC', amount: 2500, date: '2024-01-15', dueDate: '2024-02-15', status: 'Pagada' },
    { id: 2, client: 'Corp XYZ', amount: 1800, date: '2024-01-20', dueDate: '2024-02-20', status: 'Pendiente' },
    { id: 3, client: 'Tech Solutions', amount: 3200, date: '2024-01-10', dueDate: '2024-02-10', status: 'Vencida' },
    { id: 4, client: 'Digital Agency', amount: 1500, date: '2024-01-25', dueDate: '2024-02-25', status: 'Pendiente' },
    { id: 5, client: 'Startup Inc', amount: 4000, date: '2024-01-05', dueDate: '2024-02-05', status: 'Pagada' },
]

export function BillingPage() {
    const [invoices, setInvoices] = useState(initialInvoices)
    const [filterStatus, setFilterStatus] = useState<string>('all')
    const { showToast } = useToast()

    const filteredInvoices = invoices.filter(inv =>
        filterStatus === 'all' || inv.status === filterStatus
    )

    const totalAmount = filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0)
    const paidAmount = invoices.filter(inv => inv.status === 'Pagada').reduce((sum, inv) => sum + inv.amount, 0)
    const pendingAmount = invoices.filter(inv => inv.status === 'Pendiente').reduce((sum, inv) => sum + inv.amount, 0)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Facturación</h2>
                <button
                    onClick={() => showToast('Función en desarrollo', 'info')}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                    <Plus size={20} />
                    Nueva Factura
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Facturado</h3>
                    <p className="text-2xl font-bold text-foreground">${totalAmount.toLocaleString()}</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Pagado</h3>
                    <p className="text-2xl font-bold text-green-600">${paidAmount.toLocaleString()}</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Pendiente</h3>
                    <p className="text-2xl font-bold text-yellow-600">${pendingAmount.toLocaleString()}</p>
                </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-foreground">Facturas</h3>
                    <div className="flex gap-2">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="all">Todos los estados</option>
                            <option value="Pagada">Pagada</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Vencida">Vencida</option>
                        </select>
                        <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2 text-foreground">
                            <Download size={20} />
                            Exportar
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Cliente</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Monto</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Fecha</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Vencimiento</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInvoices.map((invoice) => (
                                <tr key={invoice.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                                    <td className="py-3 px-4 text-foreground">#{invoice.id}</td>
                                    <td className="py-3 px-4 text-foreground">{invoice.client}</td>
                                    <td className="py-3 px-4 text-foreground font-medium">${invoice.amount.toLocaleString()}</td>
                                    <td className="py-3 px-4 text-muted-foreground">{invoice.date}</td>
                                    <td className="py-3 px-4 text-muted-foreground">{invoice.dueDate}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 text-xs rounded-full ${invoice.status === 'Pagada'
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                : invoice.status === 'Pendiente'
                                                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                            }`}>
                                            {invoice.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}