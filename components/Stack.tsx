'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STACK_LAYERS = [
  {
    layer: 'L0',
    name: 'CORE LANGUAGES',
    color: 'amber',
    items: [
      { name: 'Python', proficiency: 92, note: 'Primary — backend, ML, scripting' },
      { name: 'SQL', proficiency: 85, note: 'Complex queries, schema design' },
      { name: 'TypeScript', proficiency: 72, note: 'Next.js, type-safe APIs' },
      { name: 'C', proficiency: 65, note: 'Systems-level understanding' },
    ],
  },
  {
    layer: 'L1',
    name: 'BACKEND & APIs',
    color: 'steel',
    items: [
      { name: 'FastAPI', proficiency: 90, note: 'Primary REST framework' },
      { name: 'REST API Design', proficiency: 88, note: 'Contract-first, versioned APIs' },
      { name: 'Redis', proficiency: 82, note: 'Caching, pub/sub, task queues' },
      { name: 'Celery', proficiency: 78, note: 'Distributed task processing' },
    ],
  },
  {
    layer: 'L2',
    name: 'DATA LAYER',
    color: 'moss',
    items: [
      { name: 'PostgreSQL', proficiency: 87, note: 'Production DB, complex schemas' },
      { name: 'MongoDB', proficiency: 75, note: 'Document store, aggregations' },
      { name: 'MySQL', proficiency: 78, note: 'Relational workloads' },
      { name: 'Pandas / NumPy', proficiency: 83, note: 'Data analysis, transformations' },
    ],
  },
  {
    layer: 'L3',
    name: 'AI / ML',
    color: 'amber',
    items: [
      { name: 'OpenAI API / GPT-4o', proficiency: 88, note: 'RAG pipelines, prompt engineering' },
      { name: 'LangChain', proficiency: 82, note: 'RAG, chains, agents' },
      { name: 'Vector Databases', proficiency: 80, note: 'Similarity search, embeddings' },
      { name: 'Scikit-learn', proficiency: 75, note: 'Classical ML, feature engineering' },
      { name: 'PyTorch / TensorFlow', proficiency: 65, note: 'Working knowledge, CV models' },
    ],
  },
  {
    layer: 'L4',
    name: 'INFRA & OBSERVABILITY',
    color: 'steel',
    items: [
      { name: 'Docker', proficiency: 85, note: 'Containerization, compose stacks' },
      { name: 'Prometheus', proficiency: 78, note: 'Metrics instrumentation, alerting' },
      { name: 'Git', proficiency: 88, note: 'Branching, CI/CD integration' },
    ],
  },
  {
    layer: 'L5',
    name: 'CLOUD PLATFORMS',
    color: 'moss',
    items: [
      { name: 'Azure', proficiency: 80, note: 'Event Hubs, Functions — production project' },
      { name: 'AWS', proficiency: 72, note: 'S3, Lambda, EC2 — working experience' },
      { name: 'GCP', proficiency: 65, note: 'Cloud Run, BigQuery — working experience' },
    ],
  },
]

const COLOR_MAP: Record<string, { bar: string; text: string; border: string }> = {
  amber: { bar: 'bg-amber', text: 'text-amber', border: 'border-amber/20' },
  steel: { bar: 'bg-steel', text: 'text-steel', border: 'border-steel/20' },
  moss: { bar: 'bg-moss', text: 'text-moss', border: 'border-moss/20' },
}

function SkillBar({ name, proficiency, note, color, delay }: {
  name: string; proficiency: number; note: string; color: string; delay: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [hovered, setHovered] = useState(false)
  const c = COLOR_MAP[color]

  return (
    <div
      ref={ref}
      className="group cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-mono text-xs text-cream/70 group-hover:text-cream transition-colors tracking-wide">
          {name}
        </span>
        <span className={`font-mono text-xs ${hovered ? c.text : 'text-cream-dim/30'} transition-colors`}>
          {proficiency}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-px bg-cream-faint/20 relative overflow-hidden">
        <motion.div
          className={`absolute left-0 top-0 h-full ${c.bar}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${proficiency}%` } : { width: 0 }}
          transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Note on hover */}
      <motion.div
        className="overflow-hidden"
        animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className={`font-mono text-xs ${c.text}/50 pt-1 italic`}>{note}</div>
      </motion.div>
    </div>
  )
}

function LayerPanel({ layer, index }: { layer: typeof STACK_LAYERS[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const c = COLOR_MAP[layer.color]

  return (
    <motion.div
      ref={ref}
      className={`border ${c.border} bg-charcoal-2 p-6 relative`}
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`absolute top-0 left-0 right-0 h-px ${layer.color === 'amber' ? 'bg-gradient-to-r from-amber/30 to-transparent' :
          layer.color === 'steel' ? 'bg-gradient-to-r from-steel/30 to-transparent' :
            'bg-gradient-to-r from-moss/30 to-transparent'
        }`} />

      <div className="flex items-center gap-3 mb-5">
        <span className={`font-mono text-xs ${c.text}/60 border ${c.border} px-2 py-0.5 tracking-widest`}>
          {layer.layer}
        </span>
        <span className={`font-mono text-sm ${c.text} tracking-[0.2em]`}>
          {layer.name}
        </span>
      </div>

      <div className="space-y-4">
        {layer.items.map((item, i) => (
          <SkillBar
            key={item.name}
            {...item}
            color={layer.color}
            delay={0.2 + i * 0.07}
          />
        ))}
      </div>
    </motion.div>
  )
}

const CERTS = [
  'Snowflake Data Warehousing Workshop',
  'Machine Learning Specialization',
  'Intro to Deep Learning',
]

export default function Stack() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="stack" className="relative py-32 bg-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          ref={ref}
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-amber/60 tracking-[0.4em]">MODULE // 03</span>
            <div className="h-px w-16 bg-amber/20" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl text-cream tracking-widest">
            SYSTEM<br /><span className="text-amber">STACK</span>
          </h2>
          <p className="mt-6 font-mono text-sm text-cream-dim/50 max-w-xl leading-relaxed">
            Visualized by system layer — from language primitives to infrastructure. Hover each skill for context.
          </p>
        </motion.div>

        {/* Layers grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {STACK_LAYERS.map((layer, i) => (
            <LayerPanel key={layer.layer} layer={layer} index={i} />
          ))}

          {/* Certifications panel */}
          <motion.div
            className="border border-cream-faint/10 bg-charcoal-2 p-6 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-xs text-cream-dim/40 border border-cream-faint/20 px-2 py-0.5 tracking-widest">
                CERTS
              </span>
              <span className="font-mono text-sm text-cream-dim/60 tracking-[0.2em]">
                CREDENTIALS
              </span>
            </div>
            <div className="space-y-3">
              {CERTS.map((cert, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-amber/40 mt-0.5">◆</span>
                  <span className="font-mono text-xs text-cream/60 leading-relaxed">{cert}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-cream-faint/10">
              <div className="font-mono text-xs text-cream-dim/30 tracking-wider mb-3">LEADERSHIP</div>
              <div className="space-y-2">
                {[
                  'AI/ML Tech Member — IETE Amrita',
                  'Director of Ops — iDea Amrita',
                  'Co-Head PR — Anokha Tech Fest',
                ].map((role, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-steel/40 mt-0.5">→</span>
                    <span className="font-mono text-xs text-cream/50">{role}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
