import React from 'react'
import Button from '@/components/ui/Button'

const DashboardSectionHeader = ({ title, subtitle, button, buttonText, buttonIcon, onClick }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 className="type-primary-body-b1-medium text-foreground">{title}</h2>
        {subtitle && <p className="type-primary-body-b3 text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {button && (
        <Button onClick={onClick} className="flex items-center gap-2">
          {buttonIcon}
          {buttonText}
        </Button>
      )}
    </div>
  )
}

export default DashboardSectionHeader
