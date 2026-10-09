import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { Star } from 'lucide-react'

const avatarColors = [
  'bg-primary/10 text-primary',
  'bg-primary/10 text-primary',
  'bg-success/10 text-success',
  'bg-warning/10 text-warning',
  'bg-primary/10 text-primary',
]

const TopLabOwnersTable = ({ data }) => {
  const navigate = useNavigate()

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="type-primary-heading-h3-medium text-foreground">Top Lab Owners</h3>
        <button
          onClick={() => navigate(ROUTES.ADMIN_LAB_OWNERS)}
          className="type-primary-body-b3-medium text-primary hover:underline"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full type-primary-body-b2">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2.5 type-primary-body-b3-medium uppercase tracking-wider">Lab Owner</th>
              <th className="text-right py-2.5 type-primary-body-b3-medium uppercase tracking-wider">Total Bookings</th>
              <th className="text-right py-2.5 type-primary-body-b3-medium uppercase tracking-wider">Rating</th>
            </tr>
          </thead>
          <tbody>
            {(data || []).map((owner, idx) => {
              const initials = owner.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
              return (
                <tr key={idx} className="border-b border-border/50 last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center type-primary-body-b3-medium ${avatarColors[idx % avatarColors.length]}`}>
                        {initials}
                      </div>
                      <span className="type-primary-body-b2-medium text-foreground">{owner.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-right type-primary-body-b2-medium text-foreground">{owner.bookings}</td>
                  <td className="py-3 text-right">
                    <div className="inline-flex items-center gap-1">
                      <Star size={12} className="text-warning fill-warning" />
                      <span className="type-primary-body-b2-medium text-foreground">{owner.rating}</span>
                    </div>
                  </td>
                </tr>
              )
            })}
            {(!data || data.length === 0) && (
              <tr>
                <td colSpan={3} className="py-8 text-center text-muted-foreground type-primary-body-b3">No lab owner data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TopLabOwnersTable
