'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const PROJECTS = [
  {
    id: 'custos',
    status: 'IN PROGRESS',
    statusLabel: 'BUILD',
    statusTooltip: 'Active development — pre-release',
    statusColor: 'amber',
    name: 'CUSTOS',
    subtitle: 'Pre-Trade Risk & Regulatory Intelligence Platform',
    class: 'FINTECH / COMPLIANCE',
    version: 'v0.8.2-alpha',
    uptime: 'IN PROGRESS',
    stack: ['Azure Event Hubs', 'Azure Functions', 'GPT-4o', 'RAG', 'Redis', 'Python', 'Entra ID'],
    description: 'Cloud-native, event-driven pre-trade risk engine on Microsoft Azure. Intercepts and validates institutional trade orders using stateless Functions with sub-millisecond deterministic checks for fat-finger errors and position limits.',
    modules: [
      { name: 'Risk Engine', status: 'active', detail: 'Sub-ms fat-finger + position limit checks' },
      { name: 'Regulatory AI', status: 'active', detail: 'RAG-powered SEC/FINRA PDF extraction' },
      { name: 'Audit Trail', status: 'active', detail: 'WORM-policy immutable Golden Record' },
      { name: 'Zero-Trust Auth', status: 'active', detail: 'Microsoft Entra ID enforcement' },
    ],
    highlight: 'AI-driven compliance automation — reducing regulatory update latency from days to minutes.',
  },
  {
    id: 'relay',
    status: 'STABLE',
    statusLabel: 'BUILD',
    statusTooltip: 'Architecture complete — production-grade reliability verified',
    statusColor: 'moss',
    name: 'RELAY',
    subtitle: 'Fault-Tolerant Distributed Webhook Orchestrator',
    class: 'INFRA / PAYMENTS',
    version: 'v1.2.0',
    uptime: '99.94%',
    stack: ['FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'Docker', 'Prometheus'],
    description: 'Fault-tolerant event delivery system for asynchronous notification of external services across payment lifecycle events. Decoupled architecture with durable event persistence and instrumented delivery pipeline.',
    modules: [
      { name: 'Event Bus', status: 'active', detail: 'Decoupled event creation from delivery' },
      { name: 'Worker Pool', status: 'active', detail: 'Redis-backed Celery with exponential backoff' },
      { name: 'DLQ Handler', status: 'active', detail: 'Dead-letter handling for unreliable endpoints' },
      { name: 'Observability', status: 'active', detail: 'Prometheus latency, retry, failure metrics' },
    ],
    highlight: 'At-least-once delivery semantics with idempotency keys — zero duplicate payment events.',
  },
  {
    id: 'entitled',
    status: 'OPERATIONAL',
    statusLabel: 'SYSTEM',
    statusTooltip: 'All security modules verified and operational',
    statusColor: 'moss',
    name: 'ENTITLED',
    subtitle: 'Secure Privileged Access Management System',
    class: 'SECURITY / FINTECH',
    version: 'v1.0.4',
    uptime: '99.98%',
    stack: ['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'JWT', 'TOTP MFA'],
    description: 'Security-focused PAM backend implementing role-based access control for sensitive financial vault data. Zero-trust architecture with just-in-time access provisioning.',
    modules: [
      { name: 'RBAC Engine', status: 'active', detail: 'Role-based financial vault access control' },
      { name: 'JIT Provisioner', status: 'active', detail: 'Admin-approved time-bound sessions' },
      { name: 'MFA Layer', status: 'active', detail: 'TOTP for privileged action enforcement' },
      { name: 'Audit Logger', status: 'active', detail: 'Immutable access request trail' },
    ],
    highlight: 'Automatic access revocation — privilege escalation with zero standing permissions.',
  },
  {
    id: 'techtrendgpt',
    status: 'ACTIVE',
    statusLabel: 'MODULE',
    statusTooltip: 'RAG pipeline and inference engine running',
    statusColor: 'steel',
    name: 'TECHTRENDGPT',
    subtitle: 'RAG-Based Technology Intelligence Chatbot',
    class: 'AI / NLP',
    version: 'v2.1.0',
    uptime: '99.80%',
    stack: ['Next.js', 'TypeScript', 'LangChain', 'Vector DB', 'OpenAI API'],
    description: 'Retrieval-Augmented Generation chatbot for real-time technology discourse and news analysis. Vector similarity search over indexed tech articles with streaming AI responses.',
    modules: [
      { name: 'RAG Pipeline', status: 'active', detail: 'Vector similarity over tech article corpus' },
      { name: 'Stream Engine', status: 'active', detail: 'Streaming responses with markdown render' },
      { name: 'Content Sync', status: 'active', detail: 'Automated article indexing + time-awareness' },
    ],
    highlight: 'Context-aware responses grounded in recent tech articles — not just training data.',
  },
]

const STATUS_COLORS: Record<string, string> = {
  amber: 'text-amber bg-amber/10 border-amber/30',
  moss: 'text-moss bg-moss/10 border-moss/30',
  steel: 'text-steel bg-steel/10 border-steel/30',
}

function ModuleStatus({ mod }: { mod: { name: string; status: string; detail: string } }) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-cream-faint/10 last:border-0">
      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-moss flex-shrink-0 status-active" />
      <div>
        <div className="font-mono text-xs text-cream/80 tracking-wider">{mod.name}</div>
        <div className="font-mono text-xs text-cream-dim/40 mt-0.5">{mod.detail}</div>
      </div>
    </div>
  )
}

