import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ── Featured project data (aligned with Projects.jsx) ─────────── */
const PROJECTS = [
    {
        id: "classic-zambia",
        title: "Classic Zambia Safaris",
        category: "SEO Campaign",
        tags: ["Technical SEO", "Content Strategy", "Core Web Vitals"],
        description:
            "A 3-month SEO engagement that took a safari operator from near-invisible to ranking across 137 keywords. Monthly visitors climbed from 132 to 227 and domain rating went from 19 to 23.",
        stats: [
            { value: "200K", label: "Impressions" },
            { value: "72%", label: "More Visitors" },
            { value: "137", label: "Keywords Ranked" },
        ],
        accent: "#00FF94",
        accentBg: "rgba(0,255,148,0.05)",
        accentBorder: "rgba(0,255,148,0.15)",
        index: "01",
        caseStudyLink: "/projects/classic-zambia",
        liveLink: "https://classiczambiasafaris.com",
    },
    {
        id: "house-to-home",
        title: "House to Home",
        category: "Full-Stack + SEO",
        tags: ["ASP.NET", "React", "PostgreSQL", "Technical SEO"],
        description:
            "Built the entire platform from scratch with React and ASP.NET Core then ran an 11-month SEO campaign alongside it. Took the site from zero to 20 monthly visitors with a DR jump from 2 to 18.",
        stats: [
            { value: "111K", label: "Impressions" },
            { value: "DR 18", label: "Domain Rating" },
            { value: "95+", label: "Lighthouse Score" },
        ],
        accent: "#00CFFF",
        accentBg: "rgba(0,207,255,0.05)",
        accentBorder: "rgba(0,207,255,0.15)",
        index: "02",
        caseStudyLink: "/projects/house-to-home",
        liveLink: "https://housetohomezam.com",
    },
];

/* ── Intersection helper ───────────────────────────────────────── */
function useFadeIn(threshold = 0.15) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setVisible(true);
                    obs.disconnect();
                }
            },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, visible };
}

/* ── Arrow icon ────────────────────────────────────────────────── */
function ArrowIcon({ className = "" }) {
    return (
        <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className={`w-3.5 h-3.5 ${className}`}
            aria-hidden="true"
        >
            <path
                fillRule="evenodd"
                d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z"
                clipRule="evenodd"
            />
        </svg>
    );
}

/* ── Project card ──────────────────────────────────────────────── */
function ProjectCard({ project, delay }) {
    const { ref, visible } = useFadeIn(0.1);

    return (
        <article
            ref={ref}
            className="group relative flex flex-col rounded-2xl border overflow-hidden h-full transition-shadow duration-500 hover:shadow-[0_0_48px_rgba(0,0,0,0.5)]"
            style={{
                borderColor: project.accentBorder,
                background: project.accentBg,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.65s ease ${delay}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s, box-shadow 0.5s`,
            }}
            aria-label={project.title}
        >
            {/* Top accent glow on hover */}
            <div
                className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, transparent, ${project.accent}, transparent)` }}
                aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col h-full p-6 sm:p-8 gap-5">
                {/* Top row: index + category */}
                <div className="flex items-center justify-between">
                    <span
                        className="font-mono text-xs tracking-[0.2em]"
                        style={{ color: `${project.accent}80` }}
                    >
                        {project.index}
                    </span>
                    <span
                        className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider border"
                        style={{
                            color: project.accent,
                            background: `${project.accent}10`,
                            borderColor: `${project.accent}25`,
                        }}
                    >
                        {project.category}
                    </span>
                </div>

                {/* Title */}
                <h3
                    className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] leading-tight tracking-tight group-hover:text-white transition-colors duration-200"
                    style={{ fontFamily: "var(--heading)" }}
                >
                    {project.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wide border"
                            style={{
                                color: `${project.accent}CC`,
                                background: `${project.accent}0A`,
                                borderColor: `${project.accent}20`,
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-[var(--text-dim)] leading-relaxed flex-1">
                    {project.description}
                </p>

                {/* Divider */}
                <div
                    className="h-px w-full"
                    style={{ background: `${project.accent}15` }}
                    aria-hidden="true"
                />

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                    {project.stats.map(({ value, label }) => (
                        <div key={label} className="flex flex-col gap-1">
                            <span
                                className="text-xl sm:text-2xl lg:text-3xl font-black leading-none tracking-tight"
                                style={{ fontFamily: "var(--heading)", color: project.accent }}
                            >
                                {value}
                            </span>
                            <span className="text-[10px] sm:text-[11px] font-mono text-[#505070] tracking-wider uppercase leading-tight">
                                {label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div
                    className="h-px w-full"
                    style={{ background: `${project.accent}15` }}
                    aria-hidden="true"
                />

                {/* Links */}
                <div className="flex flex-wrap items-center gap-3">
                    <Link
                        to={project.caseStudyLink}
                        className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group/link"
                        style={{ color: project.accent, fontFamily: "var(--heading)" }}
                    >
                        View case study
                        <ArrowIcon className="transition-transform duration-200 group-hover/link:translate-x-1" />
                    </Link>
                    <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#606080] hover:text-[var(--text-primary)] transition-colors duration-200"
                    >
                        Live site
                        <svg className="w-3 h-3 opacity-60" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                            <path d="M2 10L10 2M5 2h5v5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>
        </article>
    );
}

/* ── Section ───────────────────────────────────────────────────── */
export default function FeaturedProjects() {
    const { ref: headRef, visible: headVisible } = useFadeIn(0.2);
    const { ref: ctaRef, visible: ctaVisible } = useFadeIn(0.2);

    return (
        <section
            className="relative w-full bg-[var(--surface)] py-20 sm:py-28 border-t border-[var(--border-subtle)]"
            aria-labelledby="projects-heading"
        >
            <div className="relative w-full px-[var(--px)] sm:px-[var(--px-sm)] lg:px-[var(--px-lg)] xl:px-[var(--px-xl)]">
                {/* Header */}
                <div
                    ref={headRef}
                    className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16"
                    style={{
                        opacity: headVisible ? 1 : 0,
                        transform: headVisible ? "translateY(0)" : "translateY(20px)",
                        transition: "opacity 0.6s ease, transform 0.6s ease",
                    }}
                >
                    <div>
                        <span className="inline-block text-xs font-mono tracking-[0.2em] uppercase text-[var(--cyan)] mb-4">
                            Featured Projects
                        </span>
                        <h2
                            id="projects-heading"
                            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight"
                            style={{ fontFamily: "var(--heading)" }}
                        >
                            Results that{" "}
                            <span className="text-[var(--cyan)]">do the talking.</span>
                        </h2>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                    {PROJECTS.map((project, i) => (
                        <ProjectCard key={project.id} project={project} delay={0.1 + i * 0.12} />
                    ))}
                </div>

                {/* View All CTA */}
                <div
                    ref={ctaRef}
                    className="mt-10 sm:mt-12 flex justify-center"
                    style={{
                        opacity: ctaVisible ? 1 : 0,
                        transform: ctaVisible ? "translateY(0)" : "translateY(16px)",
                        transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
                    }}
                >
                    <Link
                        to="/projects"
                        className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-[#2A2A45] text-sm font-semibold text-[#A0A0C0] hover:text-[var(--cyan)] hover:border-[#00CFFF40] hover:bg-[#00CFFF08] active:scale-[0.97] transition-all duration-200 tracking-wide"
                        style={{ fontFamily: "var(--heading)" }}
                    >
                        View all projects
                        <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}