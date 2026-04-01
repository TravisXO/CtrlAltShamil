import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ── Icons ─────────────────────────────────────────────────────── */
const IconCode = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
    </svg>
);
const IconSearch = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
);
const IconCloud = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full" aria-hidden="true">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
);

/* ── Pillars data ───────────────────────────────────────────────── */
const PILLARS = [
    {
        id: "fullstack",
        label: "01",
        title: "Full-Stack Development",
        icon: IconCode,
        accent: "#00CFFF",
        accentBg: "rgba(0,207,255,0.06)",
        accentBorder: "rgba(0,207,255,0.15)",
        description:
            "End-to-end web applications built for performance, scalability, and maintainability — from database schema to polished UI.",
        tags: ["ASP.NET", "React", "C#", "JavaScript", "PostgreSQL", "SQL Server", "RESTful APIs"],
        to: "/projects",
    },
    {
        id: "seo",
        label: "02",
        title: "Technical SEO",
        icon: IconSearch,
        accent: "#00FF94",
        accentBg: "rgba(0,255,148,0.05)",
        accentBorder: "rgba(0,255,148,0.15)",
        description:
            "Data-driven SEO strategies that translate into measurable rankings, traffic, and visibility — not vanity metrics.",
        tags: ["Keyword Research", "Audits", "Core Web Vitals", "Schema Markup", "Content Strategy"],
        to: "/projects",
    },
    {
        id: "cloud",
        label: "03",
        title: "Cloud & Infrastructure",
        icon: IconCloud,
        accent: "#A78BFA",
        accentBg: "rgba(167,139,250,0.05)",
        accentBorder: "rgba(167,139,250,0.15)",
        description:
            "Reliable, cost-efficient cloud deployments on AWS with automated pipelines and Lighthouse-optimised delivery.",
        tags: ["AWS EC2", "S3", "RDS", "Lambda", "CI/CD", "Lighthouse 90+"],
        to: "/contact",
    },
];

/* ── Intersection helper ────────────────────────────────────────── */
function useFadeIn(threshold = 0.15) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, visible };
}

