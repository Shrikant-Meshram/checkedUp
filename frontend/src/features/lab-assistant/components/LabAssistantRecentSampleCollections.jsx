import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

const statusStyles = {
  'Sample Collected': 'bg-success/10 text-success',
  Completed: 'bg-success/10 text-success',
  Processing: 'bg-primary/10 text-primary',
  Reached: 'bg-indigo-50 text-indigo-600',
  Assigned: 'bg-purple-50 text-purple-600',
}

const LabAssistantRecentSampleCollections = ({ data }) => {
  const navigate = useNavigate()

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="type-primary-heading-h3-medium text-foreground">Recent Sample Collections</h3>
        <button
          onClick={() => navigate(ROUTES.LAB_ASSISTANT_SAMPLE_PICKUPS)}
          className="type-primary-body-b3-medium text-primary hover:underline"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full type-primary-body-b2">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2.5 text-muted-foreground type-primary-body-b3-medium uppercase tracking-wider">Booking ID</th>
              <th className="text-left py-2.5 text-muted-foreground type-primary-body-b3-medium uppercase tracking-wider hidden sm:table-cell">Patient</th>
              <th className="text-left py-2.5 text-muted-foreground type-primary-body-b3-medium uppercase tracking-wider hidden md:table-cell">Sample Type</th>
              <th className="text-left py-2.5 text-muted-foreground type-primary-body-b3-medium uppercase tracking-wider hidden lg:table-cell">Collection Time</th>
              <th className="text-left py-2.5 text-muted-foreground type-primary-body-b3-medium uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {(data || []).map((item) => (
              <tr key={item._id} className="border-b border-border/50 last:border-0">
                <td className="py-2.5 sm:py-3">
                  <span className="type-primary-body-b3-medium text-primary sm:text-[13px]">{item.bookingId}</span>
                </td>
                <td className="py-2.5 sm:py-3 text-foreground hidden sm:table-cell">{item.patientName}</td>
                <td className="py-2.5 sm:py-3 text-foreground hidden md:table-cell">{item.sampleType}</td>
                <td className="py-2.5 sm:py-3 text-muted-foreground type-primary-body-b3 hidden lg:table-cell">
                  {item.collectionTime ? new Date(item.collectionTime).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  }) : 'N/A'}
                </td>
                <td className="py-2.5 sm:py-3">
                  <span className={`px-2 sm:px-2.5 py-0.5 rounded-md type-primary-body-b3 sm:type-primary-body-b3 font-medium ${statusStyles[item.status] || 'bg-gray-50 text-gray-600'}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
            {(!data || data.length === 0) && (
              <tr>
                <td colSpan={5} className="py-6 sm:py-8 text-center text-muted-foreground type-primary-body-b3">No recent collections</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LabAssistantRecentSampleCollections
