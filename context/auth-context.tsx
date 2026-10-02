'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface User {
    id: number
    name: string
    email: string
    avatar?: string
}

interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => boolean
    logout: () => void
    updateProfile: (user: User) => void
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => false,
    logout: () => { },
    updateProfile: () => { },
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const stored = localStorage.getItem('user')
        if (stored) {
            setUser(JSON.parse(stored))
        }
    }, [])

    const login = (email: string, password: string) => {
        if (email && password.length >= 6) {
            const newUser: User = {
                id: 1,
                name: email.split('@')[0],
                email,
            }
            setUser(newUser)
            localStorage.setItem('user', JSON.stringify(newUser))
            return true
        }
        return false
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    const updateProfile = (updatedUser: User) => {
        setUser(updatedUser)
        localStorage.setItem('user', JSON.stringify(updatedUser))
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)