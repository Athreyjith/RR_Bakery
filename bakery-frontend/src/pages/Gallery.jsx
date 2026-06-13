import useReveal from '../hooks/useReveal'

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useReveal()
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80', label: 'Celebration Cake', span: 'md:col-span-2 md:row-span-2' },
  { src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80', label: 'Croissants' },
  { src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80', label: 'Sourdough' },
  { src: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80', label: 'Cookies' },
  { src: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80', label: 'Cheesecake' },
  { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnrYHgLiW9g1QZMsPGFCjreZOxjU9Dr_cl2Q&s', label: 'Red Velvet', span: 'md:col-span-2' },
  { src: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400&q=80', label: 'Danish Pastry' },
  // { src: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a9b0a?w=400&q=80', label: 'Indian Sweets' },
  { src: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&q=80', label: 'Brownies' },
  // { src: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&q=80', label: 'Bread' },
  // { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80', label: 'Bakery Team', span: 'md:col-span-2' },
]

export default function Gallery() {
  return (
    <>
      <div className="pt-28 pb-12 bg-gradient-to-br from-beige to-cream text-center px-6">
        <div className="font-accent text-2xl text-pink-400 mb-1">A Feast for the Eyes</div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-brown-700">Our Gallery</h1>
        <p className="font-body text-brown-400 mt-3 text-sm max-w-md mx-auto">Every photo tells the story of freshness, craft, and pure deliciousness.</p>
      </div>

      <section className="py-12 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-3">
            {GALLERY.map((item, i) => (
              <Reveal key={i} delay={i * 50} className={`${item.span || ''}`}>
                <div className="group relative overflow-hidden rounded-2xl h-full w-full shadow-card">
                  <img
                    src={item.src}
                    alt={item.label}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="font-display text-cream text-sm font-semibold">{item.label}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
