import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login, user } = useAuth()
  const navigate = useNavigate()

  if (user) { navigate(user.role === 'admin' ? '/admin' : '/'); return null }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const u = await login(form.email, form.password)
      toast.success(`Welcome back, ${u.name}! 🍰`)
      navigate(u.role === 'admin' ? '/admin' : '/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige via-cream to-brown-50 flex items-center justify-center px-4 py-12">
      {/* Decorative */}
      <div className="absolute top-20 right-10 text-6xl opacity-20 animate-float">🎂</div>
      <div className="absolute bottom-20 left-10 text-5xl opacity-15 animate-float" style={{ animationDelay: '1s' }}>🍰</div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="font-accent text-4xl text-brown-700">RR Bake & Sweet</div>
            <div className="font-body text-xs tracking-[0.3em] text-brown-400 uppercase mt-1">Welcome Back</div>
          </Link>
        </div>

        <div className="card p-8 shadow-warm-lg">
          <h2 className="font-display text-2xl font-bold text-brown-700 mb-6 text-center">Sign In to Your Account</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="form-label">Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="form-input" placeholder="you@example.com" required />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="form-label mb-0">Password</label>
                <Link to="/forgot-password" className="text-xs text-brown-500 hover:text-brown-700 underline underline-offset-2">Forgot Password?</Link>
              </div>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                  className="form-input pr-11" placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-400 hover:text-brown-600">
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base">
              {loading ? <div className="w-5 h-5 border-2 border-cream border-t-transparent rounded-full animate-spin" /> : <><LogIn size={16} /> Sign In</>}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-body text-sm text-brown-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-brown-600 font-semibold hover:text-brown-800 underline underline-offset-2">Create one</Link>
            </p>
          </div>

          {/* Demo credentials hint */}
          <div className="mt-4 p-3 bg-gold-50 border border-gold-200 rounded-xl text-center">
            {/* <p className="font-body text-xs text-brown-500">
              <span className="font-bold">Admin demo:</span> admin@rrbake.com / admin123
            </p> */}
          </div>
        </div>

        <p className="text-center mt-6 font-body text-sm text-brown-400">
          <Link to="/" className="hover:text-brown-600 transition-colors">← Back to Home</Link>
        </p>
      </div>
    </div>
  )
}
