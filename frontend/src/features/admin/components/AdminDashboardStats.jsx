import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarCheck, FlaskConical, IndianRupee, Building2, Users, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react'
import { formatCurrency } from '@/utils/formatCurrency'
import { ROUTES } from '@/constants/routes'

const TrendBadge = ({ value }) => {
  if (value === 0) return null
  const isPositive = value > 0
  return (
    <span className={`inline-flex items-center gap-0.5 type-primary-body-b3 ${isPositive ? 'text-success' : 'text-destructive'}`}>
      {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
      {Math.abs(value)}% from last 7 days
    </span>
  )
}

const statConfig = [
  {
    key: 'totalBookings',
    title: 'Total Bookings',
    icon: CalendarCheck,
    iconBg: 'bg-primary/5',
    iconColor: 'text-primary',
    trendKey: 'totalBookingsTrend',
    subtitle: 'All time',
  },
  {
    key: 'totalTests',
    title: 'Total Tests',
    icon: FlaskConical,
    iconBg: 'bg-primary/5',
    iconColor: 'text-primary',
    trendKey: 'totalTestsTrend',
    subtitle: 'All time',
  },
  {
    key: 'totalRevenue',
    title: 'Total Revenue',
    icon: IndianRupee,
    iconBg: 'bg-success/5',
    iconColor: 'text-success',
    trendKey: 'totalRevenueTrend',
    isCurrency: true,
    subtitle: 'All time',
  },
  {
    key: 'activeLabOwners',
    title: 'Active Lab Owners',
    icon: Building2,
    iconBg: 'bg-warning/5',
    iconColor: 'text-warning',
    trendKey: 'activeLabOwnersTrend',
    subtitle: 'All time',
  },
  {
    key: 'totalUsers',
    title: 'Total Users',
    icon: Users,
    iconBg: 'bg-primary/5',
    iconColor: 'text-primary',
    trendKey: 'totalUsersTrend',
    subtitle: 'All time',
  },
]

const AdminDashboardStats = ({ stats }) => {
  const navigate = useNavigate()
  if (!stats) return null

  return (
    <div>
      {/* Mobile: Vertical cards in 3-col grid */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:hidden">
        {statConfig.slice(0, 3).map((s) => {
          const Icon = s.icon
          const value = stats[s.key] ?? 0
          const trend = stats[s.trendKey] ?? 0
          return (
            <div
              key={s.key}
              className="bg-card rounded-xl p-2.5 sm:p-4 shadow-sm border border-border hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-1.5 sm:mb-3">
                <p className="text-muted-foreground type-primary-body-b3-medium uppercase tracking-wider leading-tight">
                  {s.title}
                </p>
                <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center ${s.iconBg}`}>
                  <Icon size={12} className={s.iconColor} />
                </div>
              </div>
              <p className="font-mono type-primary-heading-h3-medium text-foreground">
                {s.isCurrency ? formatCurrency(value) : value.toLocaleString('en-IN')}
              </p>
              <TrendBadge value={trend} />
            </div>
          )
        })}
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-2 sm:mt-3 lg:hidden">
        {statConfig.slice(3, 5).map((s) => {
          const Icon = s.icon
          const value = stats[s.key] ?? 0
          const trend = stats[s.trendKey] ?? 0
          return (
            <div
              key={s.key}
              className="bg-card rounded-xl p-2.5 sm:p-4 shadow-sm border border-border hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-1.5 sm:mb-3">
                <p className="text-muted-foreground type-primary-body-b3-medium uppercase tracking-wider leading-tight">
                  {s.title}
                </p>
                <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center ${s.iconBg}`}>
                  <Icon size={12} className={s.iconColor} />
                </div>
              </div>
              <p className="font-mono type-primary-heading-h3-medium text-foreground">
                {s.isCurrency ? formatCurrency(value) : value.toLocaleString('en-IN')}
              </p>
              <TrendBadge value={trend} />
            </div>
          )
        })}
        <button
          onClick={() => navigate(ROUTES.ADMIN_REPORTS)}
          className="bg-card rounded-xl p-2.5 sm:p-4 shadow-sm border border-border hover:shadow-md transition flex flex-col items-center justify-center gap-1 sm:gap-2"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-destructive/5 flex items-center justify-center">
            <BarChart3 size={16} className="text-destructive" />
          </div>
          <span className="type-primary-body-b3-medium text-foreground text-center leading-tight">View Full Reports</span>
        </button>
      </div>

      {/* Desktop: Horizontal cards like tests page */}
      <div className="hidden lg:grid lg:grid-cols-5 gap-3">
        {statConfig.map((s) => {
          const Icon = s.icon
          const value = stats[s.key] ?? 0
          const trend = stats[s.trendKey] ?? 0
          return (
            <div
              key={s.key}
              className="bg-card rounded-xl p-4 shadow-sm border border-border hover:shadow-md transition flex items-center gap-3"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${s.iconBg}`}>
                <Icon size={20} className={s.iconColor} />
              </div>
              <div className="min-w-0">
                <p className="text-muted-foreground type-primary-body-b3 truncate">{s.title}</p>
                <p className="font-mono type-primary-heading-h3-medium text-foreground mt-0.5">
                  {s.isCurrency ? formatCurrency(value) : value.toLocaleString('en-IN')}
                </p>
                <TrendBadge value={trend} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AdminDashboardStats
