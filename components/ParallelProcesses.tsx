'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

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

// ─── RUNTIME SIGNALS (hobbies / interests) ──────────────────────
const RUNTIME_SIGNALS = [
    { level: 'PROCESS', message: 'NatyaSudha Dance Club — Active node', meta: 'Nov 2023 – Jun 2025', color: 'steel' as const },
    { level: 'CERT', message: 'Bharatanatyam — All 9 levels cleared', meta: 'Annamalai University', color: 'amber' as const },
    { level: 'EVENT', message: 'Multiple dance competitions — Wins logged', meta: 'Performance metrics nominal', color: 'amber' as const },
    { level: 'DAEMON', message: 'Sudoku solver — Low-priority background task', meta: 'PID: persistent', color: 'moss' as const },
    { level: 'THREAD', message: 'Chess engine — Target: 1000 ELO', meta: 'Worker in progress', color: 'steel' as const },
    { level: 'SIGNAL', message: 'Cafe hopping • Food • Beach • Friends', meta: 'I/O channels open', color: 'amber' as const },
    { level: 'OUTPUT', message: 'Painting — Visual artifacts generated', meta: 'See memory buffer', color: 'moss' as const },
]

// ─── PHOTO NODES ─────────────────────────────────────────────────
const PHOTOS = Array.from({ length: 11 }, (_, i) => ({
    id: `MEM-${String(i + 1).padStart(2, '0')}`,
    src: `/photos/photo-${String(i + 1).padStart(2, '0')}.jpeg`,
}))

const PHOTO_META = [
    { node: 'DANCE', signal: 'HIGH' },
    { node: 'TRAVEL', signal: 'MED' },
    { node: 'EXPLORE', signal: 'HIGH' },
    { node: 'ART', signal: 'HIGH' },
    { node: 'NATURE', signal: 'MED' },
    { node: 'CREATE', signal: 'HIGH' },
    { node: 'VIBES', signal: 'MED' },
    { node: 'PAINT', signal: 'HIGH' },
    { node: 'CULTURE', signal: 'MED' },
    { node: 'MEMORY', signal: 'LOW' },
    { node: 'CAPTURE', signal: 'MED' },
]

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

function LogEntry({ log, index }: { log: typeof RUNTIME_SIGNALS[0]; index: number }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })
    const colorMap = { amber: 'text-amber', steel: 'text-steel', moss: 'text-moss' }

    return (
        <motion.div
            ref={ref}
            className="flex items-start gap-3 group"
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.08, duration: 0.4 }}
        >
            <span className="font-mono text-[10px] text-cream-dim/20 mt-0.5 shrink-0 w-10 text-right">
                {String(index).padStart(3, '0')}
            </span>
            <span className={`font-mono text-[10px] ${colorMap[log.color]}/60 tracking-wider shrink-0 w-16`}>
                [{log.level}]
            </span>
            <div className="flex-1 min-w-0">
                <span className="font-mono text-xs text-cream/60 group-hover:text-cream transition-colors">
                    {log.message}
                </span>
                <span className="font-mono text-[10px] text-cream-dim/25 ml-2">
          // {log.meta}
                </span>
            </div>
        </motion.div>
    )
}

