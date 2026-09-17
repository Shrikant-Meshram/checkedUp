import React from 'react'
import { BOOKING_STATUS, PAYMENT_STATUS } from '@/constants/status'

const STATUS_STYLES = {
  Pending: { bg: 'bg-warning/10', text: 'text-warning', dot: 'bg-warning' },
  Assigned: { bg: 'bg-primary/10', text: 'text-primary', dot: 'bg-primary' },
  Reached: { bg: 'bg-indigo-50', text: 'text-indigo-600', dot: 'bg-indigo-500' },
  'Sample Collected': { bg: 'bg-purple-50', text: 'text-purple-600', dot: 'bg-purple-500' },
  Processing: { bg: 'bg-primary/10', text: 'text-primary', dot: 'bg-primary' },
  'Report Ready': { bg: 'bg-teal-50', text: 'text-teal-600', dot: 'bg-teal-500' },
  Completed: { bg: 'bg-success/10', text: 'text-success', dot: 'bg-success' },
  Cancelled: { bg: 'bg-destructive/10', text: 'text-destructive', dot: 'bg-destructive' },
  Rescheduled: { bg: 'bg-orange-50', text: 'text-orange-600', dot: 'bg-orange-500' },
}

const PAYMENT_STYLES = {
  Paid: { bg: 'bg-success/10', text: 'text-success' },
  Pending: { bg: 'bg-warning/10', text: 'text-warning' },
  Unpaid: { bg: 'bg-destructive/10', text: 'text-destructive' },
  Failed: { bg: 'bg-destructive/10', text: 'text-destructive' },
}

const AssistantStatusBadge = ({ status }) => {
  const style = STATUS_STYLES[status] || PAYMENT_STYLES[status] || { bg: 'bg-primary/10', text: 'text-muted-foreground' }
  return (
    <span className={`px-2.5 py-0.5 rounded-full type-primary-body-b3 font-semibold inline-block ${style.bg} ${style.text}`}>
      {status}
    </span>
  )
}

const AdminStatusBadge = ({ status, type = 'status' }) => {
  const styles = type === 'status' ? STATUS_STYLES : PAYMENT_STYLES
  const style = styles[status] || styles.Pending
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 type-primary-body-b3 ${style.bg} ${style.text}`}>
      {style.dot && <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>}
      {status}
    </span>
  )
}

const BookingCardBadges = ({ status, paymentStatus, variant = 'default', actionButton }) => {
  return (
    <div className="px-4 pb-4 pt-3 space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="type-primary-body-b2 md:type-primary-body-b2 font-medium text-muted-foreground w-14 shrink-0">Status:</span>
        {variant === 'assistant' ? (
          <AssistantStatusBadge status={status} />
        ) : (
          <AdminStatusBadge status={status} type="status" />
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="type-primary-body-b2 md:type-primary-body-b2 font-medium text-muted-foreground w-14 shrink-0">Payment:</span>
        {variant === 'assistant' ? (
          <AssistantStatusBadge status={paymentStatus} />
        ) : (
          <AdminStatusBadge status={paymentStatus} type="payment" />
        )}
        {actionButton && <div className="ml-auto">{actionButton}</div>}
      </div>
    </div>
  )
}

export default BookingCardBadges
