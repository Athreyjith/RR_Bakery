import { useState } from 'react'
import { Phone, MapPin, Clock, Send } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [sending, setSending] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.message) {
      toast.error('Please fill all fields')
      return
    }
    setSending(true)
    // Send via WhatsApp
    const msg = encodeURIComponent(
      `Hello RR Bake & Sweet! 🍰\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n\n*Message:*\n${form.message}`
    )
    setTimeout(() => {
      window.open(`https://wa.me/919036608966?text=${msg}`, '_blank')
      toast.success('Redirecting to WhatsApp...')
      setForm({ name: '', phone: '', message: '' })
      setSending(false)
    }, 600)
  }

  const handleDirectWA = () => {
    const msg = encodeURIComponent("Hello! I want to enquire about your products at RR Bake & Sweet 🍰")
    window.open(`https://wa.me/919036608966?text=${msg}`, '_blank')
  }

  return (
    <>
      {/* Header */}
      <div className="pt-28 pb-12 bg-gradient-to-br from-beige to-cream text-center px-6">
        <div className="font-accent text-2xl text-pink-400 mb-1">Get In Touch</div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-brown-700">Contact Us</h1>
        <div className="font-body text-lg text-brown-500 mt-1">ಆರ್ ಆರ್ ಬೇಕ್ & ಸ್ವೀಟ್</div>
        <p className="font-body text-brown-400 mt-3 text-sm max-w-md mx-auto">We'd love to hear from you! Place an order, ask about custom cakes, or just say hello.</p>
      </div>

      <section className="py-12 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10">

          {/* Left - Info */}
          <div className="space-y-6">
            {/* Info Cards */}
            <div className="card p-6 flex gap-4 items-start">
              <div className="w-11 h-11 rounded-xl bg-gold-100 flex items-center justify-center text-brown-600 shrink-0"><MapPin size={20} /></div>
              <div>
                <h3 className="font-display text-lg font-semibold text-brown-700">Visit Us</h3>
                <p className="font-body text-sm text-brown-500 mt-1 leading-relaxed">8HPX+8C6, Ilavala Hobli<br/>Mysuru, Karnataka 571130</p>
                <a href="https://maps.google.com/?q=8HPX+8C6,+Ilavala+Hobli,+Mysuru,+Karnataka+571130" target="_blank" rel="noopener noreferrer" className="text-xs text-brown-400 hover:text-brown-600 underline mt-1 inline-block">Get Directions →</a>
              </div>
            </div>

            <div className="card p-6 flex gap-4 items-start">
              <div className="w-11 h-11 rounded-xl bg-gold-100 flex items-center justify-center text-brown-600 shrink-0"><Phone size={20} /></div>
              <div>
                <h3 className="font-display text-lg font-semibold text-brown-700">Call / WhatsApp</h3>
                <p className="font-body text-sm text-brown-500 mt-1">+91 90366 08966</p>
                <button onClick={handleDirectWA} className="btn-whatsapp text-xs px-4 py-2 mt-3">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Enquiry on WhatsApp
                </button>
              </div>
            </div>

            <div className="card p-6 flex gap-4 items-start">
              <div className="w-11 h-11 rounded-xl bg-gold-100 flex items-center justify-center text-brown-600 shrink-0"><Clock size={20} /></div>
              <div>
                <h3 className="font-display text-lg font-semibold text-brown-700">Opening Hours</h3>
                <div className="font-body text-sm text-brown-500 mt-2 space-y-1">
                  <div className="flex justify-between gap-8"><span>Monday – Sunday</span><span className="font-semibold text-brown-700">7:00 AM – 9:30 PM</span></div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="rounded-2xl overflow-hidden shadow-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3897.7027478489695!2d76.59595077577244!3d12.335783187924232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf7a55add76aab%3A0x5175d4f51f719c09!2sRR%20Bake%20%26%20Sweet!5e0!3m2!1sen!2sin!4v1775307280806!5m2!1sen!2sin"
                width="100%"
                height="280"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="RR Bake & Sweet Location"
              />
            </div>
          </div>

          {/* Right - Form */}
          <div>
            <div className="card p-8">
              <h2 className="font-display text-2xl font-bold text-brown-700 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="form-label">Your Name *</label>
                  <input name="name" value={form.name} onChange={handleChange}
                    className="form-input" placeholder="e.g. Rahul Sharma" />
                </div>
                <div>
                  <label className="form-label">Phone Number *</label>
                  <input name="phone" value={form.phone} onChange={handleChange}
                    className="form-input" placeholder="e.g. 9036608966" type="tel" />
                </div>
                <div>
                  <label className="form-label">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange}
                    rows={5} className="form-input resize-none"
                    placeholder="Tell us what you'd like to order or ask..." />
                </div>
                <button type="submit" disabled={sending} className="btn-primary w-full justify-center py-4 text-base">
                  {sending ? (
                    <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin"></div> Sending...</span>
                  ) : (
                    <><Send size={16} /> Send via WhatsApp</>
                  )}
                </button>
                <p className="text-xs text-brown-400 text-center font-body">This will open WhatsApp with your message pre-filled.</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
