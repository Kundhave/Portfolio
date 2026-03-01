'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const CONTACT_LINKS = [
  { label: 'EMAIL', value: 'kundhave05@gmail.com', href: 'mailto:kundhave05@gmail.com', icon: '✉' },
  { label: 'GITHUB', value: 'github.com/kundhave', href: 'https://github.com', icon: '◈' },
  { label: 'LINKEDIN', value: 'linkedin.com/in/kundhavesrinivasan', href: 'https://www.linkedin.com/in/kundhavesrinivasan/', icon: '◇' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('kundhave05@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="relative py-32 bg-charcoal-2 overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-amber/60 tracking-[0.4em]">MODULE // 05</span>
            <div className="h-px w-16 bg-amber/20" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <h2 className="font-display text-5xl md:text-7xl text-cream tracking-widest mb-8">
                OPEN<br /><span className="text-amber">CHANNEL</span>
              </h2>

              <div className="mb-10">
                <p className="font-mono text-sm text-cream-dim/50 leading-relaxed">
                  Backend & systems engineering — architecture to production.
                </p>
              </div>

              {/* Status indicators */}
              <div className="space-y-3">
                {[
                  { label: 'LOCATION', value: 'Tamil Nadu, India', status: 'green' },
                  { label: 'STATUS', value: 'Open to work', status: 'green' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.status === 'green' ? 'bg-moss status-active' : 'bg-amber status-active'
                      }`} />
                    <span className="font-mono text-xs text-cream-dim/40 tracking-widest w-32">{item.label}</span>
                    <span className="font-mono text-xs text-cream/60">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Contact links */}
            <div className="space-y-3">
              {CONTACT_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 p-5 border border-cream-faint/10 hover:border-amber/30 bg-charcoal hover:bg-charcoal-3 transition-all duration-300"
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <span className="font-mono text-xl text-amber/40 group-hover:text-amber transition-colors w-6 text-center">
                    {link.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-xs text-cream-dim/30 tracking-widest mb-1">{link.label}</div>
                    <div className="font-mono text-sm text-cream/70 group-hover:text-cream transition-colors truncate">
                      {link.value}
                    </div>
                  </div>
                  <span className="font-mono text-xs text-cream-dim/20 group-hover:text-amber/60 transition-colors">
                    →
                  </span>
                </motion.a>
              ))}

              {/* Copy email button */}
              <motion.button
                className="w-full p-4 border border-dashed border-cream-faint/15 hover:border-amber/30 font-mono text-xs text-cream-dim/40 hover:text-amber/70 transition-all duration-300 tracking-widest"
                onClick={copyEmail}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
              >
                {copied ? '✓ EMAIL COPIED TO CLIPBOARD' : '⎘ COPY EMAIL ADDRESS'}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-24 pt-8 border-t border-cream-faint/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-amber rounded-full status-active" />
            <span className="font-mono text-xs text-cream-dim/30 tracking-widest">
              SYS://KUNDHAVE_S — ALL SYSTEMS OPERATIONAL
            </span>
          </div>
          <div className="font-mono text-xs text-cream-dim/20">
            B.TECH CSE · AMRITA VISHWA VIDYAPEETHAM · EXP. 2027
          </div>
        </motion.div>
      </div>
    </section>
  )
}
