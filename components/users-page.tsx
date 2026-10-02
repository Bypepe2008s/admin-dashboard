'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, Trash2, Edit, X, Search, Download, ArrowUpDown, CheckSquare, Square } from 'lucide-react'
import { useToast } from '@/context/toast-context'
import { useLanguage } from '@/context/language-context'
import { EmptyState, TableSkeleton } from './loading'

interface User {
    id: number
    name: string
    email: string
    role: 'Admin' | 'Editor' | 'Usuario'
    status: 'Activo' | 'Inactivo'
}

const initialUsers: User[] = [
    { id: 1, name: 'Juan Pérez', email: 'juan@empresa.com', role: 'Admin', status: 'Activo' },
    { id: 2, name: 'María García', email: 'maria@empresa.com', role: 'Editor', status: 'Activo' },
    { id: 3, name: 'Carlos López', email: 'carlos@empresa.com', role: 'Usuario', status: 'Inactivo' },
    { id: 4, name: 'Ana Martínez', email: 'ana@empresa.com', role: 'Editor', status: 'Activo' },
    { id: 5, name: 'Pedro Sánchez', email: 'pedro@empresa.com', role: 'Usuario', status: 'Activo' },
    { id: 6, name: 'Laura Rodríguez', email: 'laura@empresa.com', role: 'Admin', status: 'Activo' },
    { id: 7, name: 'Miguel Fernández', email: 'miguel@empresa.com', role: 'Usuario', status: 'Inactivo' },
    { id: 8, name: 'Sofía Torres', email: 'sofia@empresa.com', role: 'Editor', status: 'Activo' },
    { id: 9, name: 'Diego Ramírez', email: 'diego@empresa.com', role: 'Usuario', status: 'Activo' },
    { id: 10, name: 'Isabella Morales', email: 'isabella@empresa.com', role: 'Admin', status: 'Activo' },
    { id: 11, name: 'Andrés Vargas', email: 'andres@empresa.com', role: 'Usuario', status: 'Inactivo' },
    { id: 12, name: 'Valentina Cruz', email: 'valentina@empresa.com', role: 'Editor', status: 'Activo' },
]

type SortField = 'name' | 'email' | 'role' | 'status'
type SortDirection = 'asc' | 'desc'

