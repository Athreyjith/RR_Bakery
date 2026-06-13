import { Link } from 'react-router-dom'
import { Phone, MapPin, Clock, Instagram, Facebook, Heart } from 'lucide-react'

export default function Footer() {
  const WA = () => {
    window.open(`https://wa.me/9036608966?text=${msg}`, '_blank')
  }

  return (
    <footer className="bg-brown-800 text-brown-200">
      {/* Top wave */}
      <div className="overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" className="w-full fill-cream" preserveAspectRatio="none" style={{ height: 40 }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="font-accent text-3xl text-cream mb-1">RR Bake & Sweet</div>
            <div className="font-body text-sm text-gold-300 mb-2">ಆರ್ ಆರ್ ಬೇಕ್ & ಸ್ವೀಟ್</div>
            <p className="text-brown-300 text-sm leading-relaxed font-body mt-3">
              Crafting happiness one bite at a time. Premium cakes, breads & sweets made fresh daily in Mysuru.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="#" className="w-9 h-9 rounded-full bg-brown-700 flex items-center justify-center text-brown-300 hover:bg-pink-400 hover:text-white transition-all">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-brown-700 flex items-center justify-center text-brown-300 hover:bg-blue-500 hover:text-white transition-all">
                <Facebook size={16} />
              </a>
              <button onClick={WA} className="w-9 h-9 rounded-full bg-brown-700 flex items-center justify-center text-brown-300 hover:bg-green-500 hover:text-white transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          {/* <div>
            <h4 className="font-display text-cream text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/about', 'About Us'], ['/products', 'Our Products'], ['/gallery', 'Gallery'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="font-body text-sm text-brown-300 hover:text-gold-400 transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-gold-500 inline-block"></span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Categories */}
          <div>
            <h4 className="font-display text-cream text-lg mb-4">Our Products</h4>
            <ul className="space-y-2">
              {['Cakes', 'Breads', 'Pastries', 'Cookies', 'Indian Sweets', "Today's Special"].map(c => (
                <li key={c}>
                  <Link to="/products" className="font-body text-sm text-brown-300 hover:text-gold-400 transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-gold-500 inline-block"></span> {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-cream text-lg mb-4">Get In Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-gold-400 mt-0.5 shrink-0" />
                <span className="font-body text-sm text-brown-300 leading-relaxed">8HPX+8C6, Ilavala Hobli, Mysuru, Karnataka 571130</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-gold-400 shrink-0" />
                <button onClick={WA} className="font-body text-sm text-brown-300 hover:text-gold-400 transition-colors">+91 90366 08966</button>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={15} className="text-gold-400 shrink-0" />
                <span className="font-body text-sm text-brown-300">Mon–Sun: 7:00 AM – 9:30 PM</span>
              </li>
            </ul>
            <button onClick={WA} className="mt-5 btn-whatsapp text-sm px-5 py-2.5 w-full justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-brown-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-xs text-brown-400">@2026 RR Bake & Sweet.</p>
          {/* <p className="font-body text-xs text-brown-400 flex items-center gap-1">
            Made with <Heart size={12} className="text-pink-400 fill-pink-400" /> in Mysuru, Karnataka
          </p> */}
        </div>
      </div>
    </footer>
  )
}
