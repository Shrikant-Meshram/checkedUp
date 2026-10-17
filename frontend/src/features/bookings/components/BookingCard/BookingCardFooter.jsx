import React from 'react'
import { Pencil, Eye, Download, Settings, FileUp } from 'lucide-react'
import { ROLES } from '@/constants/roles'
import { BOOKING_STATUS } from '@/constants/status'

const downloadReport = (url) => {
  if (!url) return
  const a = document.createElement('a')
  a.href = url
  a.download = ''
  a.target = '_blank'
  a.rel = 'noopener noreferrer'
  document.body.appendChild(a)
  a.click()
  a.remove()
}

const BookingCardFooter = ({
  booking,
  role,
  onEditLab,
  onViewReport,
  onViewDetails,
  onManageBooking,
  onMenuToggle,
  onUploadReport,
  uploadingReportId,
  cardId,
  labLocked = false,
}) => {
  const isAdmin = role === ROLES.ADMIN
  const isLabAssistant = role === ROLES.LAB_ASSISTANT
  const isPatient = role === ROLES.PATIENT
  const isLabOwner = role === ROLES.LAB_OWNER
  const isUploadingReport = uploadingReportId === booking._id

  if (isLabAssistant) {
    return (
      <div className="mt-auto pt-3 border-t border-border flex items-center justify-end px-4 pb-4">
        <div className="flex items-center gap-1">
          <button
            type="button"
            title="View Details"
            onClick={(e) => {
              e.stopPropagation()
              onViewDetails?.(booking)
            }}
            className="rounded p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/5 transition"
          >
            <Eye size={14} />
          </button>
          {!booking.report && (
            <button
              type="button"
              title={isUploadingReport ? 'Uploading...' : 'Upload Report'}
              disabled={isUploadingReport}
              onClick={(e) => {
                e.stopPropagation()
                if (isUploadingReport) return
                const input = document.createElement('input')
                input.type = 'file'
                input.accept = '.pdf,.jpg,.jpeg,.png'
                input.onchange = (ev) => {
                  const file = ev.target.files?.[0]
                  if (file) onUploadReport?.(booking._id, file)
                }
                input.click()
              }}
              className="rounded p-1.5 text-muted-foreground hover:text-success hover:bg-success/5 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploadingReport ? (
                <svg className="animate-spin size-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <FileUp size={14} />
              )}
            </button>
          )}
        </div>
      </div>
    )
  }

  if (isPatient) {
    const canManage = booking.status !== BOOKING_STATUS.COMPLETED && booking.status !== BOOKING_STATUS.CANCELLED
    return (
      <div className="mt-auto pt-3 border-t border-border flex items-center justify-between px-4 pb-4">
        <span className="type-primary-body-b3 text-muted-foreground flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          NABL Accredited Labs
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            title="View Details"
            onClick={(e) => {
              e.stopPropagation()
              onViewDetails?.(booking)
            }}
            className="rounded p-1 text-muted-foreground hover:text-primary hover:bg-primary/5 transition"
          >
            <Eye size={14} />
          </button>
          {booking.report && (
            <button
              type="button"
              title="Download Report"
              onClick={(e) => {
                e.stopPropagation()
                downloadReport(booking.report)
              }}
              className="rounded p-1 text-muted-foreground hover:text-primary hover:bg-primary/5 transition"
            >
              <Download size={14} />
            </button>
          )}
          {canManage && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onManageBooking(booking)
              }}
              className="rounded p-1 text-muted-foreground hover:text-warning hover:bg-warning/5 transition"
            >
              <Settings size={14} />
            </button>
          )}
        </div>
      </div>
    )
  }

  if (isLabOwner) {
    return (
      <div className="mt-auto pt-3 border-t border-border flex items-center justify-between px-4 pb-4">
        <span className="type-primary-body-b3 text-muted-foreground flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          NABL Accredited Labs
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            title="View Details"
            onClick={(e) => {
              e.stopPropagation()
              onViewDetails?.(booking)
            }}
            className="rounded p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/5 transition"
          >
            <Eye size={14} />
          </button>
          {booking.report && (
            <button
              type="button"
              title="Download Report"
              onClick={(e) => {
                e.stopPropagation()
                downloadReport(booking.report)
              }}
              className="rounded p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/5 transition"
            >
              <Download size={14} />
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="mt-auto pt-3 border-t border-border flex items-center justify-between px-4 pb-4">
      <span className="type-primary-body-b3 text-muted-foreground flex items-center gap-1">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        NABL Accredited Labs
      </span>
        <div className="flex items-center gap-1">
          {isAdmin && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                if (labLocked) return
                onEditLab(booking)
              }}
              disabled={labLocked || booking.status === BOOKING_STATUS.COMPLETED || booking.status === BOOKING_STATUS.CANCELLED}
              title={labLocked ? 'Lab cannot be changed after assistant reaches' : 'Edit assigned lab'}
              className="rounded p-1 text-muted-foreground hover:text-warning hover:bg-warning/5 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Pencil size={14} />
            </button>
          )}
          <button
            type="button"
            title="View Details"
            onClick={(e) => {
              e.stopPropagation()
              onViewDetails?.(booking)
            }}
            className="rounded p-1 text-muted-foreground hover:text-primary hover:bg-primary/5 transition"
          >
            <Eye size={14} />
          </button>
          {booking.report && (
            <button
              type="button"
              title="Download Report"
              onClick={(e) => {
                e.stopPropagation()
                downloadReport(booking.report)
              }}
              className="rounded p-1 text-muted-foreground hover:text-primary hover:bg-primary/5 transition"
            >
              <Download size={14} />
            </button>
          )}
        </div>
    </div>
  )
}

export default BookingCardFooter
