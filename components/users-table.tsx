'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
const allUsers = [
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
export function UsersTable() {
    const [currentPage, setCurrentPage] = useState(1)
    const usersPerPage = 5
    const totalPages = Math.ceil(allUsers.length / usersPerPage)
    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser)
    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Gestión de Usuarios</h3>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">Agregar Usuario</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Nombre</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Rol</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Estado</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                                <td className="py-3 px-4 text-foreground">{user.name}</td>
                                <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                                <td className="py-3 px-4"><span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">{user.role}</span></td>
                                <td className="py-3 px-4"><span className={`px-2 py-1 text-xs rounded-full ${user.status === 'Activo' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>{user.status}</span></td>
                                <td className="py-3 px-4"><button className="text-primary hover:underline text-sm">Editar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-muted-foreground">Mostrando {indexOfFirstUser + 1} a {Math.min(indexOfLastUser, allUsers.length)} de {allUsers.length} usuarios</p>
                <div className="flex gap-2">
                    <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-2 rounded-lg border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronLeft size={20} /></button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button key={page} onClick={() => setCurrentPage(page)} className={`px-3 py-1 rounded-lg transition-colors ${currentPage === page ? 'bg-primary text-primary-foreground' : 'border border-border hover:bg-accent'}`}>{page}</button>
                    ))}
                    <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 rounded-lg border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronRight size={20} /></button>
                </div>
            </div>
        </div>
    )
}