import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import headshot from "../assets/headshot.jpg";

/* ── useFadeIn ───────────────────────────────────────────────────── */
function useFadeIn(threshold = 0.08) {
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

/* ── Section wrapper with fade ───────────────────────────────────── */
function FadeSection({ children, className = "", delay = 0 }) {
    const { ref, visible } = useFadeIn();
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.75s ease ${delay}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
            }}
        >
            {children}
        </div>
    );
}

/* ── Editorial section heading ───────────────────────────────────── */
function SectionHeading({ eyebrow, title, accent = "#00CFFF" }) {
    return (
        <div className="mb-10 sm:mb-12">
            <div className="flex items-center gap-4 mb-4">
                <div className="h-px flex-1 max-w-[3rem]" style={{ background: accent }} />
                <span
                    className="text-[10px] font-mono tracking-[0.25em] uppercase"
                    style={{ color: accent }}
                >
                    {eyebrow}
                </span>
            </div>
            <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05]"
                style={{ color: "#F2F2FA", fontFamily: "'Syne', sans-serif" }}
            >
                {title}
            </h2>
        </div>
    );
}

/* ── Divider ─────────────────────────────────────────────────────── */
function Divider() {
    return (
        <div className="w-full h-px my-16 sm:my-24" style={{ background: "rgba(255,255,255,0.06)" }} />
    );
}

