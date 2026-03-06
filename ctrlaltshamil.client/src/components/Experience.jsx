// eslint-disable-next-line no-unused-vars
import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const careerHistory = [
    {
        id: "02",
        role: "Web Developer & SEO Specialist",
        company: "BNOP Media",
        period: "Jan 2025 — Present",
        location: "50 Independence Ave, Lusaka, Zambia",
        status: "ACTIVE",
        summary: "Leading digital transformation and organic growth strategies.",
        description: "Spearheading full-stack web development and technical SEO initiatives. Focused on building high-performance architectures and driving measurable organic traffic growth through data-driven strategies.",
        skills: [
            "Web Design", "Search Engine Optimization (SEO)", "Time Management",
            "Web Development", "Wix", "Creative Problem Solving",
            "Continuous Learning", "Photography", "Graphic Design", "Transportation"
        ]
    },
    {
        id: "01",
        role: "Internship Trainee",
        company: "Integrated Carrier Express Sdn Bhd",
        period: "Apr 2023 — Aug 2023",
        location: "Kuala Lumpur, Malaysia",
        status: "ARCHIVED",
        summary: "Cross-border e-commerce and logistics systems optimisation.",
        description: "Integrated Carrier Express (ICE) is a premier logistics provider focused on postal services and cross-border e-commerce solutions. Collaborated with POS Malaysia and Chinese logistics partners to manage international express delivery and air cargo operations. Maintained a robust infrastructure across major Chinese cities and global markets to ensure streamlined shipment management and punctual delivery.",
        skills: [
            "Problem Solving", "Documentation", "Industry Knowledge", "Technical Support",
            "International Shipping", "Customer Service", "Attention to Detail",
            "Supply Chain Management", "Research", "Communication", "Risk Assessment",
            "Time Management", "Critical Thinking", "Data Analysis", "Teamwork",
            "Web Development", "Continuous Learning"
        ]
    }
];

const statusConfig = {
    'ACTIVE': { color: '#4ade80', dot: true },
    'ARCHIVED': { color: 'rgba(255,255,255,0.3)', dot: false },
};

const skillVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.03, duration: 0.25, ease: 'easeOut' } })
};

