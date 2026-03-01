'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// System log entries — personal pursuits as daemon processes
const SYSTEM_LOGS = [
    { level: 'PROCESS', message: 'NatyaSudha Dance Club — Active node', meta: 'Nov 2023 – Jun 2025', color: 'steel' as const },
    { level: 'EVENT', message: 'Multiple dance competitions — Wins logged', meta: 'Performance metrics nominal', color: 'amber' as const },
    { level: 'DAEMON', message: 'Sudoku solver — Low-priority background task', meta: 'PID: persistent', color: 'moss' as const },
    { level: 'THREAD', message: 'Chess engine — Target: 1000 ELO', meta: 'Worker in progress', color: 'steel' as const },
    { level: 'SIGNAL', message: 'Cafe hopping • Food • Beach • Friends', meta: 'I/O channels open', color: 'amber' as const },
    { level: 'OUTPUT', message: 'Painting — Visual artifacts generated', meta: 'See memory cluster below', color: 'moss' as const },
]

const PHOTOS = Array.from({ length: 11 }, (_, i) => ({
    id: `MEM-${String(i + 1).padStart(2, '0')}`,
    src: `/photos/photo-${String(i + 1).padStart(2, '0')}.jpeg`,
}))

// Fisher-Yates shuffle
function shuffle<T>(arr: T[]): T[] {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

// Bento grid size classes — cycle through varied sizes
const BENTO_SIZES = [
    'col-span-1 row-span-2',   // tall
    'col-span-1 row-span-1',   // standard
    'col-span-2 row-span-1',   // wide
    'col-span-1 row-span-1',   // standard
    'col-span-1 row-span-2',   // tall
    'col-span-1 row-span-1',   // standard
    'col-span-1 row-span-1',   // standard
    'col-span-2 row-span-1',   // wide
    'col-span-1 row-span-1',   // standard
    'col-span-1 row-span-2',   // tall
    'col-span-1 row-span-1',   // standard
]

function LogEntry({ log, index }: { log: typeof SYSTEM_LOGS[0]; index: number }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })

    const colorMap = {
        amber: 'text-amber',
        steel: 'text-steel',
        moss: 'text-moss',
    }

    return (
        <motion.div
            ref={ref}
            className="flex items-start gap-3 group"
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.08, duration: 0.4 }}
        >
            <span className="font-mono text-[10px] text-cream-dim/20 mt-0.5 shrink-0 w-16 text-right">
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

function MemoryNode({ photo, sizeClass, index, onExpand }: {
    photo: typeof PHOTOS[0]
    sizeClass: string
    index: number
    onExpand: (src: string) => void
}) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-30px' })
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            ref={ref}
            className={`${sizeClass} relative cursor-pointer group`}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 + index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => onExpand(photo.src)}
        >
            <div className={`relative w-full h-full overflow-hidden border transition-all duration-300 ${hovered ? 'border-steel/40' : 'border-cream-faint/10'
                }`} style={{ minHeight: '180px' }}>
                {/* Image */}
                <Image
                    src={photo.src}
                    alt={photo.id}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                />

                {/* Overlay */}
                <div className={`absolute inset-0 bg-charcoal/60 transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-30'
                    }`} />

                {/* Node label */}
                <div className={`absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-charcoal/80 to-transparent
          transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-60'}`}>
                    <div className="flex items-center gap-2">
                        <div className={`w-1 h-1 rounded-full ${hovered ? 'bg-steel' : 'bg-cream-dim/30'} transition-colors`} />
                        <span className="font-mono text-[9px] text-cream-dim/50 tracking-widest">{photo.id}</span>
                    </div>
                </div>

                {/* Corner brackets on hover */}
                <div className={`absolute top-0 left-0 w-3 h-3 border-t border-l transition-all duration-200 ${hovered ? 'border-steel/60' : 'border-transparent'
                    }`} />
                <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r transition-all duration-200 ${hovered ? 'border-steel/60' : 'border-transparent'
                    }`} />
                <div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l transition-all duration-200 ${hovered ? 'border-steel/60' : 'border-transparent'
                    }`} />
                <div className={`absolute bottom-0 right-0 w-3 h-3 border-b border-r transition-all duration-200 ${hovered ? 'border-steel/60' : 'border-transparent'
                    }`} />
            </div>
        </motion.div>
    )
}

