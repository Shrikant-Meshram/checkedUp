import React from 'react'
import { CalendarCheck, FileText, ClipboardList, TestTube } from 'lucide-react'

const statConfig = [
  {
    key: 'upcomingBooking',
    title: 'Upcoming Booking',
    icon: CalendarCheck,
    iconClass: 'bg-primary/5 text-primary',
    subtitle: 'Tomorrow, 10:00 AM',
  },
  {
    key: 'reportsAvailable',
    title: 'Reports Available',
    icon: FileText,
    iconClass: 'bg-success/5 text-success',
    subtitle: 'View your latest test reports',
  },
  {
    key: 'totalBookings',
    title: 'Total Bookings',
    icon: ClipboardList,
    iconClass: 'bg-primary/5 text-primary',
    subtitle: 'All time bookings completed',
  },
  {
    key: 'totalTests',
    title: 'Total Tests',
    icon: TestTube,
    iconClass: 'bg-warning/5 text-warning',
    subtitle: 'Tests taken so far',
  },
]

const PatientStatsGrid = ({ stats, upcomingBooking }) => {
  if (!stats) return null

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {statConfig.map((s) => {
        const Icon = s.icon
        let value = stats[s.key] ?? 0
        let subtitle = s.subtitle

        if (s.key === 'upcomingBooking' && upcomingBooking) {
          subtitle = `${upcomingBooking.date}, ${upcomingBooking.time}`
        }

        return (
          <div
            key={s.key}
            className="rounded-xl border border-border bg-card p-3 shadow-sm sm:p-4"
          >
            <div className="flex items-center gap-3">
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${s.iconClass}`}>
                <Icon size={20} />
              </span>
              <div className="min-w-0">
                <p className="type-primary-body-b3 text-muted-foreground">{s.title}</p>
                <p className="mt-0.5 type-primary-heading-h2 text-foreground">
                  {value.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PatientStatsGrid
