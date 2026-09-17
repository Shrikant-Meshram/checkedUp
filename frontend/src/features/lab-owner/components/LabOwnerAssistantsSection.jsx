import React from 'react'
import { Users, UserPlus } from 'lucide-react'
import { DashboardSectionHeader } from '@/components/Dashboard'
import { BOOKING_STATUS } from '@/constants/status'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'

const LabOwnerAssistantsSection = ({
  assistants,
  bookings,
  activeSection,
  selectedAssistant,
  setSelectedAssistant,
  setShowAssistantForm,
  scrollToTable,
}) => {
  return (
    <>
      {activeSection === 'assistants' && (
        <div className="bg-card rounded-xl shadow-card border border-border mt-6 p-5 md:p-6">
          <DashboardSectionHeader
            title="Lab Assistants"
            subtitle="Manage your assistants"
            button
            buttonText="Create Assistant"
            buttonIcon={<UserPlus />}
            onClick={() => setShowAssistantForm(true)}
          />
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
            {assistants.map((assistant) => {
              const totalBookings = bookings.filter(
                (booking) => booking.assignedLabAssistant?._id === assistant._id
              )
              return (
                <Button
                  key={assistant._id}
                  onClick={() => {
                    setSelectedAssistant(assistant._id)
                    scrollToTable()
                  }}
                  variant="ghost"
                  className={`border rounded-xl p-4 hover:shadow-card-hover transition text-left bg-card
                      ${
                        selectedAssistant === assistant._id
                          ? 'border-purple-500 ring-2 ring-purple-200'
                          : 'border-gray-100'
                      }
                      `}
                >
                  <div className="w-10 h-10 rounded-[10px] bg-success/10 text-success flex items-center justify-center font-bold text-sm">
                    <Users size={18} />
                  </div>
                  <h3 className="type-primary-heading-h4-medium text-foreground mt-3">{assistant.name}</h3>
                  <p className="type-primary-body-b3 text-muted-foreground mt-0.5 break-all">{assistant.email}</p>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-primary/10 rounded-lg p-3 text-center">
                      <p className="type-primary-label-l2 text-muted-foreground">Total Tests</p>
                      <h4 className="font-mono type-primary-heading-h3-medium text-primary mt-0.5">
                        {totalBookings.length}
                      </h4>
                    </div>
                    <div className="bg-success/10 border border-success/20 rounded-lg p-3 text-center">
                      <p className="type-primary-label-l2 text-muted-foreground">Completed</p>
                      <h4 className="font-mono type-primary-heading-h3-medium text-success mt-0.5">
                        {
                          totalBookings.filter((item) => item.status === BOOKING_STATUS.COMPLETED)
                            .length
                        }
                      </h4>
                    </div>
                  </div>
                </Button>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default LabOwnerAssistantsSection
