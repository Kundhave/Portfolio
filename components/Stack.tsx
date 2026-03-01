'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STACK_LAYERS = [
  {
    layer: 'L0',
    name: 'CORE LANGUAGES',
    color: 'amber',
    items: [
      { name: 'Python', tags: ['Event-driven APIs', 'Async tasks', 'ML integration', 'Service design'] },
      { name: 'SQL', tags: ['Complex joins', 'Window functions', 'Query optimization', 'Schema design'] },
      { name: 'Java', tags: ['DSA', 'OOP', 'Collections framework', 'Multithreading'] },
    ],
  },
  {
    layer: 'L1',
    name: 'BACKEND & APIs',
    color: 'steel',
    items: [
      { name: 'FastAPI', tags: ['Dependency injection', 'Pydantic models', 'Async endpoints', 'OpenAPI specs'] },
      { name: 'REST API Design', tags: ['Contract-first', 'Versioned APIs', 'Idempotent endpoints'] },
      { name: 'Redis', tags: ['Caching layer', 'Rate limiting', 'Worker queues'] },
      { name: 'Celery', tags: ['Distributed tasks', 'Retry policies', 'Task chaining'] },
    ],
  },
  {
    layer: 'L2',
    name: 'DATA LAYER',
    color: 'moss',
    items: [
      { name: 'PostgreSQL', tags: ['ACID transactions', 'Idempotent writes', 'Schema design'] },
      { name: 'MongoDB', tags: ['Document modeling', 'Aggregation pipelines', 'Flexible schemas'] },
      { name: 'MySQL', tags: ['Relational workloads', 'Indexing strategies'] },
      { name: 'Pandas / NumPy', tags: ['Data wrangling', 'Feature engineering', 'Statistical analysis'] },
    ],
  },
  {
    layer: 'L3',
    name: 'AI / ML',
    color: 'amber',
    items: [
      { name: 'OpenAI API / GPT-4o', tags: ['RAG pipelines', 'Prompt engineering', 'Function calling'] },
      { name: 'LangChain', tags: ['Chain orchestration', 'Agent design', 'RAG workflows'] },
      { name: 'Vector Databases', tags: ['Similarity search', 'Embedding pipelines'] },
      { name: 'Scikit-learn', tags: ['Classical ML', 'Feature engineering', 'Model evaluation'] },
      { name: 'PyTorch / TensorFlow', tags: ['Neural networks', 'CV models', 'Transfer learning'] },
    ],
  },
  {
    layer: 'L4',
    name: 'INFRA & OBSERVABILITY',
    color: 'steel',
    items: [
      { name: 'Docker', tags: ['Multi-stage builds', 'Compose stacks', 'Container networking'] },
      { name: 'Prometheus', tags: ['Metrics instrumentation', 'Alert rules', 'Grafana dashboards'] },
      { name: 'Git', tags: ['Branch strategies', 'CI/CD pipelines', 'Code review workflows'] },
    ],
  },
  {
    layer: 'L5',
    name: 'CLOUD PLATFORMS',
    color: 'moss',
    items: [
      { name: 'Azure', tags: ['Event Hubs', 'Functions', 'Production deployments'] },
      { name: 'AWS', tags: ['S3', 'Lambda', 'EC2', 'IAM policies'] },
      { name: 'GCP', tags: ['Cloud Run', 'BigQuery', 'Pub/Sub'] },
    ],
  },
]

const COLOR_MAP: Record<string, { bg: string; text: string; border: string; tagBg: string; tagText: string }> = {
  amber: { bg: 'bg-amber', text: 'text-amber', border: 'border-amber/20', tagBg: 'bg-amber/10', tagText: 'text-amber/70' },
  steel: { bg: 'bg-steel', text: 'text-steel', border: 'border-steel/20', tagBg: 'bg-steel/10', tagText: 'text-steel/70' },
  moss: { bg: 'bg-moss', text: 'text-moss', border: 'border-moss/20', tagBg: 'bg-moss/10', tagText: 'text-moss/70' },
}

function SkillCard({ name, tags, color, delay }: {
  name: string; tags: string[]; color: string; delay: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const c = COLOR_MAP[color]

  return (
    <motion.div
      ref={ref}
      className="group"
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-2">
        <span className={`font-mono text-xs ${c.text} tracking-wide`}>
          {name}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag, i) => (
          <motion.span
            key={tag}
            className={`font-mono text-[10px] ${c.tagBg} ${c.tagText} px-2 py-0.5 border ${c.border} 
              hover:border-opacity-50 transition-all duration-200 tracking-wide`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: delay + i * 0.05, duration: 0.3 }}
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </motion.div>
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
          <SkillCard
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