function ProjectPanel({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className="relative border border-cream-faint/10 bg-charcoal-2 hover:border-cream-faint/25 transition-all duration-300"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Top accent line */}
      <div
        className={`absolute top-0 left-0 right-0 h-px ${project.statusColor === 'amber' ? 'bg-gradient-to-r from-amber/50 to-transparent' :
            project.statusColor === 'moss' ? 'bg-gradient-to-r from-moss/50 to-transparent' :
              'bg-gradient-to-r from-steel/50 to-transparent'
          }`}
      />

      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`font-mono text-xs px-2 py-0.5 border tracking-widest cursor-default select-none ${STATUS_COLORS[project.statusColor]}`}
              title={project.statusTooltip}
            >
              <span className="opacity-50">{project.statusLabel}:</span>{' '}{project.status}
            </span>
            <span className="font-mono text-xs text-cream-dim/30 tracking-wider">{project.class}</span>
          </div>
          <span className="font-mono text-xs text-cream-dim/20 flex-shrink-0">{project.version}</span>
        </div>

        <h3 className="font-display text-3xl md:text-4xl text-cream tracking-widest mb-1">
          {project.name}
        </h3>
        <p className="font-mono text-xs text-cream-dim/50 tracking-wider mb-4">
          {project.subtitle}
        </p>

        <p className="font-mono text-xs text-cream/60 leading-relaxed">
          {project.description}
        </p>

        {/* Highlight */}
        <div className="mt-4 pl-3 border-l border-amber/30">
          <p className="font-mono text-xs text-amber/70 italic">{project.highlight}</p>
        </div>
      </div>

      {/* Stack */}
      <div className="px-6 pb-4">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span key={s} className="font-mono text-xs text-cream-dim/50 border border-cream-faint/10 px-2 py-0.5">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Expand toggle */}
      <button
        className="w-full px-6 py-3 flex items-center justify-between border-t border-cream-faint/10 hover:bg-charcoal-3 transition-colors duration-200 group"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="font-mono text-xs text-cream-dim/40 tracking-widest group-hover:text-cream-dim/70 transition-colors">
          {expanded ? 'COLLAPSE MODULES' : 'INSPECT MODULES'}
        </span>
        <motion.span
          className="text-cream-dim/40 text-xs"
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.span>
      </button>

      {/* Expanded modules */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 bg-charcoal-3/50">
              <div className="font-mono text-xs text-cream-dim/30 tracking-widest mb-3">
                ACTIVE MODULES [{project.modules.length}]
              </div>
              {project.modules.map((mod) => (
                <ModuleStatus key={mod.name} mod={mod} />
              ))}
              <div className="mt-4 flex items-center justify-between">
                <span className="font-mono text-xs text-cream-dim/20">UPTIME: {project.uptime}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="projects" className="relative py-32 bg-charcoal-2 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #e8e0d0 0px, #e8e0d0 1px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, #e8e0d0 0px, #e8e0d0 1px, transparent 1px, transparent 48px)'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-amber/60 tracking-[0.4em]">MODULE // 02</span>
            <div className="h-px w-16 bg-amber/20" />
          </div>
          <div className="flex items-end gap-6">
            <h2 className="font-display text-5xl md:text-7xl text-cream tracking-widest">
              ACTIVE<br /><span className="text-amber">OPERATIONS</span>
            </h2>
            <div className="mb-3 hidden md:block">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-moss status-active" />
                <span className="font-mono text-xs text-moss/70">{PROJECTS.length} SYSTEMS RUNNING</span>
              </div>
            </div>
          </div>
          <p className="mt-6 font-mono text-sm text-cream-dim/50 max-w-xl leading-relaxed">
            Not showcases. Working systems engineered to production standards — with real failure handling, observability, and architectural rigour.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS.map((project, i) => (
            <ProjectPanel key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
