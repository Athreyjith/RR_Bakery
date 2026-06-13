import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Award, Clock, Truck, ChevronDown, Cake } from 'lucide-react'
import api from '../services/api'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'
import useReveal from '../hooks/useReveal'

/* ── Reveal wrapper ── */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useReveal()
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

/* ── Hero ── */
function Hero() {
  const handleWA = () => {
    const msg = encodeURIComponent("Hello! I want to place an order at RR Bake & Sweet 🍰")
    window.open(`https://wa.me/919036608966?text=${msg}`, '_blank')
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-brown-50 via-cream to-beige">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-pink-100/60 blur-[80px] -z-0 animate-float"></div>
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] rounded-full bg-gold-100/60 blur-[80px] -z-0"></div>

      {/* Floating decorative elements */}
      <div className="absolute top-32 right-12 text-6xl animate-float opacity-60" style={{ animationDelay: '0.5s' }}>🍰</div>
      <div className="absolute top-52 right-52 text-4xl animate-float opacity-40" style={{ animationDelay: '1.2s' }}>🥐</div>
      <div className="absolute bottom-40 right-24 text-5xl animate-float opacity-50" style={{ animationDelay: '0.8s' }}>🎂</div>
      <div className="absolute bottom-32 left-20 text-3xl animate-float opacity-30" style={{ animationDelay: '1.5s' }}>🍪</div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <div className="inline-flex items-center gap-2 bg-gold-100 border border-gold-300 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
            <Star size={13} className="text-gold-500 fill-gold-500" />
            <span className="font-body text-sm font-semibold text-brown-600">Mysuru's Favourite Bakery</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-brown-800 leading-[1.05] mb-4 animate-fade-up">
            Baked with
            <span className="block font-accent text-brown-500 text-6xl sm:text-7xl lg:text-8xl mt-1 italic font-normal">Love &amp; Care</span>
          </h1>

          <p className="font-body text-lg text-brown-500 leading-relaxed mb-8 max-w-lg animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Fresh cakes, artisan breads, golden pastries & traditional sweets crafted every morning for your sweetest moments.
          </p>

          <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/products" className="btn-primary text-base px-8 py-4 shadow-warm-lg">
              Explore Menu <ArrowRight size={18} />
            </Link>
            <button onClick={handleWA} className="btn-whatsapp text-base px-8 py-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order Now
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            {[['10k+', 'Happy Customers'], ['100+', 'Products'], ['4.4★', 'Google Rating']].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-2xl font-bold text-brown-700">{n}</div>
                <div className="font-body text-xs text-brown-400 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="relative w-[420px] h-[420px]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-200 to-pink-100 animate-float"></div>
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=85"
              alt="Beautiful Cake"
              className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] object-cover rounded-full shadow-warm-lg"
            />
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-warm px-4 py-2 flex items-center gap-2 animate-float" style={{ animationDelay: '0.5s' }}>
              <span className="text-2xl">🎂</span>
              <div><div className="font-display text-xs font-bold text-brown-700">Fresh Daily</div><div className="font-body text-[10px] text-brown-400">Baked Every Morning</div></div>
            </div>
            <div className="absolute -bottom-2 -left-6 bg-white rounded-2xl shadow-warm px-4 py-2 flex items-center gap-2 animate-float" style={{ animationDelay: '1s' }}>
              <span className="text-2xl">⭐</span>
              <div><div className="font-display text-xs font-bold text-brown-700">Top Rated</div><div className="font-body text-[10px] text-brown-400">Google 5★ Bakery</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
        <span className="font-body text-xs text-brown-400">Scroll down</span>
        <ChevronDown size={16} className="text-brown-400" />
      </div> */}
    </section>
  )
}

