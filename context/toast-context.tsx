'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

interface Toast {
    id: number
    message: string
    type: 'success' | 'error' | 'info'
}

interface ToastContextType {
    showToast: (message: string, type?: 'success' | 'error' | 'info') => void
}

const ToastContext = createContext<ToastContextType>({
    showToast: () => { },
})

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, message, type }])
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id))
        }, 3000)
    }, [])

    const removeToast = (id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 space-y-2">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${toast.type === 'success'
                                ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
                                : toast.type === 'error'
                                    ? 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                                    : 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200'
                            }`}
                    >
                        {toast.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
                        <span className="text-sm font-medium">{toast.message}</span>
                        <button onClick={() => removeToast(toast.id)} className="ml-2 hover:opacity-70">
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export const useToast = () => useContext(ToastContext)