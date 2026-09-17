import React from 'react'
import { ClipboardList, TestTube, FlaskConical, Microscope, Clock } from 'lucide-react'

const statConfig = [
  {
    key: 'todayCollections',
    title: "Today's Collections",
    icon: ClipboardList,
    iconClass: 'bg-primary/10 text-primary',
  },
  {
    key: 'samplesCollected',
    title: 'Samples Collected',
    icon: TestTube,
    iconClass: 'bg-success/10 text-success',
  },
  {
    key: 'samplesInLab',
    title: 'Samples in Lab',
    icon: FlaskConical,
    iconClass: 'bg-purple-50 text-purple-600',
  },
  {
    key: 'testsInProgress',
    title: 'Tests In Progress',
    icon: Microscope,
    iconClass: 'bg-warning/10 text-warning',
  },
  {
    key: 'testsPending',
    title: 'Tests Pending',
    icon: Clock,
    iconClass: 'bg-destructive/10 text-destructive',
  },
]

const LabAssistantDashboardStats = ({ stats }) => {
  if (!stats) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
      {statConfig.map((s) => {
        const Icon = s.icon
        const value = stats[s.key] ?? 0
        return (
          <div
            key={s.key}
            className="rounded-xl border border-border bg-card p-3 shadow-sm sm:p-4"
          >
            <div className="flex items-center gap-3">
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${s.iconClass}`}>
                <Icon size={20} />
              </span>
              <div>
                <p className="type-primary-body-b3 text-muted-foreground">{s.title}</p>
                <p className="mt-0.5 type-primary-heading-h3-medium text-foreground">
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

export default LabAssistantDashboardStats