/* ── Card sub-component ─────────────────────────────────────────── */
function PillarCard({ pillar, delay, className = "" }) {
    const { ref, visible } = useFadeIn(0.1);
    const Icon = pillar.icon;

    return (
        <article
            ref={ref}
            className={`group relative flex flex-col rounded-2xl border bg-[#0B0B18] overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,0,0,0.5)] ${className}`}
            style={{
                borderColor: pillar.accentBorder,
                background: pillar.accentBg,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.65s ease ${delay}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s, box-shadow 0.3s`,
            }}
            aria-label={pillar.title}
        >
            {/* Hover glow top-edge */}
            <div
                className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, transparent, ${pillar.accent}, transparent)` }}
                aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col h-full p-6 sm:p-8 gap-5">
                {/* Header row */}
                <div className="flex items-start justify-between gap-4">
                    {/* Icon */}
                    <div
                        className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl p-3 border"
                        style={{ color: pillar.accent, background: `${pillar.accent}12`, borderColor: `${pillar.accent}30` }}
                    >
                        <Icon />
                    </div>
                    {/* Index label */}
                    <span className="font-mono text-xs tracking-[0.2em] mt-1" style={{ color: `${pillar.accent}80` }}>
                        {pillar.label}
                    </span>
                </div>

                {/* Title */}
                <h3
                    className="text-xl sm:text-2xl font-bold text-[#F2F2FA] leading-tight tracking-tight group-hover:text-white transition-colors duration-200"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                    {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#7070A0] leading-relaxed flex-1">
                    {pillar.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {pillar.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wide border"
                            style={{
                                color: `${pillar.accent}CC`,
                                background: `${pillar.accent}0A`,
                                borderColor: `${pillar.accent}20`,
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Learn More */}
                <Link
                    to={pillar.to}
                    className="mt-1 inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 w-fit group/link"
                    style={{ color: pillar.accent, fontFamily: "'Space Grotesk', sans-serif" }}
                    aria-label={`Learn more about ${pillar.title}`}
                >
                    Learn More
                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" aria-hidden="true">
                        <path fillRule="evenodd" d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z" clipRule="evenodd" />
                    </svg>
                </Link>
            </div>
        </article>
    );
}

/* ── Section ────────────────────────────────────────────────────── */
export default function WhatIDo() {
    const { ref: headRef, visible: headVisible } = useFadeIn(0.2);

    return (
        <section
            className="relative w-full bg-[#080810] py-20 sm:py-28"
            aria-labelledby="what-i-do-heading"
        >
            {/* Subtle grid texture */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        "linear-gradient(#00CFFF 1px, transparent 1px), linear-gradient(90deg, #00CFFF 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
                aria-hidden="true"
            />

            <div className="relative w-full px-4 sm:px-8 lg:px-16 xl:px-24">

                {/* Section header */}
                <div
                    ref={headRef}
                    className="mb-12 sm:mb-16"
                    style={{
                        opacity: headVisible ? 1 : 0,
                        transform: headVisible ? "translateY(0)" : "translateY(20px)",
                        transition: "opacity 0.6s ease, transform 0.6s ease",
                    }}
                >
                    <span className="inline-block text-xs font-mono tracking-[0.2em] uppercase text-[#00CFFF] mb-4">
                        What I Do
                    </span>
                    <h2
                        id="what-i-do-heading"
                        className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F2F2FA] tracking-tight leading-tight max-w-xl"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        Three pillars,{" "}
                        <span className="text-[#00CFFF]">one outcome.</span>
                    </h2>
                </div>

                {/* Bento grid
                    Mobile:  1 col stacked
                    md:      2 cols — card 1 spans 2 (full), cards 2+3 side by side
                    lg:      5 cols — card 1 spans 3, card 2 spans 2, card 3 spans 5 (full-width horizontal)
                */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">

                    {/* Card 1 — Full-Stack (largest) */}
                    <PillarCard
                        pillar={PILLARS[0]}
                        delay={0.1}
                        className="md:col-span-2 lg:col-span-3"
                    />

                    {/* Card 2 — SEO */}
                    <PillarCard
                        pillar={PILLARS[1]}
                        delay={0.2}
                        className="lg:col-span-2"
                    />

                    {/* Card 3 — Cloud (full width, horizontal layout on lg) */}
                    <CloudCard pillar={PILLARS[2]} delay={0.3} />
                </div>
            </div>
        </section>
    );
}

/* ── Cloud card — full-width horizontal variant ─────────────────── */
function CloudCard({ pillar, delay }) {
    const { ref, visible } = useFadeIn(0.1);
    const Icon = pillar.icon;

    return (
        <article
            ref={ref}
            className="group relative col-span-1 md:col-span-2 lg:col-span-5 flex flex-col lg:flex-row rounded-2xl border bg-[#0B0B18] overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,0,0,0.5)]"
            style={{
                borderColor: pillar.accentBorder,
                background: pillar.accentBg,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.65s ease ${delay}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s, box-shadow 0.3s`,
            }}
            aria-label={pillar.title}
        >
            <div
                className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, transparent, ${pillar.accent}, transparent)` }}
                aria-hidden="true"
            />

            {/* Left block */}
            <div className="relative z-10 flex flex-col justify-between p-6 sm:p-8 lg:w-2/5 xl:w-1/3 gap-5 lg:border-r border-b lg:border-b-0" style={{ borderColor: pillar.accentBorder }}>
                <div className="flex items-start justify-between gap-4">
                    <div
                        className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl p-3 border"
                        style={{ color: pillar.accent, background: `${pillar.accent}12`, borderColor: `${pillar.accent}30` }}
                    >
                        <Icon />
                    </div>
                    <span className="font-mono text-xs tracking-[0.2em] mt-1" style={{ color: `${pillar.accent}80` }}>
                        {pillar.label}
                    </span>
                </div>
                <div>
                    <h3
                        className="text-xl sm:text-2xl font-bold text-[#F2F2FA] leading-tight tracking-tight mb-3 group-hover:text-white transition-colors duration-200"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        {pillar.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#7070A0] leading-relaxed">
                        {pillar.description}
                    </p>
                </div>
                <Link
                    to={pillar.to}
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 w-fit group/link"
                    style={{ color: pillar.accent, fontFamily: "'Space Grotesk', sans-serif" }}
                    aria-label={`Learn more about ${pillar.title}`}
                >
                    Learn More
                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" aria-hidden="true">
                        <path fillRule="evenodd" d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z" clipRule="evenodd" />
                    </svg>
                </Link>
            </div>

            {/* Right block — tags spread out */}
            <div className="relative z-10 flex flex-col justify-center p-6 sm:p-8 flex-1 gap-4">
                <p className="text-xs font-mono tracking-[0.15em] uppercase" style={{ color: `${pillar.accent}70` }}>
                    Technologies
                </p>
                <div className="flex flex-wrap gap-3">
                    {pillar.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1.5 rounded-lg text-xs font-mono tracking-wide border"
                            style={{
                                color: `${pillar.accent}CC`,
                                background: `${pillar.accent}0A`,
                                borderColor: `${pillar.accent}20`,
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
}
