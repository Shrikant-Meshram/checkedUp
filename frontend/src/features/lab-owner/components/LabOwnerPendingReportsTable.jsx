import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

const dueDateStyles = {
  Overdue: 'bg-destructive/10 text-destructive',
  'Due Today': 'bg-warning/10 text-warning',
  'Due Tomorrow': 'bg-primary/10 text-primary',
  'On Time': 'bg-success/10 text-success',
}

const LabOwnerPendingReportsTable = ({ data }) => {
  const navigate = useNavigate()

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="type-primary-heading-h3-medium text-foreground">Pending Reports</h3>
        <button
          onClick={() => navigate(ROUTES.LAB_OWNER_REPORTS)}
          className="type-primary-button-b2 text-primary hover:underline"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2.5 type-primary-label-l2 uppercase tracking-wider">Booking ID</th>
              <th className="text-left py-2.5 type-primary-label-l2 uppercase tracking-wider hidden sm:table-cell">Patient</th>
              <th className="text-left py-2.5 type-primary-label-l2 uppercase tracking-wider hidden md:table-cell">Test/Package</th>
              <th className="text-left py-2.5 type-primary-label-l2 uppercase tracking-wider">Due Date</th>
              <th className="text-left py-2.5 type-primary-label-l2 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {(data || []).map((report) => (
              <tr key={report._id} className="border-b border-border/50 last:border-0">
                <td className="py-2.5 sm:py-3">
                  <span className="font-semibold text-primary type-primary-body-b2-medium">{report.bookingId}</span>
                </td>
                <td className="py-2.5 sm:py-3 type-primary-body-b2 text-foreground hidden sm:table-cell">{report.patientName}</td>
                <td className="py-2.5 sm:py-3 type-primary-body-b2 text-foreground hidden md:table-cell">
                  {report.testName || report.packageName || 'N/A'}
                </td>
                <td className="py-2.5 sm:py-3 type-primary-body-b3 text-muted-foreground">
                  {report.dueDate ? new Date(report.dueDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  }) : 'N/A'}
                </td>
                <td className="py-2.5 sm:py-3">
                  <span className={`px-2 sm:px-2.5 py-0.5 rounded-md type-primary-label-l2 font-medium ${dueDateStyles[report.dueStatus] || 'bg-gray-50 text-gray-600'}`}>
                    {report.dueStatus || 'On Time'}
                  </span>
                </td>
              </tr>
            ))}
            {(!data || data.length === 0) && (
              <tr>
                <td colSpan={5} className="py-6 sm:py-8 text-center text-muted-foreground type-primary-body-b3">No pending reports</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LabOwnerPendingReportsTable
