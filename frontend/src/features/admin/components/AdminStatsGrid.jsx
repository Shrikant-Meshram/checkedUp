import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipboardList, FlaskConical, TestTubeDiagonal, PackageOpen, Users, CreditCard, Banknote } from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { BOOKING_STATUS } from '@/constants/status'
import { DashboardStatsCard } from '@/components/Dashboard'
import Can from '@/components/Can'

const AdminStatsGrid = ({
  bookings,
  tests,
  packages,
  labOwners,
  activeSection,
  setActiveSection,
  scrollToTable,
  scrollToLabOwners,
  setActivePanel,
  openPaymentOverview,
}) => {
  const navigate = useNavigate()

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <DashboardStatsCard
          title="Bookings"
          value={bookings.length}
          icon={<ClipboardList size={18} />}
          color="blue"
          bgColor="bg-primary/10 text-primary"
          active={activeSection === 'all'}
          onClick={() => {
            setActiveSection('all')
            scrollToTable()
          }}
        />
        <DashboardStatsCard
          title="Tests"
          value={tests.length}
          icon={<FlaskConical size={18} />}
          color="green"
          bgColor="bg-success/10 text-success"
          onClick={() => navigate(ROUTES.TESTS)}
        />
        <DashboardStatsCard
          title="Pending"
          value={bookings.filter((item) => item.status === BOOKING_STATUS.PENDING).length}
          icon={<TestTubeDiagonal size={18} />}
          color="yellow"
          bgColor="bg-warning/10 text-warning"
          active={activeSection === 'pending'}
          onClick={() => {
            setActiveSection('pending')
            scrollToTable()
          }}
        />
        <DashboardStatsCard
          title="Completed"
          value={bookings.filter((item) => item.status === BOOKING_STATUS.COMPLETED).length}
          icon={<PackageOpen size={18} />}
          color="purple"
          bgColor="bg-primary/10 text-primary"
          active={activeSection === 'completed'}
          onClick={() => {
            setActiveSection('completed')
            scrollToTable()
          }}
        />
        <DashboardStatsCard
          title="Packages"
          value={packages.length}
          icon={<PackageOpen size={18} />}
          color="purple"
          bgColor="bg-primary/10 text-primary"
          onClick={() => navigate(ROUTES.PACKAGES)}
        />
        <DashboardStatsCard
          title="Lab Owners"
          value={labOwners.length}
          icon={<Users size={18} />}
          color="green"
          bgColor="bg-success/10 text-success"
          onClick={scrollToLabOwners}
        />
        <DashboardStatsCard
          title="Payments"
          value={bookings.filter((item) => item.paymentStatus === 'Paid').length}
          icon={<Banknote size={18} />}
          color="green"
          bgColor="bg-success/10 text-success"
          onClick={openPaymentOverview}
        />
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-6">
        <Can resource="tests" action="create">
          <button
            onClick={() => setActivePanel('test')}
            className="bg-primary/5 border border-primary/20 rounded-xl p-5 hover:bg-primary/10 transition text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-[10px] bg-primary/10 flex items-center justify-center">
                <FlaskConical size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-primary text-base text-foreground">Create Test</h3>
                <p className="text-muted-foreground type-primary-body-b3 mt-0.5">Add laboratory tests</p>
              </div>
            </div>
          </button>
        </Can>

        <Can resource="packages" action="create">
          <button
            onClick={() => setActivePanel('package')}
            className="bg-primary/5 border border-primary/20 rounded-xl p-5 hover:bg-primary/10 transition text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-[10px] bg-primary/10 flex items-center justify-center">
                <PackageOpen size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="type-primary-body-b2-medium text-foreground">Create Package</h3>
                <p className="type-primary-body-b3 text-muted-foreground mt-0.5">Add health packages</p>
              </div>
            </div>
          </button>
        </Can>

        <Can resource="lab_owners" action="create">
          <button
            onClick={() => setActivePanel('lab-owner')}
            className="bg-warning/5 border border-warning/20 rounded-xl p-5 hover:bg-warning/10 transition text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-[10px] bg-warning/10 flex items-center justify-center">
                <Users size={20} className="text-warning" />
              </div>
              <div>
                <h3 className="type-primary-body-b2-medium text-foreground">Create Lab Owner</h3>
                <p className="type-primary-body-b3 text-muted-foreground mt-0.5">Add laboratory owner</p>
              </div>
            </div>
          </button>
        </Can>

        <Can resource="payments" action="update">
          <button
            onClick={() => setActivePanel('payment')}
            className="bg-success/5 border border-success/20 rounded-xl p-5 hover:bg-success/10 transition text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-[10px] bg-success/10 flex items-center justify-center">
                <CreditCard size={20} className="text-success" />
              </div>
              <div>
                <h3 className="type-primary-body-b2-medium text-foreground">Payment Settings</h3>
                <p className="type-primary-body-b3 text-muted-foreground mt-0.5">Upload QR & UPI Details</p>
              </div>
            </div>
          </button>
        </Can>
      </div>
    </>
  )
}

export default AdminStatsGrid