export default function Experience() {
    const [selectedExp, setSelectedExp] = useState(null);

    return (
        <section
            id="experience"
            className="relative py-24 lg:py-32 overflow-hidden"
            style={{
                background: `
                    radial-gradient(ellipse at 50% 20%, rgba(27,45,79,0.45)   0%, transparent 60%),
                    radial-gradient(ellipse at 90% 90%, rgba(46,110,101,0.15) 0%, transparent 50%),
                    #070d0c
                `,
            }}
        >
            {/* Overlays */}
            <div className="absolute inset-0 pointer-events-none z-10"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.26) 2px, rgba(0,0,0,0.26) 4px)', backgroundSize: '100% 4px', mixBlendMode: 'multiply' }} />
            <div className="absolute inset-0 pointer-events-none z-10"
                style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(0,0,0,0.75) 100%)' }} />
            <div className="absolute inset-0 pointer-events-none z-[5] opacity-[0.035]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '120px 120px' }} />
            <div className="absolute inset-0 pointer-events-none z-[4] opacity-[0.022]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='30,2 58,17 58,47 30,62 2,47 2,17' stroke='%23E8AA3A' stroke-width='1' fill='none'/%3E%3C/svg%3E")`, backgroundSize: '60px 52px' }} />
            <div className="absolute top-0 left-0 right-0 h-[1px] z-20"
                style={{ background: 'linear-gradient(90deg, transparent, var(--color-vault-gold) 30%, var(--color-pipboy-green) 70%, transparent)' }} />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] z-20"
                style={{ background: 'linear-gradient(90deg, transparent, var(--color-vault-gold) 30%, var(--color-pipboy-green) 70%, transparent)' }} />

            {/* HUD labels */}
            <div className="absolute top-6 left-6 z-20 flex flex-col gap-1">
                <span className="font-display text-[9px] tracking-[0.35em] uppercase" style={{ color: 'var(--color-pipboy-green)' }}>■ SERVICE_RECORD v1.0</span>
                <span className="font-display text-[8px] tracking-[0.2em] opacity-50" style={{ color: 'var(--color-pipboy-green)' }}>SECTOR: CAREER TIMELINE</span>
            </div>
            <div className="absolute top-6 right-6 z-20 text-right flex flex-col gap-1">
                <span className="font-display text-[9px] tracking-[0.2em] opacity-60" style={{ color: 'var(--color-vault-gold)' }}>{careerHistory.length} DEPLOYMENTS</span>
                <span className="font-display text-[8px] tracking-[0.15em] opacity-35" style={{ color: 'var(--color-vault-gold)' }}>FILE: CLASSIFIED</span>
            </div>

            {/* Ghost watermark */}
            <div className="absolute top-0 right-0 pointer-events-none select-none z-[3] overflow-hidden">
                <span className="font-display font-black leading-none" style={{ fontSize: 'clamp(6rem, 18vw, 16rem)', opacity: 0.022, color: 'white', letterSpacing: '-0.05em' }}>EXP</span>
            </div>

            <div className="relative z-20 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">

                {/* Section Header */}
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-14 lg:mb-20">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex flex-col gap-[3px]">
                            <span className="block w-8 h-[1px]" style={{ background: 'var(--color-vault-gold)' }} />
                            <span className="block w-5 h-[1px]" style={{ background: 'var(--color-vault-gold)', opacity: 0.5 }} />
                        </div>
                        <span className="font-display text-[10px] tracking-[0.5em] uppercase" style={{ color: 'var(--color-vault-gold)' }}>
                            // SERVICE_RECORD: CAREER_TIMELINE
                        </span>
                        <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1.1 }}
                            className="inline-block w-[7px] h-[14px]" style={{ background: 'var(--color-vault-gold)' }} />
                    </div>
                    <h2 className="font-display font-black uppercase leading-none">
                        <span className="block text-[clamp(2.5rem,6vw,5.5rem)] text-white" style={{ textShadow: '0 0 40px rgba(46,110,101,0.45)' }}>MISSION</span>
                        <span className="block text-[clamp(2.5rem,6vw,5.5rem)]" style={{ WebkitTextStroke: '2px var(--color-vault-gold)', color: 'transparent', textShadow: '0 0 50px rgba(232,170,58,0.25)', filter: 'drop-shadow(0 0 12px rgba(232,170,58,0.2))' }}>HISTORY</span>
                    </h2>
                    <p className="font-sans text-sm mt-4 max-w-lg leading-relaxed" style={{ color: 'rgba(240,224,196,0.45)' }}>
                        Classified service records from active and archived field deployments. Select an entry to access the full debrief.
                    </p>
                    <div className="flex items-center gap-3 mt-6">
                        <span className="flex-1 max-w-xs h-[1px]" style={{ background: 'linear-gradient(90deg, rgba(232,170,58,0.5), transparent)' }} />
                        <span className="font-display text-[8px] tracking-[0.4em] uppercase" style={{ color: 'rgba(232,170,58,0.35)' }}>CLASSIFIED</span>
                    </div>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical spine */}
                    <div className="absolute left-5 lg:left-1/2 top-0 bottom-0 w-[1px] lg:-translate-x-px"
                        style={{ background: 'linear-gradient(to bottom, transparent, rgba(232,170,58,0.2) 20%, rgba(232,170,58,0.2) 80%, transparent)' }} />

                    <div className="space-y-10 lg:space-y-16">
                        {careerHistory.map((exp, idx) => {
                            const sc = statusConfig[exp.status] || statusConfig['ARCHIVED'];
                            return (
                                <motion.div
                                    key={exp.id}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: idx * 0.15, ease: 'easeOut' }}
                                    className={`relative flex items-start gap-8 lg:gap-0 ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                                >
                                    {/* Timeline node */}
                                    <div className="absolute left-5 lg:left-1/2 lg:-translate-x-1/2 flex-shrink-0 z-10">
                                        <div className="w-10 h-10 flex items-center justify-center transition-all duration-300"
                                            style={{ border: '2px solid rgba(232,170,58,0.3)', background: '#070d0c' }}>
                                            <span className="font-display font-black text-white text-xs">{exp.id}</span>
                                        </div>
                                        {/* Pulsing ring for active */}
                                        {exp.status === 'ACTIVE' && (
                                            <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                                                transition={{ repeat: Infinity, duration: 2.4 }}
                                                className="absolute inset-0 rounded-sm pointer-events-none"
                                                style={{ border: '1px solid var(--color-vault-gold)' }} />
                                        )}
                                    </div>

                                    {/* Card */}
                                    <div className={`ml-16 lg:ml-0 w-full lg:w-[45%] ${idx % 2 === 0 ? 'lg:mr-auto lg:pr-16' : 'lg:ml-auto lg:pl-16'}`}>
                                        <div
                                            onClick={() => setSelectedExp(exp)}
                                            className="group relative overflow-hidden cursor-pointer transition-all duration-300"
                                            style={{ border: '1px solid rgba(232,170,58,0.13)', background: 'rgba(7,13,12,0.75)' }}
                                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,170,58,0.5)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(232,170,58,0.07), inset 0 0 24px rgba(46,110,101,0.06)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(232,170,58,0.13)'; e.currentTarget.style.boxShadow = 'none'; }}
                                        >
                                            {/* Top sweep */}
                                            <div className="absolute top-0 left-0 w-0 h-[2px] transition-all duration-500 group-hover:w-full pointer-events-none" style={{ background: 'var(--color-vault-gold)' }} />
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                                                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(46,110,101,0.07) 0%, transparent 70%)' }} />

                                            {/* Header bar */}
                                            <div className="flex items-center justify-between px-5 py-2 border-b"
                                                style={{ borderColor: 'rgba(232,170,58,0.1)', background: 'rgba(46,110,101,0.06)' }}>
                                                <span className="font-display text-[9px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-vault-gold)' }}>
                                                    {exp.period}
                                                </span>
                                                <div className="flex items-center gap-[5px]">
                                                    {sc.dot && (
                                                        <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}
                                                            className="w-[5px] h-[5px] rounded-full" style={{ background: sc.color, boxShadow: `0 0 5px ${sc.color}` }} />
                                                    )}
                                                    <span className="font-display text-[8px] tracking-[0.2em] uppercase" style={{ color: sc.color }}>{exp.status}</span>
                                                </div>
                                            </div>

                                            <div className="p-5 lg:p-6 relative z-10">
                                                <h4 className="font-display font-black text-white uppercase leading-tight mb-1 transition-colors duration-300 group-hover:text-[--color-vault-gold]"
                                                    style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)' }}>
                                                    {exp.role}
                                                </h4>
                                                <p className="font-display text-[10px] uppercase tracking-wider mb-4" style={{ color: 'rgba(240,224,196,0.3)' }}>
                                                    {exp.company} · {exp.location}
                                                </p>

                                                {/* Summary */}
                                                <div className="px-4 py-2 mb-5" style={{ borderLeft: '2px solid rgba(232,170,58,0.35)', background: 'rgba(232,170,58,0.03)' }}>
                                                    <p className="font-sans text-xs italic leading-relaxed" style={{ color: 'rgba(240,224,196,0.55)' }}>"{exp.summary}"</p>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <span className="font-display text-[9px] uppercase tracking-widest transition-colors duration-300" style={{ color: 'rgba(232,170,58,0.3)' }}
                                                        onMouseEnter={e => e.currentTarget.style.color = 'rgba(232,170,58,0.7)'}
                                                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(232,170,58,0.3)'}>
                                                        ▶ Access_Data_Log
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom bar */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-14 pt-5 border-t flex items-center justify-between" style={{ borderColor: 'rgba(232,170,58,0.1)' }}>
                    <span className="font-display text-[8px] tracking-[0.4em] uppercase" style={{ color: 'rgba(46,110,101,0.5)' }}>
                        SYS: {careerHistory.length} RECORDS FOUND
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="font-display text-[8px] tracking-[0.3em] uppercase" style={{ color: 'rgba(232,170,58,0.25)' }}>VAULT-TEC PERSONNEL FILE</span>
                        <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.9, ease: 'steps(1)' }}
                            className="font-display text-[9px]" style={{ color: 'var(--color-pipboy-green)' }}>▌</motion.span>
                    </div>
                </motion.div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedExp && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-10">
                        <div className="absolute inset-0 backdrop-blur-sm" style={{ background: 'rgba(7,13,12,0.93)' }} onClick={() => setSelectedExp(null)} />
                        <motion.div initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 16 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="relative w-full max-w-4xl"
                            style={{ border: '1px solid var(--color-vault-gold)', background: '#070d0c', boxShadow: '0 0 60px rgba(232,170,58,0.15)' }}>

                            {/* Modal header */}
                            <div className="px-5 py-3 flex items-center justify-between border-b" style={{ borderColor: 'rgba(232,170,58,0.3)', background: 'rgba(46,110,101,0.07)' }}>
                                <div className="flex items-center gap-4">
                                    <div className="flex gap-[6px]">
                                        <span className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
                                        <span className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
                                        <span className="w-2 h-2 rounded-full" style={{ background: 'rgba(232,170,58,0.6)' }} />
                                    </div>
                                    <div>
                                        <p className="font-display font-black text-white text-sm uppercase tracking-wide leading-tight">{selectedExp.role}</p>
                                        <p className="font-display text-[10px] uppercase tracking-wider" style={{ color: 'rgba(240,224,196,0.5)' }}>
                                            {selectedExp.company} // {selectedExp.location}
                                        </p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedExp(null)}
                                    className="w-7 h-7 flex items-center justify-center transition-all duration-200 flex-shrink-0"
                                    style={{ border: '1px solid rgba(255,255,255,0.15)' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-vault-gold)'; e.currentTarget.style.background = 'rgba(232,170,58,0.08)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'transparent'; }}
                                    aria-label="Close">
                                    <span className="font-display text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>✕</span>
                                </button>
                            </div>

                            <div className="p-6 lg:p-8 max-h-[70vh] overflow-y-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Description */}
                                <div className="lg:col-span-2 flex flex-col gap-5">
                                    <div className="flex items-center gap-3">
                                        <span className="w-1 h-4" style={{ background: 'var(--color-vault-gold)' }} />
                                        <h3 className="font-display text-[10px] font-bold uppercase tracking-[0.4em]" style={{ color: 'var(--color-vault-gold)' }}>Mission_Debrief</h3>
                                    </div>
                                    <div className="pl-4 py-1" style={{ borderLeft: '1px solid rgba(232,170,58,0.2)' }}>
                                        <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(240,224,196,0.7)' }}>{selectedExp.description}</p>
                                    </div>
                                    <div className="flex items-center gap-4 pt-2">
                                        <span className="font-display text-[10px] uppercase tracking-widest" style={{ color: 'var(--color-vault-gold)' }}>{selectedExp.period}</span>
                                        <div className="flex items-center gap-[5px]">
                                            {statusConfig[selectedExp.status]?.dot && (
                                                <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}
                                                    className="w-[5px] h-[5px] rounded-full" style={{ background: statusConfig[selectedExp.status].color }} />
                                            )}
                                            <span className="font-display text-[9px] tracking-[0.2em] uppercase" style={{ color: statusConfig[selectedExp.status]?.color }}>{selectedExp.status}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Skills */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        <span className="w-1 h-4" style={{ background: 'var(--color-vault-gold)' }} />
                                        <h3 className="font-display text-[10px] font-bold uppercase tracking-[0.4em]" style={{ color: 'var(--color-vault-gold)' }}>Acquired_Skills</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedExp.skills.map((skill, i) => (
                                            <motion.span key={i} custom={i} variants={skillVariants} initial="hidden" animate="visible"
                                                className="font-display text-[9px] uppercase tracking-wider px-2 py-[4px] transition-all cursor-default"
                                                style={{ color: 'rgba(240,224,196,0.55)', border: '1px solid rgba(255,255,255,0.12)' }}
                                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,170,58,0.4)'; e.currentTarget.style.color = '#fff'; }}
                                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(240,224,196,0.55)'; }}>
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 lg:px-8 py-4 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderColor: 'rgba(232,170,58,0.15)' }}>
                                <span className="font-display text-[9px] uppercase tracking-[0.3em]" style={{ color: 'rgba(46,110,101,0.5)' }}>
                                    Status: {selectedExp.status === 'ACTIVE' ? 'Currently_Deployed' : 'Archived_Record'}
                                </span>
                                <button onClick={() => setSelectedExp(null)}
                                    className="flex items-center gap-3 px-5 py-2 font-display text-[10px] uppercase tracking-widest transition-all duration-200"
                                    style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(240,224,196,0.4)' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-vault-gold)'; e.currentTarget.style.color = 'var(--color-vault-gold)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(240,224,196,0.4)'; }}>
                                    <span className="text-[8px]">✕</span>
                                    Close_File
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}