// ─── MEMORY BUFFER (floating photo widget) ──────────────────────
function MemoryBuffer() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [shuffledPhotos, setShuffledPhotos] = useState(PHOTOS)
    const [isHovered, setIsHovered] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Shuffle on mount
    useEffect(() => {
        const a = [...PHOTOS]
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]]
        }
        setShuffledPhotos(a)
    }, [])

    // Auto-rotate every 4 seconds — pauses on hover
    useEffect(() => {
        if (isHovered) return
        const id = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % shuffledPhotos.length)
        }, 4000)
        return () => clearInterval(id)
    }, [shuffledPhotos.length, isHovered])

    const goNext = useCallback(() => {
        setCurrentIndex(prev => (prev + 1) % shuffledPhotos.length)
    }, [shuffledPhotos.length])

    const goPrev = useCallback(() => {
        setCurrentIndex(prev => (prev - 1 + shuffledPhotos.length) % shuffledPhotos.length)
    }, [shuffledPhotos.length])

    // Keyboard navigation when focused/hovered
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); goNext() }
        if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev() }
    }, [goNext, goPrev])

    const current = shuffledPhotos[currentIndex]
    const meta = PHOTO_META[PHOTOS.findIndex(p => p.id === current?.id)] || PHOTO_META[0]

    return (
        <div
            ref={containerRef}
            className="relative w-full max-w-[260px] outline-none"
            tabIndex={0}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onKeyDown={handleKeyDown}
        >
            {/* Widget frame */}
            <div className="border border-cream-faint/10 bg-charcoal-2 overflow-hidden">
                {/* Header bar */}
                <div className="flex items-center justify-between px-3 py-1.5 border-b border-cream-faint/8 bg-charcoal-3">
                    <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-steel/50 animate-pulse" />
                        <span className="font-mono text-[8px] text-steel/40 tracking-widest">MEM_BUFFER</span>
                    </div>
                    <span className="font-mono text-[8px] text-cream-dim/20">
                        {currentIndex + 1}/{shuffledPhotos.length}
                    </span>
                </div>

                {/* Image viewport */}
                <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current?.id}
                            className="absolute inset-0"
                            initial={{ opacity: 0, scale: 1.08, filter: 'blur(6px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {current && (
                                <Image
                                    src={current.src}
                                    alt={current.id}
                                    fill
                                    className="object-cover"
                                    sizes="260px"
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation arrows — visible on hover */}
                    <div
                        className={`absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <button
                            onClick={(e) => { e.stopPropagation(); goPrev() }}
                            className="pointer-events-auto w-6 h-6 flex items-center justify-center bg-charcoal/60 border border-cream-faint/15 text-cream-dim/60 hover:text-cream hover:border-steel/40 transition-all duration-200 font-mono text-xs"
                            aria-label="Previous photo"
                        >
                            ‹
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); goNext() }}
                            className="pointer-events-auto w-6 h-6 flex items-center justify-center bg-charcoal/60 border border-cream-faint/15 text-cream-dim/60 hover:text-cream hover:border-steel/40 transition-all duration-200 font-mono text-xs"
                            aria-label="Next photo"
                        >
                            ›
                        </button>
                    </div>

                    {/* Scan line overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                        style={{
                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(232,224,208,0.5) 2px, rgba(232,224,208,0.5) 3px)',
                        }}
                    />

                    {/* Subtle vignette */}
                    <div className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(15,15,13,0.6) 100%)',
                        }}
                    />
                </div>

                {/* Metadata footer */}
                <div className="px-3 py-2 border-t border-cream-faint/8 bg-charcoal-3">
                    <div className="flex items-center justify-between mb-1.5">
                        <div>
                            <div className="font-mono text-[8px] text-cream-dim/25 tracking-wider">NODE</div>
                            <div className="font-mono text-[10px] text-steel/60 tracking-wide">{meta.node}</div>
                        </div>
                        <div className="text-right">
                            <div className="font-mono text-[8px] text-cream-dim/25 tracking-wider">SIGNAL</div>
                            <div className={`font-mono text-[10px] tracking-wide ${meta.signal === 'HIGH' ? 'text-amber/60' : meta.signal === 'MED' ? 'text-steel/50' : 'text-cream-dim/30'
                                }`}>
                                {meta.signal}
                            </div>
                        </div>
                    </div>
                    {/* Dot indicators */}
                    <div className="flex items-center justify-center gap-1 pt-1 border-t border-cream-faint/5">
                        {shuffledPhotos.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`transition-all duration-300 rounded-full ${i === currentIndex
                                    ? 'w-2.5 h-1 bg-steel/60'
                                    : 'w-1 h-1 bg-cream-dim/15 hover:bg-cream-dim/30'
                                    }`}
                                aria-label={`Go to photo ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Soft glow behind widget */}
            <div className="absolute -inset-4 -z-10 opacity-20 blur-xl"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(74,127,165,0.15) 0%, transparent 70%)',
                }}
            />
        </div>
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
                        <span className="font-mono text-xs text-amber/60 tracking-[0.4em]">MODULE // 04</span>
                        <div className="h-px w-16 bg-amber/20" />
                    </div>
                    <h2 className="font-display text-5xl md:text-7xl text-cream tracking-widest">
                        PARALLEL<br /><span className="text-amber">PROCESSES</span>
                    </h2>
                    <p className="mt-6 font-mono text-sm text-cream-dim/50 max-w-xl leading-relaxed">
                        Concurrent services — leadership, volunteering, and non-deterministic runtime signals running alongside core engineering systems.
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
                    className="mb-12"
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

                {/* ─── RUNTIME SIGNALS + MEMORY BUFFER ────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <span className="font-mono text-xs text-steel/50 border border-steel/20 px-2 py-0.5 tracking-widest">SIG</span>
                        <span className="font-mono text-sm text-steel/40 tracking-[0.2em]">RUNTIME SIGNALS</span>
                        <div className="flex-1 h-px bg-cream-faint/10" />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Log feed */}
                        <div className="flex-1 border border-cream-faint/10 bg-charcoal-2 p-5">
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-mono text-[10px] text-cream-dim/30 tracking-widest">STDOUT</span>
                                <span className="font-mono text-[10px] text-cream-dim/20">{RUNTIME_SIGNALS.length} entries</span>
                            </div>
                            <div className="space-y-3">
                                {RUNTIME_SIGNALS.map((log, i) => (
                                    <LogEntry key={i} log={log} index={i} />
                                ))}
                            </div>
                        </div>

                        {/* Floating memory buffer — right side */}
                        <div className="flex items-end justify-center lg:justify-end shrink-0">
                            <MemoryBuffer />
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    )
}
