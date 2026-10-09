import { Search, X } from 'lucide-react'

export default function FilterBar({ filters, onFilterChange, onClear }) {
  const hasActiveFilters = Object.values(filters).some(
    (v) => v !== '' && v !== null && v !== undefined
  )

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search bookings..."
          value={filters.search || ''}
          onChange={(e) => onFilterChange('search', e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg type-primary-body-b2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Status Filter */}
      <select
        value={filters.status || ''}
        onChange={(e) => onFilterChange('status', e.target.value)}
        className="px-3 py-2 border border-gray-200 rounded-lg type-primary-body-b2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-white"
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>

      {/* Date Range */}
      <input
        type="date"
        value={filters.dateFrom || ''}
        onChange={(e) => onFilterChange('dateFrom', e.target.value)}
        className="px-3 py-2 border border-gray-200 rounded-lg type-primary-body-b2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
        placeholder="From Date"
      />
      <input
        type="date"
        value={filters.dateTo || ''}
        onChange={(e) => onFilterChange('dateTo', e.target.value)}
        className="px-3 py-2 border border-gray-200 rounded-lg type-primary-body-b2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
        placeholder="To Date"
      />

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={onClear}
          className="inline-flex items-center gap-1.5 px-3 py-2 type-primary-body-b2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
          Clear
        </button>
      )}
    </div>
  )
}
