import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { formatCurrency } from '@/utils/formatCurrency'

const paymentStyles = {
  Success: 'bg-success/10 text-success',
  Paid: 'bg-success/10 text-success',
  Pending: 'bg-warning/10 text-warning',
  Failed: 'bg-destructive/10 text-destructive',
  Refunded: 'bg-surface text-muted-foreground',
}

const RecentPaymentsTable = ({ data }) => {
  const navigate = useNavigate()

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="type-primary-heading-h3-medium text-foreground">Recent Payments</h3>
        <button
          onClick={() => navigate(ROUTES.ADMIN_PAYMENTS)}
          className="type-primary-body-b3-medium text-primary hover:underline"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full type-primary-body-b2">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 sm:py-2.5 type-primary-body-b3-medium uppercase tracking-wider">Payment ID</th>
              <th className="text-left py-2 sm:py-2.5 type-primary-body-b3-medium uppercase tracking-wider hidden sm:table-cell">Patient</th>
              <th className="text-right py-2 sm:py-2.5 type-primary-body-b3-medium uppercase tracking-wider">Amount</th>
              <th className="text-left py-2 sm:py-2.5 type-primary-body-b3-medium uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {(data || []).map((payment) => (
              <tr key={payment._id} className="border-b border-border/50 last:border-0">
                <td className="py-2.5 sm:py-3">
                  <span className="type-primary-body-b3-medium text-primary">{payment.paymentId}</span>
                  <span className="block sm:hidden type-primary-body-b3 text-muted-foreground mt-0.5">{payment.patientName}</span>
                </td>
                <td className="py-2.5 sm:py-3 text-foreground hidden sm:table-cell">{payment.patientName}</td>
                <td className="py-2.5 sm:py-3 text-right type-primary-body-b2-medium text-foreground">{formatCurrency(payment.amount)}</td>
                <td className="py-2.5 sm:py-3">
                  <span className={`px-2 sm:px-2.5 py-0.5 rounded-md type-primary-body-b3 ${paymentStyles[payment.status] || 'bg-surface text-muted-foreground'}`}>
                    {payment.status === 'Paid' ? 'Success' : payment.status}
                  </span>
                </td>
              </tr>
            ))}
            {(!data || data.length === 0) && (
              <tr>
                <td colSpan={4} className="py-6 sm:py-8 text-center text-muted-foreground type-primary-body-b3">No recent payments</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentPaymentsTable
