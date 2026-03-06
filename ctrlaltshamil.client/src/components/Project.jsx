// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const projects = [
    {
        id: '01',
        title: 'BNOP Media',
        subtitle: 'Website Mock-up',
        type: 'ASP.NET 8 MVC',
        tag: 'WEB_APP',
        status: 'DEPLOYED',
        impact: 'Sub-2s load time · 95+ Lighthouse',
        desc: 'Architected a full-stack production site on ASP.NET 8 MVC with automated CI/CD, Entity Framework Core, and a fully responsive Razor view hierarchy.',
        stack: ['ASP.NET 8', 'MVC', 'EF Core', 'SQL Server', 'C#'],
        github: '#',
        live: '#',
    },
    {
        id: '02',
        title: 'SEO Canonical Auditor',
        subtitle: 'Audit Tool',
        type: 'ASP.NET 8 MVC',
        tag: 'TOOL',
        status: 'ACTIVE',
        impact: 'Detects duplicate content & tag conflicts',
        desc: 'An automated canonical tag auditing system built with ASP.NET 8. Crawls pages, detects canonical conflicts, and outputs structured audit reports to improve search engine indexing.',
        stack: ['ASP.NET 8', 'C#', 'HTML Agility Pack', 'SEO Logic', 'Automation'],
        github: '#',
        live: '#',
    },
    {
        id: '03',
        title: 'Classic Zambia Safaris',
        subtitle: 'SEO Growth Campaign',
        type: 'Technical SEO',
        tag: 'SEO',
        status: 'LIVE',
        impact: '+217% Organic Traffic · #1 Rankings US/UK/AU',
        desc: 'End-to-end SEO growth strategy for a Zambian safari operator. Included technical audits, keyword architecture, on-page optimisation, and structured data implementation to drive organic traffic.',
        stack: ['Technical SEO', 'Schema Markup', 'Core Web Vitals', 'GSC', 'Analytics'],
        github: null,
        live: '#',
    },
    {
        id: '04',
        title: 'Ctrl Alt Shamil',
        subtitle: 'Portfolio',
        type: 'React + ASP.NET Core',
        tag: 'FULL_STACK',
        status: 'IN PROGRESS',
        impact: 'Vault-Tec design system · Full-stack SPA',
        desc: 'This very portfolio — a full-stack application powered by React 19 on the frontend and ASP.NET Core on the backend. Themed around the Fallout universe with a custom design system.',
        stack: ['React 19', 'ASP.NET Core', 'Vite', 'Tailwind v4', 'Framer Motion'],
        github: '#',
        live: '#',
    },
];

const statusConfig = {
    'DEPLOYED': { color: '#4ade80', label: 'DEPLOYED', dot: true },
    'ACTIVE': { color: '#E8AA3A', label: 'ACTIVE', dot: true },
    'LIVE': { color: '#4ade80', label: 'LIVE', dot: true },
    'IN PROGRESS': { color: 'rgba(255,255,255,0.3)', label: 'IN PROGRESS', dot: false },
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } }
};

const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
};

