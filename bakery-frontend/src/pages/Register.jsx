import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, UserPlus } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      const u = await register(form.name, form.email, form.password, form.phone)
      toast.success(`Welcome to RR Bake & Sweet, ${u.name}! 🍰`)
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige via-cream to-brown-50 flex items-center justify-center px-4 py-12">
      <div className="absolute top-20 left-10 text-5xl opacity-20 animate-float">🥐</div>
      <div className="absolute bottom-20 right-10 text-6xl opacity-15 animate-float" style={{animationDelay:'0.8s'}}>🍪</div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="font-accent text-4xl text-brown-700">RR Bake & Sweet</div>
            <div className="font-body text-xs tracking-[0.3em] text-brown-400 uppercase mt-1">Join Our Sweet Family</div>
          </Link>
        </div>

        <div className="card p-8 shadow-warm-lg">
          <h2 className="font-display text-2xl font-bold text-brown-700 mb-6 text-center">Create Your Account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="form-label">Full Name</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                className="form-input" placeholder="Your full name" required />
            </div>
            <div>
              <label className="form-label">Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                className="form-input" placeholder="you@example.com" required />
            </div>
            <div>
              <label className="form-label">Phone Number</label>
              <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                className="form-input" placeholder="10-digit mobile number" />
            </div>
            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                  className="form-input pr-11" placeholder="Min. 6 characters" required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-400 hover:text-brown-600">
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base mt-2">
              {loading ? <div className="w-5 h-5 border-2 border-cream border-t-transparent rounded-full animate-spin" /> : <><UserPlus size={16} /> Create Account</>}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-body text-sm text-brown-400">
              Already have an account?{' '}
              <Link to="/login" className="text-brown-600 font-semibold hover:text-brown-800 underline underline-offset-2">Sign in</Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-6 font-body text-sm text-brown-400">
          <Link to="/" className="hover:text-brown-600 transition-colors">← Back to Home</Link>
        </p>
      </div>
    </div>
  )
}
