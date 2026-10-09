import React from 'react'
import { CalendarCheck, CreditCard, Users, FlaskConical, PackageOpen, Clock } from 'lucide-react'

const activityConfig = {
  booking: {
    icon: CalendarCheck,
    bgColor: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  payment: {
    icon: CreditCard,
    bgColor: 'bg-success/10',
    iconColor: 'text-success',
  },
  user: {
    icon: Users,
    bgColor: 'bg-warning/10',
    iconColor: 'text-warning',
  },
  test: {
    icon: FlaskConical,
    bgColor: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  package: {
    icon: PackageOpen,
    bgColor: 'bg-primary/10',
    iconColor: 'text-primary',
  },
}

const AdminRecentActivity = ({ data }) => {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="type-primary-heading-h3-medium text-foreground">Recent Activity</h3>
        <button className="type-primary-body-b3-medium text-primary hover:underline">View All</button>
      </div>

      <div className="space-y-1">
        {(data || []).map((activity, idx) => {
          const config = activityConfig[activity.type] || activityConfig.booking
          const Icon = config.icon
          return (
            <div
              key={idx}
              className="flex items-center gap-3 py-3 border-b border-border/50 last:border-0"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${config.bgColor}`}>
                <Icon size={16} className={config.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="type-primary-body-b2-medium text-foreground leading-tight">{activity.title}</p>
                <p className="type-primary-body-b3 text-muted-foreground mt-0.5 truncate">{activity.description}</p>
              </div>
              <div className="flex items-center gap-1 type-primary-body-b3 text-muted-foreground flex-shrink-0">
                <Clock size={10} />
                <span>{activity.timeAgo}</span>
              </div>
            </div>
          )
        })}
        {(!data || data.length === 0) && (
          <div className="py-8 text-center text-muted-foreground type-primary-body-b3">No recent activity</div>
        )}
      </div>
    </div>
  )
}

export default AdminRecentActivity
