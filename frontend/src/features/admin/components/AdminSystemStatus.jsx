import React from 'react'
import { Globe, CalendarCheck, CreditCard, Mail, MessageSquare, Database, CheckCircle2 } from 'lucide-react'

const services = [
  { name: 'Website Status', icon: Globe, status: 'operational' },
  { name: 'Booking System', icon: CalendarCheck, status: 'operational' },
  { name: 'Payment Gateway', icon: CreditCard, status: 'operational' },
  { name: 'Email Service', icon: Mail, status: 'operational' },
  { name: 'SMS Service', icon: MessageSquare, status: 'operational' },
  { name: 'Database', icon: Database, status: 'operational' },
]

const AdminSystemStatus = () => {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-5">
      <div className="mb-4">
        <h3 className="type-primary-heading-h3-medium text-foreground">System Status</h3>
      </div>

      <div className="space-y-1">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <div
              key={service.name}
              className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                  <Icon size={14} className="text-muted-foreground" />
                </div>
                <span className="type-primary-body-b2-medium text-foreground">{service.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-success"></span>
                <span className="type-primary-body-b3-medium text-success">Operational</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 bg-success/5 border border-success/20 rounded-lg p-3 flex items-center gap-2">
        <CheckCircle2 size={16} className="text-success flex-shrink-0" />
        <span className="type-primary-body-b2-medium text-success">All systems operational</span>
      </div>
    </div>
  )
}

export default AdminSystemStatus
