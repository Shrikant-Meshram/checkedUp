import React from 'react'
import { FlaskConical, FileCheck, Clock, AlertTriangle } from 'lucide-react'

const statsConfig = [
  {
    key: 'samplesCollected',
    title: 'Samples Collected',
    icon: FlaskConical,
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    subtitle: 'This Week',
  },
  {
    key: 'reportsCompleted',
    title: 'Reports Completed',
    icon: FileCheck,
    iconBg: 'bg-success/10',
    iconColor: 'text-success',
    subtitle: 'This Week',
  },
  {
    key: 'reportsPending',
    title: 'Reports Pending',
    icon: Clock,
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning',
    subtitle: 'This Week',
  },
  {
    key: 'reportsOverdue',
    title: 'Reports Overdue',
    icon: AlertTriangle,
    iconBg: 'bg-destructive/10',
    iconColor: 'text-destructive',
    subtitle: 'Requires Attention',
    isWarning: true,
  },
]

const WeeklyStatsRow = ({ stats }) => {
  if (!stats) return null

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {statsConfig.map((s) => {
        const Icon = s.icon
        const value = stats[s.key] ?? 0
        return (
          <div
            key={s.key}
            className={`bg-card rounded-xl p-4 shadow-sm border transition hover:shadow-md ${
              s.isWarning ? 'border-destructive/20' : 'border-border'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.iconBg}`}>
                <Icon size={18} className={s.iconColor} />
              </div>
              <div>
                <p className="text-muted-foreground type-primary-label-l2 uppercase tracking-wider leading-tight">
                  {s.title}
                </p>
              </div>
            </div>
            <p className="font-mono type-primary-heading-h2-medium text-foreground">
              {value.toLocaleString('en-IN')}
            </p>
            <p className={`type-primary-label-l2 mt-1 ${s.isWarning ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
              {s.subtitle}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default WeeklyStatsRow