/* ══════════════════════════════════════════
   HERO SECTION
══════════════════════════════════════════ */
function HeroSection() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        const t = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(t);
    }, []);

    return (
        <section
            className="relative w-full min-h-svh flex flex-col overflow-hidden"
            aria-label="Hero — Alexander Shamil"
        >
            {/* Background grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage: "linear-gradient(rgba(0,207,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,207,255,1) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
                aria-hidden="true"
            />

            {/* Top fade */}
            <div
                className="pointer-events-none absolute inset-x-0 top-0 h-40"
                style={{ background: "linear-gradient(to bottom, #080810 0%, transparent 100%)" }}
                aria-hidden="true"
            />

            {/* Bottom fade */}
            <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-48 sm:h-64"
                style={{ background: "linear-gradient(to top, #080810 0%, transparent 100%)" }}
                aria-hidden="true"
            />

            {/* Dual ambient glows */}
            <div
                className="pointer-events-none absolute top-0 left-0 w-[500px] h-[500px] opacity-[0.08] blur-3xl"
                style={{ background: "radial-gradient(ellipse, #00CFFF 0%, transparent 70%)" }}
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute top-20 right-0 w-[400px] h-[400px] opacity-[0.07] blur-3xl"
                style={{ background: "radial-gradient(ellipse, #aa3bff 0%, transparent 70%)" }}
                aria-hidden="true"
            />

            {/* Issue label — top right */}
            <div
                className="absolute top-8 right-0 flex items-center gap-3 px-6 sm:px-8 lg:px-16 xl:px-24"
                style={{
                    opacity: mounted ? 1 : 0,
                    transition: "opacity 1s ease 0.8s",
                }}
            >
                <span className="text-[9px] font-mono tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>
                    About · Issue No.01
                </span>
                <div className="w-8 h-px" style={{ background: "rgba(255,255,255,0.15)" }} />
            </div>

            {/* Main hero content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center w-full px-4 sm:px-8 lg:px-16 xl:px-24 pt-32 sm:pt-40 pb-16 sm:pb-24">

                {/* Photo + headline row */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">

                    {/* Left — text */}
                    <div className="flex flex-col gap-6 max-w-2xl">

                        {/* Badge */}
                        <div
                            style={{
                                opacity: mounted ? 1 : 0,
                                transform: mounted ? "translateY(0)" : "translateY(20px)",
                                transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
                            }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-[0.18em] uppercase text-[#00CFFF] bg-[#00CFFF0F] border border-[#00CFFF25]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] shadow-[0_0_6px_#00FF94] animate-pulse" aria-hidden="true" />
                                Surgical Precision
                            </span>
                        </div>

                        {/* Headline — line-by-line reveal */}
                        <h1
                            className="text-[clamp(3rem,10vw,7.5rem)] font-black leading-[0.92] tracking-tight text-[#F2F2FA]"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            {[
                                { text: "Alexander", cyan: false },
                                { text: "Shamil.", cyan: true },
                            ].map(({ text, cyan }, i) => (
                                <span key={text} className="block overflow-hidden">
                                    <span
                                        className="block"
                                        style={{
                                            opacity: mounted ? 1 : 0,
                                            transform: mounted ? "translateY(0)" : "translateY(110%)",
                                            transition: `opacity 0.7s ease ${0.25 + i * 0.12}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.25 + i * 0.12}s`,
                                            ...(cyan ? {
                                                background: "linear-gradient(90deg, #00CFFF 0%, #aa3bff 100%)",
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                                backgroundClip: "text",
                                            } : {}),
                                        }}
                                    >
                                        {text}
                                    </span>
                                </span>
                            ))}
                        </h1>

                        {/* Subheadline */}
                        <p
                            className="text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl font-mono text-[#A0A0C0]"
                            style={{
                                opacity: mounted ? 1 : 0,
                                transform: mounted ? "translateY(0)" : "translateY(20px)",
                                transition: "opacity 0.7s ease 0.65s, transform 0.7s ease 0.65s",
                            }}
                        >
                            Software Engineering graduate.{" "}
                            <span className="text-[#F2F2FA]">Full-Stack Developer.</span>{" "}
                            Technical SEO specialist. Building digital products where robust architecture meets discoverability.
                        </p>

                        {/* Role chips */}
                        <div
                            className="flex flex-wrap gap-2"
                            style={{
                                opacity: mounted ? 1 : 0,
                                transform: mounted ? "translateY(0)" : "translateY(20px)",
                                transition: "opacity 0.7s ease 0.8s, transform 0.7s ease 0.8s",
                            }}
                        >
                            {["ASP.NET 8", "React", "Technical SEO", "Full-Stack", "Lusaka, ZM"].map((chip, i) => (
                                <span
                                    key={chip}
                                    className="text-xs font-mono tracking-wider px-3 py-1.5 rounded-full border"
                                    style={{
                                        borderColor: i % 2 === 0 ? "rgba(0,207,255,0.25)" : "rgba(170,59,255,0.25)",
                                        color: i % 2 === 0 ? "#00CFFF" : "#aa3bff",
                                        background: i % 2 === 0 ? "rgba(0,207,255,0.06)" : "rgba(170,59,255,0.06)",
                                    }}
                                >
                                    {chip}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right — photo */}
                    <div
                        className="relative shrink-0"
                        style={{
                            opacity: mounted ? 1 : 0,
                            transform: mounted ? "translateY(0)" : "translateY(30px)",
                            transition: "opacity 1s ease 0.4s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.4s",
                        }}
                    >
                        {/* Decorative border frame */}
                        <div
                            className="absolute -inset-3 rounded-2xl opacity-30"
                            style={{ background: "linear-gradient(135deg, #00CFFF, #aa3bff)", borderRadius: "1.25rem" }}
                            aria-hidden="true"
                        />
                        <div
                            className="absolute -inset-3 rounded-2xl"
                            style={{ background: "#080810", borderRadius: "1.15rem", inset: "-10px" }}
                            aria-hidden="true"
                        />
                        <img
                            src={headshot}
                            alt="Alexander Shamil"
                            className="relative w-64 h-80 sm:w-80 sm:h-[26rem] object-cover rounded-xl"
                        />
                    </div>
                </div>

                {/* Scroll hint */}
                <div
                    className="mt-16 sm:mt-20 flex items-center gap-3"
                    aria-hidden="true"
                    style={{
                        opacity: mounted ? 0.4 : 0,
                        transition: "opacity 1s ease 1.3s",
                    }}
                >
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-px h-8 bg-gradient-to-b from-[#FFFFFF] to-transparent animate-pulse" />
                    </div>
                    <span className="text-[11px] font-mono text-[#FFFFFF] tracking-[0.2em] uppercase">Scroll</span>
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════
   SURGICAL PRECISION MANIFESTO
══════════════════════════════════════════ */
function ManifestoSection() {
    return (
        <FadeSection>
            <div
                className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16"
                style={{
                    background: "linear-gradient(135deg, rgba(0,207,255,0.05) 0%, rgba(170,59,255,0.05) 100%)",
                    border: "1px solid rgba(255,255,255,0.07)",
                }}
            >
                {/* Large decorative quote mark */}
                <span
                    className="pointer-events-none absolute top-4 right-8 text-[10rem] font-black leading-none select-none"
                    style={{ color: "rgba(0,207,255,0.04)", fontFamily: "'Syne', sans-serif" }}
                    aria-hidden="true"
                >
                    "
                </span>

                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-px" style={{ background: "#00CFFF" }} />
                    <span className="text-[10px] font-mono tracking-[0.25em] uppercase" style={{ color: "#00CFFF" }}>
                        Philosophy
                    </span>
                </div>

                <blockquote>
                    <p
                        className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight mb-6 max-w-4xl"
                        style={{ color: "#F2F2FA", fontFamily: "'Syne', sans-serif" }}
                    >
                        Development isn't just about{" "}
                        <span style={{ color: "#00CFFF" }}>functionality</span>
                        {" "}— it's about building digital products that are as robust and scalable as they are{" "}
                        <span style={{ color: "#aa3bff" }}>discoverable</span>.
                    </p>
                    <p
                        className="text-base sm:text-lg leading-relaxed max-w-2xl"
                        style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                        Surgical Precision isn't a buzzword. It's the commitment to never shipping something
                        you can't stand behind — where every architectural decision, every query optimisation,
                        every redirect chain is deliberate and defensible.
                    </p>
                </blockquote>
            </div>
        </FadeSection>
    );
}

/* ══════════════════════════════════════════
   TECHNICAL WORLD
══════════════════════════════════════════ */
function TechnicalSection() {
    const stack = [
        { label: "ASP.NET Core 8", cat: "backend" },
        { label: "React", cat: "frontend" },
        { label: "Entity Framework", cat: "backend" },
        { label: "SQL Server", cat: "backend" },
        { label: "Tailwind CSS", cat: "frontend" },
        { label: "Vite", cat: "frontend" },
        { label: "CI/CD · GitHub", cat: "devops" },
        { label: "Render", cat: "devops" },
        { label: "Cloudflare", cat: "devops" },
        { label: "Google Search Console", cat: "seo" },
        { label: "Ahrefs", cat: "seo" },
        { label: "Core Web Vitals", cat: "seo" },
        { label: "XML Sitemaps", cat: "seo" },
        { label: "Lighthouse", cat: "seo" },
        { label: "React Router", cat: "frontend" },
    ];

    const catColour = {
        backend: { text: "#00CFFF", border: "rgba(0,207,255,0.25)", bg: "rgba(0,207,255,0.06)" },
        frontend: { text: "#aa3bff", border: "rgba(170,59,255,0.25)", bg: "rgba(170,59,255,0.06)" },
        devops: { text: "#2EF09A", border: "rgba(46,240,154,0.25)", bg: "rgba(46,240,154,0.06)" },
        seo: { text: "#F0C22E", border: "rgba(240,194,46,0.25)", bg: "rgba(240,194,46,0.06)" },
    };

    return (
        <section>
            <FadeSection>
                <SectionHeading eyebrow="The Technical World" title="Architecture. Precision. Craft." accent="#00CFFF" />
            </FadeSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                {/* Left — copy */}
                <FadeSection delay={0.1}>
                    <div className="flex flex-col gap-6">
                        <p className="text-base sm:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                            My technical toolkit is centred around the <span style={{ color: "#00CFFF" }}>ASP.NET 8 ecosystem</span> and <span style={{ color: "#aa3bff" }}>React</span> — bridging the gap between powerful back-end logic and seamless, interactive user experiences.
                        </p>
                        <p className="text-base sm:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                            I take a deep interest in the "invisible" work that defines a site's success — auditing Core Web Vitals, navigating complex URL redirect logic, optimising Entity Framework queries. I view a project's architecture much like a living organism where every component must work in harmony.
                        </p>
                        <p className="text-base sm:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                            Whether setting up CI/CD pipelines on GitHub or fine-tuning site architecture to eliminate 301 errors, my focus remains on delivering <span style={{ color: "#00CFFF" }}>production-ready, professional-grade solutions</span>.
                        </p>

                        {/* Legend */}
                        <div className="flex flex-wrap gap-4 pt-2">
                            {Object.entries(catColour).map(([cat, c]) => (
                                <div key={cat} className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full" style={{ background: c.text }} />
                                    <span className="text-[10px] font-mono uppercase tracking-widest capitalize" style={{ color: "rgba(255,255,255,0.35)" }}>{cat}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeSection>

                {/* Right — chip grid */}
                <FadeSection delay={0.2}>
                    <div className="flex flex-wrap gap-2">
                        {stack.map((s) => {
                            const c = catColour[s.cat];
                            return (
                                <span
                                    key={s.label}
                                    className="text-xs font-mono tracking-wide px-3 py-2 rounded-xl border"
                                    style={{ color: c.text, borderColor: c.border, background: c.bg }}
                                >
                                    {s.label}
                                </span>
                            );
                        })}
                    </div>
                </FadeSection>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════
   TIMELINE
══════════════════════════════════════════ */
function TimelineSection() {
    const events = [
        {
            year: "2025 →",
            title: "BNOP Media — SEO & Web Dev",
            desc: "Working across client projects as a software engineer and SEO specialist, blending technical build work with search strategy.",
            accent: "#00CFFF",
        },
        {
            year: "2025",
            title: "HouseToHome — Built from scratch",
            desc: "Designed and deployed a full React + ASP.NET Core 8 real estate platform with server-side meta injection, CI/CD on Render, and a 95+ Lighthouse score.",
            accent: "#aa3bff",
        },
        {
            year: "2024",
            title: "Classic Zambia Safaris — SEO Engagement",
            desc: "3-month technical SEO campaign growing monthly organic visitors from 132 to 227, DR 19 to 23, with 137 keywords entering rankings.",
            accent: "#2EF09A",
        },
        {
            year: "2024",
            title: "Software Engineering Graduate",
            desc: "Completed a Software Engineering degree — solidifying the architectural thinking and systems-level perspective that underpins everything I build.",
            accent: "#F0C22E",
        },
    ];

    return (
        <section>
            <FadeSection>
                <SectionHeading eyebrow="Career Journey" title="The build log." accent="#aa3bff" />
            </FadeSection>

            <div className="relative flex flex-col gap-0">
                {/* Vertical line */}
                <div
                    className="absolute left-[11px] top-3 bottom-3 w-px"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                    aria-hidden="true"
                />

                {events.map((e, i) => (
                    <FadeSection key={i} delay={i * 0.1}>
                        <div className="relative flex gap-6 pb-10">
                            {/* Dot */}
                            <div className="relative shrink-0 mt-1">
                                <div
                                    className="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                                    style={{ borderColor: e.accent, background: "#080810" }}
                                >
                                    <div className="w-2 h-2 rounded-full" style={{ background: e.accent }} />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col gap-2 pt-0.5">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className="text-xs font-mono tracking-widest" style={{ color: e.accent }}>{e.year}</span>
                                    <h3
                                        className="text-base sm:text-lg font-bold"
                                        style={{ color: "#F2F2FA", fontFamily: "'Syne', sans-serif" }}
                                    >
                                        {e.title}
                                    </h3>
                                </div>
                                <p className="text-sm leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.55)" }}>
                                    {e.desc}
                                </p>
                            </div>
                        </div>
                    </FadeSection>
                ))}
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════
   VALUES
══════════════════════════════════════════ */
function ValuesSection() {
    const values = [
        {
            symbol: "01",
            title: "No yes-man mentality",
            body: "I prioritise what is functional and efficient over what is trendy. Good engineering doesn't bend to hype.",
            accent: "#00CFFF",
        },
        {
            symbol: "02",
            title: "Layman clarity over jargon",
            body: "I communicate in plain language. If you can't explain it simply, you don't understand it well enough.",
            accent: "#aa3bff",
        },
        {
            symbol: "03",
            title: "Meticulous documentation",
            body: "Code is read more than it's written. Documentation is not optional — it's part of the deliverable.",
            accent: "#2EF09A",
        },
        {
            symbol: "04",
            title: "The why before the how",
            body: "I care about the reasoning behind every architectural decision, not just the implementation.",
            accent: "#F0C22E",
        },
    ];

    return (
        <section>
            <FadeSection>
                <SectionHeading eyebrow="Principles" title="What I stand by." accent="#00CFFF" />
            </FadeSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values.map((v, i) => (
                    <FadeSection key={i} delay={i * 0.08}>
                        <div
                            className="flex flex-col gap-4 rounded-2xl border p-6 sm:p-7 h-full"
                            style={{
                                borderColor: "rgba(255,255,255,0.07)",
                                background: "rgba(255,255,255,0.02)",
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <span
                                    className="text-3xl font-black font-mono leading-none"
                                    style={{ color: v.accent, opacity: 0.35, fontFamily: "'Syne', sans-serif" }}
                                >
                                    {v.symbol}
                                </span>
                                <div className="w-6 h-px" style={{ background: v.accent, opacity: 0.4 }} />
                            </div>
                            <h3
                                className="text-lg font-bold leading-snug"
                                style={{ color: "#F2F2FA", fontFamily: "'Syne', sans-serif" }}
                            >
                                {v.title}
                            </h3>
                            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                                {v.body}
                            </p>
                        </div>
                    </FadeSection>
                ))}
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════
   NOW — CURRENTLY WORKING ON
══════════════════════════════════════════ */
function NowSection() {
    const items = [
        { label: "Deep in SEO remediation for HouseToHome", accent: "#00CFFF" },
        { label: "Building out Ctrl Alt Shamil blog — Developer's Nexus series", accent: "#aa3bff" },
        { label: "Exploring international client work and remote contracts", accent: "#2EF09A" },
        { label: "Fourth iteration of this portfolio", accent: "#F0C22E" },
    ];

    return (
        <FadeSection>
            <div
                className="rounded-2xl border p-7 sm:p-10"
                style={{
                    borderColor: "rgba(0,207,255,0.15)",
                    background: "rgba(0,207,255,0.03)",
                }}
            >
                <div className="flex items-center gap-3 mb-6">
                    <span
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ background: "#00CFFF", boxShadow: "0 0 8px #00CFFF" }}
                    />
                    <span className="text-xs font-mono tracking-[0.22em] uppercase" style={{ color: "#00CFFF" }}>
                        Currently — Now
                    </span>
                </div>

                <h2
                    className="text-2xl sm:text-3xl font-black tracking-tight mb-7"
                    style={{ color: "#F2F2FA", fontFamily: "'Syne', sans-serif" }}
                >
                    What I'm working on right now.
                </h2>

                <ul className="flex flex-col gap-3">
                    {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: item.accent }} />
                            <span className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.70)" }}>
                                {item.label}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </FadeSection>
    );
}

/* ══════════════════════════════════════════
   OTHER WORLD — LIGHTBOX
══════════════════════════════════════════ */
function InterestLightbox({ item, onClose }) {
    /* Close on ESC key */
    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    /* Lock body scroll while open */
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    return (
        /* Backdrop */
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            style={{ background: "rgba(8,8,16,0.85)", backdropFilter: "blur(10px)" }}
            onClick={onClose}
            aria-modal="true"
            role="dialog"
            aria-label={`About ${item.title}`}
        >
            {/* Panel */}
            <div
                className="relative w-full max-w-md rounded-2xl p-7 sm:p-9 flex flex-col gap-5"
                style={{
                    background: "linear-gradient(135deg, #0D080F 0%, #0A080F 100%)",
                    border: "1px solid rgba(170,59,255,0.3)",
                    boxShadow: "0 0 60px rgba(170,59,255,0.12), 0 24px 48px rgba(0,0,0,0.6)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative top accent */}
                <div
                    className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
                    style={{ background: "linear-gradient(to right, transparent, #aa3bff80, transparent)" }}
                    aria-hidden="true"
                />

                {/* Ambient glow */}
                <div
                    className="pointer-events-none absolute top-0 right-0 w-48 h-48 opacity-[0.07] blur-2xl"
                    style={{ background: "radial-gradient(ellipse, #aa3bff 0%, transparent 70%)" }}
                    aria-hidden="true"
                />

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-150"
                    style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(170,59,255,0.2)"; e.currentTarget.style.color = "#aa3bff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
                    aria-label="Close"
                >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                </button>

                {/* Type label */}
                <span
                    className="text-[9px] font-mono tracking-[0.3em] uppercase w-fit px-2.5 py-1 rounded-full"
                    style={{
                        color: "#aa3bff",
                        background: "rgba(170,59,255,0.1)",
                        border: "1px solid rgba(170,59,255,0.2)",
                    }}
                >
                    {item.type}
                </span>

                {/* Title */}
                <h3
                    className="text-2xl sm:text-3xl font-black tracking-tight leading-tight pr-6"
                    style={{ color: "#F2F2FA", fontFamily: "'Syne', sans-serif" }}
                >
                    {item.title}
                </h3>

                {/* Trait tags */}
                <div className="flex flex-wrap gap-2">
                    {item.traits.map((trait) => (
                        <span
                            key={trait}
                            className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full"
                            style={{
                                color: "rgba(170,59,255,0.8)",
                                background: "rgba(170,59,255,0.07)",
                                border: "1px solid rgba(170,59,255,0.15)",
                            }}
                        >
                            {trait}
                        </span>
                    ))}
                </div>

                {/* Divider accent */}
                <div className="h-px w-full" style={{ background: "rgba(170,59,255,0.15)" }} aria-hidden="true" />

                {/* Personal description */}
                <p
                    className="text-sm sm:text-base leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.70)" }}
                >
                    {item.description}
                </p>
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════
   OTHER WORLD — HOBBIES
══════════════════════════════════════════ */
function OtherWorldSection() {
    const [selected, setSelected] = useState(null);

    const interests = [
        {
            title: "Berserk",
            type: "Manga",
            note: "Perseverance, Trauma, Will",
            traits: ["Perseverance", "Trauma", "Will"],
            description: "Berserk shaped how I think about endurance — Guts taught me that strength isn't the absence of suffering, it's continuing to move forward despite carrying wounds that never fully heal.",
        },
        {
            title: "Batman",
            type: "Hero",
            note: "Morals, Character Development, Growth",
            traits: ["Morals", "Character Development", "Growth"],
            description: "Batman shaped how I think about discipline and integrity — the idea that who you are when no one's watching defines you more than any achievement ever could.",
        },
        {
            title: "Supernatural",
            type: "Series",
            note: "Character journey construction",
            traits: ["Loyalty", "Sacrifice", "Identity"],
            description: "Supernatural showed me that loyalty and showing up for the people you care about — even when it costs you everything — is the most quietly human thing there is.",
        },
        {
            title: "The Elder Scrolls",
            type: "Game",
            note: "Agency, Lore, Morality",
            traits: ["Agency", "Lore", "Morality"],
            description: "The Elder Scrolls taught me that the best systems are the ones deep enough to lose yourself in — every choice carries weight, and the world reacts to who you decide to be.",
        },
        {
            title: "Fantastic Mr Fox",
            type: "Animation",
            note: "Selfless, Purpose, Identity",
            traits: ["Selflessness", "Purpose", "Identity"],
            description: "Fantastic Mr Fox reminded me that knowing who you are — and being willing to change for the people you love — is a kind of quiet courage most people overlook.",
        },
        {
            title: "The Hitchhiker's Guide",
            type: "Reading",
            note: "Absurdity, Perspective, Resilience",
            traits: ["Absurdity", "Perspective", "Resilience"],
            description: "This book reshaped how I handle uncertainty — when the universe is unpredictable and absurd, the only sane response is curiosity and a good sense of humour.",
        },
        {
            title: "Eureka 7",
            type: "Anime",
            note: "Connection, Discovery, Maturity",
            traits: ["Connection", "Discovery", "Maturity"],
            description: "Eureka 7 shaped how I think about growth — real maturity comes from learning to understand others so deeply that their world genuinely becomes part of yours.",
        },
    ];

    return (
        <>
            {/* Lightbox */}
            {selected !== null && (
                <InterestLightbox
                    item={interests[selected]}
                    onClose={() => setSelected(null)}
                />
            )}

            <section
                className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16"
                style={{
                    background: "linear-gradient(135deg, #0D080F 0%, #08080D 60%, #0A080F 100%)",
                    border: "1px solid rgba(170,59,255,0.15)",
                }}
            >
                {/* Purple world ambiance */}
                <div
                    className="pointer-events-none absolute top-0 right-0 w-[500px] h-[400px] opacity-[0.08] blur-3xl"
                    style={{ background: "radial-gradient(ellipse, #aa3bff 0%, transparent 70%)" }}
                    aria-hidden="true"
                />
                <div
                    className="pointer-events-none absolute bottom-0 left-0 w-[300px] h-[300px] opacity-[0.05] blur-3xl"
                    style={{ background: "radial-gradient(ellipse, #aa3bff 0%, transparent 70%)" }}
                    aria-hidden="true"
                />

                {/* Noise texture overlay */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                    }}
                    aria-hidden="true"
                />

                <div className="relative">
                    <FadeSection>
                        <div className="flex items-center gap-4 mb-3">
                            <div className="h-px w-12" style={{ background: "#aa3bff" }} />
                            <span className="text-[10px] font-mono tracking-[0.25em] uppercase" style={{ color: "#aa3bff" }}>
                                The Other World
                            </span>
                        </div>
                        <h2
                            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05] mb-6"
                            style={{ color: "#F2F2FA", fontFamily: "'Syne', sans-serif" }}
                        >
                            Far from the IDE,{" "}
                            <span style={{ color: "#aa3bff" }}>deep in the lore.</span>
                        </h2>
                        <p
                            className="text-base sm:text-lg leading-relaxed max-w-2xl mb-3"
                            style={{ color: "rgba(255,255,255,0.60)" }}
                        >
                            The same analytical skills I use to debug a script are the ones I use to deconstruct a story.
                            Understanding the internal logic of a massive narrative arc — how small details have massive impact
                            on the final outcome — isn't a distraction. It's the fuel for my problem-solving mindset.
                        </p>
                        <p
                            className="text-xs font-mono tracking-[0.15em] mb-10"
                            style={{ color: "rgba(170,59,255,0.5)" }}
                        >
                            ↗ tap any card to learn more
                        </p>
                    </FadeSection>

                    {/* Interest cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {interests.map((item, i) => (
                            <FadeSection key={i} delay={i * 0.07}>
                                <button
                                    onClick={() => setSelected(i)}
                                    className="w-full text-left rounded-xl border p-4 flex flex-col gap-1.5 transition-all duration-200 group"
                                    style={{
                                        borderColor: "rgba(170,59,255,0.2)",
                                        background: "rgba(170,59,255,0.05)",
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = "rgba(170,59,255,0.45)";
                                        e.currentTarget.style.background = "rgba(170,59,255,0.10)";
                                        e.currentTarget.style.transform = "translateY(-2px)";
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = "rgba(170,59,255,0.2)";
                                        e.currentTarget.style.background = "rgba(170,59,255,0.05)";
                                        e.currentTarget.style.transform = "translateY(0)";
                                    }}
                                >
                                    <span
                                        className="text-[9px] font-mono tracking-widest uppercase"
                                        style={{ color: "rgba(170,59,255,0.7)" }}
                                    >
                                        {item.type}
                                    </span>
                                    <span
                                        className="text-sm font-bold leading-snug"
                                        style={{ color: "#F2F2FA", fontFamily: "'Syne', sans-serif" }}
                                    >
                                        {item.title}
                                    </span>
                                    <span className="text-[11px] leading-snug" style={{ color: "rgba(255,255,255,0.40)" }}>
                                        {item.note}
                                    </span>
                                </button>
                            </FadeSection>
                        ))}
                    </div>

                    <FadeSection delay={0.3}>
                        <p
                            className="mt-8 text-sm leading-relaxed max-w-2xl"
                            style={{ color: "rgba(255,255,255,0.45)" }}
                        >
                            There is something profoundly satisfying about understanding a system too large for any one person
                            to hold in their head — and finding the patterns anyway. That is engineering. That is storytelling.
                            For me, they are the same skill.
                        </p>
                    </FadeSection>
                </div>
            </section>
        </>
    );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function About() {
    return (
        <main id="main-content" className="relative w-full bg-[#080810]" aria-labelledby="about-heading">

            {/* ── Cinematic Hero ── */}
            <HeroSection />

            <div className="w-full px-[var(--px)] sm:px-[var(--px-sm)] lg:px-[var(--px-lg)] xl:px-[var(--px-xl)] py-16 sm:py-24 flex flex-col gap-0">

                {/* ── Surgical Precision Manifesto ── */}
                <ManifestoSection />

                <Divider />

                {/* ── Technical World ── */}
                <TechnicalSection />

                <Divider />

                {/* ── Career Timeline ── */}
                <TimelineSection />

                <Divider />

                {/* ── Values ── */}
                <ValuesSection />

                <Divider />

                {/* ── Currently / Now ── */}
                <NowSection />

                <Divider />

                {/* ── Other World — hobbies ── */}
                <OtherWorldSection />

            </div>
        </main>
    );
}