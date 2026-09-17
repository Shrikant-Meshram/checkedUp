import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

const statusStyles = {
  Pending: 'bg-warning/10 text-warning',
  Assigned: 'bg-primary/10 text-primary',
  Reached: 'bg-indigo-50 text-indigo-600',
  'Sample Collected': 'bg-purple-50 text-purple-600',
  Completed: 'bg-success/10 text-success',
  Processing: 'bg-primary/10 text-primary',
}

const LabAssistantTodayBookings = ({ data }) => {
  const navigate = useNavigate()

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="type-primary-heading-h3-medium text-foreground">Today's Bookings</h3>
        <button
          onClick={() => navigate(ROUTES.LAB_ASSISTANT_BOOKINGS)}
          className="text-xs font-semibold text-primary hover:underline"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2.5 type-primary-body-b3-medium uppercase tracking-wider">Time</th>
              <th className="text-left py-2.5 type-primary-body-b3-medium uppercase tracking-wider">Booking ID</th>
              <th className="text-left py-2.5 type-primary-body-b3-medium uppercase tracking-wider hidden sm:table-cell">Patient</th>
              <th className="text-left py-2.5 type-primary-body-b3-medium uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {(data || []).map((item) => (
              <tr key={item._id} className="border-b border-border/50 last:border-0">
                <td className="py-2.5 sm:py-3 type-primary-body-b3 text-muted-foreground">{item.time}</td>
                <td className="py-2.5 sm:py-3">
                  <span className="type-primary-body-b3-medium text-primary">{item.bookingId}</span>
                </td>
                <td className="py-2.5 sm:py-3 type-primary-body-b2 text-foreground hidden sm:table-cell">{item.patientName}</td>
                <td className="py-2.5 sm:py-3">
                  <span className={`px-2 sm:px-2.5 py-0.5 rounded-md type-primary-body-b3 ${statusStyles[item.status] || 'bg-surface text-muted-foreground'}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
            {(!data || data.length === 0) && (
              <tr>
                <td colSpan={4} className="py-6 sm:py-8 text-center text-muted-foreground type-primary-body-b3">No bookings today</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LabAssistantTodayBookings
