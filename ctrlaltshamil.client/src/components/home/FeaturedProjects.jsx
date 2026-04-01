import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const PROJECTS = [
    {
        id: "classic-zambia-safaris",
        title: "Classic Zambia Safaris",
        category: "SEO Campaign",
        tags: ["Technical SEO", "Content Strategy", "Core Web Vitals"],
        description:
            "Full technical SEO overhaul for a Zambian safari operator — from site architecture and schema markup to content strategy and Core Web Vitals optimisation. Turned a near-invisible site into a top-ranking lead generator.",
        stats: [
            { value: "900%",    label: "Traffic Growth" },
            { value: "102%",    label: "Visibility Increase" },
            { value: "16,212",  label: "Total Impressions" },
        ],
        accent: "#00FF94",
        accentBg: "rgba(0,255,148,0.05)",
        accentBorder: "rgba(0,255,148,0.15)",
        index: "01",
    },
    {
        id: "house-to-home",
        title: "House To Home",
        category: "Full-Stack + SEO",
        tags: ["ASP.NET", "React", "PostgreSQL", "Technical SEO"],
        description:
            "End-to-end property listing platform built with ASP.NET and React, paired with a targeted SEO strategy. Delivered a fast, accessible product with strong organic reach from launch.",
        stats: [
            { value: "80+",  label: "Keywords on Page 1" },
            { value: "90+",  label: "Lighthouse Score" },
        ],
        accent: "#00CFFF",
        accentBg: "rgba(0,207,255,0.05)",
        accentBorder: "rgba(0,207,255,0.15)",
        index: "02",
    },
];

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

function ProjectCard({ project, delay }) {
    const { ref, visible } = useFadeIn(0.1);

    return (
        <article
            ref={ref}
            className="group relative flex flex-col rounded-2xl border bg-[#0B0B18] overflow-hidden h-full"
            style={{
                borderColor: project.accentBorder,
                background: project.accentBg,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.65s ease ${delay}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
            }}
            aria-label={project.title}
        >
            {/* Top accent line on hover */}
            <div
                className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, transparent, ${project.accent}, transparent)` }}
                aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col h-full p-6 sm:p-8 gap-6">

                {/* Top row: index + category badge */}
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
                    className="text-2xl sm:text-3xl font-black text-[#F2F2FA] leading-tight tracking-tight group-hover:text-white transition-colors duration-200"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
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
                <p className="text-sm sm:text-base text-[#7070A0] leading-relaxed flex-1">
                    {project.description}
                </p>

                {/* Divider */}
                <div className="h-px w-full" style={{ background: `${project.accent}15` }} aria-hidden="true" />

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {project.stats.map(({ value, label }) => (
                        <div key={label} className="flex flex-col gap-1">
                            <span
                                className="text-2xl sm:text-3xl font-black leading-none tracking-tight"
                                style={{ fontFamily: "'Space Grotesk', sans-serif", color: project.accent }}
                            >
                                {value}
                            </span>
                            <span className="text-[11px] font-mono text-[#606080] tracking-wider uppercase leading-tight">
                                {label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    );
}

export default function FeaturedProjects() {
    const { ref: headRef, visible: headVisible } = useFadeIn(0.2);
    const { ref: ctaRef, visible: ctaVisible } = useFadeIn(0.2);

    return (
        <section
            className="relative w-full bg-[#080810] py-20 sm:py-28 border-t border-[#1A1A30]"
            aria-labelledby="projects-heading"
        >
            <div className="relative w-full px-4 sm:px-8 lg:px-16 xl:px-24">

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
                        <span className="inline-block text-xs font-mono tracking-[0.2em] uppercase text-[#00CFFF] mb-4">
                            Featured Projects
                        </span>
                        <h2
                            id="projects-heading"
                            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F2F2FA] tracking-tight leading-tight"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            Work that{" "}
                            <span className="text-[#00CFFF]">speaks for itself.</span>
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
                        className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-[#2A2A45] text-sm font-semibold text-[#A0A0C0] hover:text-[#00CFFF] hover:border-[#00CFFF40] hover:bg-[#00CFFF08] active:scale-95 transition-all duration-200 tracking-wide"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        View All Projects
                        <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                            <path fillRule="evenodd" d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
