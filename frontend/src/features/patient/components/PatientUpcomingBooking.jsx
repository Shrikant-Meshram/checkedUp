import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { Calendar, MapPin, CalendarDays } from 'lucide-react'

const statusStyles = {
  Pending: 'bg-warning/10 text-warning',
  Assigned: 'bg-primary/10 text-primary',
  Reached: 'bg-primary/10 text-primary',
  'Sample Collected': 'bg-success/10 text-success',
  Confirmed: 'bg-success/10 text-success',
  Completed: 'bg-success/10 text-success',
  Processing: 'bg-primary/10 text-primary',
}

const PatientUpcomingBooking = ({ data }) => {
  const navigate = useNavigate()

  if (!data) {
    return (
      <div className="bg-card rounded-xl border border-border shadow-sm p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="type-primary-body-b1-medium text-foreground">Upcoming Booking</h3>
          <button
            onClick={() => navigate('/booking/bookings')}
            className="type-primary-body-b3-medium text-primary hover:underline"
          >
            View All
          </button>
        </div>
        <div className="text-center py-8">
          <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
          <p className="type-primary-body-b2 text-muted-foreground">No upcoming bookings</p>
          <button
            onClick={() => navigate('/booking/tests')}
            className="mt-3 px-4 py-2 bg-primary text-white type-primary-body-b3-medium rounded-lg hover:bg-primary/90 transition"
          >
            Book a Test
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="type-primary-body-b1-medium text-foreground">Upcoming Booking</h3>
        <button
          onClick={() => navigate('/booking/bookings')}
          className="type-primary-body-b3-medium text-primary hover:underline"
        >
          View All
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Left - Test Info */}
        <div className="flex-shrink-0 flex flex-col items-center sm:items-start">
          <div className="w-16 h-16 rounded-xl bg-primary/5 flex items-center justify-center mb-3">
            <Calendar className="h-8 w-8 text-primary" />
          </div>
          <p className="type-primary-body-b1-medium text-foreground text-center sm:text-left">{data.testName}</p>
          <span className={`inline-block mt-1 px-2 py-0.5 rounded-md type-primary-body-b3 ${statusStyles[data.status] || 'bg-surface text-muted-foreground'}`}>
            {data.status}
          </span>
          <p className="type-primary-body-b3 text-muted-foreground mt-2">Booking ID: {data.bookingId}</p>
        </div>

        {/* Middle - Details */}
        <div className="flex-1 space-y-3">
          <div className="flex items-start gap-2">
            <CalendarDays size={14} className="text-muted-foreground mt-0.5" />
            <div>
              <p className="type-primary-body-b3 text-muted-foreground">Date & Time</p>
              <p className="type-primary-body-b2-medium text-foreground">{data.date}, {data.time}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin size={14} className="text-muted-foreground mt-0.5" />
            <div>
              <p className="type-primary-body-b3 text-muted-foreground">Lab</p>
              <p className="type-primary-body-b2-medium text-foreground">{data.labName}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin size={14} className="text-muted-foreground mt-0.5" />
            <div>
              <p className="type-primary-body-b3 text-muted-foreground">Address</p>
              <p className="type-primary-body-b2 text-foreground">{data.address}, {data.city} {data.pincode}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PatientUpcomingBooking