/* ── Features strip ── */
function Features() {
  const items = [
    { icon: <Award size={22} />, title: 'Premium Quality', desc: 'Finest ingredients only' },
    { icon: <Clock size={22} />, title: 'Baked Fresh', desc: 'Every single morning' },
    // { icon: <Truck size={22} />, title: 'Home Delivery', desc: 'Available on request' },

    {
      icon: <Cake size={22} />,
      title: 'Custom Cakes',
      desc: 'Made for every occasion'
    },
    { icon: <Star size={22} />, title: '4.3★ Reviews', desc: 'Trusted by Mysuru' },
  ]
  return (
    <section className="bg-brown-700 py-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(({ icon, title, desc }) => (
          <div key={title} className="flex items-center gap-3 text-cream">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gold-400 shrink-0">{icon}</div>
            <div>
              <div className="font-display text-sm font-bold">{title}</div>
              <div className="font-body text-xs text-brown-200">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Today's Special ── */
function TodaySpecial({ products, loading }) {
  const special = products.filter(p => p.isTodaySpecial)[0]
  if (loading || !special) return null
  const handleWA = () => {
    const msg = encodeURIComponent(`Hello! I want to order today's special: *${special.name}* (₹${special.price}) 🍰`)
    window.open(`https://wa.me/919036608966?text=${msg}`, '_blank')
  }

  return (
    <section className="py-16 bg-gradient-to-r from-brown-700 to-brown-600 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-10">
          <div className="section-subtitle text-gold-300">Limited Time</div>
          <h2 className="font-display text-4xl font-bold text-cream">Today's Special</h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-warm-lg">
            <div className="md:w-1/2 aspect-square md:aspect-auto">
              <img
                src={special.image || `https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80`}
                alt={special.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 bg-gold-500 text-brown-800 text-xs font-bold rounded-full mb-4 w-fit">⭐ TODAY ONLY</span>
              <h3 className="font-display text-3xl text-cream font-bold mb-3">{special.name}</h3>
              <p className="font-body text-brown-200 text-sm leading-relaxed mb-6">{special.description}</p>
              <div className="font-display text-4xl text-gold-400 font-bold mb-6">₹{special.price}</div>
              <button onClick={handleWA} className="btn-whatsapp justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                Order This Special
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── Testimonials ── */
const TESTIMONIALS = [
  { name: 'Priya Sharma', rating: 5, text: 'The birthday cake was absolutely stunning! Taste was out of this world. RR Bake & Sweet never disappoints!', occasion: 'Birthday Cake' },
  { name: 'Ravi Kumar', rating: 5, text: 'Fresh breads every morning, and the staff is so friendly. This is our go-to bakery in Mysuru!', occasion: 'Regular Customer' },
  { name: 'Ananya Reddy', rating: 5, text: 'Ordered a wedding cake and it was beyond expectations. Beautiful design, amazing taste!', occasion: 'Wedding Cake' },
]

function Testimonials() {
  return (
    <section className="py-20 bg-beige">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-12">
          <div className="section-subtitle">What Our Customers Say</div>
          <h2 className="section-title">Loved by Mysuru</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="card-glass p-6">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={14} className="text-gold-500 fill-gold-500" />)}
                </div>
                <p className="font-body text-brown-600 text-sm leading-relaxed italic mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brown-400 to-brown-600 flex items-center justify-center text-cream font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-display text-sm font-semibold text-brown-700">{t.name}</div>
                    <div className="font-body text-xs text-brown-400">{t.occasion}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Occasions ── */
const OCCASIONS = [
  { emoji: '🎂', title: 'Birthdays', desc: 'Custom cakes for every age' },
  { emoji: '💍', title: 'Weddings', desc: 'Elegant multi-tier cakes' },
  { emoji: '💝', title: 'Anniversaries', desc: 'Romantic & sweet treats' },
  { emoji: '🎉', title: 'Celebrations', desc: 'Party platters & pastries' },
]

function Occasions() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-12">
          <div className="section-subtitle">Perfect For Every Moment</div>
          <h2 className="section-title">Shop by Occasion</h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {OCCASIONS.map((o, i) => (
            <Reveal key={o.title} delay={i * 80} className="h-full">
              <Link to="/products" className="card p-6 flex flex-col items-center justify-center text-center group cursor-pointer h-full">
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">{o.emoji}</div>
                <h3 className="font-display text-lg font-semibold text-brown-700">{o.title}</h3>
                <p className="font-body text-xs text-brown-400 mt-1">{o.desc}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── CTA Banner ── */
function CTABanner() {
  const handleWA = () => {
    const msg = encodeURIComponent("Hello! I want to enquire about custom orders at RR Bake & Sweet 🍰")
    window.open(`https://wa.me/919036608966?text=${msg}`, '_blank')
  }
  return (
    <section className="py-16 bg-gradient-to-r from-pink-400/80 to-brown-500 text-white">
      <Reveal className="max-w-3xl mx-auto px-6 text-center">
        <div className="font-accent text-4xl mb-2">Want something special?</div>
        <h2 className="font-display text-3xl font-bold mb-4">Custom Orders Welcome!</h2>
        <p className="font-body text-white/80 mb-8">Tell us your dream cake or pastry — we'll make it a reality. Weddings, birthdays, corporate events.</p>
        <button onClick={handleWA} className="btn-gold text-base px-10 py-4 shadow-warm-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
          Chat With Us on WhatsApp
        </button>
      </Reveal>
    </section>
  )
}

/* ── Home Page ── */
export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/products?featured=true')
      .then(r => setProducts(r.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Hero />
      <Features />

      {/* Featured Products */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <div className="section-subtitle">Handpicked For You</div>
            <h2 className="section-title">Featured Products</h2>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading
              ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
              : products.length > 0
                ? products.slice(0, 8).map((p, i) => (
                  <Reveal key={p._id} delay={i * 60}>
                    <ProductCard product={p} />
                  </Reveal>
                ))
                : (
                  /* Demo cards when no DB */
                  DEMO_PRODUCTS.slice(0, 8).map((p, i) => (
                    <Reveal key={p._id} delay={i * 60}><ProductCard product={p} /></Reveal>
                  ))
                )
            }
          </div>
          <div className="text-center mt-10">
            <Link to="/products" className="btn-secondary">View All Products <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <TodaySpecial products={products} loading={loading} />
      <Occasions />
      <Testimonials />
      <CTABanner />
    </>
  )
}

// Demo products for display when backend not connected
const DEMO_PRODUCTS = [
  { _id: '1', name: 'Chocolate Dream Cake', description: 'Rich chocolate layers with ganache frosting', price: 200, category: 'cakes', isFeatured: true, isTodaySpecial: true, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80' },
  { _id: '2', name: 'Butter Croissant', description: 'Flaky, buttery French-style croissant', price: 60, category: 'pastries', isFeatured: true, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80' },
  { _id: '3', name: 'Sourdough Loaf', description: 'Tangy, chewy sourdough with crispy crust', price: 20, category: 'breads', isFeatured: true, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80' },
  { _id: '4', name: 'Choco Chip Cookies', description: 'Classic chewy cookies loaded with chips', price: 20, category: 'cookies', isFeatured: true, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80' },
  { _id: '5', name: 'Strawberry Cheesecake', description: 'Creamy New York cheesecake with strawberry', price: 50, category: 'cakes', isFeatured: true, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80' },
  { _id: '6', name: 'Bread', description: 'Soft pull-apart bread', price: 20, category: 'breads', isFeatured: true, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgEq5Q_Pw-UsM5SOGoZicjojDouVW2V3d8hg&s' },
  { _id: '7', name: 'Almond Danish', description: 'Laminated pastry filled with almond cream', price: 80, category: 'pastries', isFeatured: true, image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400&q=80' },
  { _id: '8', name: 'Kaju Katli', description: 'Premium cashew fudge, melt-in-mouth', price: 50, category: 'sweets', isFeatured: true, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfiBWk7-x4OptkQHKss-X41Wf_CPRBm8SfA&s' },
]
