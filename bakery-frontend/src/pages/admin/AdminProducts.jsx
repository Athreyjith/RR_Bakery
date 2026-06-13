import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Save, Search, Star, Zap } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../services/api'

const EMPTY = { name: '', description: '', price: '', category: 'cakes', image: '', isAvailable: true, isFeatured: false, isTodaySpecial: false }
const CATS = ['cakes', 'breads', 'pastries', 'cookies', 'sweets', 'specials']
const CAT_EMOJI = { cakes: '🎂', breads: '🍞', pastries: '🥐', cookies: '🍪', sweets: '🍬', specials: '⭐' }

function ProductModal({ product, onSave, onClose }) {
  const [form, setForm] = useState(product || EMPTY)
  const [saving, setSaving] = useState(false)
  const isEdit = !!product?._id

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.price || !form.description) { toast.error('Please fill required fields'); return }
    setSaving(true)
    try {
      if (isEdit) {
        const res = await api.put(`/products/${product._id}`, form)
        onSave(res.data, 'edit')
        toast.success('Product updated!')
      } else {
        const res = await api.post('/products', form)
        onSave(res.data, 'add')
        toast.success('Product added!')
      }
      onClose()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving product')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-warm-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-brown-100">
          <h2 className="font-display text-xl font-bold text-brown-700">{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
          <button onClick={onClose} className="p-2 rounded-xl text-brown-400 hover:bg-brown-100"><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="form-label">Product Name *</label>
              <input value={form.name} onChange={e => set('name', e.target.value)} className="form-input" placeholder="e.g. Chocolate Dream Cake" required />
            </div>
            <div>
              <label className="form-label">Price (₹) *</label>
              <input type="number" value={form.price} onChange={e => set('price', e.target.value)} className="form-input" placeholder="e.g. 850" min="0" required />
            </div>
            <div>
              <label className="form-label">Category *</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className="form-input">
                {CATS.map(c => <option key={c} value={c}>{CAT_EMOJI[c]} {c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="form-label">Description *</label>
              <textarea value={form.description} onChange={e => set('description', e.target.value)} className="form-input resize-none" rows={3} placeholder="Describe the product..." required />
            </div>
            <div className="col-span-2">
              <label className="form-label">Image URL</label>
              <input value={form.image} onChange={e => set('image', e.target.value)} className="form-input" placeholder="https://... (leave empty for default)" />
              {form.image && <img src={form.image} alt="preview" className="mt-2 h-24 w-full object-cover rounded-xl" onError={e => e.target.style.display='none'} />}
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-2 pt-2">
            {[
              ['isAvailable', 'Available for Sale'],
              ['isFeatured', '⭐ Featured on Homepage'],
              ['isTodaySpecial', '🔥 Today\'s Special'],
            ].map(([key, label]) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer group">
                <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${form[key] ? 'bg-brown-600' : 'bg-brown-200'}`}
                  onClick={() => set(key, !form[key])}>
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${form[key] ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
                <span className="font-body text-sm text-brown-600">{label}</span>
              </label>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center">
              {saving ? <div className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin" /> : <><Save size={15} /> {isEdit ? 'Update' : 'Add Product'}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null) // null | 'add' | product object
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('all')
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    api.get('/products')
      .then(r => { setProducts(r.data); setFiltered(r.data) })
      .catch(() => toast.error('Failed to load products'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    let list = products
    if (catFilter !== 'all') list = list.filter(p => p.category === catFilter)
    if (search.trim()) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    setFiltered(list)
  }, [search, catFilter, products])

  const handleSave = (product, type) => {
    if (type === 'add') setProducts(prev => [product, ...prev])
    else setProducts(prev => prev.map(p => p._id === product._id ? product : p))
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this product? This cannot be undone.')) return
    setDeleting(id)
    try {
      await api.delete(`/products/${id}`)
      setProducts(prev => prev.filter(p => p._id !== id))
      toast.success('Product deleted')
    } catch { toast.error('Failed to delete') }
    finally { setDeleting(null) }
  }

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-brown-700">Products</h2>
          <p className="font-body text-sm text-brown-400 mt-0.5">{products.length} items in your menu</p>
        </div>
        <button onClick={() => setModal('add')} className="btn-primary shrink-0">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="form-input pl-9 py-2 text-sm" />
        </div>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="form-input py-2 text-sm w-full sm:w-44">
          <option value="all">All Categories</option>
          {CATS.map(c => <option key={c} value={c}>{CAT_EMOJI[c]} {c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
        </select>
      </div>

      {/* Products Table/Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array(8).fill(0).map((_, i) => <div key={i} className="skeleton h-52 rounded-2xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card p-16 text-center">
          <div className="text-5xl mb-4">📦</div>
          <h3 className="font-display text-xl text-brown-600">No products found</h3>
          <button onClick={() => setModal('add')} className="btn-primary mt-4 text-sm"><Plus size={14} /> Add First Product</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(p => (
            <div key={p._id} className="card group relative overflow-hidden">
              {/* Image */}
              <div className="relative aspect-[4/3] bg-beige overflow-hidden">
                <img
                  src={p.image || `https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&q=70`}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={e => e.target.src = `https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&q=70`}
                />
                {/* Status badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {!p.isAvailable && <span className="px-2 py-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full uppercase">Unavailable</span>}
                  {p.isTodaySpecial && <span className="px-2 py-0.5 bg-gold-500 text-brown-800 text-[9px] font-bold rounded-full uppercase">Special</span>}
                  {p.isFeatured && <span className="px-2 py-0.5 bg-pink-400 text-white text-[9px] font-bold rounded-full uppercase">Featured</span>}
                </div>
                {/* Actions overlay */}
                <div className="absolute inset-0 bg-brown-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <button onClick={() => setModal(p)} className="w-9 h-9 rounded-full bg-white text-brown-700 flex items-center justify-center hover:bg-gold-100 transition-colors shadow">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => handleDelete(p._id)} disabled={deleting === p._id} className="w-9 h-9 rounded-full bg-white text-red-500 flex items-center justify-center hover:bg-red-50 transition-colors shadow">
                    {deleting === p._id ? <div className="w-3 h-3 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /> : <Trash2 size={15} />}
                  </button>
                </div>
              </div>
              {/* Info */}
              <div className="p-3">
                <span className="text-[9px] font-bold uppercase tracking-widest text-brown-400">{CAT_EMOJI[p.category]} {p.category}</span>
                <p className="font-display text-sm font-semibold text-brown-700 mt-0.5 line-clamp-1">{p.name}</p>
                <p className="font-display text-base font-bold text-brown-700 mt-1">₹{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <ProductModal
          product={modal === 'add' ? null : modal}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}
