import React from 'react'
import { X, Check, Shield, ArrowRight } from 'lucide-react'

const PackageDetailsModal = ({ item, onClose, handleBookNow }) => {
  const testsList = item?.testsIncluded || []
  const category = typeof item?.category === 'object' ? item?.category?.name : item?.category

  if (!item) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="relative bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-card/90 hover:bg-card rounded-full flex items-center justify-center shadow-md transition"
        >
          <X size={18} className="text-foreground" />
        </button>

        {/* Image */}
        {item.image ? (
          <div className="relative h-56 overflow-hidden rounded-t-2xl">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="relative h-56 overflow-hidden rounded-t-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
            <span className="text-6xl">🩺</span>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Title & Category */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <h2 className="type-primary-heading-h3-medium text-foreground">{item.title}</h2>
            {category && (
              <span className="px-3 py-1 bg-primary/10 text-primary type-primary-body-b2-medium rounded-full whitespace-nowrap">
                {category}
              </span>
            )}
          </div>

          {/* Description */}
          {item.description && (
            <p className="type-primary-body-b2 text-muted-foreground mb-5 leading-relaxed">{item.description}</p>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-1 mb-2">
            <span className="type-primary-heading-h3 text-foreground">₹</span>
            <span className="type-primary-heading-h1 text-foreground">{item.price}</span>
          </div>

          {/* Tests count */}
          <p className="type-primary-body-b2 text-muted-foreground mb-5">
            {testsList.length} Tests Included
          </p>

          {/* Divider */}
          <div className="border-t border-border my-4"></div>

          {/* Tests List */}
          <h4 className="type-primary-body-b1-medium text-foreground mb-3">Tests Included</h4>
          {testsList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {testsList.map((test, i) => (
                <div
                  key={test?._id || i}
                  className="flex items-center gap-2 type-primary-body-b2 text-foreground"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-primary" />
                  </div>
                  <span>{test?.name || test?.title || 'Test'}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="type-primary-body-b2 text-muted-foreground mb-6">No Tests Available</p>
          )}

          {/* Footer */}
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <div className="flex items-center gap-2 type-primary-body-b2 text-muted-foreground">
              <Shield size={16} className="text-primary" />
              <span>NABL Accredited Labs</span>
            </div>
            <div className="flex-1"></div>
            <button
              onClick={() => handleBookNow(item, 'package')}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white type-primary-body-b1-medium px-6 py-2.5 rounded-lg transition"
            >
              Book Now
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PackageDetailsModal
