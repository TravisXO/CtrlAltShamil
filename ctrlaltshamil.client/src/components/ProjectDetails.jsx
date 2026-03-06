// eslint-disable-next-line no-unused-vars
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// ─── Rich detail content per project ───────────────────────────────────────
const detailsData = {
    '01': {
        slides: [
            {
                label: 'MISSION_BRIEF',
                heading: 'Overview',
                body: `A full redesign of the BNOP Media website, built from the ground up using ASP.NET Core MVC. The goal was to give the brand a fresh, modern web presence while keeping things clean under the hood.`,
            },
            {
                label: 'ARCHITECTURE',
                heading: 'Structure & Design',
                body: `The project follows a proper MVC architecture, with Controllers, Models, ViewModels, and Views all kept neatly separated. That structure made it easy to reason about the codebase and keep the front end and back end from bleeding into each other.\n\nThe bulk of the work sits on the front end — HTML and CSS making up the majority of the codebase, supported by JavaScript for interactivity. Responsive, handcrafted styling rather than leaning on a framework, which gave full control over the look and feel.`,
            },
            {
                label: 'DEPLOYMENT',
                heading: 'Infrastructure',
                body: `On the infrastructure side, a Dockerfile ensures the whole thing can be containerised and deployed consistently across environments. No "works on my machine" nonsense — the build is reproducible and environment-agnostic from day one.`,
            },
        ],
    },
    '02': {
        slides: [
            {
                label: 'MISSION_BRIEF',
                heading: 'Overview',
                body: `Built because most SEO tools are either too surface-level or locked behind a subscription. This is a full-stack auditing tool that crawls any website and scores it against over 50 real SEO metrics, wrapped up in a clean, readable dashboard.`,
            },
            {
                label: 'ARCHITECTURE',
                heading: 'How It Works',
                body: `Rather than a single monolith, the work is split across two services. A lightweight Node.js microservice powered by Puppeteer handles the headless browser rendering — fully executing JavaScript before analysis. That matters because a lot of modern sites are SPAs, and most crawlers miss half the content if they just fetch raw HTML.\n\nOnce the page is rendered, the .NET 8 backend takes over and runs the actual grading logic through a reusable C# class library.`,
            },
            {
                label: 'COVERAGE',
                heading: 'What It Audits',
                body: `The audit covers everything from title tags and meta descriptions, through to Flesch Reading Ease scores, E-E-A-T signals, Core Web Vitals indicators, Open Graph validation, JSON-LD schema detection, and image format checks for WebP and AVIF.\n\nIt outputs a weighted 0–100 score with colour-coded feedback and layman-friendly tooltips so the results are useful to non-technical clients.`,
            },
        ],
    },
    '03': {
        slides: [
            {
                label: 'MISSION_BRIEF',
                heading: 'The Brief',
                body: `Three months, zero ad spend, and a site that had been sitting stagnant. When the client came on board their Domain Authority was sitting at 19 — it had peaked at 21 previously and slipped back. Referring domains were at 48 and the site was pulling in around 190 visitors a month.\n\nThe brief was straightforward: grow the organic footprint without touching Google Ads. Everything had to be earned.`,
            },
            {
                label: 'RESULTS',
                heading: 'The Numbers',
                stats: [
                    { label: 'Domain Authority', before: '19', after: '23', note: 'Moz · past peak of 21' },
                    { label: 'Referring Domains', before: '48', after: '80', note: 'Ahrefs · +67%' },
                    { label: 'Avg Domain Rating', before: '26', after: '33', note: 'Ahrefs' },
                    { label: 'Monthly Traffic Value', before: '$163', after: 'Growing', note: '190 visits/mo baseline' },
                ],
            },
            {
                label: 'KEYWORDS',
                heading: 'Keyword Rankings',
                keywords: [
                    { range: 'Position 1–3', count: 6, note: 'Top of the page' },
                    { range: 'Position 4–10', count: 16, note: 'Page 1 sweet spot' },
                    { range: 'Position 11–20', count: 5, note: 'Page 2 climb' },
                    { range: 'Position 21–50', count: 5, note: 'In range' },
                    { range: 'Position 51+', count: 8, note: 'Entering index' },
                ],
                total: 38,
            },
        ],
    },
    '04': {
        slides: [
            {
                label: 'MISSION_BRIEF',
                heading: 'Overview',
                body: `This very portfolio — a full-stack application powered by React 19 on the frontend and ASP.NET Core on the backend. Themed around the Fallout universe with a custom Vault-Tec design system built entirely from scratch.`,
            },
            {
                label: 'ARCHITECTURE',
                heading: 'Technical Build',
                body: `The frontend is built with React 19, Vite, and Tailwind v4 using a custom theme layer that maps Vault-Tec design tokens directly into utility classes. Framer Motion handles all transitions and micro-interactions.\n\nThe backend runs on ASP.NET Core, serving as the API layer and handling any server-side concerns cleanly separated from the presentation layer.`,
            },
            {
                label: 'DESIGN_SYSTEM',
                heading: 'Design System',
                body: `The CRT scanline overlay, glitch keyframes, hex grid watermarks, and noise grain textures are all authored in CSS without external libraries. The Pip-Boy terminal aesthetic is applied consistently across every component — from the blinking cursor in the header to the status dot animations on each project card.`,
            },
        ],
    },
};

