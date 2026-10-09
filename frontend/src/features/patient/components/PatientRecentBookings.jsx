import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const statusStyles = {
  Pending: 'bg-warning/10 text-warning',
  Assigned: 'bg-primary/10 text-primary',
  Reached: 'bg-primary/10 text-primary',
  'Sample Collected': 'bg-success/10 text-success',
  Confirmed: 'bg-success/10 text-success',
  Completed: 'bg-success/10 text-success',
  Processing: 'bg-primary/10 text-primary',
  Cancelled: 'bg-destructive/10 text-destructive',
}

const PatientRecentBookings = ({ data }) => {
  const navigate = useNavigate()

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="type-primary-body-b1-medium text-foreground">Recent Bookings</h3>
        <button
          onClick={() => navigate('/booking/bookings')}
          className="type-primary-body-b3-medium text-primary hover:underline"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full type-primary-body-b2">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2.5 type-primary-body-b3-medium uppercase tracking-wider">Booking ID</th>
              <th className="text-left py-2.5 type-primary-body-b3-medium uppercase tracking-wider hidden sm:table-cell">Test/Package</th>
              <th className="text-left py-2.5 type-primary-body-b3-medium uppercase tracking-wider hidden md:table-cell">Date</th>
              <th className="text-left py-2.5 type-primary-body-b3-medium uppercase tracking-wider hidden lg:table-cell">Lab</th>
              <th className="text-left py-2.5 type-primary-body-b3-medium uppercase tracking-wider">Status</th>
              <th className="text-right py-2.5 type-primary-body-b3-medium uppercase tracking-wider">Amount</th>
              <th className="w-8"></th>
            </tr>
          </thead>
          <tbody>
            {(data || []).map((booking) => (
              <tr key={booking._id} onClick={() => navigate('/booking/bookings')} className="border-b border-border/50 last:border-0 hover:bg-accent/50 cursor-pointer">
                <td className="py-3">
                  <span className="type-primary-body-b3-medium text-primary">{booking.bookingId}</span>
                </td>
                <td className="py-3 text-foreground hidden sm:table-cell">{booking.testName}</td>
                <td className="py-3 text-muted-foreground type-primary-body-b3 hidden md:table-cell">{booking.date}</td>
                <td className="py-3 text-muted-foreground type-primary-body-b3 hidden lg:table-cell truncate max-w-[120px]">{booking.labName}</td>
                <td className="py-3">
                  <span className={`px-2 sm:px-2.5 py-0.5 rounded-md type-primary-body-b3 ${statusStyles[booking.status] || 'bg-surface text-muted-foreground'}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="py-3 text-right type-primary-body-b2-medium text-foreground">₹{booking.amount.toLocaleString('en-IN')}</td>
                <td className="py-3">
                  <ChevronRight size={16} className="text-muted-foreground" />
                </td>
              </tr>
            ))}
            {(!data || data.length === 0) && (
              <tr>
                <td colSpan={7} className="py-6 sm:py-8 text-center text-muted-foreground type-primary-body-b3">No bookings yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PatientRecentBookings