export function UsersPage() {
    const [users, setUsers] = useState<User[]>(initialUsers)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [editingUser, setEditingUser] = useState<User | null>(null)
    const [selectedUsers, setSelectedUsers] = useState<number[]>([])
    const [sortField, setSortField] = useState<SortField>('name')
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
    const [isLoading, setIsLoading] = useState(false)
    const usersPerPage = 5
    const { showToast } = useToast()
    const { t } = useLanguage()

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortField(field)
            setSortDirection('asc')
        }
    }

    const filteredUsers = users
        .filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const aVal = a[sortField]
            const bVal = b[sortField]
            const modifier = sortDirection === 'asc' ? 1 : -1
            return aVal < bVal ? -1 * modifier : 1 * modifier
        })

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

    const handleDelete = (id: number) => {
        if (confirm(t('delete') + '?')) {
            setUsers(users.filter(user => user.id !== id))
            showToast(t('user') + ' ' + t('delete').toLowerCase(), 'success')
        }
    }

    const handleDeleteSelected = () => {
        if (selectedUsers.length === 0) return
        if (confirm(`${selectedUsers.length} ${t('users')}?`)) {
            setUsers(users.filter(user => !selectedUsers.includes(user.id)))
            setSelectedUsers([])
            showToast(`${selectedUsers.length} ${t('users')} ${t('delete').toLowerCase()}`, 'success')
        }
    }

    const handleEdit = (user: User) => {
        setEditingUser(user)
        setShowModal(true)
    }

    const handleAdd = () => {
        setEditingUser(null)
        setShowModal(true)
    }

    const handleSave = (user: User) => {
        if (editingUser) {
            setUsers(users.map(u => u.id === user.id ? user : u))
            showToast(t('user') + ' actualizado', 'success')
        } else {
            setUsers([...users, { ...user, id: Math.max(...users.map(u => u.id)) + 1 }])
            showToast(t('user') + ' agregado', 'success')
        }
        setShowModal(false)
        setEditingUser(null)
    }

    const handleSelectAll = () => {
        if (selectedUsers.length === currentUsers.length) {
            setSelectedUsers([])
        } else {
            setSelectedUsers(currentUsers.map(u => u.id))
        }
    }

    const handleSelectUser = (id: number) => {
        setSelectedUsers(prev =>
            prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
        )
    }

    const exportToCSV = () => {
        const headers = ['Name', 'Email', 'Role', 'Status']
        const rows = filteredUsers.map(user => [user.name, user.email, user.role, user.status])
        const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'users.csv'
        a.click()
        showToast('CSV exported', 'success')
    }

    const handleSearch = (term: string) => {
        setIsLoading(true)
        setSearchTerm(term)
        setCurrentPage(1)
        setTimeout(() => setIsLoading(false), 500)
    }

    const getRoleTranslation = (role: string) => {
        const map: Record<string, string> = {
            'Admin': t('admin'),
            'Editor': t('editor'),
            'Usuario': t('user'),
        }
        return map[role] || role
    }

    const getStatusTranslation = (status: string) => {
        const map: Record<string, string> = {
            'Activo': t('active'),
            'Inactivo': t('inactive'),
        }
        return map[status] || status
    }

    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">{t('userManagement')}</h3>
                <div className="flex gap-2">
                    <button
                        onClick={exportToCSV}
                        className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2 text-foreground"
                    >
                        <Download size={20} />
                        {t('exportCSV')}
                    </button>
                    <button
                        onClick={handleAdd}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                        <Plus size={20} />
                        {t('addUser')}
                    </button>
                </div>
            </div>

            <div className="mb-4 flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                    <input
                        type="text"
                        placeholder={t('search') + '...'}
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                {selectedUsers.length > 0 && (
                    <button
                        onClick={handleDeleteSelected}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                        <Trash2 size={20} />
                        {t('delete')} ({selectedUsers.length})
                    </button>
                )}
            </div>

            {isLoading ? (
                <TableSkeleton />
            ) : filteredUsers.length === 0 ? (
                <EmptyState
                    title={t('noUsers')}
                    description={searchTerm ? 'No results' : t('noUsersDesc')}
                    action={
                        !searchTerm && (
                            <button
                                onClick={handleAdd}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                            >
                                <Plus size={20} />
                                {t('addUser')}
                            </button>
                        )
                    }
                />
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 px-4">
                                        <button onClick={handleSelectAll} className="hover:opacity-70">
                                            {selectedUsers.length === currentUsers.length ? (
                                                <CheckSquare size={20} className="text-primary" />
                                            ) : (
                                                <Square size={20} className="text-muted-foreground" />
                                            )}
                                        </button>
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                                        <button onClick={() => handleSort('name')} className="flex items-center gap-1 hover:text-foreground">
                                            {t('name')}
                                            <ArrowUpDown size={14} />
                                        </button>
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                                        <button onClick={() => handleSort('email')} className="flex items-center gap-1 hover:text-foreground">
                                            {t('email')}
                                            <ArrowUpDown size={14} />
                                        </button>
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                                        <button onClick={() => handleSort('role')} className="flex items-center gap-1 hover:text-foreground">
                                            {t('role')}
                                            <ArrowUpDown size={14} />
                                        </button>
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                                        <button onClick={() => handleSort('status')} className="flex items-center gap-1 hover:text-foreground">
                                            {t('status')}
                                            <ArrowUpDown size={14} />
                                        </button>
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{t('actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map((user) => (
                                    <tr key={user.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                                        <td className="py-3 px-4">
                                            <button onClick={() => handleSelectUser(user.id)} className="hover:opacity-70">
                                                {selectedUsers.includes(user.id) ? (
                                                    <CheckSquare size={20} className="text-primary" />
                                                ) : (
                                                    <Square size={20} className="text-muted-foreground" />
                                                )}
                                            </button>
                                        </td>
                                        <td className="py-3 px-4 text-foreground">{user.name}</td>
                                        <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                                        <td className="py-3 px-4">
                                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                                {getRoleTranslation(user.role)}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${user.status === 'Activo'
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                }`}>
                                                {getStatusTranslation(user.status)}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(user)}
                                                    className="p-1 text-primary hover:bg-primary/10 rounded transition-colors"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <p className="text-sm text-muted-foreground">
                            {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsers.length)} / {filteredUsers.length}
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1 rounded-lg transition-colors ${currentPage === page
                                            ? 'bg-primary text-primary-foreground'
                                            : 'border border-border hover:bg-accent'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </>
            )}

            {showModal && (
                <UserModal
                    user={editingUser}
                    onSave={handleSave}
                    onClose={() => {
                        setShowModal(false)
                        setEditingUser(null)
                    }}
                />
            )}
        </div>
    )
}

function UserModal({ user, onSave, onClose }: { user: User | null; onSave: (user: User) => void; onClose: () => void }) {
    const [formData, setFormData] = useState<User>(
        user || { id: 0, name: '', email: '', role: 'Usuario', status: 'Activo' }
    )
    const { t } = useLanguage()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(formData)
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">
                        {user ? t('edit') + ' ' + t('user') : t('addUser')}
                    </h3>
                    <button onClick={onClose} className="p-1 hover:bg-accent rounded transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">{t('name')}</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">{t('email')}</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">{t('role')}</label>
                        <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value as User['role'] })}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="Admin">{t('admin')}</option>
                            <option value="Editor">{t('editor')}</option>
                            <option value="Usuario">{t('user')}</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">{t('status')}</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as User['status'] })}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="Activo">{t('active')}</option>
                            <option value="Inactivo">{t('inactive')}</option>
                        </select>
                    </div>

                    <div className="flex gap-2 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-foreground"
                        >
                            {t('cancel')}
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            {t('save')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}