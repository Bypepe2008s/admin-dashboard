'use client'

import { useState } from 'react'
import { GripVertical, Trash2 } from 'lucide-react'
import { useToast } from '@/context/toast-context'
import { useLanguage } from '@/context/language-context'

interface DragItem {
    id: number
    title: string
    description: string
}

const initialItems: DragItem[] = [
    { id: 1, title: 'Task 1', description: 'Task 1 description' },
    { id: 2, title: 'Task 2', description: 'Task 2 description' },
    { id: 3, title: 'Task 3', description: 'Task 3 description' },
    { id: 4, title: 'Task 4', description: 'Task 4 description' },
    { id: 5, title: 'Task 5', description: 'Task 5 description' },
]

export function DragDropList() {
    const [items, setItems] = useState(initialItems)
    const [draggedItem, setDraggedItem] = useState<number | null>(null)
    const { showToast } = useToast()
    const { t } = useLanguage()

    const handleDragStart = (id: number) => {
        setDraggedItem(id)
    }

    const handleDragOver = (e: React.DragEvent, id: number) => {
        e.preventDefault()
        if (draggedItem === null || draggedItem === id) return

        const draggedIndex = items.findIndex(item => item.id === draggedItem)
        const dropIndex = items.findIndex(item => item.id === id)

        const newItems = [...items]
        const [removed] = newItems.splice(draggedIndex, 1)
        newItems.splice(dropIndex, 0, removed)
        setItems(newItems)
    }

    const handleDragEnd = () => {
        setDraggedItem(null)
        showToast(t('orderUpdated'), 'success')
    }

    const handleDelete = (id: number) => {
        setItems(items.filter(item => item.id !== id))
        showToast(t('itemDeleted'), 'success')
    }

    return (
        <div className="space-y-2">
            {items.map(item => (
                <div
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(item.id)}
                    onDragOver={(e) => handleDragOver(e, item.id)}
                    onDragEnd={handleDragEnd}
                    className={`flex items-center gap-3 p-4 border border-border rounded-lg bg-card cursor-move hover:bg-accent transition-colors ${draggedItem === item.id ? 'opacity-50' : ''
                        }`}
                >
                    <GripVertical size={20} className="text-muted-foreground" />
                    <div className="flex-1">
                        <h4 className="font-medium text-foreground">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ))}
        </div>
    )
}