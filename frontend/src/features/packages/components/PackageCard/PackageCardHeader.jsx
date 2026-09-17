import React from 'react'
import { Package } from 'lucide-react'

const PackageCardHeader = ({ title, image, isActive }) => {
  return (
    <div className="relative h-44 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
      {image ? (
        <img src={image} alt={title} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Package size={48} className="text-blue-200" />
        </div>
      )}
      <span className={`absolute top-2.5 left-2.5 rounded-md px-2 py-0.5 type-primary-body-b2 md:type-primary-body-b3 ${isActive ? 'bg-success text-white' : 'bg-destructive text-white'}`}>
        {isActive ? 'Active' : 'Inactive'}
      </span>
    </div>
  )
}

export default PackageCardHeader
