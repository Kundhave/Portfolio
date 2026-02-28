'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PRINCIPLES = [
  {
    code: 'P-01',
    title: 'FAULT ISOLATION',
    body: 'Design for failure, not against it. Every service boundary is a blast radius limiter. Dead-letter queues, circuit breakers, idempotency keys — not afterthoughts.',
    color: 'amber',
  },
  {
    code: 'P-02',
    title: 'OBSERVABLE BY DEFAULT',
    body: 'If it runs in production and isn\'t instrumented, it doesn\'t exist. Prometheus metrics, structured logs, distributed traces — wired in from day one.',
    color: 'steel',
  },
  {
    code: 'P-03',
    title: 'EVENT-DRIVEN FIRST',
    body: 'Decouple services through durable event streams. Async processing, at-least-once semantics, and backpressure handling as architectural primitives.',
    color: 'moss',
  },
  {
    code: 'P-04',
    title: 'OWNERSHIP MENTALITY',
    body: 'Architecture → code → deploy → monitor → fix. No partial ownership. Comfortable holding the pager and the pull request simultaneously.',
    color: 'cream',
  },
]

function PrincipleCard({ principle, index }: { principle: typeof PRINCIPLES[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const colorMap: Record<string, string> = {
    amber: 'text-amber border-amber/20 hover:border-amber/50',
    steel: 'text-steel border-steel/20 hover:border-steel/50',
    moss: 'text-moss border-moss/20 hover:border-moss/50',
    cream: 'text-cream border-cream/20 hover:border-cream/40',
  }
  const accentColor = colorMap[principle.color] || colorMap.cream

  return (
    <motion.div
      ref={ref}
      className={`relative border ${accentColor} bg-charcoal-2 p-6 transition-all duration-300 group corner-tl`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Code label */}
      <div className="flex items-center gap-3 mb-4">
        <span className={`font-mono text-xs tracking-widest opacity-50 ${principle.color === 'amber' ? 'text-amber' : principle.color === 'steel' ? 'text-steel' : principle.color === 'moss' ? 'text-moss' : 'text-cream'}`}>
          {principle.code}
        </span>
        <div className="flex-1 h-px bg-current opacity-10" />
      </div>

      {/* Title */}
      <h3 className={`font-mono text-sm font-semibold tracking-[0.2em] mb-3 ${principle.color === 'amber' ? 'text-amber' : principle.color === 'steel' ? 'text-steel' : principle.color === 'moss' ? 'text-moss' : 'text-cream'}`}>
        {principle.title}
      </h3>

      {/* Body */}
      <p className="font-mono text-xs text-cream-dim/60 leading-relaxed">
        {principle.body}
      </p>
    </motion.div>
  )
}

// System architecture SVG diagram
function ArchDiagram() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const nodes = [
    { x: 80, y: 60, label: 'API GATEWAY', type: 'entry' },
    { x: 240, y: 40, label: 'EVENT HUB', type: 'queue' },
    { x: 240, y: 120, label: 'CACHE', type: 'cache' },
    { x: 400, y: 60, label: 'WORKER', type: 'worker' },
    { x: 400, y: 120, label: 'DB', type: 'db' },
    { x: 540, y: 80, label: 'MONITOR', type: 'monitor' },
  ]

  const edges = [
    [0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [3, 5], [4, 5],
  ]

  return (
    <div ref={ref} className="relative bg-charcoal-3 border border-cream-faint/10 p-6 overflow-hidden">
      <div className="font-mono text-xs text-cream-dim/30 tracking-widest mb-4">
        SYSTEM TOPOLOGY / SIMPLIFIED
      </div>
      <svg viewBox="0 0 640 180" className="w-full h-auto">
        {/* Edges */}
        {edges.map(([from, to], i) => {
          const f = nodes[from], t = nodes[to]
          return (
            <motion.line
              key={i}
              x1={f.x + 40} y1={f.y + 14}
              x2={t.x} y2={t.y + 14}
              stroke="rgba(232,224,208,0.12)"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
            />
          )
        })}

        {/* Data flow animations */}
        {inView && edges.map(([from, to], i) => {
          const f = nodes[from], t = nodes[to]
          return (
            <motion.circle
              key={`flow-${i}`}
              r="2"
              fill="#e07b39"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                cx: [f.x + 40, t.x],
                cy: [f.y + 14, t.y + 14],
              }}
              transition={{
                delay: 1 + i * 0.3,
                duration: 1.2,
                repeat: Infinity,
                repeatDelay: 2,
                ease: 'linear',
              }}
            />
          )
        })}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
          >
            <rect
              x={node.x} y={node.y}
              width="80" height="28"
              rx="2"
              fill={node.type === 'entry' ? 'rgba(224,123,57,0.15)' :
                    node.type === 'monitor' ? 'rgba(74,127,165,0.15)' :
                    'rgba(37,37,32,0.8)'}
              stroke={node.type === 'entry' ? 'rgba(224,123,57,0.5)' :
                      node.type === 'monitor' ? 'rgba(74,127,165,0.5)' :
                      'rgba(232,224,208,0.12)'}
              strokeWidth="1"
            />
            <text
              x={node.x + 40} y={node.y + 18}
              textAnchor="middle"
              fontSize="7"
              fontFamily="JetBrains Mono, monospace"
              fill={node.type === 'entry' ? '#e07b39' :
                    node.type === 'monitor' ? '#4a7fa5' :
                    '#a09080'}
              letterSpacing="0.05em"
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}

export default function Systems() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="systems" className="relative py-32 bg-charcoal overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-amber/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          ref={ref}
          className="mb-16"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-amber/60 tracking-[0.4em]">MODULE // 01</span>
            <div className="h-px w-16 bg-amber/20" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl text-cream tracking-widest">
            SYSTEMS<br />
            <span className="text-amber">THINKING</span>
          </h2>
          <p className="mt-6 font-mono text-sm text-cream-dim/50 max-w-lg leading-relaxed">
            Engineering principles that drive architecture decisions — not rules to follow, but instincts built through iteration.
          </p>
        </motion.div>

        {/* Architecture diagram */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <ArchDiagram />
        </motion.div>

        {/* Principles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRINCIPLES.map((p, i) => (
            <PrincipleCard key={p.code} principle={p} index={i} />
          ))}
        </div>

        {/* Identity statement */}
        <motion.div
          className="mt-12 border-l-2 border-amber/40 pl-6 py-2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <p className="font-mono text-sm text-cream/70 leading-relaxed max-w-2xl italic">
            "Looking to contribute immediately at a fast-moving startup where reliability and velocity both matter — not as competing priorities, but as the same goal."
          </p>
          <p className="font-mono text-xs text-amber/50 mt-3 tracking-wider">— KUNDHAVE S / OPEN_TO_WORK</p>
        </motion.div>
      </div>
    </section>
  )
}
