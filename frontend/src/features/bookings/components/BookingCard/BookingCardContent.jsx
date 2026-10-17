import React from 'react'
import { Calendar, Clock, MapPin, User, Building2 } from 'lucide-react'
import Select from '@/components/ui/Select'

const BookingCardContent = ({ testName, testCity, amount, bookingDate, bookingTime, detail, detailType = 'address', isDetailMissing = false, assistantName, isAssistantMissing = false, assignedAssistantId = '', assistants, onAssignAssistant, bookingId, bookingStatus, additionalTests, additionalPackages, labName, labOwners, assignedLabId = '', onAssignLab }) => {
  return (
    <div className="flex flex-col flex-1 p-4 pt-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <h4 className="type-primary-body-b2-medium text-foreground leading-snug" title={testName}>
            {testName}
          </h4>
          {(additionalTests?.length > 0 || additionalPackages?.length > 0) && (
            <span className="type-primary-body-b3 text-purple-700 font-medium bg-purple-50 px-1.5 py-0.5 rounded">
              +{additionalTests.length + additionalPackages.length}
            </span>
          )}
        </div>

      <div className="mt-2">
        <span className="font-mono type-primary-body-b1-medium text-primary">
          ₹{amount?.toLocaleString('en-IN')}
        </span>
      </div>

      <dl className="mt-3 space-y-1.5 type-primary-body-b3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar size={12} />
          <span>{bookingDate}</span>
          <span className="text-border">•</span>
          <Clock size={12} />
          <span>{bookingTime}</span>
        </div>
        {labOwners ? (
          <div className="flex items-center gap-2 min-w-0">
            <Building2 size={12} className={`shrink-0 ${!assignedLabId ? 'text-amber-500' : 'text-muted-foreground'}`} />
            <div className="flex-1 min-w-0">
              <Select
                value={assignedLabId}
                onChange={(e) => { e.stopPropagation(); if (e.target.value) onAssignLab?.(bookingId, e.target.value) }}
                onClick={(e) => e.stopPropagation()}
                placeholder={assignedLabId ? labName : 'Assign Lab'}
                options={labOwners.map((lab) => ({ value: lab._id, label: lab.name }))}
                size="sm"
              />
            </div>
          </div>
        ) : labName ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building2 size={12} className="shrink-0" />
            <span className="truncate" title={labName}>{labName}</span>
          </div>
        ) : null}
        {assistants ? (
          <div className="flex items-center gap-2 min-w-0">
            <User size={12} className={`shrink-0 ${isAssistantMissing ? 'text-amber-500' : 'text-muted-foreground'}`} />
            <div className="flex-1 min-w-0">
              <Select
                value={assignedAssistantId}
                onChange={(e) => onAssignAssistant?.(bookingId, e.target.value)}
                onClick={(e) => e.stopPropagation()}
                placeholder={isAssistantMissing ? 'Assign' : assistantName}
                options={assistants.map((a) => ({ value: a._id, label: a.name }))}
                size="sm"
                disabled={bookingStatus !== 'Assigned' && bookingStatus !== 'Pending'}
              />
            </div>
          </div>
        ) : assistantName ? (
          <div className={`flex items-center gap-2 ${isAssistantMissing ? 'text-amber-500' : 'text-muted-foreground'}`}>
            <User size={12} className="shrink-0" />
            <span className={`truncate ${isAssistantMissing ? 'font-medium' : ''}`}>{assistantName}</span>
          </div>
        ) : null}
      </dl>
    </div>
  )
}

export default BookingCardContent
