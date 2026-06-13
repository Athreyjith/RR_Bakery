import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, Users, CreditCard, Settings, LogOut, Menu, X, ChevronRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} />, end: true },
  { to: '/admin/products', label: 'Products', icon: <Package size={18} /> },
  { to: '/admin/debts', label: 'Debt Management', icon: <CreditCard size={18} /> },
  { to: '/admin/customers', label: 'Customers', icon: <Users size={18} /> },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/') }

  const Sidebar = () => (
    <aside className="h-full bg-brown-800 flex flex-col">
      {/* Brand */}
      <div className="p-6 border-b border-brown-700">
        <div className="font-accent text-2xl text-cream">RR Bake & Sweet</div>
        <div className="font-body text-xs text-brown-400 mt-1 tracking-wider uppercase">Admin Panel</div>
      </div>

      {/* User */}
      <div className="px-4 py-4 border-b border-brown-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gold-500 flex items-center justify-center text-brown-800 font-bold text-sm">
            {user?.name?.[0]}
          </div>
          <div>
            <div className="font-body text-sm font-semibold text-cream">{user?.name}</div>
            <div className="font-body text-xs text-brown-400">Administrator</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ to, label, icon, end }) => (
          <NavLink key={to} to={to} end={end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-6 space-y-1">
        <NavLink to="/" className="sidebar-link text-brown-400">
          <ChevronRight size={18} /> View Website
        </NavLink>
        <button onClick={handleLogout} className="sidebar-link w-full text-left text-red-400 hover:bg-red-500/10 hover:text-red-300">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  )

  return (
    <div className="min-h-screen flex bg-brown-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 h-full"><Sidebar /></div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-brown-100 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl text-brown-600 hover:bg-brown-100">
              <Menu size={20} />
            </button>
            <h1 className="font-display text-lg font-semibold text-brown-700">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 bg-cream border border-brown-200 rounded-full px-3 py-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="font-body text-xs text-brown-600">{user?.name}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
