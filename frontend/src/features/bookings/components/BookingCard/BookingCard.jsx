import React from 'react'
import { MoreVertical } from 'lucide-react'
import { ROLES } from '@/constants/roles'
import { BOOKING_STATUS } from '@/constants/status'
import BookingCardHeader from './BookingCardHeader'
import BookingCardContent from './BookingCardContent'
import BookingCardBadges from './BookingCardBadges'
import BookingCardFooter from './BookingCardFooter'

const LAB_CHANGE_LOCK_STATUSES = [
  BOOKING_STATUS.REACHED,
  BOOKING_STATUS.SAMPLE_COLLECTED,
  'Processing',
  'Report Ready',
  BOOKING_STATUS.COMPLETED,
]

const isLabChangeLocked = (booking) =>
  Boolean(booking?.assignedLabAssistant) && LAB_CHANGE_LOCK_STATUSES.includes(booking?.status)

const BookingCard = ({
  booking,
  role,
  onSelect,
  onEditLab,
  onViewReport,
  onManageBooking,
  onMenuToggle,
  onAssignAssistant,
  onUploadReport,
  uploadingReportId,
  assistants,
  labOwners,
  onAssignLab,
  cardId,
}) => {
  const isLabAssistant = role === ROLES.LAB_ASSISTANT
  const isLabOwner = role === ROLES.LAB_OWNER
  const isAdmin = role === ROLES.ADMIN
  const isPatient = role === ROLES.PATIENT
  const canAssignAssistant = isLabOwner
  const labLocked = isLabChangeLocked(booking)
  const canAssignLab = isAdmin && !labLocked
  const labName = isAdmin || isPatient ? (booking.labOwner?.name || null) : null
  const testName = booking.test?.title || booking.package?.title || 'N/A'
  const testCity = booking.test?.city || booking.package?.city
  const amount = booking.totalAmount || booking.test?.price || booking.package?.price || 0
  const detail = isPatient
    ? (booking.labOwner?.name || 'Lab Pending')
    : isLabAssistant
      ? booking.address
      : isLabOwner
        ? null
        : (booking.labOwner?.name || 'No Lab Assigned')
  const detailType = isPatient ? 'lab' : isLabAssistant ? 'address' : 'lab'
  const isDetailMissing = !isPatient && !isLabAssistant && !isLabOwner && !booking.labOwner?.name
  const assistantName = canAssignAssistant ? (booking.assignedLabAssistant?.name || 'No Assistant Assigned') : null
  const isAssistantMissing = canAssignAssistant && !booking.assignedLabAssistant?.name

  const threeDotButton = (isLabOwner || isLabAssistant) ? (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onMenuToggle?.(e, booking, cardId)
      }}
      className="p-1 text-muted-foreground hover:text-foreground rounded transition"
    >
      <MoreVertical size={16} />
    </button>
  ) : null

  return (
    <article
      onClick={() => onSelect?.(booking)}
      className="flex flex-col rounded-xl border border-border bg-card shadow-sm transition hover:shadow-md cursor-pointer"
    >
      <BookingCardHeader
        patientName={booking.patientName}
        phone={booking.phone}
        variant="initials"
      />

      <BookingCardContent
        testName={testName}
        testCity={testCity}
        amount={amount}
        bookingDate={booking.bookingDate}
        bookingTime={booking.bookingTime}
        detail={detail}
        detailType={detailType}
        isDetailMissing={isDetailMissing}
        assistantName={assistantName}
        isAssistantMissing={isAssistantMissing}
        assignedAssistantId={booking.assignedLabAssistant?._id || ''}
        assistants={canAssignAssistant ? assistants : null}
        onAssignAssistant={onAssignAssistant}
        bookingId={booking._id}
        bookingStatus={booking.status}
        additionalTests={booking.additionalTests}
        additionalPackages={booking.additionalPackages}
        labName={labName}
        labOwners={canAssignLab ? labOwners : null}
        assignedLabId={booking.labOwner?._id || ''}
        onAssignLab={onAssignLab}
      />

      <BookingCardBadges
        status={booking.status}
        paymentStatus={booking.paymentStatus}
        variant={isLabAssistant ? 'assistant' : 'default'}
        actionButton={threeDotButton}
      />

      {!isLabAssistant && (
        <BookingCardFooter
          booking={booking}
          role={role}
          onEditLab={onEditLab}
          onViewReport={onViewReport}
          onViewDetails={() => onSelect?.(booking)}
          onManageBooking={onManageBooking}
          onUploadReport={onUploadReport}
          uploadingReportId={uploadingReportId}
          labLocked={labLocked}
        />
      )}
    </article>
  )
}

export default BookingCard
