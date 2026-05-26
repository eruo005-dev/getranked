import { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      {/* Tooltip */}
      <span
        className={`hidden sm:inline-block px-3 py-2 rounded-xl text-xs font-semibold bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] shadow-card whitespace-nowrap transition-all duration-200 ${
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        Chat with us on WhatsApp
      </span>

      <a
        href="https://wa.me/2348000000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-whatsapp hover:scale-110 transition-transform duration-300 animate-whatsapp-pulse"
      >
        <MessageCircle className="w-7 h-7 text-white fill-white" aria-hidden="true" />
        <span className="sr-only">Chat with us on WhatsApp</span>
      </a>
    </div>
  )
}
