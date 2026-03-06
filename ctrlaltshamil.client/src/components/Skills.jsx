// eslint-disable-next-line no-unused-vars
import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const skillCategories = [
    {
        category: "CORE_ENGINEERING",
        label: "Core Engineering",
        file: "FILE_01",
        items: [
            "Software Development Life Cycle (SDLC)", "Agile & Waterfall Methodologies",
            "Software Architecture & Design Patterns", "Data Structures & Algorithms",
            "Testing & Quality Engineering", "Systems Analysis and Design",
            "Operating Systems", "Computer Architecture", "Requirements Engineering"
        ]
    },
    {
        category: "PROGRAMMING_&_WEB",
        label: "Programming & Web",
        file: "FILE_02",
        items: [
            "ASP.NET 8", "C#", "C (Programming Language)", "JavaScript", "Python",
            "Java", "SQL", "HTML5", "CSS3", "Web Development", "Web Design",
            "React", "Bootstrap 5", "Tailwind CSS", "Entity Framework", "Wix",
            "RESTful API Design", "Mobile App Engineering", "Android"
        ]
    },
    {
        category: "CLOUD_&_INTELLIGENCE",
        label: "Cloud & Intelligence",
        file: "FILE_03",
        items: [
            "AWS (EC2, S3, RDS, Lambda, IAM, API Gateway)", "Cloud Application Development",
            "Relational Database Management", "Blockchain Development",
            "Artificial Intelligence", "Machine Learning", "Optimization & Deep Learning",
            "Networking Protocols", "Enterprise Systems"
        ]
    },
    {
        category: "SEO_&_DATA_ANALYSIS",
        label: "SEO & Data Analysis",
        file: "FILE_04",
        items: [
            "Technical SEO", "Search Engine Optimization (SEO)", "On-Page Optimization",
            "Google Search Console", "Google Analytics", "Ahrefs / Moz",
            "Schema Markup", "Core Web Vitals", "Keyword Research", "Content Strategy",
            "Data Analysis", "Python Data Analysis"
        ]
    },
    {
        category: "PROFESSIONAL_OPERATIONS",
        label: "Professional Ops",
        file: "FILE_05",
        items: [
            "Project Management", "Innovation Management", "New Product Development",
            "Information Gathering", "Documentation", "Technical Support",
            "Risk Assessment", "Problem Solving", "Creative Problem Solving",
            "Continuous Learning", "Time Management", "Teamwork", "Communication"
        ]
    },
    {
        category: "OFFICE_&_CREATIVE",
        label: "Office & Creative",
        file: "FILE_06",
        items: [
            "Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint",
            "Presentations", "Research", "Information Technology", "Photography",
            "Graphic Design", "Attention to Detail", "Critical Thinking",
            "International Shipping", "Supply Chain Management", "Industry Knowledge"
        ]
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
        opacity: 1, x: 0,
        transition: { delay: i * 0.03, duration: 0.3, ease: 'easeOut' }
    })
};

/* Shared overlay stack */
function BgLayers() {
    return (<>
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
    </>);
}

