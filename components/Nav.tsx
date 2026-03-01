'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { id: 'projects', label: 'ACTIVE OPS', index: '01' },
  { id: 'stack', label: 'STACK', index: '02' },
  { id: 'processes', label: 'PARALLEL PROCESSES', index: '03' },
  { id: 'systems', label: 'SYSTEMS', index: '04' },
  { id: 'contact', label: 'CONNECT', index: '05' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [time, setTime] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleString('en-GB', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false,
      }).replace(',', '') + ' IST')
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-charcoal/95 backdrop-blur-sm border-b border-cream-faint' : ''
          }`}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          {/* System ID */}
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-amber rounded-full status-active" />
            <span className="font-mono text-xs text-cream-dim tracking-widest uppercase">
              SYS://KUNDHAVE_S
            </span>
          </div>

          {/* Clock */}
          <div className="hidden md:block font-mono text-xs text-cream-dim/50 tracking-wider">
            {time}
          </div>

          {/* Nav items - desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="group flex items-baseline gap-1.5 font-mono text-xs text-cream-dim hover:text-amber transition-colors duration-200"
              >
                <span className="text-amber/40 group-hover:text-amber transition-colors">{item.index}</span>
                <span className="tracking-widest">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Hamburger - mobile */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`block w-5 h-px bg-cream transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-px bg-cream transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-cream transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-charcoal/98 flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-display text-5xl text-cream hover:text-amber transition-colors"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.07 }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
