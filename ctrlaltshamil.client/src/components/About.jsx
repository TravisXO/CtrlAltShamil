// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import headshot from '../headshot.jpg';

const careerStats = [
    { label: "Organic Traffic", value: "+217%", desc: "Classic Zambia Growth", code: "STAT_01" },
    { label: "Domain Rating", value: "+12", desc: "DR 20 → 32 Authority Boost", code: "STAT_02" },
    { label: "Performance", value: "95+", desc: "Lighthouse Audit Score", code: "STAT_03" },
];

const traits = [
    { code: "01", title: "Full-Stack Dev", detail: "ASP.NET 8 · React · C#", bar: 92 },
    { code: "02", title: "SEO Strategist", detail: "Technical · On-Page · Schema", bar: 88 },
    { code: "03", title: "BSc Software Eng.", detail: "Asia Pacific University", bar: 95 },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

/* Reusable corner-bracket wrapper */
function BracketBox({ children, className = '', glowColor = 'var(--color-vault-gold)' }) {
    return (
        <div className={`relative ${className}`}>
            {/* TL */}
            <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 pointer-events-none z-10"
                style={{ borderColor: glowColor }} />
            {/* TR */}
            <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 pointer-events-none z-10"
                style={{ borderColor: glowColor }} />
            {/* BL */}
            <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 pointer-events-none z-10"
                style={{ borderColor: glowColor }} />
            {/* BR */}
            <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 pointer-events-none z-10"
                style={{ borderColor: glowColor }} />
            {children}
        </div>
    );
}

/* Animated skill bar */
function SkillBar({ value, color = 'var(--color-vault-gold)' }) {
    const segments = 20;
    const filled = Math.round((value / 100) * segments);
    return (
        <div className="flex gap-[2px] items-center">
            {Array.from({ length: segments }).map((_, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, scaleY: 0 }}
                    whileInView={{ opacity: 1, scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i, duration: 0.2 }}
                    className="inline-block w-[5px] h-[10px]"
                    style={{
                        backgroundColor: i < filled ? color : 'rgba(255,255,255,0.08)',
                        boxShadow: i < filled ? `0 0 4px ${color}88` : 'none',
                    }}
                />
            ))}
            <span className="ml-2 font-display text-[9px]" style={{ color }}>{value}</span>
        </div>
    );
}

