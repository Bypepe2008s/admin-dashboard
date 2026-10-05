'use client'

import { useState } from 'react'
import { Plus, X, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react'
import { useToast } from '@/context/toast-context'
import { useLanguage } from '@/context/language-context'

interface CalendarEvent {
    id: number
    title: string
    date: string
    description: string
    color: string
}

const initialEvents: CalendarEvent[] = [
    { id: 1, title: 'Team Meeting', date: '2024-10-15', description: 'Weekly review', color: '#3b82f6' },
    { id: 2, title: 'Product Launch', date: '2024-10-20', description: 'Version 2.0', color: '#10b981' },
    { id: 3, title: 'Training', date: '2024-10-25', description: 'New system', color: '#f97316' },
]

export function CalendarPage() {
    const [events, setEvents] = useState(initialEvents)
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [showModal, setShowModal] = useState(false)
    const [selectedDate, setSelectedDate] = useState<string>('')
    const { showToast } = useToast()
    const { t } = useLanguage()

    const monthNames = [
        t('jan'), t('feb'), t('mar'), t('apr'), t('may'), t('jun'),
        t('jul'), t('aug'), t('sep'), t('oct'), t('nov'), t('dec')
    ]
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11)
            setCurrentYear(currentYear - 1)
        } else {
            setCurrentMonth(currentMonth - 1)
        }
    }

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0)
            setCurrentYear(currentYear + 1)
        } else {
            setCurrentMonth(currentMonth + 1)
        }
    }

    const getEventsForDate = (day: number) => {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        return events.filter(e => e.date === dateStr)
    }

    const handleAddEvent = (day: number) => {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        setSelectedDate(dateStr)
        setShowModal(true)
    }

    const handleSaveEvent = (event: Omit<CalendarEvent, 'id'>) => {
        setEvents([...events, { ...event, id: Math.max(...events.map(e => e.id), 0) + 1 }])
        setShowModal(false)
        showToast(t('eventAdded'), 'success')
    }

    const handleDeleteEvent = (id: number) => {
        setEvents(events.filter(e => e.id !== id))
        showToast(t('eventDeleted'), 'success')
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">{t('calendar')}</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                    <Plus size={20} />
                    {t('addEvent')}
                </button>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                    <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-accent transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <h3 className="text-lg font-semibold text-foreground">
                        {monthNames[currentMonth]} {currentYear}
                    </h3>
                    <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-accent transition-colors">
                        <ChevronRight size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-2">
                    {dayNames.map(day => (
                        <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {[...Array(firstDayOfMonth)].map((_, i) => (
                        <div key={`empty-${i}`} className="aspect-square" />
                    ))}
                    {[...Array(daysInMonth)].map((_, i) => {
                        const day = i + 1
                        const dayEvents = getEventsForDate(day)
                        return (
                            <div
                                key={day}
                                onClick={() => handleAddEvent(day)}
                                className="aspect-square border border-border rounded-lg p-2 hover:bg-accent cursor-pointer transition-colors relative"
                            >
                                <span className="text-sm text-foreground">{day}</span>
                                <div className="mt-1 space-y-1">
                                    {dayEvents.slice(0, 2).map(event => (
                                        <div
                                            key={event.id}
                                            className="text-xs px-1 py-0.5 rounded truncate text-white"
                                            style={{ backgroundColor: event.color }}
                                        >
                                            {event.title}
                                        </div>
                                    ))}
                                    {dayEvents.length > 2 && (
                                        <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} {t('more')}</div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">{t('events')}</h3>
                <div className="space-y-2">
                    {events.map(event => (
                        <div key={event.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: event.color }} />
                                <div>
                                    <p className="font-medium text-foreground">{event.title}</p>
                                    <p className="text-sm text-muted-foreground">{event.date} - {event.description}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDeleteEvent(event.id)}
                                className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {showModal && (
                <EventModal
                    selectedDate={selectedDate}
                    onSave={handleSaveEvent}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    )
}

function EventModal({ selectedDate, onSave, onClose }: { selectedDate: string; onSave: (event: Omit<CalendarEvent, 'id'>) => void; onClose: () => void }) {
    const [title, setTitle] = useState('')
    const [date, setDate] = useState(selectedDate)
    const [description, setDescription] = useState('')
    const [color, setColor] = useState('#3b82f6')
    const { t } = useLanguage()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave({ title, date, description, color })
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">{t('addEvent')}</h3>
                    <button onClick={onClose} className="p-1 hover:bg-accent rounded transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">{t('eventTitle')}</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">{t('eventDate')}</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">{t('eventDescription')}</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Color</label>
                        <div className="flex gap-2">
                            {['#3b82f6', '#10b981', '#f97316', '#ef4444', '#8b5cf6', '#ec4899'].map(c => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setColor(c)}
                                    className={`w-8 h-8 rounded-full border-2 ${color === c ? 'border-foreground' : 'border-transparent'}`}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors text-foreground">
                            {t('cancel')}
                        </button>
                        <button type="submit" className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                            {t('save')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}