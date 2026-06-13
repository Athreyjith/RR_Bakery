import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, ShoppingBag, User, LogOut, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-warm py-2' : 'bg-transparent py-4'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-brown-600 flex items-center justify-center shadow-warm group-hover:scale-105 transition-transform">
            <span className="text-cream text-lg font-accent">R</span>
          </div>
          <div className="leading-tight">
            <div className="font-accent text-xl text-brown-700 leading-none">RR Bake</div>
            <div className="font-body text-[10px] tracking-[0.2em] text-brown-400 uppercase">&amp; Sweet</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-200 ${isActive ? 'bg-brown-600 text-cream shadow-warm' : 'text-brown-600 hover:bg-brown-100'
                }`
              }>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions  */}
        {/* <div className="hidden md:flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              {user.role === 'admin' && (
                <Link to="/admin" className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gold-100 text-brown-700 text-sm font-semibold hover:bg-gold-200 transition-all">
                  <LayoutDashboard size={14} /> Admin
                </Link>
              )}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream border border-brown-200">
                <User size={14} className="text-brown-500" />
                <span className="text-sm font-medium text-brown-600">{user.name.split(' ')[0]}</span>
              </div>
              <button onClick={handleLogout} className="p-2 rounded-full text-brown-400 hover:bg-red-50 hover:text-red-500 transition-all">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-secondary text-sm px-5 py-2">Login</Link>
              <Link to="/register" className="btn-primary text-sm px-5 py-2">Join Us</Link>
            </>
          )}
        </div> */}

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-xl text-brown-600 hover:bg-brown-100 transition-all">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white/98 backdrop-blur border-t border-brown-100 px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl font-body text-sm font-medium transition-all ${isActive ? 'bg-brown-600 text-cream' : 'text-brown-600 hover:bg-brown-50'
                }`
              }>
              {label}
            </NavLink>
          ))}
          <div className="border-t border-brown-100 mt-2 pt-3 flex flex-col gap-2">
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link to="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gold-100 text-brown-700 font-semibold text-sm">
                    <LayoutDashboard size={16} /> Admin Dashboard
                  </Link>
                )}
                <button onClick={() => { handleLogout(); setOpen(false) }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-medium text-sm">
                  <LogOut size={16} /> Logout ({user.name})
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="btn-secondary w-full justify-center">Login</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="btn-primary w-full justify-center">Join Us</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
