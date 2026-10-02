'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface ThemeColorContextType {
    primaryColor: string
    setPrimaryColor: (color: string) => void
}

const colorPresets = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Yellow', value: '#eab308' },
]

const ThemeColorContext = createContext<ThemeColorContextType & { presets: typeof colorPresets }>({
    primaryColor: '#3b82f6',
    setPrimaryColor: () => { },
    presets: colorPresets,
})

export function ThemeColorProvider({ children }: { children: React.ReactNode }) {
    const [primaryColor, setPrimaryColor] = useState('#3b82f6')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const stored = localStorage.getItem('primaryColor')
        if (stored) {
            setPrimaryColor(stored)
            document.documentElement.style.setProperty('--color-primary', stored)
        }
    }, [])

    const handleSetColor = (color: string) => {
        setPrimaryColor(color)
        if (typeof window !== 'undefined') {
            localStorage.setItem('primaryColor', color)
            document.documentElement.style.setProperty('--color-primary', color)
        }
    }

    if (!mounted) {
        return <ThemeColorContext.Provider value={{ primaryColor: '#3b82f6', setPrimaryColor: handleSetColor, presets: colorPresets }}>{children}</ThemeColorContext.Provider>
    }

    return (
        <ThemeColorContext.Provider value={{ primaryColor, setPrimaryColor: handleSetColor, presets: colorPresets }}>
            {children}
        </ThemeColorContext.Provider>
    )
}

export const useThemeColor = () => useContext(ThemeColorContext)