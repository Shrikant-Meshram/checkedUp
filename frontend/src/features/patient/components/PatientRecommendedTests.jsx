import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

const testIcons = ['❤️', '💧', '🩸', '🫀', '🧪', '🔬']

const PatientRecommendedTests = ({ data }) => {
  const navigate = useNavigate()

  if (!data || data.length === 0) return null

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="type-primary-body-b1-medium text-foreground">Recommended Tests For You</h3>
        <button
          onClick={() => navigate(ROUTES.TESTS)}
          className="type-primary-body-b3-medium text-primary hover:underline"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {data.map((test, index) => {
          const discount = test.price > test.offerPrice
            ? Math.round(((test.price - test.offerPrice) / test.price) * 100)
            : 0

          return (
            <div
              key={test._id}
              className="rounded-xl border border-border p-4 hover:shadow-md transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center mb-3">
                <span className="type-primary-heading-h3-medium">{testIcons[index % testIcons.length]}</span>
              </div>
              <p className="type-primary-body-b2-medium text-foreground truncate">{test.title}</p>
              <p className="type-primary-body-b3 text-muted-foreground mt-0.5">Includes {test.testsCount} Test{test.testsCount > 1 ? 's' : ''}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="type-primary-body-b1-medium text-foreground">₹{test.offerPrice}</span>
                {discount > 0 && (
                  <>
                    <span className="type-primary-body-b3 text-muted-foreground line-through">₹{test.price}</span>
                    <span className="type-primary-body-b3-medium text-success">{discount}% OFF</span>
                  </>
                )}
              </div>
              <button
                onClick={() => navigate('/booking/tests')}
                className="w-full mt-3 py-1.5 px-3 type-primary-body-b3-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition"
              >
                Book Now
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PatientRecommendedTests