export default function Projects() {
    const navigate = useNavigate();

    const handleCardClick = (project) => {
        navigate('/projects-archive', { state: { openProjectId: project.id } });
    };
    return (
        <section
            id="projects"
            className="relative py-24 lg:py-32 overflow-hidden"
            style={{
                background: `
                    radial-gradient(ellipse at 20% 0%,   rgba(27,45,79,0.45)   0%, transparent 55%),
                    radial-gradient(ellipse at 80% 100%, rgba(46,110,101,0.18) 0%, transparent 55%),
                    #070d0c
                `,
            }}
        >
            {/* ── Scan lines ── */}
            <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.26) 2px, rgba(0,0,0,0.26) 4px)',
                    backgroundSize: '100% 4px',
                    mixBlendMode: 'multiply',
                }}
            />

            {/* ── CRT vignette ── */}
            <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(0,0,0,0.75) 100%)' }}
            />

            {/* ── Noise grain ── */}
            <div
                className="absolute inset-0 pointer-events-none z-[5] opacity-[0.035]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '120px 120px',
                }}
            />

            {/* ── Hex grid ── */}
            <div
                className="absolute inset-0 pointer-events-none z-[4] opacity-[0.022]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='30,2 58,17 58,47 30,62 2,47 2,17' stroke='%23E8AA3A' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
                    backgroundSize: '60px 52px',
                }}
            />

            {/* ── Top / bottom ruled lines ── */}
            <div className="absolute top-0 left-0 right-0 h-[1px] z-20"
                style={{ background: 'linear-gradient(90deg, transparent, var(--color-vault-gold) 30%, var(--color-pipboy-green) 70%, transparent)' }} />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] z-20"
                style={{ background: 'linear-gradient(90deg, transparent, var(--color-vault-gold) 30%, var(--color-pipboy-green) 70%, transparent)' }} />

            {/* ── HUD labels ── */}
            <div className="absolute top-6 left-6 z-20 flex flex-col gap-1">
                <span className="font-display text-[9px] tracking-[0.35em] uppercase" style={{ color: 'var(--color-pipboy-green)' }}>
                    ■ QUEST_LOG v2.0
                </span>
                <span className="font-display text-[8px] tracking-[0.2em] opacity-50" style={{ color: 'var(--color-pipboy-green)' }}>
                    ARCHIVE: COMMONWEALTH
                </span>
            </div>
            <div className="absolute top-6 right-6 z-20 text-right flex flex-col gap-1">
                <span className="font-display text-[9px] tracking-[0.2em] opacity-60" style={{ color: 'var(--color-vault-gold)' }}>
                    {projects.length} OPS LOGGED
                </span>
                <span className="font-display text-[8px] tracking-[0.15em] opacity-35" style={{ color: 'var(--color-vault-gold)' }}>
                    STATUS: ALL ACTIVE
                </span>
            </div>

            {/* ── Ghost watermark ── */}
            <div className="absolute top-0 right-0 pointer-events-none select-none z-[3]">
                <span
                    className="font-display font-black leading-none"
                    style={{ fontSize: 'clamp(6rem, 20vw, 18rem)', opacity: 0.022, color: 'white', letterSpacing: '-0.05em' }}
                >
                    PROJ
                </span>
            </div>

            {/* ── CONTENT ── */}
            <div className="relative z-20 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-14 lg:mb-20"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex flex-col gap-[3px]">
                            <span className="block w-8 h-[1px]" style={{ background: 'var(--color-vault-gold)' }} />
                            <span className="block w-5 h-[1px]" style={{ background: 'var(--color-vault-gold)', opacity: 0.5 }} />
                        </div>
                        <span className="font-display text-[10px] tracking-[0.5em] uppercase" style={{ color: 'var(--color-vault-gold)' }}>
                            // COMPLETED_QUESTS
                        </span>
                        <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ repeat: Infinity, duration: 1.1 }}
                            className="inline-block w-[7px] h-[14px]"
                            style={{ background: 'var(--color-vault-gold)' }}
                        />
                    </div>

                    <h2 className="font-display font-black uppercase leading-none">
                        <span
                            className="block text-[clamp(2.5rem,6vw,5.5rem)] text-white"
                            style={{ textShadow: '0 0 40px rgba(46,110,101,0.45)' }}
                        >
                            FIELD
                        </span>
                        <span
                            className="block text-[clamp(2.5rem,6vw,5.5rem)]"
                            style={{
                                WebkitTextStroke: '2px var(--color-vault-gold)',
                                color: 'transparent',
                                textShadow: '0 0 50px rgba(232,170,58,0.25)',
                                filter: 'drop-shadow(0 0 12px rgba(232,170,58,0.2))',
                            }}
                        >
                            OPERATIONS
                        </span>
                    </h2>

                    <div className="flex items-center gap-4 mt-4">
                        <p className="font-sans text-sm leading-relaxed max-w-lg" style={{ color: 'rgba(240,224,196,0.45)' }}>
                            Documented engagements from the wasteland. Each entry classified by technology, threat level, and current deployment status.
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3 mt-6">
                        <span className="flex-1 max-w-xs h-[1px]"
                            style={{ background: 'linear-gradient(90deg, rgba(232,170,58,0.5), transparent)' }} />
                        <span className="font-display text-[8px] tracking-[0.4em] uppercase" style={{ color: 'rgba(232,170,58,0.35)' }}>
                            CLASSIFIED
                        </span>
                    </div>
                </motion.div>

                {/* ── 4-column Cards Grid ── */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5"
                >
                    {projects.map((project) => {
                        const sc = statusConfig[project.status] || statusConfig['IN PROGRESS'];
                        return (
                            <motion.div
                                key={project.id}
                                variants={cardVariants}
                                className="group relative flex flex-col overflow-hidden transition-all duration-300 cursor-pointer"
                                style={{
                                    border: '1px solid rgba(232,170,58,0.13)',
                                    background: 'rgba(7,13,12,0.75)',
                                    backdropFilter: 'blur(6px)',
                                }}
                                onClick={() => handleCardClick(project)}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = 'rgba(232,170,58,0.5)';
                                    e.currentTarget.style.boxShadow = '0 0 30px rgba(232,170,58,0.07), inset 0 0 24px rgba(46,110,101,0.06)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = 'rgba(232,170,58,0.13)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                {/* Top sweep */}
                                <div
                                    className="absolute top-0 left-0 w-0 h-[2px] transition-all duration-500 group-hover:w-full pointer-events-none"
                                    style={{ background: 'var(--color-vault-gold)' }}
                                />
                                {/* Hover bg tint */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                                    style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(46,110,101,0.08) 0%, transparent 70%)' }}
                                />

                                {/* Corner brackets */}
                                <span className="absolute top-0 left-0 w-3 h-3 border-t border-l pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ borderColor: 'var(--color-vault-gold)' }} />
                                <span className="absolute top-0 right-0 w-3 h-3 border-t border-r pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ borderColor: 'var(--color-vault-gold)' }} />
                                <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ borderColor: 'var(--color-vault-gold)' }} />
                                <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ borderColor: 'var(--color-vault-gold)' }} />

                                {/* ── Card header bar ── */}
                                <div
                                    className="flex items-center justify-between px-4 py-2 border-b flex-shrink-0"
                                    style={{ borderColor: 'rgba(232,170,58,0.12)', background: 'rgba(46,110,101,0.07)' }}
                                >
                                    <span className="font-display text-[8px] tracking-[0.35em] uppercase" style={{ color: 'rgba(232,170,58,0.5)' }}>
                                        OP_{project.id}
                                    </span>
                                    {/* Status badge */}
                                    <div className="flex items-center gap-[5px]">
                                        {sc.dot && (
                                            <motion.span
                                                animate={{ opacity: [1, 0.2, 1] }}
                                                transition={{ repeat: Infinity, duration: 1.8 }}
                                                className="w-[5px] h-[5px] rounded-full flex-shrink-0"
                                                style={{ background: sc.color, boxShadow: `0 0 5px ${sc.color}` }}
                                            />
                                        )}
                                        <span
                                            className="font-display text-[8px] tracking-[0.2em] uppercase"
                                            style={{ color: sc.color }}
                                        >
                                            {sc.label}
                                        </span>
                                    </div>
                                </div>

                                {/* ── Card body ── */}
                                <div className="relative z-10 p-4 flex flex-col flex-1 gap-3">

                                    {/* Title block */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-[2px]">
                                            <span
                                                className="font-display text-[9px] uppercase tracking-[0.2em] px-2 py-[2px] border flex-shrink-0"
                                                style={{ color: 'var(--color-vault-gold)', borderColor: 'rgba(232,170,58,0.3)', background: 'rgba(232,170,58,0.06)' }}
                                            >
                                                {project.tag}
                                            </span>
                                        </div>
                                        <h3
                                            className="font-display font-black text-white uppercase leading-tight mt-2 transition-colors duration-300 group-hover:text-[--color-vault-gold]"
                                            style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1rem)' }}
                                        >
                                            {project.title}
                                        </h3>
                                        <p className="font-display text-[9px] uppercase tracking-wider mt-[2px]" style={{ color: 'rgba(240,224,196,0.3)' }}>
                                            {project.subtitle} · {project.type}
                                        </p>
                                    </div>

                                    {/* Access file prompt */}
                                    <div className="px-3 py-2 flex items-center gap-2 flex-1" style={{ borderLeft: '2px solid rgba(46,110,101,0.5)', background: 'rgba(46,110,101,0.04)' }}>
                                        <motion.span
                                            animate={{ opacity: [1, 0, 1] }}
                                            transition={{ repeat: Infinity, duration: 1.1 }}
                                            className="font-display text-[8px]"
                                            style={{ color: 'var(--color-pipboy-green)' }}
                                        >▌</motion.span>
                                        <span className="font-display text-[8px] uppercase tracking-[0.3em]" style={{ color: 'rgba(46,110,101,0.7)' }}>
                                            CLICK TO ACCESS FILE
                                        </span>
                                    </div>

                                    {/* Impact */}
                                    <div
                                        className="px-3 py-2"
                                        style={{ borderLeft: '2px solid var(--color-vault-gold)', background: 'rgba(232,170,58,0.04)' }}
                                    >
                                        <span className="block font-display text-[7px] uppercase tracking-[0.35em] mb-[3px]" style={{ color: 'rgba(232,170,58,0.4)' }}>
                                            IMPACT
                                        </span>
                                        <span className="font-display text-[10px] font-bold text-white uppercase tracking-wide">
                                            {project.impact}
                                        </span>
                                    </div>

                                    {/* Stack pills */}
                                    <div className="flex flex-wrap gap-[5px]">
                                        {project.stack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="font-display text-[8px] uppercase tracking-wider px-2 py-[2px] transition-colors duration-300"
                                                style={{
                                                    color: 'rgba(240,224,196,0.3)',
                                                    border: '1px solid rgba(255,255,255,0.08)',
                                                }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Action links */}
                                    <div
                                        className="flex items-center gap-3 pt-3 border-t"
                                        style={{ borderColor: 'rgba(232,170,58,0.1)' }}
                                    >
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                className="flex items-center gap-[6px] font-display text-[9px] uppercase tracking-widest transition-all duration-200"
                                                style={{ color: 'rgba(255,255,255,0.35)' }}
                                                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
                                            >
                                                <FaGithub className="text-sm" />
                                                Source
                                            </a>
                                        )}
                                        {project.live && (
                                            <a
                                                href={project.live}
                                                className="flex items-center gap-[6px] font-display text-[9px] uppercase tracking-widest transition-all duration-200 ml-auto"
                                                style={{ color: 'rgba(232,170,58,0.55)' }}
                                                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-vault-gold)'}
                                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(232,170,58,0.55)'}
                                            >
                                                Deploy
                                                <FaExternalLinkAlt className="text-[10px]" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* ── Bottom terminal readout ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex items-center justify-between mt-10 pt-5 border-t"
                    style={{ borderColor: 'rgba(232,170,58,0.1)' }}
                >
                    <span className="font-display text-[8px] tracking-[0.4em] uppercase" style={{ color: 'rgba(46,110,101,0.5)' }}>
                        SYS: {projects.length} OPERATIONS LOGGED
                    </span>
                    <div className="flex items-center gap-3">
                        <span className="font-display text-[8px] tracking-[0.3em] uppercase" style={{ color: 'rgba(232,170,58,0.25)' }}>
                            PIP-BOY ARCHIVE v2.0
                        </span>
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.9, ease: 'steps(1)' }}
                            className="font-display text-[9px]"
                            style={{ color: 'var(--color-pipboy-green)' }}
                        >
                            ▌
                        </motion.span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}