'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, X, Search } from 'lucide-react'
import { useToast } from '@/context/toast-context'
import { EmptyState } from './loading'

interface Product {
    id: number
    name: string
    category: string
    price: number
    stock: number
    status: 'Activo' | 'Agotado'
}

const initialProducts: Product[] = [
    { id: 1, name: 'Producto A', category: 'Electrónica', price: 299, stock: 50, status: 'Activo' },
    { id: 2, name: 'Producto B', category: 'Ropa', price: 49, stock: 0, status: 'Agotado' },
    { id: 3, name: 'Producto C', category: 'Hogar', price: 199, stock: 25, status: 'Activo' },
    { id: 4, name: 'Producto D', category: 'Electrónica', price: 599, stock: 10, status: 'Activo' },
    { id: 5, name: 'Producto E', category: 'Ropa', price: 79, stock: 100, status: 'Activo' },
]

export function ProductsPage() {
    const [products, setProducts] = useState(initialProducts)
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const { showToast } = useToast()

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleDelete = (id: number) => {
        if (confirm('¿Eliminar este producto?')) {
            setProducts(products.filter(p => p.id !== id))
            showToast('Producto eliminado', 'success')
        }
    }

    const handleSave = (product: Product) => {
        if (editingProduct) {
            setProducts(products.map(p => p.id === product.id ? product : p))
            showToast('Producto actualizado', 'success')
        } else {
            setProducts([...products, { ...product, id: Math.max(...products.map(p => p.id)) + 1 }])
            showToast('Producto agregado', 'success')
        }
        setShowModal(false)
        setEditingProduct(null)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Productos</h2>
                <button
                    onClick={() => { setEditingProduct(null); setShowModal(true) }}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                    <Plus size={20} />
                    Agregar Producto
                </button>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {filteredProducts.length === 0 ? (
                    <EmptyState
                        title="No hay productos"
                        description="Agrega el primer producto para comenzar"
                        action={
                            <button
                                onClick={() => setShowModal(true)}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                            >
                                <Plus size={20} />
                                Agregar Producto
                            </button>
                        }
                    />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Nombre</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Categoría</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Precio</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Stock</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Estado</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                                        <td className="py-3 px-4 text-foreground">{product.name}</td>
                                        <td className="py-3 px-4 text-muted-foreground">{product.category}</td>
                                        <td className="py-3 px-4 text-foreground font-medium">${product.price}</td>
                                        <td className="py-3 px-4 text-muted-foreground">{product.stock}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${product.status === 'Activo'
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                }`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => { setEditingProduct(product); setShowModal(true) }}
                                                    className="p-1 text-primary hover:bg-primary/10 rounded transition-colors"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
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
                )}
            </div>

            {showModal && (
                <ProductModal
                    product={editingProduct}
                    onSave={handleSave}
                    onClose={() => { setShowModal(false); setEditingProduct(null) }}
                />
            )}
        </div>
    )
}

function ProductModal({ product, onSave, onClose }: { product: Product | null; onSave: (product: Product) => void; onClose: () => void }) {
    const [formData, setFormData] = useState<Product>(
        product || { id: 0, name: '', category: '', price: 0, stock: 0, status: 'Activo' }
    )

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(formData)
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">
                        {product ? 'Editar Producto' : 'Agregar Producto'}
                    </h3>
                    <button onClick={onClose} className="p-1 hover:bg-accent rounded transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Nombre</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Categoría</label>
                        <input
                            type="text"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            required
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">Precio</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                required
                                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">Stock</label>
                            <input
                                type="number"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                                required
                                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Estado</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as Product['status'] })}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="Activo">Activo</option>
                            <option value="Agotado">Agotado</option>
                        </select>
                    </div>

                    <div className="flex gap-2 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-foreground">
                            Cancelar
                        </button>
                        <button type="submit" className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}