// ─── Slide renderers ────────────────────────────────────────────────────────
function TextSlide({ slide }) {
    return (
        <div className="flex flex-col gap-4">
            <p className="font-sans text-sm leading-relaxed whitespace-pre-line" style={{ color: 'rgba(240,224,196,0.72)' }}>
                {slide.body}
            </p>
        </div>
    );
}

function StatsSlide({ slide }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {slide.stats.map((s, i) => (
                <div key={i} className="relative p-3 overflow-hidden"
                    style={{ border: '1px solid rgba(232,170,58,0.15)', background: 'rgba(232,170,58,0.03)' }}>
                    <span className="block font-display text-[8px] tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(232,170,58,0.45)' }}>
                        {s.label}
                    </span>
                    <div className="flex items-center gap-3">
                        <span className="font-display text-sm" style={{ color: 'rgba(240,224,196,0.35)' }}>{s.before}</span>
                        <span className="font-display text-[10px]" style={{ color: 'rgba(232,170,58,0.4)' }}>▶</span>
                        <span className="font-display text-lg font-bold" style={{ color: 'var(--color-vault-gold)', textShadow: '0 0 12px rgba(232,170,58,0.4)' }}>{s.after}</span>
                    </div>
                    <span className="block font-display text-[8px] mt-1" style={{ color: 'rgba(240,224,196,0.25)' }}>{s.note}</span>
                </div>
            ))}
        </div>
    );
}

function KeywordsSlide({ slide }) {
    const max = Math.max(...slide.keywords.map(k => k.count));
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between mb-1">
                <span className="font-display text-[8px] tracking-[0.35em] uppercase" style={{ color: 'rgba(232,170,58,0.4)' }}>
                    TOTAL KEYWORDS TRACKED
                </span>
                <span className="font-display text-xl font-bold" style={{ color: 'var(--color-vault-gold)', textShadow: '0 0 14px rgba(232,170,58,0.5)' }}>
                    {slide.total}
                </span>
            </div>
            <div className="h-[1px] mb-2" style={{ background: 'rgba(232,170,58,0.1)' }} />
            {slide.keywords.map((k, i) => (
                <div key={i} className="flex items-center gap-3">
                    <span className="font-display text-[9px] w-32 shrink-0 uppercase" style={{ color: 'rgba(240,224,196,0.4)' }}>{k.range}</span>
                    <div className="flex-1 h-[6px] relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(232,170,58,0.1)' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(k.count / max) * 100}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                            className="absolute inset-y-0 left-0"
                            style={{ background: i === 0 ? 'var(--color-vault-gold)' : i === 1 ? 'rgba(46,110,101,0.8)' : 'rgba(232,170,58,0.3)' }}
                        />
                    </div>
                    <span className="font-display text-[10px] font-bold w-4 text-right" style={{ color: i === 0 ? 'var(--color-vault-gold)' : 'rgba(240,224,196,0.5)' }}>{k.count}</span>
                </div>
            ))}
        </div>
    );
}

