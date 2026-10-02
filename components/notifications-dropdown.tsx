'use client'

import { Bell, CheckCheck } from 'lucide-react'
import { useNotifications } from '@/context/notifications-context'
import { useLanguage } from '@/context/language-context'
import { useState } from 'react'

export function NotificationsDropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()
    const { t } = useLanguage()

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-lg hover:bg-accent transition-colors"
            >
                <Bell size={20} className="text-foreground" />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
                        <div className="flex items-center justify-between p-4 border-b border-border">
                            <h3 className="font-semibold text-foreground">{t('notifications')}</h3>
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="text-sm text-primary hover:underline flex items-center gap-1"
                                >
                                    <CheckCheck size={14} />
                                    {t('markAllRead')}
                                </button>
                            )}
                        </div>

                        <div className="max-h-96 overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-4 text-center text-muted-foreground">
                                    {t('noNotifications')}
                                </div>
                            ) : (
                                notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        onClick={() => markAsRead(notification.id)}
                                        className={`p-4 border-b border-border cursor-pointer hover:bg-accent transition-colors ${!notification.read ? 'bg-primary/5' : ''
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1">
                                                <h4 className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                    {notification.title}
                                                </h4>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {notification.message}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    {notification.timestamp}
                                                </p>
                                            </div>
                                            {!notification.read && (
                                                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}