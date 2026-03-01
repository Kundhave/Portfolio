'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── SERVICE REGISTRY ────────────────────────────────────────────
interface ServiceNode {
    pid: string
    name: string
    org: string
    scope: string
    period: string
    startDate: string
    status: 'ACTIVE' | 'ARCHIVED'
    color: 'amber' | 'steel' | 'moss'
}

const SERVICES: ServiceNode[] = [
    {
        pid: 'SVC-001',
        name: 'Technical Team Member (AI/ML)',
        org: 'IETE Amrita',
        scope: 'R&D / Applied ML',
        period: 'Aug 2025 – Present',
        startDate: '2025-08-01',
        status: 'ACTIVE',
        color: 'amber',
    },
    {
        pid: 'SVC-002',
        name: 'General Manager',
        org: 'iDea Amrita',
        scope: 'Operations / Strategy',
        period: 'Dec 2025 – Present',
        startDate: '2025-12-01',
        status: 'ACTIVE',
        color: 'steel',
    },
    {
        pid: 'SVC-003',
        name: 'Co-Head — PR & Sponsorship',
        org: 'Anokha Tech Fest',
        scope: 'Outreach / Sponsorship',
        period: 'Dec 2025 – Jan 2026',
        startDate: '2025-12-01',
        status: 'ARCHIVED',
        color: 'moss',
    },
    {
        pid: 'SVC-004',
        name: 'State Publicity Head',
        org: 'Youth United Council of India',
        scope: 'Governance / Communications',
        period: 'Jun 2024 – Jan 2025',
        startDate: '2024-06-01',
        status: 'ARCHIVED',
        color: 'amber',
    },
]

// ─── VOLUNTEER OPS ───────────────────────────────────────────────
const VOLUNTEER = {
    pid: 'VOL-001',
    name: 'Joint Secretary',
    org: 'Interact Club',
    scope: 'Community Service / Outreach',
    period: 'Jun 2021 – Jun 2022',
    status: 'ARCHIVED' as const,
}

// ─── COMPONENTS ──────────────────────────────────────────────────

function UptimeCounter({ startDate }: { startDate: string }) {
    const [uptime, setUptime] = useState('')
    useEffect(() => {
        const calc = () => {
            const diff = Date.now() - new Date(startDate).getTime()
            const d = Math.floor(diff / 864e5)
            const h = Math.floor((diff % 864e5) / 36e5)
            const m = Math.floor((diff % 36e5) / 6e4)
            setUptime(`${d}d ${h}h ${m}m`)
        }
        calc()
        const id = setInterval(calc, 60000)
        return () => clearInterval(id)
    }, [startDate])
    return <span>{uptime || '—'}</span>
}

