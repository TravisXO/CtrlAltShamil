import { useEffect, useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { PROJECTS } from "./Projects";

/* ── useFadeIn hook ──────────────────────────────────────────────── */
function useFadeIn(threshold = 0.1) {
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

/* ── Accent colour per project ───────────────────────────────────── */
function projectAccent(project) {
    if (project.tags.includes("SEO") && !project.tags.includes("Web Dev")) return "#2EF09A";
    return "#00CFFF";
}

/* ── Tag chip ────────────────────────────────────────────────────── */
const TAG_STYLES = {
    SEO: { bg: "rgba(46,240,154,0.10)", border: "rgba(46,240,154,0.30)", text: "#2EF09A" },
    "Full-Stack": { bg: "rgba(0,207,255,0.10)", border: "rgba(0,207,255,0.30)", text: "#00CFFF" },
    "Open Source": { bg: "rgba(240,194,46,0.10)", border: "rgba(240,194,46,0.30)", text: "#F0C22E" },
    "Web Dev": { bg: "rgba(192,122,240,0.10)", border: "rgba(192,122,240,0.30)", text: "#C07AF0" },
};
function Tag({ label }) {
    const s = TAG_STYLES[label] || TAG_STYLES["Full-Stack"];
    return (
        <span
            className="text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-full border"
            style={{ background: s.bg, borderColor: s.border, color: s.text }}
        >
            {label}
        </span>
    );
}

/* ── Back arrow ──────────────────────────────────────────────────── */
function BackArrow() {
    return (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 3L5 8l5 5" />
        </svg>
    );
}

/* ── External icon ───────────────────────────────────────────────── */
function ExternalIcon() {
    return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 10L10 2M5 2h5v5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

/* ── Section label ───────────────────────────────────────────────── */
function SectionLabel({ children, accent }) {
    return (
        <p className="text-[10px] font-mono tracking-[0.22em] uppercase" style={{ color: accent || "rgba(255,255,255,0.5)" }}>
            {children}
        </p>
    );
}

/* ── Stat card ───────────────────────────────────────────────────── */
function StatCard({ label, value, sub, accent, dim, delay = 0, visible }) {
    return (
        <div
            className="rounded-2xl border p-5 sm:p-6 flex flex-col gap-2"
            style={{
                borderColor: dim ? "rgba(255,255,255,0.08)" : `${accent}30`,
                background: dim ? "rgba(255,255,255,0.03)" : `${accent}09`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.55s ease ${delay}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
            }}
        >
            <SectionLabel accent={dim ? "rgba(255,255,255,0.4)" : accent}>{label}</SectionLabel>
            <span
                className="text-3xl sm:text-4xl font-black leading-none"
                style={{
                    color: dim ? "rgba(255,255,255,0.55)" : accent,
                    fontFamily: "'Syne', sans-serif",
                    textShadow: dim ? "none" : `0 0 28px ${accent}45`,
                }}
            >
                {value}
            </span>
            {sub && (
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>{sub}</p>
            )}
        </div>
    );
}

/* ── Impressions hero ────────────────────────────────────────────── */
function ImpressionsHero({ value, accent, visible, fadeRef }) {
    return (
        <div
            ref={fadeRef}
            className="relative rounded-3xl border overflow-hidden p-7 sm:p-10"
            style={{
                borderColor: `${accent}25`,
                background: `linear-gradient(135deg, ${accent}07 0%, transparent 60%)`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.65s ease, transform 0.65s cubic-bezier(0.16,1,0.3,1)",
            }}
        >
            {/* Decorative ring */}
            <div
                className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full border opacity-[0.06]"
                style={{ borderColor: accent, borderWidth: 40 }}
                aria-hidden="true"
            />

            <SectionLabel accent={`${accent}90`}>Total Search Impressions — Google Search Console</SectionLabel>

            <div className="flex items-end gap-4 mt-4 flex-wrap">
                <span
                    className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tight leading-none"
                    style={{ color: accent, fontFamily: "'Syne', sans-serif", textShadow: `0 0 100px ${accent}35` }}
                >
                    {value}
                </span>
                <span className="text-base sm:text-lg mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>
                    impressions recorded across the full engagement
                </span>
            </div>
        </div>
    );
}

/* ── Growth badge ────────────────────────────────────────────────── */
function GrowthBadge({ before, after, accent }) {
    const pct = before === 0 ? "∞" : `+${Math.round(((after - before) / before) * 100)}%`;
    return (
        <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-mono font-bold"
            style={{ borderColor: `${accent}40`, background: `${accent}12`, color: accent }}
        >
            <span style={{ fontSize: 10 }}>▲</span>
            {pct} organic growth
        </div>
    );
}

/* ── Before / After ──────────────────────────────────────────────── */
function BeforeAfter({ before, after, accent }) {
    const { ref, visible } = useFadeIn();

    return (
        <div
            ref={ref}
            className="rounded-2xl border overflow-hidden"
            style={{
                borderColor: "rgba(255,255,255,0.08)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease 0.1s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
        >
            {/* Header row */}
            <div
                className="px-6 py-4 flex items-center justify-between gap-4 border-b"
                style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
            >
                <SectionLabel>Organic Traffic — Before &amp; After</SectionLabel>
                <GrowthBadge before={before.traffic} after={after.traffic} accent={accent} />
            </div>

            {/* Two columns */}
            <div className="grid grid-cols-2 divide-x divide-white/[0.06]">
                {/* Before */}
                <div className="flex flex-col gap-5 p-5 sm:p-7">
                    <p className="text-[10px] font-mono tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>Baseline</p>

                    <div>
                        <span
                            className="text-4xl sm:text-5xl font-black leading-none block"
                            style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Syne', sans-serif" }}
                        >
                            {before.traffic === 0 ? "0" : before.traffic.toLocaleString()}
                        </span>
                        <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>avg. monthly visitors</p>
                    </div>

                    <div>
                        <span className="text-xl font-bold block" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Syne', sans-serif" }}>
                            {before.value}
                        </span>
                        <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>est. traffic value / mo</p>
                    </div>

                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <div
                            className="h-full rounded-full"
                            style={{
                                width: before.traffic === 0 ? "3%" : `${Math.min(100, (before.traffic / after.traffic) * 100)}%`,
                                background: "rgba(255,255,255,0.2)",
                            }}
                        />
                    </div>
                </div>

                {/* After */}
                <div className="flex flex-col gap-5 p-5 sm:p-7" style={{ background: `${accent}06` }}>
                    <p className="text-[10px] font-mono tracking-widest uppercase" style={{ color: accent }}>Post-Engagement</p>

                    <div>
                        <span
                            className="text-4xl sm:text-5xl font-black leading-none block"
                            style={{ color: accent, fontFamily: "'Syne', sans-serif", textShadow: `0 0 28px ${accent}45` }}
                        >
                            {after.traffic.toLocaleString()}
                        </span>
                        <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>avg. monthly visitors</p>
                    </div>

                    <div>
                        <span className="text-xl font-bold block" style={{ color: accent, fontFamily: "'Syne', sans-serif" }}>
                            {after.value}
                        </span>
                        <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>est. traffic value / mo</p>
                    </div>

                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: `${accent}20` }}>
                        <div
                            className="h-full rounded-full"
                            style={{
                                width: "100%",
                                background: `linear-gradient(90deg, ${accent}70, ${accent})`,
                                boxShadow: `0 0 8px ${accent}60`,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ── Keyword ranking bars ────────────────────────────────────────── */
function RankingBars({ data, accent }) {
    const { ref, visible } = useFadeIn();
    const max = Math.max(...data.map(d => d.count));
    const colours = [accent, "#00CFFF", "#7B8EFF", "#A78BFA", "#C4B5FD", "#DDD6FE"];

    return (
        <div
            ref={ref}
            className="rounded-2xl border p-5 sm:p-7"
            style={{
                borderColor: "rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.02)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease 0.1s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
        >
            <SectionLabel>Keyword Ranking Distribution</SectionLabel>

            <div className="flex items-end gap-2 sm:gap-3 h-20 mt-5">
                {data.map((d, i) => (
                    <div key={d.range} className="flex flex-col items-center gap-1.5 flex-1">
                        <span className="text-xs font-mono font-bold" style={{ color: colours[i % colours.length] }}>
                            {d.count}
                        </span>
                        <div
                            className="w-full rounded-sm"
                            style={{
                                height: `${Math.max(6, (d.count / max) * 52)}px`,
                                background: colours[i % colours.length],
                                opacity: visible ? 0.85 : 0,
                                transition: `opacity 0.4s ease ${0.2 + i * 0.06}s`,
                            }}
                        />
                    </div>
                ))}
            </div>

            <div className="flex gap-2 sm:gap-3 mt-2">
                {data.map((d) => (
                    <div key={d.range} className="flex-1 text-center text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.45)" }}>
                        {d.range}
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── What I Did ──────────────────────────────────────────────────── */
function WhatIDid({ items, accent }) {
    const { ref, visible } = useFadeIn();
    return (
        <div ref={ref}>
            <div className="flex items-center gap-3 mb-7">
                <div className="w-1 h-8 rounded-full" style={{ background: accent }} />
                <h2
                    className="text-2xl sm:text-3xl font-black tracking-tight"
                    style={{ color: "#F2F2FA", fontFamily: "'Syne', sans-serif" }}
                >
                    What I Did
                </h2>
            </div>

            <ol className="flex flex-col gap-3">
                {items.map((item, i) => (
                    <li
                        key={i}
                        className="flex gap-4 items-start rounded-2xl border p-5 sm:p-6 group"
                        style={{
                            borderColor: "rgba(255,255,255,0.07)",
                            background: "rgba(255,255,255,0.025)",
                            opacity: visible ? 1 : 0,
                            transform: visible ? "translateY(0)" : "translateY(12px)",
                            transition: `opacity 0.5s ease ${0.05 + i * 0.07}s, transform 0.5s ease ${0.05 + i * 0.07}s`,
                        }}
                    >
                        <span
                            className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black font-mono mt-0.5"
                            style={{
                                background: `${accent}15`,
                                color: accent,
                                border: `1px solid ${accent}35`,
                            }}
                        >
                            {i + 1}
                        </span>
                        <p className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.80)" }}>
                            {item}
                        </p>
                    </li>
                ))}
            </ol>
        </div>
    );
}

/* ── Horizontal rule ─────────────────────────────────────────────── */
function Divider() {
    return <div className="w-full h-px my-10 sm:my-12" style={{ background: "rgba(255,255,255,0.07)" }} />;
}

/* ── Evidence images ─────────────────────────────────────────────── */
function EvidenceImages({ images, accent }) {
    const { ref, visible } = useFadeIn();
    if (!images?.length) return null;
    return (
        <div ref={ref} className="flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-6 rounded-full" style={{ background: accent }} />
                <h2
                    className="text-xl sm:text-2xl font-black tracking-tight"
                    style={{ color: "#F2F2FA", fontFamily: "'Syne', sans-serif" }}
                >
                    Results &amp; Evidence
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {images.map((img, i) => (
                    <figure
                        key={i}
                        className="flex flex-col rounded-2xl border overflow-hidden"
                        style={{
                            borderColor: "rgba(255,255,255,0.07)",
                            background: "rgba(255,255,255,0.02)",
                            opacity: visible ? 1 : 0,
                            transform: visible ? "translateY(0)" : "translateY(16px)",
                            transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
                        }}
                    >
                        <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                        {img.caption && (
                            <figcaption
                                className="px-4 py-3 text-xs font-mono leading-relaxed border-t"
                                style={{
                                    color: "rgba(255,255,255,0.50)",
                                    borderColor: "rgba(255,255,255,0.06)",
                                }}
                            >
                                {img.caption}
                            </figcaption>
                        )}
                    </figure>
                ))}
            </div>
        </div>
    );
}

/* ── CaseStudy page ──────────────────────────────────────────────── */
export default function CaseStudy() {
    const { id } = useParams();
    const project = PROJECTS.find(p => p.id === id);

    // Hooks must be called before any early return
    const { ref: heroRef, visible: heroVisible } = useFadeIn(0.05);
    const { ref: impRef, visible: impVisible } = useFadeIn(0.08);

    if (!project || !project.caseStudy) return <Navigate to="/projects" replace />;

    const accent = projectAccent(project);
    const cs = project.caseStudy;

    const liveLink = project.links.find(l => l.primary);

    return (
        <main
            id="main-content"
            className="relative w-full bg-[#080810] min-h-screen"
            aria-labelledby="cs-heading"
        >
            {/* Ambient glows */}
            <div
                className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] opacity-[0.06] blur-3xl"
                style={{ background: `radial-gradient(ellipse, ${accent} 0%, transparent 70%)` }}
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute top-60 right-0 w-[400px] h-[400px] opacity-[0.03] blur-3xl"
                style={{ background: `radial-gradient(ellipse, ${accent} 0%, transparent 70%)` }}
                aria-hidden="true"
            />

            <div className="relative w-full px-[var(--px)] sm:px-[var(--px-sm)] lg:px-[var(--px-lg)] xl:px-[var(--px-xl)] py-10 sm:py-16">

                {/* ── Back button ── */}
                <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 text-sm font-mono tracking-widest uppercase transition-colors duration-200 mb-12 sm:mb-14"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#F2F2FA"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
                >
                    <BackArrow />
                    All Projects
                </Link>

                {/* ── Hero ── */}
                <div
                    ref={heroRef}
                    className="mb-12 sm:mb-16"
                    style={{
                        opacity: heroVisible ? 1 : 0,
                        transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                        transition: "opacity 0.7s ease, transform 0.7s ease",
                    }}
                >
                    {/* Tags + eyebrow row */}
                    <div className="flex flex-wrap items-center gap-2 mb-5">
                        <span
                            className="text-xs font-mono tracking-[0.22em] uppercase px-3 py-1 rounded-full border"
                            style={{ color: accent, borderColor: `${accent}35`, background: `${accent}0D` }}
                        >
                            Case Study
                        </span>
                        {project.tags.map(t => <Tag key={t} label={t} />)}
                    </div>

                    <h1
                        id="cs-heading"
                        className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-5 max-w-3xl"
                        style={{ color: "#F2F2FA", fontFamily: "'Syne', sans-serif" }}
                    >
                        {project.title}
                    </h1>

                    <p
                        className="text-base sm:text-lg max-w-2xl leading-relaxed mb-7"
                        style={{ color: "rgba(255,255,255,0.60)" }}
                    >
                        {project.summary}
                    </p>

                    {liveLink && (
                        <a
                            href={liveLink.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-mono px-5 py-2.5 rounded-xl border transition-all duration-200"
                            style={{ borderColor: `${accent}40`, color: accent, background: `${accent}0D` }}
                            onMouseEnter={e => { e.currentTarget.style.background = `${accent}18`; }}
                            onMouseLeave={e => { e.currentTarget.style.background = `${accent}0D`; }}
                        >
                            View Live Site
                            <ExternalIcon />
                        </a>
                    )}
                </div>

                {/* ── Impressions hero block ── */}
                <div className="mb-4">
                    <ImpressionsHero
                        value={cs.impressions}
                        accent={accent}
                        fadeRef={impRef}
                        visible={impVisible}
                    />
                </div>

                {/* ── Stat cards: before / after visitors ── */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                    <StatCard
                        label="Visitors — Before"
                        value={cs.before.traffic === 0 ? "0" : cs.before.traffic.toLocaleString()}
                        sub={`${cs.before.value} / mo est. value`}
                        accent={accent}
                        dim
                        delay={0.05}
                        visible={impVisible}
                    />
                    <StatCard
                        label="Visitors — After"
                        value={cs.after.traffic.toLocaleString()}
                        sub={`${cs.after.value} / mo est. value`}
                        accent={accent}
                        delay={0.12}
                        visible={impVisible}
                    />
                </div>

                {/* ── Before / After detailed comparison ── */}
                <div className="mb-4">
                    <BeforeAfter before={cs.before} after={cs.after} accent={accent} />
                </div>

                {/* ── Keyword ranking bars ── */}
                {project.rankingData && (
                    <div className="mb-4">
                        <RankingBars data={project.rankingData} accent={accent} />
                    </div>
                )}
                {/* ── Evidence images ── */}
                {cs.images && (
                    <div className="mb-4">
                        <EvidenceImages images={cs.images} accent={accent} />
                    </div>
                )}
                <Divider />

                {/* ── What I Did ── */}
                <WhatIDid items={cs.whatIDid} accent={accent} />

            </div>
        </main>
    );
}