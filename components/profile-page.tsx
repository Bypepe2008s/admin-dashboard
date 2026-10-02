'use client'

import { useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { useLanguage } from '@/context/language-context'
import { Camera, Save, Lock } from 'lucide-react'

export function ProfilePage() {
    const { user, updateProfile } = useAuth()
    const { t } = useLanguage()
    const [name, setName] = useState(user?.name || '')
    const [email, setEmail] = useState(user?.email || '')
    const [avatar, setAvatar] = useState(user?.avatar || '')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setAvatar(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault()
        if (user) {
            updateProfile({ ...user, name, email, avatar })
            setMessage('✓ ' + t('saveChanges'))
            setTimeout(() => setMessage(''), 3000)
        }
    }

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault()
        if (newPassword !== confirmPassword) {
            setMessage('✗ Passwords do not match')
            return
        }
        if (newPassword.length < 6) {
            setMessage('✗ Min 6 characters')
            return
        }
        setMessage('✓ ' + t('updatePassword'))
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setTimeout(() => setMessage(''), 3000)
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">{t('myProfile')}</h2>

            {message && (
                <div className={`p-4 rounded-lg ${message.includes('✓') ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                    {message}
                </div>
            )}

            <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">{t('personalInfo')}</h3>

                <div className="flex items-center gap-6 mb-6">
                    <div className="relative">
                        {avatar ? (
                            <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-3xl font-bold text-primary">{name?.[0]?.toUpperCase()}</span>
                            </div>
                        )}
                        <label className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                            <Camera size={16} />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Click the camera icon to change avatar</p>
                    </div>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">{t('name')}</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">{t('email')}</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                        <Save size={16} />
                        {t('saveChanges')}
                    </button>
                </form>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Lock size={20} />
                    {t('changePassword')}
                </h3>

                <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">{t('currentPassword')}</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">{t('newPassword')}</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">{t('confirmPassword')}</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        {t('updatePassword')}
                    </button>
                </form>
            </div>
        </div>
    )
}