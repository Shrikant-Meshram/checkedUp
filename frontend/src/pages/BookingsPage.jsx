import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Calendar, MapPin, User, ChevronDown, ChevronUp, CheckCircle, XCircle, PlayCircle, Clock } from 'lucide-react'
import StatusButton from '@/components/booking/StatusButton'
import FilterBar from '@/components/booking/FilterBar'
import Modal from '@/components/booking/Modal'
import useBookings from '@/hooks/useBookings'
import useBookingFilters from '@/hooks/useBookingFilters'

export default function BookingsPage() {
  const { bookings, loading, error, updateBookingStatus, fetchBookings } = useBookings()
  const { filters, setFilters, clearFilters, filteredBookings } = useBookingFilters(bookings)
  const [expandedRow, setExpandedRow] = useState(null)
  const [statusModal, setStatusModal] = useState({ open: false, booking: null, newStatus: null })
  const [actionLoading, setActionLoading] = useState(null)

  useEffect(() => {
    fetchBookings()
  }, [])

  const handleStatusChange = (booking, newStatus) => {
    setStatusModal({ open: true, booking, newStatus })
  }

  const confirmStatusChange = async () => {
    if (!statusModal.booking) return
    setActionLoading(statusModal.booking._id)
    try {
      await updateBookingStatus(statusModal.booking._id, statusModal.newStatus)
      setStatusModal({ open: false, booking: null, newStatus: null })
    } catch (err) {
      console.error('Failed to update status:', err)
    } finally {
      setActionLoading(null)
    }
  }

  const getNextStatus = (currentStatus) => {
    const flow = {
      pending: 'confirmed',
      confirmed: 'in_progress',
      in_progress: 'completed',
    }
    return flow[currentStatus]
  }

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock className="w-4 h-4" />,
      confirmed: <CheckCircle className="w-4 h-4" />,
      in_progress: <PlayCircle className="w-4 h-4" />,
      completed: <CheckCircle className="w-4 h-4" />,
      cancelled: <XCircle className="w-4 h-4" />,
    }
    return icons[status]
  }

  const getActionLabel = (status) => {
    const labels = {
      pending: 'Confirm',
      confirmed: 'Start',
      in_progress: 'Complete',
    }
    return labels[status]
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Error loading bookings: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="type-primary-heading-h1 font-bold text-gray-900">Bookings</h1>
          <p className="type-primary-body-b2 text-gray-500 mt-1">
            Manage and track all booking requests
          </p>
        </div>
        <div className="type-primary-body-b2 text-gray-500">
          {filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Filters */}
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        onClear={clearFilters}
      />

      {/* Bookings Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 type-primary-body-b3-medium text-gray-600 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="text-left px-4 py-3 type-primary-body-b3-medium text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="text-left px-4 py-3 type-primary-body-b3-medium text-gray-600 uppercase tracking-wider">
                  Lab
                </th>
                <th className="text-left px-4 py-3 type-primary-body-b3-medium text-gray-600 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="text-left px-4 py-3 type-primary-body-b3-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-4 py-3 type-primary-body-b3-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
                <th className="w-10 px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBookings.map((booking) => (
                <>
                  <tr
                    key={booking._id}
                    className={`hover:bg-gray-50 transition-colors ${expandedRow === booking._id ? 'bg-blue-50/50' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <span className="type-primary-body-b2 font-mono text-gray-600">
                        #{booking._id.slice(-8).toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="type-primary-body-b2-medium text-gray-900">{booking.user?.name || 'N/A'}</p>
                          <p className="type-primary-body-b3 text-gray-500">{booking.user?.phone || ''}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span className="type-primary-body-b2 text-gray-700 truncate max-w-[150px]">
                          {booking.lab?.name || 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <div>
                          <p className="type-primary-body-b2 text-gray-900">
                            {booking.date ? format(new Date(booking.date), 'MMM dd, yyyy') : 'N/A'}
                          </p>
                          <p className="type-primary-body-b3 text-gray-500">{booking.timeSlot || ''}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <StatusButton
                        status={booking.status}
                        onClick={() => {
                          const nextStatus = getNextStatus(booking.status)
                          if (nextStatus) handleStatusChange(booking, nextStatus)
                        }}
                        disabled={!getNextStatus(booking.status) || actionLoading === booking._id}
                      />
                    </td>
                    <td className="px-4 py-3">
                      {getNextStatus(booking.status) && (
                        <button
                          onClick={() => handleStatusChange(booking, getNextStatus(booking.status))}
                          disabled={actionLoading === booking._id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 type-primary-body-b2-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                        >
                          {getStatusIcon(getNextStatus(booking.status))}
                          {getActionLabel(booking.status)}
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setExpandedRow(expandedRow === booking._id ? null : booking._id)}
                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                      >
                        {expandedRow === booking._id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                  {expandedRow === booking._id && (
                    <tr key={`${booking._id}-expanded`}>
                      <td colSpan="7" className="px-4 py-4 bg-gray-50">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="type-primary-body-b3-medium text-gray-500 uppercase tracking-wider">Address</p>
                            <p className="type-primary-body-b2 text-gray-900 mt-1">{booking.lab?.address || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="type-primary-body-b3-medium text-gray-500 uppercase tracking-wider">Services</p>
                            <p className="type-primary-body-b2 text-gray-900 mt-1">
                              {booking.services?.map((s) => s.name || s).join(', ') || 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="type-primary-body-b3-medium text-gray-500 uppercase tracking-wider">Total Amount</p>
                            <p className="type-primary-body-b2 text-gray-900 mt-1 font-semibold">
                              ₹{booking.totalAmount?.toLocaleString() || '0'}
                            </p>
                          </div>
                          <div>
                            <p className="type-primary-body-b3-medium text-gray-500 uppercase tracking-wider">Created</p>
                            <p className="type-primary-body-b2 text-gray-900 mt-1">
                              {booking.createdAt ? format(new Date(booking.createdAt), 'MMM dd, yyyy hh:mm a') : 'N/A'}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-4 py-12 text-center">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No bookings found</p>
                    <p className="type-primary-body-b2 text-gray-400 mt-1">Try adjusting your filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Confirmation Modal */}
      <Modal
        isOpen={statusModal.open}
        onClose={() => setStatusModal({ open: false, booking: null, newStatus: null })}
        title="Confirm Status Change"
        size="sm"
      >
        <div className="space-y-4">
          <p className="type-primary-body-b2 text-gray-600">
            Are you sure you want to change the status of booking{' '}
            <span className="font-mono font-semibold">
              #{statusModal.booking?._id?.slice(-8).toUpperCase()}
            </span>{' '}
            from{' '}
            <span className="font-semibold capitalize">{statusModal.booking?.status?.replace('_', ' ')}</span>{' '}
            to{' '}
            <span className="font-semibold capitalize">{statusModal.newStatus?.replace('_', ' ')}</span>?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setStatusModal({ open: false, booking: null, newStatus: null })}
              className="px-4 py-2 type-primary-body-b2-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmStatusChange}
              disabled={actionLoading}
              className="px-4 py-2 type-primary-body-b2-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
            >
              {actionLoading ? 'Updating...' : 'Confirm'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