export default function About() {
    return (
        <section
            id="about"
            className="relative py-24 lg:py-32 overflow-hidden"
            style={{
                /* Dark CRT base — very dark teal-black */
                background: `
                    radial-gradient(ellipse at 50% 30%, rgba(46,110,101,0.18) 0%, transparent 65%),
                    radial-gradient(ellipse at 80% 80%, rgba(27,45,79,0.35) 0%, transparent 55%),
                    #070d0c
                `,
            }}
        >
            {/* ── SCAN LINES overlay ── */}
            <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.28) 2px, rgba(0,0,0,0.28) 4px)',
                    backgroundSize: '100% 4px',
                    mixBlendMode: 'multiply',
                }}
            />

            {/* ── CRT Vignette ── */}
            <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                    background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,0.72) 100%)',
                }}
            />

            {/* ── Noise grain ── */}
            <div
                className="absolute inset-0 pointer-events-none z-[5] opacity-[0.04]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '120px 120px',
                }}
            />

            {/* ── Hex grid watermark ── */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.025] z-[4]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='30,2 58,17 58,47 30,62 2,47 2,17' stroke='%23E8AA3A' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
                    backgroundSize: '60px 52px',
                }}
            />

            {/* ── Horizontal rule top / bottom ── */}
            <div className="absolute top-0 left-0 right-0 h-[1px] z-20"
                style={{ background: 'linear-gradient(90deg, transparent, var(--color-vault-gold) 30%, var(--color-pipboy-green) 70%, transparent)' }} />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] z-20"
                style={{ background: 'linear-gradient(90deg, transparent, var(--color-vault-gold) 30%, var(--color-pipboy-green) 70%, transparent)' }} />

            {/* ── Ghost watermark ── */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-0 pointer-events-none select-none z-[3]">
                <span
                    className="font-display font-black leading-none"
                    style={{ fontSize: 'clamp(6rem, 20vw, 18rem)', opacity: 0.022, color: 'white', letterSpacing: '-0.05em' }}
                >
                    BIO
                </span>
            </div>

            {/* ── HUD corners — top-left system label ── */}
            <div className="absolute top-6 left-6 z-20 flex flex-col gap-1">
                <span className="font-display text-[9px] tracking-[0.35em] uppercase" style={{ color: 'var(--color-pipboy-green)' }}>
                    ■ PIPBOY_OS v3.0
                </span>
                <span className="font-display text-[8px] tracking-[0.2em] opacity-50" style={{ color: 'var(--color-pipboy-green)' }}>
                    SECTOR: COMMONWEALTH
                </span>
            </div>
            {/* top-right coordinates */}
            <div className="absolute top-6 right-6 z-20 text-right flex flex-col gap-1">
                <span className="font-display text-[9px] tracking-[0.2em] opacity-60" style={{ color: 'var(--color-vault-gold)' }}>
                    42.3601° N, 71.0589° W
                </span>
                <span className="font-display text-[8px] tracking-[0.15em] opacity-40" style={{ color: 'var(--color-vault-gold)' }}>
                    SIGNAL: LOCKED
                </span>
            </div>

            {/* ────────────────────────────────── CONTENT ── */}
            <div className="relative z-20 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">

                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-4 mb-12 lg:mb-16"
                >
                    <div className="flex flex-col gap-[3px]">
                        <span className="block w-8 h-[1px]" style={{ background: 'var(--color-vault-gold)' }} />
                        <span className="block w-5 h-[1px]" style={{ background: 'var(--color-vault-gold)', opacity: 0.5 }} />
                    </div>
                    <span className="font-display text-[10px] tracking-[0.5em] uppercase" style={{ color: 'var(--color-vault-gold)' }}>
                        // SUBJECT_BIO
                    </span>
                    <span className="font-display text-[9px] tracking-[0.3em] uppercase opacity-40 ml-4" style={{ color: 'white' }}>
                        [ STATUS: ACTIVE ]
                    </span>
                    {/* animated blink cursor */}
                    <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 1.1 }}
                        className="inline-block w-[7px] h-[14px] ml-1"
                        style={{ background: 'var(--color-vault-gold)' }}
                    />
                </motion.div>

                {/* Main grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* ── LEFT COLUMN ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-4 flex flex-col gap-6"
                    >
                        {/* Photo dossier frame */}
                        <BracketBox className="max-w-[300px] mx-auto lg:mx-0 w-full">
                            {/* glow ring */}
                            <div className="absolute inset-0 pointer-events-none"
                                style={{ boxShadow: '0 0 40px rgba(46,110,101,0.25) inset, 0 0 20px rgba(232,170,58,0.08) inset' }} />

                            {/* DOSSIER header bar */}
                            <div className="flex items-center justify-between px-3 py-[6px] border-b"
                                style={{ background: 'rgba(46,110,101,0.15)', borderColor: 'rgba(232,170,58,0.2)' }}>
                                <span className="font-display text-[8px] tracking-[0.35em] uppercase" style={{ color: 'var(--color-vault-gold)' }}>
                                    DOSSIER FILE
                                </span>
                                <span className="font-display text-[8px] tracking-[0.2em]" style={{ color: 'white' }}>
                                    ID: ASM-0001
                                </span>
                            </div>

                            {/* Image */}
                            <div className="relative overflow-hidden aspect-[3/4]"
                                style={{ borderLeft: '1px solid rgba(232,170,58,0.15)', borderRight: '1px solid rgba(232,170,58,0.15)' }}>
                                <img
                                    src={headshot}
                                    alt="Alexander Shamil Mondoka"
                                    className="w-full h-full object-cover"
                                    style={{ filter: 'grayscale(100%) brightness(0.75) contrast(1.15) sepia(0.3)' }}
                                />
                                {/* phosphor green overlay */}
                                <div className="absolute inset-0 pointer-events-none"
                                    style={{ background: 'rgba(46,110,101,0.18)', mixBlendMode: 'color' }} />
                                {/* target reticle overlay */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                                    <div className="w-20 h-20 rounded-full border" style={{ borderColor: 'var(--color-vault-gold)' }} />
                                    <div className="absolute w-28 h-[1px]" style={{ background: 'var(--color-vault-gold)' }} />
                                    <div className="absolute w-[1px] h-28" style={{ background: 'var(--color-vault-gold)' }} />
                                </div>
                                {/* scan line on image */}
                                <div className="absolute inset-0 pointer-events-none"
                                    style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)' }} />
                            </div>

                            {/* Name tag */}
                            <div className="flex items-center justify-between px-3 py-2 border-t"
                                style={{ background: 'rgba(7,13,12,0.9)', borderColor: 'rgba(232,170,58,0.2)' }}>
                                <div>
                                    <p className="font-display font-black text-white text-[10px] uppercase tracking-wider">
                                        Alexander Shamil
                                    </p>
                                    <p className="font-display text-[9px] uppercase tracking-[0.3em]" style={{ color: 'white', opacity: 0.6 }}>
                                        Mondoka
                                    </p>
                                </div>
                                <div className="flex items-center gap-[5px]">
                                    <motion.div
                                        animate={{ opacity: [1, 0.2, 1] }}
                                        transition={{ repeat: Infinity, duration: 1.6 }}
                                        className="w-[6px] h-[6px] rounded-full"
                                        style={{ background: 'var(--color-vault-gold)', boxShadow: '0 0 6px var(--color-vault-gold)' }}
                                    />
                                    <span className="font-display text-[8px] uppercase tracking-wider opacity-50" style={{ color: 'var(--color-vault-gold)' }}>
                                        ONLINE
                                    </span>
                                </div>
                            </div>
                        </BracketBox>

                        {/* Trait bars */}
                        <div className="flex flex-col gap-[6px] max-w-[300px] mx-auto lg:mx-0 w-full">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-1 h-3" style={{ background: 'var(--color-vault-gold)' }} />
                                <span className="font-display text-[9px] tracking-[0.4em] uppercase" style={{ color: 'var(--color-vault-gold)' }}>
                                    S.P.E.C.I.A.L
                                </span>
                            </div>
                            {traits.map((t) => (
                                <div
                                    key={t.code}
                                    className="group px-3 py-3 border transition-all duration-300"
                                    style={{
                                        border: '1px solid rgba(232,170,58,0.12)',
                                        background: 'rgba(46,110,101,0.05)',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = 'rgba(232,170,58,0.45)';
                                        e.currentTarget.style.background = 'rgba(46,110,101,0.12)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = 'rgba(232,170,58,0.12)';
                                        e.currentTarget.style.background = 'rgba(46,110,101,0.05)';
                                    }}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-display text-[9px]" style={{ color: 'var(--color-vault-gold)', opacity: 0.6 }}>
                                                [{t.code}]
                                            </span>
                                            <p className="font-display text-[10px] font-bold text-white uppercase tracking-wider">
                                                {t.title}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="font-display text-[8px] uppercase tracking-wider mb-2" style={{ color: 'rgba(240,224,196,0.35)' }}>
                                        {t.detail}
                                    </p>
                                    <SkillBar value={t.bar} />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── RIGHT COLUMN ── */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="lg:col-span-8 flex flex-col gap-8"
                    >
                        {/* Heading */}
                        <motion.div variants={itemVariants}>
                            {/* terminal prefix line */}
                            <p className="font-display text-[10px] tracking-[0.4em] mb-3 uppercase"
                                style={{ color: 'var(--color-vault-gold)' }}>
                                &gt; LOADING_PROFILE.EXE ████████████ 100%
                            </p>
                            <h2 className="font-display font-black uppercase leading-[0.88] mb-2">
                                <span
                                    className="block text-[clamp(2rem,4.5vw,4.2rem)] text-white"
                                    style={{ textShadow: '0 0 40px rgba(46,110,101,0.5)' }}
                                >
                                    FULL-STACK
                                </span>
                                <span
                                    className="block text-[clamp(2rem,4.5vw,4.2rem)]"
                                    style={{
                                        WebkitTextStroke: '2px var(--color-vault-gold)',
                                        color: 'transparent',
                                        textShadow: '0 0 50px rgba(232,170,58,0.3)',
                                        filter: 'drop-shadow(0 0 12px rgba(232,170,58,0.25))',
                                    }}
                                >
                                    ENGINEER
                                </span>
                                <span className="block text-[clamp(1rem,2.2vw,1.8rem)] mt-1"
                                    style={{ color: 'rgba(240,224,196,0.38)' }}>
                                    & SEO STRATEGIST
                                </span>
                            </h2>
                        </motion.div>

                        {/* Divider */}
                        <motion.div variants={itemVariants} className="flex items-center gap-3">
                            <span className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, rgba(232,170,58,0.5), transparent)' }} />
                            <span className="font-display text-[8px] tracking-[0.4em] uppercase" style={{ color: 'rgba(232,170,58,0.4)' }}>
                                CLASSIFIED
                            </span>
                            <span className="flex-1 h-[1px]" style={{ background: 'linear-gradient(270deg, rgba(232,170,58,0.5), transparent)' }} />
                        </motion.div>

                        {/* Bio */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-4 text-sm leading-relaxed max-w-2xl">
                            <p style={{ color: 'rgba(240,224,196,0.65)', fontFamily: 'var(--font-sans)' }}>
                                Software Engineer specialising in technical SEO and full-stack development.
                                Holds a{' '}
                                <span className="text-white font-semibold"
                                    style={{ textShadow: '0 0 10px rgba(232,170,58,0.3)' }}>
                                    BSc (Honours) in Software Engineering
                                </span>{' '}
                                from Asia Pacific University, with hands-on experience delivering measurable outcomes for international clients.
                            </p>

                            {/* Pull quote — terminal style */}
                            <BracketBox glowColor="var(--color-pipboy-green)">
                                <div className="px-5 py-4"
                                    style={{ background: 'rgba(46,110,101,0.08)', borderLeft: '2px solid var(--color-pipboy-green)' }}>
                                    <span className="block font-display text-[8px] tracking-[0.4em] uppercase mb-2" style={{ color: 'var(--color-vault-gold' }}>
                                        // FIELD_REPORT
                                    </span>
                                    <p className="italic leading-relaxed" style={{ color: 'white', fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
                                        "Achieved 217% organic traffic growth and improved domain authority by 60% for international clients."
                                    </p>
                                </div>
                            </BracketBox>

                            <p style={{ color: 'rgba(240,224,196,0.65)', fontFamily: 'var(--font-sans)' }}>
                                Architecting high-performance web applications using{' '}
                                <span className="text-white font-semibold">ASP.NET 8, C#, and React</span>,
                                consistently achieving sub-2s page load times and 95+ Lighthouse scores across all projects.
                            </p>
                        </motion.div>

                        {/* Stats grid */}
                        <motion.div variants={itemVariants}>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-1 h-4" style={{ background: 'var(--color-vault-gold)' }} />
                                <span className="font-display text-[10px] tracking-[0.4em] uppercase" style={{ color: 'var(--color-vault-gold)' }}>
                                    Field Reports
                                </span>
                                <span className="font-display text-[8px] tracking-[0.2em] uppercase opacity-40" style={{ color: 'white' }}>
                                    [ 3 ENTRIES ]
                                </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {careerStats.map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        variants={itemVariants}
                                        className="group relative p-4 overflow-hidden cursor-default transition-all duration-300"
                                        style={{ border: '1px solid rgba(232,170,58,0.15)', background: 'rgba(7,13,12,0.6)' }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.borderColor = 'rgba(232,170,58,0.55)';
                                            e.currentTarget.style.boxShadow = '0 0 20px rgba(232,170,58,0.08), inset 0 0 20px rgba(46,110,101,0.06)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.borderColor = 'rgba(232,170,58,0.15)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        {/* top sweep bar */}
                                        <div className="absolute top-0 left-0 w-0 h-[2px] transition-all duration-500 group-hover:w-full"
                                            style={{ background: 'var(--color-vault-gold)' }} />
                                        {/* code label */}
                                        <span className="block font-display text-[8px] tracking-[0.3em] mb-1" style={{ color: 'rgba(232,170,58,0.35)' }}>
                                            {stat.code}
                                        </span>
                                        {/* value */}
                                        <span className="block font-display font-black text-3xl text-white mb-1"
                                            style={{ textShadow: '0 0 20px rgba(46,110,101,0.5)' }}>
                                            {stat.value}
                                        </span>
                                        <span className="block font-display text-[9px] uppercase tracking-[0.3em] mb-1"
                                            style={{ color: 'var(--color-vault-gold)' }}>
                                            {stat.label}
                                        </span>
                                        <p className="font-display text-[8px] uppercase tracking-wider leading-snug"
                                            style={{ color: 'rgba(240,224,196,0.3)' }}>
                                            {stat.desc}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* CTA row */}
                        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
                            <a
                                href="#contact"
                                className="relative overflow-hidden font-display font-black uppercase text-xs tracking-[0.2em] px-7 py-3 transition-all duration-300"
                                style={{
                                    background: 'var(--color-vault-gold)',
                                    color: '#070d0c',
                                    boxShadow: '4px 4px 0px rgba(46,110,101,0.8), 0 0 20px rgba(232,170,58,0.2)',
                                    border: '2px solid var(--color-vault-gold)',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.boxShadow = '2px 2px 0px rgba(46,110,101,0.8), 0 0 30px rgba(232,170,58,0.4)';
                                    e.currentTarget.style.transform = 'translate(1px,1px)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.boxShadow = '4px 4px 0px rgba(46,110,101,0.8), 0 0 20px rgba(232,170,58,0.2)';
                                    e.currentTarget.style.transform = 'translate(0,0)';
                                }}
                            >
                                [ Initiate Comms ]
                            </a>
                            <a
                                href="#projects"
                                className="font-display font-black uppercase text-xs tracking-[0.2em] px-7 py-3 transition-all duration-300"
                                style={{
                                    background: 'transparent',
                                    color: 'rgba(240,224,196,0.7)',
                                    border: '2px solid rgba(255,255,255,0.2)',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = 'var(--color-vault-gold)';
                                    e.currentTarget.style.color = 'var(--color-vault-gold)';
                                    e.currentTarget.style.boxShadow = '0 0 15px rgba(232,170,58,0.15)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                                    e.currentTarget.style.color = 'rgba(240,224,196,0.7)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                [ View Operations ]
                            </a>
                        </motion.div>

                        {/* Bottom terminal readout */}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-center gap-4 pt-2 border-t"
                            style={{ borderColor: 'rgba(232,170,58,0.1)' }}
                        >
                            <span className="font-display text-[8px] tracking-[0.3em] uppercase" style={{ color: 'white' }}>
                                SYS: ALL SYSTEMS NOMINAL
                            </span>
                            <span className="font-display text-[8px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-vault-gold)' }}>
                                ▮▮▮▮▮▮▯▯▯▯ 60%
                            </span>
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.9, ease: 'steps(1)' }}
                                className="font-display text-[9px]"
                                style={{ color: 'var(--color-pipboy-green)' }}
                            >
                                ▌
                            </motion.span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}