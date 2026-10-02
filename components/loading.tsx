export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
    const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6'
    return (
        <div className={`${sizeClass} animate-spin rounded-full border-2 border-primary border-t-transparent`} />
    )
}

export function Skeleton({ className = '' }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-muted rounded ${className}`} />
    )
}

export function TableSkeleton() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-8 w-32" />
            </div>
            <Skeleton className="h-10 w-full" />
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-4">
                    <Skeleton className="h-12 flex-1" />
                    <Skeleton className="h-12 flex-1" />
                    <Skeleton className="h-12 flex-1" />
                    <Skeleton className="h-12 flex-1" />
                    <Skeleton className="h-12 w-20" />
                </div>
            ))}
        </div>
    )
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4 text-center">{description}</p>
            {action}
        </div>
    )
}