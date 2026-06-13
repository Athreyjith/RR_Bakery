import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../services/api'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const { token } = useParams()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post(`/auth/reset-password/${token}`, { password })
      toast.success('Password reset successfully! Please sign in.')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error resetting password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige via-cream to-brown-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="font-accent text-4xl text-brown-700">RR Bake & Sweet</div>
            <div className="font-body text-xs tracking-[0.3em] text-brown-400 uppercase mt-1">Reset Password</div>
          </Link>
        </div>

        <div className="card p-8 shadow-warm-lg">
          <h2 className="font-display text-2xl font-bold text-brown-700 mb-6 text-center">Create New Password</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="form-label">New Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  className="form-input pr-11" placeholder="••••••••" required minLength="6" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-400 hover:text-brown-600">
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base">
              {loading ? <div className="w-5 h-5 border-2 border-cream border-t-transparent rounded-full animate-spin" /> : <><Lock size={16} /> Reset Password</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
