import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

const PatientRecommendedPackages = ({ data }) => {
  const navigate = useNavigate()

  if (!data || data.length === 0) return null

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="type-primary-body-b1-medium text-foreground">Frequently Booked Packages</h3>
        <button
          onClick={() => navigate(ROUTES.PACKAGES)}
          className="type-primary-body-b3-medium text-primary hover:underline"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {data.map((pkg) => (
          <div
            key={pkg._id}
            className="rounded-xl border border-border overflow-hidden hover:shadow-md transition-all duration-200"
          >
            <div className="h-28 bg-gradient-to-br from-primary/10 via-primary/5 to-card flex items-center justify-center">
              {pkg.image ? (
                <img src={pkg.image} alt={pkg.title} className="h-full w-full object-cover" />
              ) : (
                <span className="text-4xl">📦</span>
              )}
            </div>
            <div className="p-3">
              <p className="type-primary-body-b2-medium text-foreground truncate">{pkg.title}</p>
              <p className="type-primary-body-b3 text-muted-foreground mt-0.5">Includes {pkg.testsCount} Tests</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="type-primary-body-b1-medium text-foreground">₹{pkg.price.toLocaleString('en-IN')}</span>
              </div>
              <button
                onClick={() => navigate('/booking/tests')}
                className="w-full mt-2 py-1.5 px-3 type-primary-body-b3-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PatientRecommendedPackages
