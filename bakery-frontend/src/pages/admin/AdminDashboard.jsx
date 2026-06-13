import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Package, CreditCard, Users, TrendingUp, AlertCircle, ArrowRight, IndianRupee } from 'lucide-react'
import api from '../../services/api'

function StatCard({ icon, title, value, sub, color, to }) {
  const content = (
    <div className={`card p-6 border-l-4 ${color} hover:shadow-warm-lg transition-all group`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-body text-xs text-brown-400 uppercase tracking-wider font-semibold">{title}</p>
          <p className="font-display text-3xl font-bold text-brown-700 mt-1">{value}</p>
          {sub && <p className="font-body text-xs text-brown-400 mt-1">{sub}</p>}
        </div>
        <div className="w-12 h-12 rounded-2xl bg-beige flex items-center justify-center text-brown-500 group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
    </div>
  )
  return to ? <Link to={to}>{content}</Link> : content
}

function RecentDebtRow({ debt }) {
  const badge = {
    pending: <span className="badge-pending">🔴 Pending</span>,
    partial: <span className="badge-partial">🟡 Partial</span>,
    paid: <span className="badge-paid">🟢 Paid</span>,
  }
  return (
    <div className="flex items-center justify-between py-3 border-b border-brown-50 last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-brown-100 flex items-center justify-center font-bold text-brown-600 text-sm">
          {debt.customer_name?.[0]?.toUpperCase()}
        </div>
        <div>
          <p className="font-body text-sm font-semibold text-brown-700">{debt.customer_name}</p>
          <p className="font-body text-xs text-brown-400">{debt.order_details}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="font-body text-sm font-bold text-brown-700">₹{debt.remaining_amount}</p>
          <p className="font-body text-xs text-brown-400">due</p>
        </div>
        {badge[debt.status]}
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null)
  const [products, setProducts] = useState([])
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/debts/summary').catch(() => ({ data: null })),
      api.get('/products').catch(() => ({ data: [] })),
      api.get('/customers').catch(() => ({ data: [] })),
    ]).then(([s, p, c]) => {
      setSummary(s.data)
      setProducts(p.data)
      setCustomers(c.data)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="space-y-4">
      {Array(4).fill(0).map((_, i) => (
        <div key={i} className="skeleton h-24 rounded-2xl"></div>
      ))}
    </div>
  )

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Welcome */}
      <div>
        <h2 className="font-display text-2xl font-bold text-brown-700">Good morning! 🍰</h2>
        <p className="font-body text-sm text-brown-400 mt-1">Here's what's happening at RR Bake & Sweet today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Package size={22} />}
          title="Total Products"
          value={products.length || 0}
          sub="In your menu"
          color="border-gold-400"
          to="/admin/products"
        />
        <StatCard
          icon={<Users size={22} />}
          title="Customers"
          value={customers.length || 0}
          sub="Registered users"
          color="border-pink-300"
          to="/admin/customers"
        />
        <StatCard
          icon={<CreditCard size={22} />}
          title="Pending Debts"
          value={summary?.customersWithDebt || 0}
          sub="Customers with dues"
          color="border-red-400"
          to="/admin/debts"
        />
        <StatCard
          icon={<IndianRupee size={22} />}
          title="Outstanding"
          value={`₹${(summary?.totalOutstanding || 0).toLocaleString()}`}
          sub="Total amount due"
          color="border-brown-400"
          to="/admin/debts"
        />
      </div>

      {/* Debt breakdown + Recent */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Breakdown */}
        <div className="card p-6">
          <h3 className="font-display text-lg font-semibold text-brown-700 mb-5">Debt Overview</h3>
          <div className="space-y-4">
            {[
              { label: 'Pending (Unpaid)', value: summary?.totalDebtors || 0, color: 'bg-red-400', emoji: '🔴' },
              { label: 'Partially Paid', value: summary?.partialPaid || 0, color: 'bg-yellow-400', emoji: '🟡' },
              { label: 'Fully Paid', value: summary?.fullyPaid || 0, color: 'bg-green-400', emoji: '🟢' },
            ].map(({ label, value, color, emoji }) => {
              const total = (summary?.totalDebtors || 0) + (summary?.partialPaid || 0) + (summary?.fullyPaid || 0) || 1
              const pct = Math.round((value / total) * 100)
              return (
                <div key={label}>
                  <div className="flex justify-between mb-1">
                    <span className="font-body text-sm text-brown-600">{emoji} {label}</span>
                    <span className="font-body text-sm font-bold text-brown-700">{value}</span>
                  </div>
                  <div className="h-2 bg-brown-100 rounded-full overflow-hidden">
                    <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              )
            })}
          </div>
          <Link to="/admin/debts" className="inline-flex items-center gap-1 text-sm text-brown-500 hover:text-brown-700 font-semibold mt-5 transition-colors">
            View All Debts <ArrowRight size={14} />
          </Link>
        </div>

        {/* Recent Unpaid */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-lg font-semibold text-brown-700">Recent Unpaid</h3>
            <span className="flex items-center gap-1 text-xs text-red-500 font-semibold">
              <AlertCircle size={13} /> {summary?.customersWithDebt || 0} pending
            </span>
          </div>
          {summary?.recentUnpaid?.length > 0 ? (
            <div>
              {summary.recentUnpaid.map(d => <RecentDebtRow key={d._id} debt={d} />)}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🎉</div>
              <p className="font-body text-sm text-brown-400">No pending debts! All clear.</p>
            </div>
          )}
          <Link to="/admin/debts" className="inline-flex items-center gap-1 text-sm text-brown-500 hover:text-brown-700 font-semibold mt-4 transition-colors">
            Manage Debts <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h3 className="font-display text-lg font-semibold text-brown-700 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/products" className="btn-primary text-sm px-5 py-2.5">
            <Package size={15} /> Add Product
          </Link>
          <Link to="/admin/debts" className="btn-secondary text-sm px-5 py-2.5">
            <CreditCard size={15} /> Add Debt Record
          </Link>
          <Link to="/" target="_blank" className="btn-gold text-sm px-5 py-2.5">
            <TrendingUp size={15} /> View Website
          </Link>
        </div>
      </div>
    </div>
  )
}
