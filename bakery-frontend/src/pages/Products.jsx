import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import api from '../services/api'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'

const CATEGORIES = [
  { value: 'all', label: 'All', emoji: '🍽️' },
  { value: 'cakes', label: 'Cakes', emoji: '🎂' },
  { value: 'breads', label: 'Breads', emoji: '🍞' },
  { value: 'pastries', label: 'Pastries', emoji: '🥐' },
  { value: 'cookies', label: 'Cookies', emoji: '🍪' },
  { value: 'sweets', label: 'Sweets', emoji: '🍬' },
  { value: 'specials', label: 'Specials', emoji: '⭐' },
]

const DEMO = [
  { _id: 'd1', name: 'Chocolate Dream Cake', description: 'Rich chocolate layers with ganache frosting and fresh berries', price: 150, category: 'cakes', isFeatured: true, isTodaySpecial: true, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80' },
  { _id: 'd2', name: 'Butter Croissant', description: 'Flaky, buttery French-style croissant baked fresh every morning', price: 60, category: 'pastries', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80' },
  { _id: 'd3', name: 'Sourdough Loaf', description: 'Tangy, chewy sourdough bread with a crispy golden crust', price: 20, category: 'breads', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80' },
  { _id: 'd4', name: 'Choco Chip Cookies', description: 'Classic chewy cookies loaded with premium chocolate chips', price: 20, category: 'cookies', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80' },
  { _id: 'd5', name: 'Strawberry Cheesecake', description: 'Creamy New York-style cheesecake topped with fresh strawberries', price: 60, category: 'cakes', isFeatured: true, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80' },
  { _id: 'd6', name: 'Bread', description: 'Soft pull-apart bread ', price: 30, category: 'breads', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgEq5Q_Pw-UsM5SOGoZicjojDouVW2V3d8hg&s' },
  { _id: 'd7', name: 'Almond Danish', description: 'Laminated pastry filled with almond cream and topped with flaked almonds', price: 80, category: 'pastries', image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400&q=80' },
  { _id: 'd8', name: 'Kaju Katli', description: 'Premium cashew fudge made with pure ghee — melt in your mouth', price: 50, category: 'sweets', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfiBWk7-x4OptkQHKss-X41Wf_CPRBm8SfA&s' },
  { _id: 'd9', name: 'Red Velvet Cake', description: 'Moist red velvet layers with cream cheese frosting', price: 200, category: 'cakes', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnrYHgLiW9g1QZMsPGFCjreZOxjU9Dr_cl2Q&s' },
  // { _id: 'd10', name: 'Pav Buns', description: 'Soft, pillowy pav buns perfect with any dish', price: 40, category: 'breads', image: 'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=400&q=80' },
  // { _id: 'd11', name: 'Gulab Jamun', description: 'Soft milk-solid balls soaked in rose-flavoured sugar syrup', price: 200, category: 'sweets', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80' },
  { _id: 'd12', name: 'Chocolate Brownie', description: 'Dense, fudgy chocolate brownies with walnuts', price: 90, category: 'cookies', image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&q=80' },
]

export default function Products() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/products')
      .then(r => { setProducts(r.data.length ? r.data : DEMO); setFiltered(r.data.length ? r.data : DEMO) })
      .catch(() => { setProducts(DEMO); setFiltered(DEMO) })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    let list = products
    if (category !== 'all') list = list.filter(p => p.category === category)
    if (search.trim()) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    setFiltered(list)
  }, [category, search, products])

  return (
    <>
      {/* Header */}
      <div className="pt-28 pb-12 bg-gradient-to-br from-beige to-cream text-center px-6">
        <div className="font-accent text-2xl text-pink-400 mb-1">Our Menu</div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-brown-700">Fresh Baked Goodness</h1>
        <p className="font-body text-brown-400 mt-3 max-w-md mx-auto text-sm">Every item crafted with love and the finest ingredients.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="form-input pl-11"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map(c => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-200 border ${
                category === c.value
                  ? 'bg-brown-600 text-cream border-brown-600 shadow-warm'
                  : 'bg-white text-brown-600 border-brown-200 hover:border-brown-400 hover:bg-brown-50'
              }`}
            >
              <span>{c.emoji}</span> {c.label}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="font-body text-sm text-brown-400 mb-6 text-center">
          {loading ? 'Loading...' : `Showing ${filtered.length} product${filtered.length !== 1 ? 's' : ''}`}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading
            ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : filtered.length > 0
              ? filtered.map(p => <ProductCard key={p._id} product={p} />)
              : (
                <div className="col-span-full text-center py-20">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="font-display text-xl text-brown-600">No products found</h3>
                  <p className="font-body text-brown-400 text-sm mt-2">Try a different search or category</p>
                  <button onClick={() => { setSearch(''); setCategory('all') }} className="btn-secondary mt-4 text-sm">Clear Filters</button>
                </div>
              )
          }
        </div>
      </div>
    </>
  )
}
