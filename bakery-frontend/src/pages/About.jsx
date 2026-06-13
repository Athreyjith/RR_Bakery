import { Award, Heart, Leaf, Users } from 'lucide-react'
import useReveal from '../hooks/useReveal'

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useReveal()
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

const VALUES = [
  { icon: <Heart size={24} />, title: 'Made with Love', desc: 'Every product is handcrafted with genuine care and attention to detail.' },
  { icon: <Leaf size={24} />, title: 'Fresh Ingredients', desc: 'We source the finest local and imported ingredients for every recipe.' },
  { icon: <Award size={24} />, title: 'Quality First', desc: 'No shortcuts. No compromises. Quality is our non-negotiable standard.' },
  { icon: <Users size={24} />, title: 'Family Legacy', desc: 'A family business built on trust, community, and generations of baking.' },
]

export default function About() {
  return (
    <>
      {/* Hero */}
      <div className="pt-28 pb-16 bg-gradient-to-br from-beige to-cream px-6 text-center">
        <div className="font-accent text-2xl text-pink-400 mb-1">Our Story</div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-brown-700">About RR Bake & Sweet</h1>
      </div>

      {/* Story */}
      <section className="py-16 bg-cream">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative">
              <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/1e/f8/14/i-was-just-overwhelm.jpg?w=900&h=500&s=1" alt="Bakery" className="rounded-3xl shadow-warm-lg w-full object-cover aspect-[4/3]" />
              <div className="absolute -bottom-5 -right-5 bg-gold-500 rounded-2xl p-4 shadow-warm">
                <div className="font-display text-2xl font-bold text-brown-800">10+</div>
                <div className="font-body text-xs text-brown-700">Years of Baking</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div>
              <div className="font-accent text-3xl text-brown-500 mb-3">Hello, We are RR!</div>
              <h2 className="font-display text-3xl font-bold text-brown-700 mb-5">A Bakery Born from Passion</h2>
              <p className="font-body text-brown-500 leading-relaxed mb-4">
                RR Bake & Sweet was founded with one simple dream — to bring the warmth of home-baked goodness to every household in Mysuru. What started as a small family kitchen has grown into one of the most trusted bakeries in the city.
              </p>
              <p className="font-body text-brown-500 leading-relaxed mb-4">
                Every morning, our bakers arrive before sunrise to craft fresh cakes, breads, pastries and traditional sweets. We believe food should bring joy — and that's exactly what we put into everything we make.
              </p>
              <p className="font-body text-brown-500 leading-relaxed">
                From birthdays to weddings, from your morning chai companion to festive gifting — RR Bake & Sweet is there for every sweet moment of your life.
              </p>
              <div className="mt-8 flex gap-6">
                {[['10+', 'Years'], ['10k+', 'Customers'], ['100+', 'Products']].map(([n, l]) => (
                  <div key={l} className="text-center">
                    <div className="font-display text-3xl font-bold text-brown-700">{n}</div>
                    <div className="font-body text-xs text-brown-400 mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-beige">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <div className="font-accent text-2xl text-pink-400 mb-1">What We Stand For</div>
            <h2 className="font-display text-3xl font-bold text-brown-700">Our Values</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="card p-6 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-gold-100 flex items-center justify-center text-brown-600 mx-auto mb-4">{v.icon}</div>
                  <h3 className="font-display text-lg font-semibold text-brown-700 mb-2">{v.title}</h3>
                  <p className="font-body text-sm text-brown-400 leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team photo */}
      {/* <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <div className="font-accent text-2xl text-pink-400 mb-1">The People Behind</div>
            <h2 className="font-display text-3xl font-bold text-brown-700 mb-8">Our Baking Team</h2>
            <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80" alt="Bakery Team" className="rounded-3xl shadow-warm-lg w-full object-cover aspect-video" />
            <p className="font-body text-brown-500 mt-6 leading-relaxed max-w-2xl mx-auto">
              Our passionate team of bakers and sweet-makers work tirelessly to ensure every product leaving our kitchen meets the highest standards of quality, hygiene, and taste.
            </p>
          </Reveal>
        </div>
      </section> */}
    </>
  )
}
