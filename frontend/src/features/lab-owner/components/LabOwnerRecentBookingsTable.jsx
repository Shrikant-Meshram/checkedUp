import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

const statusStyles = {
  Completed: 'bg-success/10 text-success',
  Pending: 'bg-warning/10 text-warning',
  Processing: 'bg-primary/10 text-primary',
  Cancelled: 'bg-destructive/10 text-destructive',
  Assigned: 'bg-primary/10 text-primary',
  Reached: 'bg-indigo-50 text-indigo-600',
  'Sample Collected': 'bg-purple-50 text-purple-600',
}

const LabOwnerRecentBookingsTable = ({ data }) => {
  const navigate = useNavigate()

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="type-primary-heading-h3-medium text-foreground">Recent Bookings</h3>
        <button
          onClick={() => navigate(ROUTES.LAB_OWNER_BOOKINGS)}
          className="type-primary-button-b2 text-primary hover:underline"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full type-primary-body-b2">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2.5 type-primary-body-b3-medium uppercase tracking-wider">Booking ID</th>
              <th className="text-left py-2.5 type-primary-body-b3-medium uppercase tracking-wider hidden sm:table-cell">Patient</th>
              <th className="text-left py-2.5 type-primary-body-b3-medium uppercase tracking-wider hidden md:table-cell">Test/Package</th>
              <th className="text-left py-2.5 type-primary-body-b3-medium uppercase tracking-wider">Status</th>
              <th className="text-left py-2.5 type-primary-body-b3-medium uppercase tracking-wider hidden lg:table-cell">Date</th>
            </tr>
          </thead>
          <tbody>
            {(data || []).map((booking) => (
              <tr key={booking._id} className="border-b border-border/50 last:border-0">
                <td className="py-2.5 sm:py-3">
                  <span className="type-primary-body-b3-medium text-primary">{booking.bookingId}</span>
                </td>
                <td className="py-2.5 sm:py-3 type-primary-body-b2 text-foreground hidden sm:table-cell">{booking.patientName}</td>
                <td className="py-2.5 sm:py-3 type-primary-body-b2 text-foreground hidden md:table-cell">
                  {booking.testName || booking.packageName || 'N/A'}
                </td>
                <td className="py-2.5 sm:py-3">
                  <span className={`px-2 sm:px-2.5 py-0.5 rounded-md type-primary-body-b3 ${statusStyles[booking.status] || 'bg-surface text-muted-foreground'}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="py-2.5 sm:py-3 type-primary-body-b3 text-muted-foreground hidden lg:table-cell">
                  {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  }) : 'N/A'}
                </td>
              </tr>
            ))}
            {(!data || data.length === 0) && (
              <tr>
                <td colSpan={5} className="py-6 sm:py-8 text-center text-muted-foreground type-primary-body-b3">No recent bookings</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LabOwnerRecentBookingsTable