function ServiceCard({ service, index }: { service: ServiceNode; index: number }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })
    const isActive = service.status === 'ACTIVE'
    const borderColor = isActive
        ? service.color === 'amber' ? 'border-amber/30' : service.color === 'steel' ? 'border-steel/30' : 'border-moss/30'
        : 'border-cream-faint/10'
    const accentText = service.color === 'amber' ? 'text-amber' : service.color === 'steel' ? 'text-steel' : 'text-moss'

    return (
        <motion.div
            ref={ref}
            className={`relative border ${borderColor} bg-charcoal-2 p-5 transition-all duration-300`}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            {isActive && (
                <div className={`absolute top-0 left-0 right-0 h-px ${service.color === 'amber' ? 'bg-gradient-to-r from-amber/40 to-transparent' :
                    service.color === 'steel' ? 'bg-gradient-to-r from-steel/40 to-transparent' :
                        'bg-gradient-to-r from-moss/40 to-transparent'
                    }`} />
            )}
            <div className="flex items-center justify-between mb-4">
                <span className={`font-mono text-xs ${accentText}/60 tracking-widest`}>{service.pid}</span>
                <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-moss status-active' : 'bg-cream-dim/20'}`} />
                    <span className={`font-mono text-[10px] tracking-wider ${isActive ? 'text-moss' : 'text-cream-dim/30'}`}>
                        {service.status}
                    </span>
                </div>
            </div>
            <h3 className={`font-mono text-sm font-medium tracking-wide mb-1 ${isActive ? 'text-cream' : 'text-cream/50'}`}>
                {service.name}
            </h3>
            <div className={`font-mono text-xs ${accentText}/50 tracking-wider mb-4`}>{service.org}</div>
            <div className="space-y-2 border-t border-cream-faint/8 pt-3">
                <div className="flex justify-between">
                    <span className="font-mono text-[10px] text-cream-dim/30 tracking-wider">SCOPE</span>
                    <span className="font-mono text-[10px] text-cream-dim/50">{service.scope}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-mono text-[10px] text-cream-dim/30 tracking-wider">{isActive ? 'UPTIME' : 'RUNTIME'}</span>
                    <span className={`font-mono text-[10px] ${isActive ? 'text-moss/70' : 'text-cream-dim/40'}`}>
                        {isActive ? <UptimeCounter startDate={service.startDate} /> : service.period}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="font-mono text-[10px] text-cream-dim/30 tracking-wider">PERIOD</span>
                    <span className="font-mono text-[10px] text-cream-dim/40">{service.period}</span>
                </div>
            </div>
        </motion.div>
    )
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────
export default function ParallelProcesses() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-50px' })

    const activeCount = SERVICES.filter(s => s.status === 'ACTIVE').length
    const archivedCount = SERVICES.filter(s => s.status === 'ARCHIVED').length

    return (
        <section id="processes" className="relative py-32 bg-charcoal overflow-hidden">
            <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-steel/10 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* ─── HEADER ─────────────────────────────────────── */}
                <motion.div
                    ref={ref}
                    className="mb-16"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <span className="font-mono text-xs text-amber/60 tracking-[0.4em]">MODULE // 03</span>
                        <div className="h-px w-16 bg-amber/20" />
                    </div>
                    <h2 className="font-display text-5xl md:text-7xl text-cream tracking-widest">
                        PARALLEL<br /><span className="text-amber">PROCESSES</span>
                    </h2>
                    <p className="mt-6 font-mono text-sm text-cream-dim/50 max-w-xl leading-relaxed">
                        Concurrent services — leadership and volunteering running alongside core engineering systems.
                    </p>
                </motion.div>

                {/* ─── SERVICE REGISTRY ────────────────────────────── */}
                <motion.div
                    className="flex items-center gap-6 mb-8 font-mono text-xs"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-moss status-active" />
                        <span className="text-moss/70 tracking-wider">{activeCount} ACTIVE</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cream-dim/20" />
                        <span className="text-cream-dim/30 tracking-wider">{archivedCount} ARCHIVED</span>
                    </div>
                    <div className="flex-1 h-px bg-cream-faint/10" />
                    <span className="text-cream-dim/20 tracking-widest">LEADERSHIP</span>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    {SERVICES.map((service, i) => (
                        <ServiceCard key={service.pid} service={service} index={i} />
                    ))}
                </div>

                {/* ─── VOLUNTEER OPS ──────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <span className="font-mono text-xs text-moss/50 border border-moss/20 px-2 py-0.5 tracking-widest">VOL</span>
                        <span className="font-mono text-sm text-moss/40 tracking-[0.2em]">VOLUNTEER OPS</span>
                        <div className="flex-1 h-px bg-cream-faint/10" />
                    </div>
                    <div className="border border-cream-faint/10 bg-charcoal-2 p-5">
                        <div className="flex items-center justify-between mb-3">
                            <span className="font-mono text-xs text-moss/50 tracking-widest">{VOLUNTEER.pid}</span>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-cream-dim/20" />
                                <span className="font-mono text-[10px] text-cream-dim/30 tracking-wider">{VOLUNTEER.status}</span>
                            </div>
                        </div>
                        <h3 className="font-mono text-sm text-cream/50 tracking-wide mb-1">{VOLUNTEER.name}</h3>
                        <div className="font-mono text-xs text-moss/40 tracking-wider mb-3">{VOLUNTEER.org}</div>
                        <div className="flex gap-8 border-t border-cream-faint/8 pt-3">
                            <div>
                                <span className="font-mono text-[10px] text-cream-dim/30 tracking-wider">SCOPE</span>
                                <div className="font-mono text-[10px] text-cream-dim/50 mt-0.5">{VOLUNTEER.scope}</div>
                            </div>
                            <div>
                                <span className="font-mono text-[10px] text-cream-dim/30 tracking-wider">PERIOD</span>
                                <div className="font-mono text-[10px] text-cream-dim/40 mt-0.5">{VOLUNTEER.period}</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    )
}