function ExpandedView({ src, onClose }: { src: string; onClose: () => void }) {
    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [onClose])

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 backdrop-blur-sm cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
        >
            <motion.div
                className="relative max-w-4xl max-h-[85vh] w-[90vw] border border-steel/30"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={src}
                    alt="Memory node expanded"
                    width={1200}
                    height={800}
                    className="w-full h-auto max-h-[85vh] object-contain bg-charcoal-2"
                />
                {/* Close hint */}
                <div className="absolute top-3 right-3 font-mono text-[10px] text-cream-dim/30 tracking-wider">
                    ESC / CLICK TO CLOSE
                </div>
                {/* Border glow */}
                <div className="absolute inset-0 pointer-events-none border border-steel/20 shadow-[0_0_30px_rgba(74,127,165,0.1)]" />
            </motion.div>
        </motion.div>
    )
}

export default function HumanLayer() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-50px' })
    const [expandedSrc, setExpandedSrc] = useState<string | null>(null)
    const [shuffledPhotos, setShuffledPhotos] = useState(PHOTOS)

    // Shuffle on mount (client-side only)
    useEffect(() => {
        setShuffledPhotos(shuffle(PHOTOS))
    }, [])

    const handleClose = useCallback(() => setExpandedSrc(null), [])

    return (
        <section id="human" className="relative py-32 bg-charcoal overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-steel/8 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Header */}
                <motion.div
                    ref={ref}
                    className="mb-16"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <span className="font-mono text-xs text-steel/60 tracking-[0.4em]">MODULE // 05</span>
                        <div className="h-px w-16 bg-steel/20" />
                    </div>
                    <h2 className="font-display text-5xl md:text-7xl text-cream tracking-widest">
                        AUXILIARY<br /><span className="text-steel">RUNTIME</span>
                    </h2>
                    <p className="mt-6 font-mono text-sm text-cream-dim/50 max-w-xl leading-relaxed">
                        Non-deterministic modules — the human interface layer running beneath the system surface.
                    </p>
                </motion.div>

                {/* System Log Feed */}
                <motion.div
                    className="border border-cream-faint/10 bg-charcoal-2 p-6 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <div className="flex items-center gap-3 mb-5">
                        <span className="font-mono text-xs text-steel/50 border border-steel/20 px-2 py-0.5 tracking-widest">
                            LOG
                        </span>
                        <span className="font-mono text-sm text-steel/40 tracking-[0.2em]">
                            RUNTIME SIGNALS
                        </span>
                        <div className="flex-1" />
                        <span className="font-mono text-[10px] text-cream-dim/20 tracking-wider">
                            {SYSTEM_LOGS.length} ENTRIES
                        </span>
                    </div>

                    <div className="space-y-3">
                        {SYSTEM_LOGS.map((log, i) => (
                            <LogEntry key={i} log={log} index={i} />
                        ))}
                    </div>
                </motion.div>

                {/* Memory Cluster Header */}
                <motion.div
                    className="flex items-center gap-3 mb-6"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <span className="font-mono text-xs text-steel/50 border border-steel/20 px-2 py-0.5 tracking-widest">
                        MEM
                    </span>
                    <span className="font-mono text-sm text-steel/40 tracking-[0.2em]">
                        MEMORY CLUSTER
                    </span>
                    <div className="flex-1 h-px bg-cream-faint/10" />
                    <span className="font-mono text-[10px] text-cream-dim/20 tracking-wider">
                        {PHOTOS.length} NODES LOADED
                    </span>
                </motion.div>

                {/* Photo Bento Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] gap-2">
                    {shuffledPhotos.map((photo, i) => (
                        <MemoryNode
                            key={photo.id}
                            photo={photo}
                            sizeClass={BENTO_SIZES[i % BENTO_SIZES.length]}
                            index={i}
                            onExpand={setExpandedSrc}
                        />
                    ))}
                </div>
            </div>

            {/* Expanded overlay */}
            <AnimatePresence>
                {expandedSrc && <ExpandedView src={expandedSrc} onClose={handleClose} />}
            </AnimatePresence>
        </section>
    )
}
