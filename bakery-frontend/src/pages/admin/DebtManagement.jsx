import { useState, useEffect } from 'react'
import { Plus, Search, X, Save, IndianRupee, Trash2, CreditCard, CheckCircle, Phone } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../services/api'

const EMPTY_DEBT = { customer_name: '', phone: '', order_details: '', total_amount: '', paid_amount: '0', notes: '' }

/* ─── Add/Edit Debt Modal ─── */
function DebtModal({ debt, onSave, onClose }) {
  const [form, setForm] = useState(debt || EMPTY_DEBT)
  const [saving, setSaving] = useState(false)
  const isEdit = !!debt?._id
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const remaining = (Number(form.total_amount) || 0) - (Number(form.paid_amount) || 0)

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.customer_name || !form.phone || !form.total_amount || !form.order_details) {
      toast.error('Please fill all required fields'); return
    }
    setSaving(true)
    try {
      if (isEdit) {
        const res = await api.put(`/debts/${debt._id}`, form)
        onSave(res.data, 'edit'); toast.success('Debt record updated!')
      } else {
        const res = await api.post('/debts', form)
        onSave(res.data, 'add'); toast.success('Debt record added!')
      }
      onClose()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving record')
    } finally { setSaving(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-warm-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-brown-100">
          <h2 className="font-display text-xl font-bold text-brown-700">{isEdit ? 'Edit Debt Record' : 'Add New Debt'}</h2>
          <button onClick={onClose} className="p-2 rounded-xl text-brown-400 hover:bg-brown-100"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Customer Name *</label>
              <input value={form.customer_name} onChange={e => set('customer_name', e.target.value)} className="form-input" placeholder="e.g. Rahul Sharma" required />
            </div>
            <div>
              <label className="form-label">Phone Number *</label>
              <input value={form.phone} onChange={e => set('phone', e.target.value)} className="form-input" placeholder="9036608966" required />
            </div>
            <div className="col-span-2">
              <label className="form-label">Order Details *</label>
              <input value={form.order_details} onChange={e => set('order_details', e.target.value)} className="form-input" placeholder="e.g. Birthday Cake, 2kg" required />
            </div>
            <div>
              <label className="form-label">Total Amount (₹) *</label>
              <input type="number" value={form.total_amount} onChange={e => set('total_amount', e.target.value)} className="form-input" placeholder="e.g. 1000" min="0" required />
            </div>
            <div>
              <label className="form-label">Paid Amount (₹)</label>
              <input type="number" value={form.paid_amount} onChange={e => set('paid_amount', e.target.value)} className="form-input" placeholder="0" min="0" />
            </div>
          </div>

          {/* Auto calculated */}
          {form.total_amount && (
            <div className={`p-3 rounded-xl text-sm font-body font-semibold flex items-center gap-2 ${remaining > 0 ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
              <IndianRupee size={14} />
              Remaining: ₹{Math.max(0, remaining)} —
              {remaining <= 0 ? ' ✅ Fully Paid' : remaining < Number(form.total_amount) ? ' 🟡 Partial' : ' 🔴 Pending'}
            </div>
          )}

          <div>
            <label className="form-label">Notes (Optional)</label>
            <textarea value={form.notes} onChange={e => set('notes', e.target.value)} className="form-input resize-none" rows={2} placeholder="Any additional notes..." />
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center">
              {saving ? <div className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin" /> : <><Save size={15} /> {isEdit ? 'Update' : 'Add Record'}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ─── Add Payment Modal ─── */
function PaymentModal({ debt, onSave, onClose }) {
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [saving, setSaving] = useState(false)
  const max = debt.remaining_amount || 0

  const handleSubmit = async e => {
    e.preventDefault()
    if (!amount || Number(amount) <= 0) { toast.error('Enter valid amount'); return }
    if (Number(amount) > max) { toast.error(`Amount exceeds remaining ₹${max}`); return }
    setSaving(true)
    try {
      const res = await api.post(`/debts/${debt._id}/payment`, { amount: Number(amount), note })
      onSave(res.data); toast.success(`Payment of ₹${amount} recorded!`); onClose()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error recording payment')
    } finally { setSaving(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-warm-lg w-full max-w-sm">
        <div className="flex items-center justify-between p-6 border-b border-brown-100">
          <h2 className="font-display text-xl font-bold text-brown-700">Add Payment</h2>
          <button onClick={onClose} className="p-2 rounded-xl text-brown-400 hover:bg-brown-100"><X size={18} /></button>
        </div>
        <div className="px-6 pt-4">
          <div className="bg-beige rounded-xl p-3 mb-4">
            <p className="font-body text-sm font-semibold text-brown-700">{debt.customer_name}</p>
            <p className="font-body text-xs text-brown-500">{debt.order_details}</p>
            <p className="font-display text-lg font-bold text-red-600 mt-1">₹{max} remaining</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
          <div>
            <label className="form-label">Payment Amount (₹) *</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
              className="form-input" placeholder={`Max ₹${max}`} min="1" max={max} required />
            <button type="button" onClick={() => setAmount(String(max))}
              className="text-xs text-brown-500 hover:text-brown-700 mt-1 underline font-body">Pay full amount (₹{max})</button>
          </div>
          <div>
            <label className="form-label">Note (Optional)</label>
            <input value={note} onChange={e => setNote(e.target.value)} className="form-input" placeholder="e.g. Cash payment" />
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center">
              {saving ? <div className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin" /> : <><IndianRupee size={14} /> Record Payment</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ─── Status Badge ─── */
function StatusBadge({ status }) {
  if (status === 'paid') return <span className="badge-paid">🟢 Paid</span>
  if (status === 'partial') return <span className="badge-partial">🟡 Partial</span>
  return <span className="badge-pending">🔴 Pending</span>
}

/* ─── Main Page ─── */
export default function DebtManagement() {
  const [debts, setDebts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)       // null | 'add' | debt obj (edit)
  const [payModal, setPayModal] = useState(null)  // null | debt obj
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [deleting, setDeleting] = useState(null)
  const [markingPaid, setMarkingPaid] = useState(null)

  const fetchDebts = () => {
    const params = new URLSearchParams()
    if (statusFilter !== 'all') params.set('status', statusFilter)
    if (search.trim()) params.set('search', search.trim())
    api.get(`/debts?${params}`)
      .then(r => setDebts(r.data))
      .catch(() => toast.error('Failed to load debts'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchDebts() }, [search, statusFilter])

  const handleSave = (debt, type) => {
    if (type === 'add') setDebts(prev => [debt, ...prev])
    else setDebts(prev => prev.map(d => d._id === debt._id ? debt : d))
  }

  const handlePaySave = (debt) => setDebts(prev => prev.map(d => d._id === debt._id ? debt : d))

  const handleDelete = async (id) => {
    if (!confirm('Delete this debt record?')) return
    setDeleting(id)
    try {
      await api.delete(`/debts/${id}`)
      setDebts(prev => prev.filter(d => d._id !== id))
      toast.success('Record deleted')
    } catch { toast.error('Failed to delete') }
    finally { setDeleting(null) }
  }

  const handleMarkPaid = async (debt) => {
    if (!confirm(`Mark ${debt.customer_name}'s debt as fully paid?`)) return
    setMarkingPaid(debt._id)
    try {
      const res = await api.patch(`/debts/${debt._id}/mark-paid`)
      setDebts(prev => prev.map(d => d._id === debt._id ? res.data : d))
      toast.success('Marked as paid! 🎉')
    } catch { toast.error('Failed to update') }
    finally { setMarkingPaid(null) }
  }

  // Summary totals
  const totalOutstanding = debts.filter(d => d.status !== 'paid').reduce((s, d) => s + (d.remaining_amount || 0), 0)
  const totalPending = debts.filter(d => d.status === 'pending').length
  const totalPartial = debts.filter(d => d.status === 'partial').length
  const totalPaid = debts.filter(d => d.status === 'paid').length

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-brown-700">Debt Management</h2>
          <p className="font-body text-sm text-brown-400 mt-0.5">Track customer payments and outstanding dues</p>
        </div>
        <button onClick={() => setModal('add')} className="btn-primary shrink-0"><Plus size={16} /> Add Debt Record</button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Outstanding', value: `₹${totalOutstanding.toLocaleString()}`, color: 'border-red-400', bg: 'bg-red-50', text: 'text-red-700' },
          { label: '🔴 Pending', value: totalPending, color: 'border-red-300', bg: 'bg-red-50', text: 'text-red-600' },
          { label: '🟡 Partial', value: totalPartial, color: 'border-yellow-400', bg: 'bg-yellow-50', text: 'text-yellow-700' },
          { label: '🟢 Paid', value: totalPaid, color: 'border-green-400', bg: 'bg-green-50', text: 'text-green-700' },
        ].map(s => (
          <div key={s.label} className={`card p-4 border-l-4 ${s.color}`}>
            <p className="font-body text-xs text-brown-400 font-semibold uppercase tracking-wide">{s.label}</p>
            <p className={`font-display text-2xl font-bold mt-1 ${s.text}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or phone..." className="form-input pl-9 py-2 text-sm" />
        </div>
        <div className="flex gap-2">
          {['all', 'pending', 'partial', 'paid'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-bold font-body capitalize transition-all border ${
                statusFilter === s ? 'bg-brown-600 text-cream border-brown-600' : 'bg-white text-brown-600 border-brown-200 hover:border-brown-400'
              }`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">{Array(5).fill(0).map((_, i) => <div key={i} className="skeleton h-16 rounded-xl" />)}</div>
      ) : debts.length === 0 ? (
        <div className="card p-16 text-center">
          <div className="text-5xl mb-4">💳</div>
          <h3 className="font-display text-xl text-brown-600">No debt records found</h3>
          <button onClick={() => setModal('add')} className="btn-primary mt-4 text-sm"><Plus size={14} /> Add First Record</button>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="card overflow-hidden hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-brown-50 border-b border-brown-100">
                  <tr>
                    {['Customer', 'Phone', 'Order', 'Total', 'Paid', 'Due', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-body text-xs font-bold text-brown-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-brown-50">
                  {debts.map(d => (
                    <tr key={d._id} className="hover:bg-cream/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-brown-100 flex items-center justify-center font-bold text-brown-600 text-sm shrink-0">
                            {d.customer_name?.[0]?.toUpperCase()}
                          </div>
                          <span className="font-body text-sm font-semibold text-brown-700">{d.customer_name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <a href={`tel:${d.phone}`} className="font-body text-sm text-brown-500 hover:text-brown-700 flex items-center gap-1">
                          <Phone size={12} /> {d.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3 font-body text-sm text-brown-600 max-w-[150px] truncate">{d.order_details}</td>
                      <td className="px-4 py-3 font-body text-sm font-bold text-brown-700">₹{d.total_amount}</td>
                      <td className="px-4 py-3 font-body text-sm text-green-700 font-semibold">₹{d.paid_amount}</td>
                      <td className="px-4 py-3 font-body text-sm text-red-600 font-bold">₹{d.remaining_amount}</td>
                      <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          {d.status !== 'paid' && (
                            <>
                              <button onClick={() => setPayModal(d)} className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors" title="Add Payment">
                                <IndianRupee size={14} />
                              </button>
                              <button onClick={() => handleMarkPaid(d)} disabled={markingPaid === d._id} className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors" title="Mark as Paid">
                                {markingPaid === d._id ? <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /> : <CheckCircle size={14} />}
                              </button>
                            </>
                          )}
                          <button onClick={() => setModal(d)} className="p-1.5 rounded-lg bg-brown-50 text-brown-600 hover:bg-brown-100 transition-colors" title="Edit">
                            <CreditCard size={14} />
                          </button>
                          <button onClick={() => handleDelete(d._id)} disabled={deleting === d._id} className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors" title="Delete">
                            {deleting === d._id ? <div className="w-3.5 h-3.5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /> : <Trash2 size={14} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {debts.map(d => (
              <div key={d._id} className="card p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-brown-100 flex items-center justify-center font-bold text-brown-600">
                      {d.customer_name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-body text-sm font-bold text-brown-700">{d.customer_name}</p>
                      <p className="font-body text-xs text-brown-400">{d.phone}</p>
                    </div>
                  </div>
                  <StatusBadge status={d.status} />
                </div>
                <p className="font-body text-xs text-brown-500 mb-3 bg-beige rounded-lg px-3 py-2">{d.order_details}</p>
                <div className="grid grid-cols-3 gap-2 text-center mb-3">
                  <div className="bg-cream rounded-lg p-2">
                    <p className="font-body text-[10px] text-brown-400">Total</p>
                    <p className="font-display text-sm font-bold text-brown-700">₹{d.total_amount}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2">
                    <p className="font-body text-[10px] text-green-600">Paid</p>
                    <p className="font-display text-sm font-bold text-green-700">₹{d.paid_amount}</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-2">
                    <p className="font-body text-[10px] text-red-500">Due</p>
                    <p className="font-display text-sm font-bold text-red-600">₹{d.remaining_amount}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {d.status !== 'paid' && (
                    <>
                      <button onClick={() => setPayModal(d)} className="flex-1 py-2 rounded-xl bg-green-50 text-green-700 text-xs font-bold flex items-center justify-center gap-1 hover:bg-green-100 transition-colors">
                        <IndianRupee size={13} /> Pay
                      </button>
                      <button onClick={() => handleMarkPaid(d)} disabled={markingPaid === d._id} className="flex-1 py-2 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center gap-1 hover:bg-blue-100 transition-colors">
                        <CheckCircle size={13} /> Mark Paid
                      </button>
                    </>
                  )}
                  <button onClick={() => handleDelete(d._id)} className="px-3 py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modals */}
      {modal && <DebtModal debt={modal === 'add' ? null : modal} onSave={handleSave} onClose={() => setModal(null)} />}
      {payModal && <PaymentModal debt={payModal} onSave={handlePaySave} onClose={() => setPayModal(null)} />}
    </div>
  )
}