function SlideContent({ slide }) {
    if (slide.stats) return <StatsSlide slide={slide} />;
    if (slide.keywords) return <KeywordsSlide slide={slide} />;
    return <TextSlide slide={slide} />;
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function ProjectDetails({ project, onClose }) {
    const [slideIndex, setSlideIndex] = useState(0);
    const [accessing, setAccessing] = useState(true);
    const [direction, setDirection] = useState(1);
    const ref = useRef(null);

    const details = detailsData[project.id];
    const slides = details?.slides ?? [];
    const totalSlides = slides.length;

    // Auto-scroll into view
    useEffect(() => {
        const timer = setTimeout(() => {
            ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
        return () => clearTimeout(timer);
    }, [project.id]);

    // Reset slide and play "ACCESSING..." on project change
    useEffect(() => {
        setSlideIndex(0);
        setAccessing(true);
        const t = setTimeout(() => setAccessing(false), 1200);
        return () => clearTimeout(t);
    }, [project.id]);

    const goTo = (next) => {
        setDirection(next > slideIndex ? 1 : -1);
        setSlideIndex(next);
    };
    const prev = () => slideIndex > 0 && goTo(slideIndex - 1);
    const next = () => slideIndex < totalSlides - 1 && goTo(slideIndex + 1);

    const sc = {
        'DEPLOYED': { color: '#4ade80' },
        'ACTIVE': { color: '#E8AA3A' },
        'LIVE': { color: '#4ade80' },
        'IN PROGRESS': { color: 'rgba(255,255,255,0.3)' },
    }[project.status] || { color: 'rgba(255,255,255,0.3)' };

    const slideVariants = {
        enter: (d) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
        center: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
        exit: (d) => ({ opacity: 0, x: d > 0 ? -40 : 40, transition: { duration: 0.25 } }),
    };

    return (
        <motion.section
            ref={ref}
            id="project-details"
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative overflow-hidden"
            style={{
                background: `
                    radial-gradient(ellipse at 80% 0%,   rgba(46,110,101,0.12) 0%, transparent 55%),
                    radial-gradient(ellipse at 20% 100%, rgba(27,45,79,0.3)    0%, transparent 55%),
                    #070d0c
                `,
                borderTop: '1px solid rgba(232,170,58,0.18)',
            }}
        >
            {/* ── Scan lines ── */}
            <div className="absolute inset-0 pointer-events-none z-10"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.26) 2px, rgba(0,0,0,0.26) 4px)', backgroundSize: '100% 4px', mixBlendMode: 'multiply' }} />

            {/* ── CRT vignette ── */}
            <div className="absolute inset-0 pointer-events-none z-10"
                style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(0,0,0,0.65) 100%)' }} />

            {/* ── Noise grain ── */}
            <div className="absolute inset-0 pointer-events-none z-[5] opacity-[0.04]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '120px 120px' }} />

            {/* ── Hex grid ── */}
            <div className="absolute inset-0 pointer-events-none z-[4] opacity-[0.022]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='30,2 58,17 58,47 30,62 2,47 2,17' stroke='%23E8AA3A' stroke-width='1' fill='none'/%3E%3C/svg%3E")`, backgroundSize: '60px 52px' }} />

            {/* ── Top / bottom ruled lines ── */}
            <div className="absolute top-0 left-0 right-0 h-[1px] z-20"
                style={{ background: 'linear-gradient(90deg, transparent, var(--color-vault-gold) 30%, var(--color-pipboy-green) 70%, transparent)' }} />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] z-20"
                style={{ background: 'linear-gradient(90deg, transparent, var(--color-vault-gold) 30%, var(--color-pipboy-green) 70%, transparent)' }} />

            {/* ── Ghost watermark ── */}
            <div className="absolute top-1/2 -translate-y-1/2 right-0 -translate-x-0 pointer-events-none select-none z-[3]">
                <span className="font-display font-black text-white leading-none whitespace-nowrap"
                    style={{ fontSize: 'clamp(5rem, 20vw, 18rem)', opacity: 0.022, letterSpacing: '-0.05em' }}>
                    DOSSIER
                </span>
            </div>

            {/* ── HUD labels ── */}
            <div className="absolute top-5 left-6 z-20 flex flex-col gap-1">
                <span className="font-display text-[9px] tracking-[0.35em] uppercase" style={{ color: 'var(--color-pipboy-green)' }}>
                    ■ DOSSIER_VIEW
                </span>
                <span className="font-display text-[8px] tracking-[0.2em] opacity-50" style={{ color: 'var(--color-pipboy-green)' }}>
                    SECTOR: CLASSIFIED
                </span>
            </div>
            <div className="absolute top-5 right-6 z-20 text-right flex flex-col gap-1">
                <span className="font-display text-[9px] tracking-[0.2em] opacity-60" style={{ color: 'var(--color-vault-gold)' }}>
                    OP_{project.id}
                </span>
                <span className="font-display text-[8px] tracking-[0.15em] opacity-40" style={{ color: 'var(--color-vault-gold)' }}>
                    SIGNAL: LOCKED
                </span>
            </div>

            {/* ── ACCESSING animation overlay ── */}
            <AnimatePresence>
                {accessing && (
                    <motion.div
                        key="accessing"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 z-50 flex items-center justify-center"
                        style={{ background: 'rgba(7,13,12,0.96)' }}
                    >
                        <div className="flex flex-col items-center gap-3">
                            <motion.div
                                animate={{ scaleX: [0, 1] }}
                                transition={{ duration: 0.9, ease: 'easeInOut' }}
                                className="h-[2px] w-48"
                                style={{ background: 'var(--color-vault-gold)', transformOrigin: 'left' }}
                            />
                            <span className="font-display text-[11px] tracking-[0.5em] uppercase" style={{ color: 'var(--color-vault-gold)' }}>
                                ACCESSING...
                            </span>
                            <motion.span
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ repeat: Infinity, duration: 0.6 }}
                                className="font-display text-[9px] tracking-[0.3em]"
                                style={{ color: 'var(--color-pipboy-green)' }}
                            >
                                ▌ DECRYPTING FILE {project.id}
                            </motion.span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── CONTENT ── */}
            <div className="relative z-20 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-20">

                {/* Close button */}
                <div className="flex justify-end mb-6">
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 font-display text-[9px] uppercase tracking-[0.35em] px-3 py-2 transition-all duration-200"
                        style={{ color: 'rgba(240,224,196,0.3)', border: '1px solid rgba(255,255,255,0.07)' }}
                        onMouseEnter={e => { e.currentTarget.style.color = 'rgba(240,224,196,0.7)'; e.currentTarget.style.borderColor = 'rgba(232,170,58,0.3)'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(240,224,196,0.3)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
                    >
                        ✕ &nbsp;CLOSE FILE
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">

                    {/* ── LEFT: Project Identity Panel ── */}
                    <div className="flex flex-col gap-5">

                        {/* Tag + Status */}
                        <div className="flex items-center gap-3">
                            <span className="font-display text-[9px] uppercase tracking-[0.2em] px-2 py-[2px] border"
                                style={{ color: 'var(--color-vault-gold)', borderColor: 'rgba(232,170,58,0.3)', background: 'rgba(232,170,58,0.06)' }}>
                                {project.tag}
                            </span>
                            <div className="flex items-center gap-[5px]">
                                <motion.span
                                    animate={{ opacity: [1, 0.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 1.8 }}
                                    className="w-[5px] h-[5px] rounded-full"
                                    style={{ background: sc.color, boxShadow: `0 0 5px ${sc.color}` }}
                                />
                                <span className="font-display text-[8px] tracking-[0.2em] uppercase" style={{ color: sc.color }}>
                                    {project.status}
                                </span>
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <h2 className="font-display font-black uppercase leading-none text-white"
                                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', textShadow: '0 0 30px rgba(46,110,101,0.35)' }}>
                                {project.title}
                            </h2>
                            <p className="font-display text-[10px] uppercase tracking-wider mt-2" style={{ color: 'rgba(240,224,196,0.3)' }}>
                                {project.subtitle} · {project.type}
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="h-[1px]" style={{ background: 'linear-gradient(90deg, rgba(232,170,58,0.35), transparent)' }} />

                        {/* Impact callout */}
                        <div className="px-4 py-3" style={{ borderLeft: '2px solid var(--color-vault-gold)', background: 'rgba(232,170,58,0.04)' }}>
                            <span className="block font-display text-[7px] uppercase tracking-[0.35em] mb-[4px]" style={{ color: 'rgba(232,170,58,0.4)' }}>
                                IMPACT ASSESSMENT
                            </span>
                            <span className="font-display text-[11px] font-bold text-white uppercase tracking-wide leading-snug">
                                {project.impact}
                            </span>
                        </div>

                        {/* Stack pills */}
                        <div>
                            <span className="block font-display text-[8px] uppercase tracking-[0.3em] mb-2" style={{ color: 'rgba(232,170,58,0.35)' }}>
                                TECH STACK
                            </span>
                            <div className="flex flex-wrap gap-[5px]">
                                {project.stack.map((tech) => (
                                    <span key={tech} className="font-display text-[8px] uppercase tracking-wider px-2 py-[3px]"
                                        style={{ color: 'rgba(240,224,196,0.35)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Action links */}
                        <div className="flex items-center gap-4 pt-2 border-t" style={{ borderColor: 'rgba(232,170,58,0.1)' }}>
                            {project.github && (
                                <a href={project.github}
                                    className="flex items-center gap-[6px] font-display text-[9px] uppercase tracking-widest transition-all duration-200"
                                    style={{ color: 'rgba(255,255,255,0.35)' }}
                                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}>
                                    <FaGithub className="text-sm" /> Source
                                </a>
                            )}
                            {project.live && (
                                <a href={project.live}
                                    className="flex items-center gap-[6px] font-display text-[9px] uppercase tracking-widest transition-all duration-200 ml-auto"
                                    style={{ color: 'rgba(232,170,58,0.55)' }}
                                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-vault-gold)'}
                                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(232,170,58,0.55)'}>
                                    Deploy <FaExternalLinkAlt className="text-[10px]" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* ── RIGHT: Carousel ── */}
                    <div className="flex flex-col gap-0"
                        style={{ border: '1px solid rgba(232,170,58,0.13)', background: 'rgba(7,13,12,0.6)', backdropFilter: 'blur(6px)' }}>

                        {/* Carousel header bar */}
                        <div className="flex items-center justify-between px-4 py-2 border-b flex-shrink-0"
                            style={{ borderColor: 'rgba(232,170,58,0.12)', background: 'rgba(46,110,101,0.07)' }}>
                            <span className="font-display text-[8px] tracking-[0.35em] uppercase" style={{ color: 'rgba(232,170,58,0.5)' }}>
                                {slides[slideIndex]?.label ?? 'DATA'}
                            </span>
                            <span className="font-display text-[8px] tracking-[0.2em]" style={{ color: 'rgba(232,170,58,0.35)' }}>
                                FILE {String(slideIndex + 1).padStart(2, '0')} OF {String(totalSlides).padStart(2, '0')}
                            </span>
                        </div>

                        {/* Slide heading */}
                        <div className="px-5 pt-5 pb-3 border-b" style={{ borderColor: 'rgba(232,170,58,0.08)' }}>
                            <h3 className="font-display font-black uppercase text-white text-base tracking-wider">
                                {slides[slideIndex]?.heading}
                            </h3>
                        </div>

                        {/* Slide body */}
                        <div className="relative overflow-hidden px-5 py-5 min-h-[220px]">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={slideIndex}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                >
                                    <SlideContent slide={slides[slideIndex]} />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Carousel nav */}
                        <div className="flex items-center justify-between px-4 py-3 border-t"
                            style={{ borderColor: 'rgba(232,170,58,0.1)' }}>

                            {/* Dot indicators */}
                            <div className="flex items-center gap-2">
                                {slides.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => goTo(i)}
                                        className="transition-all duration-200"
                                        style={{
                                            width: i === slideIndex ? '20px' : '6px',
                                            height: '6px',
                                            background: i === slideIndex ? 'var(--color-vault-gold)' : 'rgba(232,170,58,0.2)',
                                            border: 'none',
                                            cursor: 'pointer',
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Arrows */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={prev}
                                    disabled={slideIndex === 0}
                                    className="flex items-center justify-center w-7 h-7 transition-all duration-200"
                                    style={{
                                        border: '1px solid rgba(232,170,58,0.2)',
                                        color: slideIndex === 0 ? 'rgba(232,170,58,0.15)' : 'rgba(232,170,58,0.6)',
                                        cursor: slideIndex === 0 ? 'not-allowed' : 'pointer',
                                        background: 'transparent',
                                    }}
                                    onMouseEnter={e => { if (slideIndex > 0) e.currentTarget.style.borderColor = 'rgba(232,170,58,0.7)'; }}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(232,170,58,0.2)'}
                                >
                                    <FaChevronLeft className="text-[9px]" />
                                </button>
                                <button
                                    onClick={next}
                                    disabled={slideIndex === totalSlides - 1}
                                    className="flex items-center justify-center w-7 h-7 transition-all duration-200"
                                    style={{
                                        border: '1px solid rgba(232,170,58,0.2)',
                                        color: slideIndex === totalSlides - 1 ? 'rgba(232,170,58,0.15)' : 'rgba(232,170,58,0.6)',
                                        cursor: slideIndex === totalSlides - 1 ? 'not-allowed' : 'pointer',
                                        background: 'transparent',
                                    }}
                                    onMouseEnter={e => { if (slideIndex < totalSlides - 1) e.currentTarget.style.borderColor = 'rgba(232,170,58,0.7)'; }}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(232,170,58,0.2)'}
                                >
                                    <FaChevronRight className="text-[9px]" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}