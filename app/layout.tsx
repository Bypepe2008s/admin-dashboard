import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/context/auth-context'
import { NotificationsProvider } from '@/context/notifications-context'
import { ToastProvider } from '@/context/toast-context'
import { LanguageProvider } from '@/context/language-context'
import { ThemeColorProvider } from '@/context/theme-color-context'
import { PermissionsProvider } from '@/context/permissions-context'
import { ActivityProvider } from '@/context/activity-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Dashboard Pro',
  description: 'Professional admin dashboard template',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ThemeColorProvider>
            <LanguageProvider>
              <AuthProvider>
                <PermissionsProvider>
                  <ActivityProvider>
                    <NotificationsProvider>
                      <ToastProvider>
                        {children}
                      </ToastProvider>
                    </NotificationsProvider>
                  </ActivityProvider>
                </PermissionsProvider>
              </AuthProvider>
            </LanguageProvider>
          </ThemeColorProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}