import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../services/api'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setSuccessMsg('')
    try {
      const res = await api.post('/auth/forgot-password', { email })
      toast.success('Reset email sent!')
      setSuccessMsg(res.data.message + (res.data.previewLink ? ` (Check console or network for preview link)` : ''))
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error sending email')
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
            <div className="font-body text-xs tracking-[0.3em] text-brown-400 uppercase mt-1">Forgot Password</div>
          </Link>
        </div>

        <div className="card p-8 shadow-warm-lg">
          <h2 className="font-display text-2xl font-bold text-brown-700 mb-2 text-center">Reset your password</h2>
          <p className="text-sm text-brown-500 mb-6 text-center">Enter your email and we'll send you a link to reset your password.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="form-label">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="form-input" placeholder="you@example.com" required />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base">
              {loading ? <div className="w-5 h-5 border-2 border-cream border-t-transparent rounded-full animate-spin" /> : <><Mail size={16} /> Send Reset Link</>}
            </button>
          </form>

          {successMsg && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl text-center text-sm text-green-700">
              {successMsg}
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="font-body text-sm text-brown-400">
              Remember your password?{' '}
              <Link to="/login" className="text-brown-600 font-semibold hover:text-brown-800 underline underline-offset-2">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
