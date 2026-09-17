import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import { updateBookingStatus } from '@/services/booking.service'
import { DashboardSectionHeader } from '@/components/Dashboard'
import { DataTable } from '@/components/ui/data-table'
import { bookingColumns } from '@/features/admin/columns/bookings.columns'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import StatusButton from '@/components/booking/StatusButton'
import FilterBar from '@/components/booking/FilterBar'
import Can from '@/components/Can'

const AdminBookingsSection = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    dateFrom: '',
    dateTo: '',
  })
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [updating, setUpdating] = useState(false)

  const fetchBookings = async () => {
    try {
      setLoading(true)
      // Use the booking service to fetch bookings
      const { getBookings } = await import('@/services/booking.service')
      const data = await getBookings()
      setBookings(data)
    } catch (error) {
      toast.error('Failed to fetch bookings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({ search: '', status: '', dateFrom: '', dateTo: '' })
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      !filters.search ||
      booking.user?.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
      booking._id.toLowerCase().includes(filters.search.toLowerCase()) ||
      booking.lab?.name?.toLowerCase().includes(filters.search.toLowerCase())

    const matchesStatus = !filters.status || booking.status === filters.status

    const matchesDateFrom =
      !filters.dateFrom || new Date(booking.date) >= new Date(filters.dateFrom)

    const matchesDateTo =
      !filters.dateTo || new Date(booking.date) <= new Date(filters.dateTo)

    return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo
  })

  const getNextStatus = (currentStatus) => {
    const flow = {
      pending: 'confirmed',
      confirmed: 'in_progress',
      in_progress: 'completed',
    }
    return flow[currentStatus]
  }

  const handleStatusUpdate = async () => {
    if (!selectedBooking) return
    const nextStatus = getNextStatus(selectedBooking.status)
    if (!nextStatus) return

    try {
      setUpdating(true)
      await updateBookingStatus(selectedBooking._id, nextStatus)
      toast.success(`Booking status updated to ${nextStatus.replace('_', ' ')}`)
      setShowStatusModal(false)
      setSelectedBooking(null)
      fetchBookings()
    } catch (error) {
      toast.error('Failed to update booking status')
    } finally {
      setUpdating(false)
    }
  }

  const columns = [
    ...bookingColumns,
    {
      id: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const booking = row.original
        const nextStatus = getNextStatus(booking.status)
        return (
          <div className="flex items-center gap-2">
            <StatusButton status={booking.status} />
            {nextStatus && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setSelectedBooking(booking)
                  setShowStatusModal(true)
                }}
              >
                Update
              </Button>
            )}
          </div>
        )
      },
    },
  ]

  return (
    <>
      <DashboardSectionHeader
        title="Bookings"
        subtitle="Manage and track all booking requests"
      />

      <div className="space-y-4">
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClear={clearFilters}
        />

        <div className="type-primary-body-b2 text-muted-foreground">
          {filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''} found
        </div>

        <DataTable
          columns={columns}
          data={filteredBookings}
          loading={loading}
          searchColumn="user"
          searchPlaceholder="Search bookings..."
        />
      </div>

      {/* Status Update Modal */}
      <Modal
        open={showStatusModal}
        onClose={() => {
          setShowStatusModal(false)
          setSelectedBooking(null)
        }}
        title="Update Booking Status"
        size="sm"
      >
        <div className="space-y-4">
          <p className="type-primary-body-b2 text-muted-foreground">
            Update booking{' '}
            <span className="font-mono font-semibold">
              #{selectedBooking?._id?.slice(-8).toUpperCase()}
            </span>{' '}
            from{' '}
            <span className="font-semibold capitalize">
              {selectedBooking?.status?.replace('_', ' ')}
            </span>{' '}
            to{' '}
            <span className="font-semibold capitalize">
              {getNextStatus(selectedBooking?.status)?.replace('_', ' ')}
            </span>?
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setShowStatusModal(false)
                setSelectedBooking(null)
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleStatusUpdate} loading={updating}>
              Confirm Update
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default AdminBookingsSection
