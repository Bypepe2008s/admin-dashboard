'use client'

import { useLanguage } from '@/context/language-context'
import { useThemeColor } from '@/context/theme-color-context'
import { useTheme } from './theme-provider'
import { usePermissions } from '@/context/permissions-context'
import { Globe, Palette, Moon, Sun } from 'lucide-react'

type Language = 'es' | 'en' | 'fr' | 'pt' | 'de'

const languageNames: Record<Language, string> = {
    es: 'Español',
    en: 'English',
    fr: 'Français',
    pt: 'Português',
    de: 'Deutsch',
}

export function SettingsPage() {
    const { language, setLanguage, t } = useLanguage()
    const { primaryColor, setPrimaryColor, presets } = useThemeColor()
    const { theme, setTheme } = useTheme()

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">{t('settings')}</h2>

            <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Globe size={20} />
                    {t('language')}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {(Object.keys(languageNames) as Language[]).map(lang => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            className={`px-4 py-2 rounded-lg border transition-colors ${language === lang
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'border-border hover:bg-accent text-foreground'
                                }`}
                        >
                            {languageNames[lang]}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Palette size={20} />
                    {t('theme')}
                </h3>
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setTheme('light')}
                        className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-2 ${theme === 'light'
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'border-border hover:bg-accent text-foreground'
                            }`}
                    >
                        <Sun size={16} />
                        {t('light')}
                    </button>
                    <button
                        onClick={() => setTheme('dark')}
                        className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-2 ${theme === 'dark'
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'border-border hover:bg-accent text-foreground'
                            }`}
                    >
                        <Moon size={16} />
                        {t('dark')}
                    </button>
                </div>

                <h4 className="text-sm font-medium text-foreground mb-3">{t('primaryColor')}</h4>
                <div className="flex gap-2 flex-wrap">
                    {presets.map(preset => (
                        <button
                            key={preset.value}
                            onClick={() => setPrimaryColor(preset.value)}
                            className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${primaryColor === preset.value ? 'border-foreground scale-110' : 'border-transparent'
                                }`}
                            style={{ backgroundColor: preset.value }}
                            title={preset.name}
                        />
                    ))}
                </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">{t('roleSystem')}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t('roleDescription')}</p>
                <RoleSelector />
            </div>
        </div>
    )
}

function RoleSelector() {
    const { role, setRole } = usePermissions()
    const { t } = useLanguage()
    const roles = [
        { id: 'admin' as const, label: t('adminRole'), desc: t('fullAccess') },
        { id: 'editor' as const, label: t('editorRole'), desc: t('limitedAccess') },
        { id: 'viewer' as const, label: t('viewerRole'), desc: t('readOnly') },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {roles.map(r => (
                <button
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={`p-4 rounded-lg border text-left transition-colors ${role === r.id
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'border-border hover:bg-accent'
                        }`}
                >
                    <p className="font-medium">{r.label}</p>
                    <p className="text-xs opacity-75">{r.desc}</p>
                </button>
            ))}
        </div>
    )
}