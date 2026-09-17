import React from 'react'

const TestCardBadges = ({ isActive: active }) => {
  return (
    <div className="px-4 pb-4 pt-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="type-primary-body-b1 md:type-primary-body-b2 text-muted-foreground font-medium w-14 shrink-0">Status:</span>
        <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 type-primary-body-b2 md:type-primary-body-b3 ${active ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-success' : 'bg-destructive'}`}></span>
          {active ? 'Active' : 'Inactive'}
        </span>
      </div>
    </div>
  )
}

export default TestCardBadges
