'use client'

import { useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { useLanguage } from '@/context/language-context'
import { Mail, Lock, AlertCircle } from 'lucide-react'

export function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useAuth()
    const { t } = useLanguage()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!email) {
            setError(t('email') + ' required')
            return
        }

        if (!password) {
            setError(t('password') + ' required')
            return
        }

        if (password.length < 6) {
            setError(t('password') + ' (min 6)')
            return
        }

        const success = login(email, password)
        if (!success) {
            setError('Error')
        }
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-card border border-border rounded-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-foreground mb-2">AdminPro</h1>
                        <p className="text-muted-foreground">{t('login')}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">
                                {t('email')}
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="admin@empresa.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">
                                {t('password')}
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg">
                                <AlertCircle size={20} />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                        >
                            {t('login')}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            Demo: any email + password (6+ chars)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}