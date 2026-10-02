'use client'

import { useAuth } from '@/context/auth-context'
import { NotificationsDropdown } from './notifications-dropdown'
import { LogOut, User, Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigation } from './navigation'
import { useLanguage } from '@/context/language-context'

export function Header() {
    const { user, logout } = useAuth()
    const { setCurrentPage } = useNavigation()
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const { t } = useLanguage()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            setCurrentPage('usuarios')
        }
    }

    return (
        <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between gap-4">
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                    <input
                        type="text"
                        placeholder={t('search') + '...'}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </form>

            <div className="flex items-center gap-4">
                <NotificationsDropdown />

                <div className="relative">
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors"
                    >
                        {user?.avatar ? (
                            <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <User size={16} className="text-primary" />
                            </div>
                        )}
                        <span className="text-sm font-medium text-foreground">{user?.name}</span>
                    </button>

                    {showProfileMenu && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
                            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
                                <button
                                    onClick={() => {
                                        setShowProfileMenu(false)
                                        setCurrentPage('perfil')
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-accent transition-colors flex items-center gap-2"
                                >
                                    <User size={16} />
                                    {t('myProfile')}
                                </button>
                                <button
                                    onClick={logout}
                                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-accent transition-colors flex items-center gap-2 border-t border-border"
                                >
                                    <LogOut size={16} />
                                    {t('logout')}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}