export default function Skills() {
    const [activeCategory, setActiveCategory] = useState(null);

    return (
        <section
            id="skills"
            className="relative py-24 lg:py-32 overflow-hidden"
            style={{
                background: `
                    radial-gradient(ellipse at 80% 0%,   rgba(46,110,101,0.18) 0%, transparent 55%),
                    radial-gradient(ellipse at 20% 100%, rgba(27,45,79,0.4)    0%, transparent 55%),
                    #070d0c
                `,
            }}
        >
            <BgLayers />

            {/* HUD labels */}
            <div className="absolute top-6 left-6 z-20 flex flex-col gap-1">
                <span className="font-display text-[9px] tracking-[0.35em] uppercase" style={{ color: 'var(--color-pipboy-green)' }}>■ SYS_INVENTORY v6.0</span>
                <span className="font-display text-[8px] tracking-[0.2em] opacity-50" style={{ color: 'var(--color-pipboy-green)' }}>VAULT: SKILLS DATABASE</span>
            </div>
            <div className="absolute top-6 right-6 z-20 text-right flex flex-col gap-1">
                <span className="font-display text-[9px] tracking-[0.2em] opacity-60" style={{ color: 'var(--color-vault-gold)' }}>{skillCategories.length} DIRECTORIES</span>
                <span className="font-display text-[8px] tracking-[0.15em] opacity-35" style={{ color: 'var(--color-vault-gold)' }}>ACCESS: GRANTED</span>
            </div>

            {/* Ghost watermark */}
            <div className="absolute top-0 leftt-0 pointer-events-none select-none z-[3] overflow-hidden">
                <span className="font-display font-black leading-none" style={{ fontSize: 'clamp(6rem, 18vw, 16rem)', opacity: 0.022, color: 'white', letterSpacing: '-0.05em' }}>SYS</span>
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
                            // SYSTEM_ACCESS: SKILLS_DIRECTORY
                        </span>
                        <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1.1 }}
                            className="inline-block w-[7px] h-[14px]" style={{ background: 'var(--color-vault-gold)' }} />
                    </div>
                    <h2 className="font-display font-black uppercase leading-none">
                        <span className="block text-[clamp(2.5rem,6vw,5.5rem)] text-white" style={{ textShadow: '0 0 40px rgba(46,110,101,0.45)' }}>TECHNICAL</span>
                        <span className="block text-[clamp(2.5rem,6vw,5.5rem)]" style={{ WebkitTextStroke: '2px var(--color-vault-gold)', color: 'transparent', textShadow: '0 0 50px rgba(232,170,58,0.25)', filter: 'drop-shadow(0 0 12px rgba(232,170,58,0.2))' }}>INVENTORY</span>
                    </h2>
                    <p className="font-sans text-sm mt-4 max-w-lg leading-relaxed" style={{ color: 'rgba(240,224,196,0.45)' }}>
                        Select a directory file to access the full skill manifest. Each record is classified and verified.
                    </p>
                    <div className="flex items-center gap-3 mt-6">
                        <span className="flex-1 max-w-xs h-[1px]" style={{ background: 'linear-gradient(90deg, rgba(232,170,58,0.5), transparent)' }} />
                        <span className="font-display text-[8px] tracking-[0.4em] uppercase" style={{ color: 'rgba(232,170,58,0.35)' }}>CLASSIFIED</span>
                    </div>
                </motion.div>

                {/* Category Grid */}
                <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                    {skillCategories.map((cat, idx) => (
                        <motion.button
                            key={idx}
                            variants={cardVariants}
                            onClick={() => setActiveCategory(cat)}
                            className="group text-left relative flex flex-col overflow-hidden transition-all duration-300 cursor-pointer"
                            style={{ border: '1px solid rgba(232,170,58,0.13)', background: 'rgba(7,13,12,0.75)' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,170,58,0.5)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(232,170,58,0.07), inset 0 0 24px rgba(46,110,101,0.06)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(232,170,58,0.13)'; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            {/* Top sweep */}
                            <div className="absolute top-0 left-0 w-0 h-[2px] transition-all duration-500 group-hover:w-full pointer-events-none" style={{ background: 'var(--color-vault-gold)' }} />
                            {/* Hover radial */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(46,110,101,0.08) 0%, transparent 70%)' }} />

                            {/* Header bar */}
                            <div className="flex items-center justify-between px-4 py-2 border-b flex-shrink-0"
                                style={{ borderColor: 'rgba(232,170,58,0.1)', background: 'rgba(46,110,101,0.06)' }}>
                                <span className="font-display text-[8px] tracking-[0.35em] uppercase" style={{ color: 'rgba(232,170,58,0.45)' }}>{cat.file}</span>
                                <span className="font-display text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(240,224,196,0.2)' }}>{cat.items.length} REC</span>
                            </div>

                            <div className="p-5 lg:p-6 flex flex-col flex-1 gap-3 relative z-10">
                                <div className="flex items-start justify-between gap-4">
                                    <h4 className="font-display font-black text-white text-sm uppercase tracking-wide transition-colors duration-300 group-hover:text-[--color-vault-gold] leading-tight">
                                        {cat.label}
                                    </h4>
                                    <div className="flex-shrink-0 w-8 h-8 border flex items-center justify-center transition-all duration-300 mt-[2px]"
                                        style={{ borderColor: 'rgba(255,255,255,0.12)' }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-vault-gold)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}>
                                        <span className="font-display text-[10px] transition-colors duration-300 group-hover:text-[--color-vault-gold]" style={{ color: 'rgba(255,255,255,0.3)' }}>▶</span>
                                    </div>
                                </div>

                                {/* Preview pills — first 3 items */}
                                <div className="flex flex-wrap gap-[4px]">
                                    {cat.items.slice(0, 3).map((item) => (
                                        <span key={item} className="font-display text-[8px] uppercase tracking-wider px-2 py-[2px]"
                                            style={{ color: 'rgba(240,224,196,0.28)', border: '1px solid rgba(255,255,255,0.07)' }}>
                                            {item}
                                        </span>
                                    ))}
                                    {cat.items.length > 3 && (
                                        <span className="font-display text-[8px] uppercase tracking-wider px-2 py-[2px]"
                                            style={{ color: 'rgba(232,170,58,0.4)', border: '1px solid rgba(232,170,58,0.15)' }}>
                                            +{cat.items.length - 3}
                                        </span>
                                    )}
                                </div>

                                {/* Progress bar */}
                                <div className="mt-auto pt-2">
                                    <div className="h-[2px] w-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                                        <div className="h-full transition-all duration-500 group-hover:opacity-100"
                                            style={{ width: `${(cat.items.length / 20) * 100}%`, background: 'var(--color-vault-gold)', opacity: 0.4 }} />
                                    </div>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Coursework footnote */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-10 pt-5 border-t flex items-center justify-between flex-wrap gap-4"
                    style={{ borderColor: 'rgba(232,170,58,0.1)' }}>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {['BSc (Hons) Software Engineering', 'Asia Pacific University', 'Object Oriented Dev', 'Deep Learning'].map((tag) => (
                            <span key={tag} className="font-display text-[8px] uppercase tracking-[0.2em]" style={{ color: 'rgba(46,110,101,0.5)' }}>// {tag}</span>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-display text-[8px] tracking-[0.3em] uppercase" style={{ color: 'rgba(232,170,58,0.25)' }}>SYS: ALL RECORDS LOADED</span>
                        <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.9, ease: 'steps(1)' }}
                            className="font-display text-[9px]" style={{ color: 'var(--color-pipboy-green)' }}>▌</motion.span>
                    </div>
                </motion.div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {activeCategory && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-12">
                        <div className="absolute inset-0 backdrop-blur-sm" style={{ background: 'rgba(7,13,12,0.93)' }} onClick={() => setActiveCategory(null)} />
                        <motion.div initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 16 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="relative w-full max-w-3xl"
                            style={{ border: '1px solid var(--color-vault-gold)', background: '#070d0c', boxShadow: '0 0 60px rgba(232,170,58,0.15)' }}>
                            {/* Modal header */}
                            <div className="px-5 py-3 flex items-center justify-between border-b" style={{ borderColor: 'rgba(232,170,58,0.3)', background: 'rgba(46,110,101,0.07)' }}>
                                <div className="flex items-center gap-4">
                                    <div className="flex gap-[6px]">
                                        <span className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
                                        <span className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
                                        <span className="w-2 h-2 rounded-full" style={{ background: 'rgba(232,170,58,0.6)' }} />
                                    </div>
                                    <span className="font-display text-[10px] uppercase tracking-[0.3em]" style={{ color: 'var(--color-vault-gold)' }}>
                                        VT-Terminal — {activeCategory.category}
                                    </span>
                                </div>
                                <button onClick={() => setActiveCategory(null)}
                                    className="w-7 h-7 flex items-center justify-center transition-all duration-200"
                                    style={{ border: '1px solid rgba(255,255,255,0.15)' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-vault-gold)'; e.currentTarget.style.background = 'rgba(232,170,58,0.08)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'transparent'; }}
                                    aria-label="Close">
                                    <span className="font-display text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>✕</span>
                                </button>
                            </div>

                            <div className="p-6 lg:p-8 max-h-[70vh] overflow-y-auto">
                                {/* Access log */}
                                <div className="mb-6 pl-4 py-2" style={{ borderLeft: '2px solid var(--color-vault-gold)' }}>
                                    <p className="font-display text-xs uppercase mb-1" style={{ color: 'var(--color-vault-gold)' }}>
                                        &gt; Accessing local_database/skills/{activeCategory.category.toLowerCase()}
                                    </p>
                                    <p className="font-display text-[10px] uppercase" style={{ color: 'rgba(240,224,196,0.35)' }}>
                                        &gt; Found {activeCategory.items.length} records... displaying all
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {activeCategory.items.map((item, i) => (
                                        <motion.div key={i} custom={i} variants={itemVariants} initial="hidden" animate="visible"
                                            className="group relative px-4 py-3 overflow-hidden transition-all duration-200"
                                            style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(46,110,101,0.03)' }}
                                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,170,58,0.4)'; e.currentTarget.style.background = 'rgba(232,170,58,0.04)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(46,110,101,0.03)'; }}>
                                            <div className="absolute top-0 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-300" style={{ background: 'var(--color-vault-gold)' }} />
                                            <div className="flex items-center justify-between gap-3">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <span className="font-display text-[9px] flex-shrink-0 transition-opacity opacity-40 group-hover:opacity-100" style={{ color: 'var(--color-vault-gold)' }}>▶</span>
                                                    <span className="font-display text-[10px] uppercase tracking-wider transition-colors truncate" style={{ color: 'rgba(240,224,196,0.55)' }}
                                                        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,224,196,0.55)'}>
                                                        {item}
                                                    </span>
                                                </div>
                                                <span className="font-display text-[9px] flex-shrink-0 group-hover:opacity-60 transition-opacity opacity-15" style={{ color: 'var(--color-vault-gold)' }}>
                                                    {String(i + 1).padStart(2, '0')}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-5 border-t flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                                    <span className="font-display text-[9px] uppercase tracking-widest" style={{ color: 'rgba(46,110,101,0.5)' }}>Authenticated_User: MONDOKA_AS</span>
                                    <button onClick={() => setActiveCategory(null)}
                                        className="flex items-center gap-3 px-5 py-2 font-display text-[10px] uppercase tracking-widest transition-all duration-200"
                                        style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(240,224,196,0.4)' }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-vault-gold)'; e.currentTarget.style.color = 'var(--color-vault-gold)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(240,224,196,0.4)'; }}>
                                        <span className="text-[8px]">✕</span>
                                        Return_To_Directory
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}