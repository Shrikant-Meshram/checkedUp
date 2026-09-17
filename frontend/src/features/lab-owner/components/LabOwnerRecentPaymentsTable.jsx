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

const LabOwnerRecentPaymentsTable = ({ data }) => {
  const navigate = useNavigate()

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="type-primary-heading-h3-medium text-foreground">Recent Payments</h3>
        <button
          onClick={() => navigate(ROUTES.LAB_OWNER_PAYMENTS)}
          className="text-xs font-semibold text-primary hover:underline"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2.5 text-muted-foreground text-[11px] font-semibold uppercase tracking-wider">Invoice ID</th>
              <th className="text-right py-2.5 text-muted-foreground text-[11px] font-semibold uppercase tracking-wider">Amount</th>
              <th className="text-left py-2.5 text-muted-foreground text-[11px] font-semibold uppercase tracking-wider">Status</th>
              <th className="text-left py-2.5 text-muted-foreground text-[11px] font-semibold uppercase tracking-wider hidden sm:table-cell">Date</th>
            </tr>
          </thead>
          <tbody>
            {(data || []).map((payment) => (
              <tr key={payment._id} className="border-b border-border/50 last:border-0">
                <td className="py-2.5 sm:py-3">
                  <span className="font-semibold text-primary text-xs sm:text-[13px]">{payment.invoiceId}</span>
                </td>
                <td className="py-2.5 sm:py-3 text-right font-semibold text-foreground text-xs sm:text-sm">
                  {formatCurrency(payment.amount)}
                </td>
                <td className="py-2.5 sm:py-3">
                  <span className={`px-2 sm:px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-medium ${paymentStyles[payment.status] || 'bg-gray-50 text-gray-600'}`}>
                    {payment.status}
                  </span>
                </td>
                <td className="py-2.5 sm:py-3 text-muted-foreground text-xs hidden sm:table-cell">
                  {payment.date ? new Date(payment.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  }) : 'N/A'}
                </td>
              </tr>
            ))}
            {(!data || data.length === 0) && (
              <tr>
                <td colSpan={4} className="py-6 sm:py-8 text-center text-muted-foreground text-xs">No recent payments</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LabOwnerRecentPaymentsTable
