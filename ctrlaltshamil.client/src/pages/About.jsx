import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import headshot from "../assets/headshot.jpg";

/* ── SEO: set document meta for this page ──────────────────────── */
function usePageSEO() {
    useEffect(() => {
        const prev = document.title;
        document.title = "About Alexander Shamil Mondoka | Full-Stack Developer & SEO Specialist in Lusaka, Zambia";

        const setMeta = (name, content) => {
            let el = document.querySelector(`meta[name="${name}"]`);
            if (!el) {
                el = document.createElement("meta");
                el.setAttribute("name", name);
                document.head.appendChild(el);
            }
            el.setAttribute("content", content);
        };

        const setOG = (prop, content) => {
            let el = document.querySelector(`meta[property="${prop}"]`);
            if (!el) {
                el = document.createElement("meta");
                el.setAttribute("property", prop);
                document.head.appendChild(el);
            }
            el.setAttribute("content", content);
        };

        setMeta("description", "Learn about Alexander Shamil Mondoka (CtrlAltShamil). Software Engineering graduate, full-stack developer and technical SEO specialist based in Lusaka, Zambia. Building web apps with ASP.NET and React for clients worldwide.");
        setOG("og:title", "About Alexander Shamil Mondoka | CtrlAltShamil");
        setOG("og:description", "Software Engineering graduate, full-stack developer and technical SEO specialist in Lusaka, Zambia. Available for remote work worldwide.");
        setOG("og:url", "https://www.ctrlaltshamil.com/about");

        return () => { document.title = prev; };
    }, []);
}

/* ── useFadeIn ─────────────────────────────────────────────────── */
function useFadeIn(threshold = 0.08) {
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

/* ── Section wrapper with fade ─────────────────────────────────── */
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

/* ── Section heading (consistent with home) ────────────────────── */
function SectionHeading({ eyebrow, title, accentText, accent = "var(--cyan)" }) {
    return (
        <div className="mb-10 sm:mb-12">
            <span
                className="inline-block text-xs font-mono tracking-[0.2em] uppercase mb-4"
                style={{ color: accent }}
            >
                {eyebrow}
            </span>
            <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight"
                style={{ fontFamily: "var(--heading)" }}
            >
                {title}{" "}
                {accentText && <span style={{ color: accent }}>{accentText}</span>}
            </h2>
        </div>
    );
}

/* ── Divider ───────────────────────────────────────────────────── */
function Divider() {
    return (
        <div className="w-full h-px my-16 sm:my-24" style={{ background: "rgba(255,255,255,0.06)" }} />
    );
}

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
function HeroSection() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        const t = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(t);
    }, []);

    return (
        <section
            className="relative w-full flex flex-col overflow-hidden"
            aria-label="About Alexander Shamil"
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
            <div
                className="pointer-events-none absolute inset-x-0 top-0 h-40"
                style={{ background: "linear-gradient(to bottom, #080810 0%, transparent 100%)" }}
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-48 sm:h-64"
                style={{ background: "linear-gradient(to top, #080810 0%, transparent 100%)" }}
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute top-0 left-0 w-[500px] h-[500px] opacity-[0.08] blur-3xl"
                style={{ background: "radial-gradient(ellipse, #00CFFF 0%, transparent 70%)" }}
                aria-hidden="true"
            />

            <div className="relative z-10 flex-1 flex flex-col justify-center w-full px-[var(--px)] sm:px-[var(--px-sm)] lg:px-[var(--px-lg)] xl:px-[var(--px-xl)] pt-36 sm:pt-44 pb-16 sm:pb-24">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">

                    {/* Left text */}
                    <div className="flex flex-col gap-6 max-w-2xl">
                        {/* Badge */}
                        <div
                            style={{
                                opacity: mounted ? 1 : 0,
                                transform: mounted ? "translateY(0)" : "translateY(16px)",
                                transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
                            }}
                        >
                            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[11px] font-mono tracking-[0.18em] uppercase text-[var(--cyan)] bg-[#00CFFF08] border border-[#00CFFF20] backdrop-blur-sm">
                                <span className="relative flex h-2 w-2" aria-hidden="true">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--green)] opacity-60" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--green)] shadow-[0_0_6px_#00FF94]" />
                                </span>
                                Surgical Precision
                            </span>
                        </div>

                        {/* Headline */}
                        <h1
                            className="text-[clamp(2.75rem,9vw,7.25rem)] font-black leading-[0.92] tracking-tight text-[var(--text-primary)]"
                            style={{ fontFamily: "var(--heading)" }}
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
                                            transition: `opacity 0.7s ease ${0.25 + i * 0.13}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.25 + i * 0.13}s`,
                                            color: cyan ? "var(--cyan)" : undefined,
                                        }}
                                    >
                                        {text}
                                    </span>
                                </span>
                            ))}
                        </h1>

                        {/* Subheadline */}
                        <p
                            className="text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl font-mono text-[var(--text-muted)]"
                            style={{
                                opacity: mounted ? 1 : 0,
                                transform: mounted ? "translateY(0)" : "translateY(18px)",
                                transition: "opacity 0.7s ease 0.6s, transform 0.7s ease 0.6s",
                            }}
                        >
                            Software Engineering graduate.{" "}
                            <span className="text-[var(--text-primary)]">Full-Stack Developer.</span>{" "}
                            Technical SEO specialist. Building digital products where robust architecture meets discoverability.
                        </p>

                        {/* Role chips */}
                        <div
                            className="flex flex-wrap gap-2"
                            style={{
                                opacity: mounted ? 1 : 0,
                                transform: mounted ? "translateY(0)" : "translateY(18px)",
                                transition: "opacity 0.7s ease 0.75s, transform 0.7s ease 0.75s",
                            }}
                        >
                            {["ASP.NET 8", "React", "Technical SEO", "Full-Stack", "Lusaka, ZM"].map((chip) => (
                                <span
                                    key={chip}
                                    className="text-xs font-mono tracking-wider px-3 py-1.5 rounded-full border border-[#00CFFF25] text-[var(--cyan)] bg-[#00CFFF08]"
                                >
                                    {chip}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right photo */}
                    <div
                        className="relative lg:shrink-0 max-w-sm sm:max-w-md lg:max-w-none"
                        style={{
                            opacity: mounted ? 1 : 0,
                            transform: mounted ? "translateY(0)" : "translateY(30px)",
                            transition: "opacity 1s ease 0.4s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.4s",
                        }}
                    >
                        <div
                            className="absolute -inset-[2px] rounded-xl opacity-20"
                            style={{ background: "linear-gradient(135deg, #00CFFF, transparent 60%)" }}
                            aria-hidden="true"
                        />
                        <img
                            src={headshot}
                            alt="Alexander Shamil Mondoka"
                            className="relative w-full lg:w-80 aspect-[3/4] object-cover rounded-xl border border-[var(--border-subtle)]"
                            loading="eager"
                        />
                    </div>
                </div>

                {/* Scroll hint */}
                <div
                    className="mt-16 sm:mt-20 flex items-center gap-3"
                    aria-hidden="true"
                    style={{ opacity: mounted ? 1 : 0, transition: "opacity 1.2s ease 1.4s" }}
                >
                    <div className="w-px h-9 bg-gradient-to-b from-white to-transparent scroll-pulse" />
                    <span className="text-[11px] font-mono text-white tracking-[0.2em] uppercase">Scroll</span>
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════
   MANIFESTO
══════════════════════════════════════════ */
function ManifestoSection() {
    return (
        <FadeSection>
            <div
                className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 border border-[rgba(255,255,255,0.07)]"
                style={{ background: "linear-gradient(135deg, rgba(0,207,255,0.05) 0%, rgba(0,207,255,0.02) 100%)" }}
            >
                <span
                    className="pointer-events-none absolute top-4 right-8 text-[10rem] font-black leading-none select-none"
                    style={{ color: "rgba(0,207,255,0.04)", fontFamily: "var(--heading)" }}
                    aria-hidden="true"
                >
                    &ldquo;
                </span>

                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-px bg-[var(--cyan)]" />
                    <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--cyan)]">
                        Philosophy
                    </span>
                </div>

                <blockquote>
                    <p
                        className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight mb-6 max-w-4xl text-[var(--text-primary)]"
                        style={{ fontFamily: "var(--heading)" }}
                    >
                        Development is not just about{" "}
                        <span className="text-[var(--cyan)]">functionality</span>. It is about building digital products that are as robust and scalable as they are{" "}
                        <span className="text-[var(--cyan)]">discoverable</span>.
                    </p>
                    <p className="text-base sm:text-lg leading-relaxed max-w-2xl text-[var(--text-dim)]">
                        Surgical Precision is not a buzzword. It is the commitment to never shipping something
                        you cannot stand behind. Every architectural decision, every query optimisation,
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
        { label: "C#", cat: "backend" },
        { label: "JavaScript", cat: "frontend" },
        { label: "SQL Server", cat: "backend" },
        { label: "PostgreSQL", cat: "backend" },
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
                <SectionHeading eyebrow="The Technical World" title="Architecture. Precision." accentText="Craft." />
            </FadeSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                <FadeSection delay={0.1}>
                    <div className="flex flex-col gap-6">
                        <p className="text-base sm:text-lg leading-relaxed text-[var(--text-dim)]">
                            My technical toolkit is centred around the <span className="text-[var(--cyan)]">ASP.NET 8 ecosystem</span> and <span className="text-[#aa3bff]">React</span>. I bridge the gap between powerful back-end logic and seamless interactive user experiences.
                        </p>
                        <p className="text-base sm:text-lg leading-relaxed text-[var(--text-dim)]">
                            I take a deep interest in the invisible work that defines a site's success. Auditing Core Web Vitals, navigating complex URL redirect logic, optimising Entity Framework queries. I view a project's architecture much like a living organism where every component must work in harmony.
                        </p>
                        <p className="text-base sm:text-lg leading-relaxed text-[var(--text-dim)]">
                            Whether setting up CI/CD pipelines on GitHub or fine-tuning site architecture to eliminate 301 errors, my focus remains on delivering <span className="text-[var(--cyan)]">production-ready, professional-grade solutions</span>.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                            {Object.entries(catColour).map(([cat, c]) => (
                                <div key={cat} className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full" style={{ background: c.text }} />
                                    <span className="text-[10px] font-mono uppercase tracking-widest capitalize text-[#505070]">{cat}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeSection>

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
            date: "Feb 2026 → Mar 2026",
            title: "House To Home — Built from scratch",
            desc: "Designed and deployed a full React + ASP.NET Core 8 real estate platform with server-side meta injection, CI/CD on Render and a 90+ Lighthouse score.",
            accent: "#00CFFF",
        },
        {
            date: "Nov 2025 → Jan 2026",
            title: "Classic Zambia Safaris — SEO Engagement",
            desc: "3-month technical SEO campaign growing monthly organic visitors from 132 to 227, DR 19 to 23, with 137 keywords entering rankings.",
            accent: "#2EF09A",
        },
        {
            date: "Sept 2025 → Oct 2025",
            title: "ABSA Marathon Documentary",
            desc: "Contributed to the production of the documentary \"The Seven Hour Man,\" a film exploring addiction, recovery and human resilience. Supported the primary production team by coordinating logistics to ensure smooth on-site operations. Assisted David Kashimba during filming sequences to capture high-quality footage across marathon locations.",
            accent: "#aa3bff",
        },
        {
            date: "Jan 2025 → Apr 2026",
            title: "BNOP Media — SEO & Web Developer",
            desc: "Working across client projects as a web developer and SEO specialist, blending technical build work with search strategy.",
            accent: "#00CFFF",
        },
        {
            date: "Apr 2023 → Aug 2023",
            title: "Integrated Carrier Express — Logistics IT Internship",
            desc: "5-month trainee programme dealing with transshipping from China to Angola to the rest of the world and utilising programming skills with tracking tools to follow and log successful deliveries.",
            accent: "#F0C22E",
        },
        {
            date: "July 2019 → June 2024",
            title: "Software Engineering Graduate",
            desc: "Completed a Software Engineering degree, solidifying the architectural thinking and systems-level perspective that underpins everything I build.",
            accent: "#2EF09A",
        },
    ];

    return (
        <section>
            <FadeSection>
                <SectionHeading eyebrow="Career Journey" title="The" accentText="build log." />
            </FadeSection>

            <div className="relative flex flex-col gap-0">
                <div
                    className="absolute left-[11px] top-3 bottom-3 w-px"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                    aria-hidden="true"
                />

                {events.map((e, i) => (
                    <FadeSection key={i} delay={i * 0.08}>
                        <div className="relative flex gap-5 sm:gap-6 pb-10">
                            <div className="relative shrink-0 mt-1.5">
                                <div
                                    className="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                                    style={{ borderColor: e.accent, background: "var(--surface)" }}
                                >
                                    <div className="w-2 h-2 rounded-full" style={{ background: e.accent }} />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 pt-0.5 min-w-0">
                                <span className="text-[11px] font-mono tracking-widest" style={{ color: e.accent }}>
                                    {e.date}
                                </span>
                                <h3
                                    className="text-base sm:text-lg font-bold text-[var(--text-primary)] leading-snug"
                                    style={{ fontFamily: "var(--heading)" }}
                                >
                                    {e.title}
                                </h3>
                                <p className="text-sm leading-relaxed max-w-xl text-[var(--text-dim)]">
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
            body: "I prioritise what is functional and efficient over what is trendy. Good engineering does not bend to hype.",
            accent: "#00CFFF",
        },
        {
            symbol: "02",
            title: "Layman clarity over jargon",
            body: "I communicate in plain language. If you cannot explain it simply, you do not understand it well enough.",
            accent: "#aa3bff",
        },
        {
            symbol: "03",
            title: "Meticulous documentation",
            body: "Code is read more than it is written. Documentation is not optional. It is part of the deliverable.",
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
                <SectionHeading eyebrow="Principles" title="What I" accentText="stand by." />
            </FadeSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values.map((v, i) => (
                    <FadeSection key={i} delay={i * 0.08}>
                        <div
                            className="flex flex-col gap-4 rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] p-6 sm:p-7 h-full"
                        >
                            <div className="flex items-center justify-between">
                                <span
                                    className="text-3xl font-black font-mono leading-none opacity-35"
                                    style={{ color: v.accent, fontFamily: "var(--heading)" }}
                                >
                                    {v.symbol}
                                </span>
                                <div className="w-6 h-px opacity-40" style={{ background: v.accent }} />
                            </div>
                            <h3
                                className="text-lg font-bold leading-snug text-[var(--text-primary)]"
                                style={{ fontFamily: "var(--heading)" }}
                            >
                                {v.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-[var(--text-dim)]">
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
   NOW
══════════════════════════════════════════ */
function NowSection() {
    const items = [
        { label: "Deep in SEO remediation for House To Home", accent: "#00CFFF" },
        { label: "Building out the CtrlAltShamil blog", accent: "#aa3bff" },
        { label: "Exploring international client work and remote contracts", accent: "#2EF09A" },
        { label: "Fourth iteration of this portfolio", accent: "#F0C22E" },
    ];

    return (
        <FadeSection>
            <div
                className="rounded-2xl border p-7 sm:p-10"
                style={{ borderColor: "rgba(0,207,255,0.15)", background: "rgba(0,207,255,0.03)" }}
            >
                <div className="flex items-center gap-3 mb-6">
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--cyan)] opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--cyan)] shadow-[0_0_8px_#00CFFF]" />
                    </span>
                    <span className="text-xs font-mono tracking-[0.22em] uppercase text-[var(--cyan)]">
                        Right Now
                    </span>
                </div>

                <h2
                    className="text-2xl sm:text-3xl font-black tracking-tight mb-7 text-[var(--text-primary)]"
                    style={{ fontFamily: "var(--heading)" }}
                >
                    What I am working on.
                </h2>

                <ul className="flex flex-col gap-3">
                    {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: item.accent }} />
                            <span className="text-sm sm:text-base leading-relaxed text-[var(--text-dim)]">
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
    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            style={{ background: "rgba(8,8,16,0.85)", backdropFilter: "blur(10px)" }}
            onClick={onClose}
            aria-modal="true"
            role="dialog"
            aria-label={`About ${item.title}`}
        >
            <div
                className="relative w-full max-w-md rounded-2xl p-7 sm:p-9 flex flex-col gap-5"
                style={{
                    background: "linear-gradient(135deg, #0D080F 0%, #0A080F 100%)",
                    border: "1px solid rgba(170,59,255,0.3)",
                    boxShadow: "0 0 60px rgba(170,59,255,0.12), 0 24px 48px rgba(0,0,0,0.6)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
                    style={{ background: "linear-gradient(to right, transparent, #aa3bff80, transparent)" }}
                    aria-hidden="true"
                />

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-[#505070] hover:text-[#aa3bff] hover:bg-[rgba(170,59,255,0.2)] transition-colors duration-150"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                    aria-label="Close"
                >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                </button>

                <span
                    className="text-[9px] font-mono tracking-[0.3em] uppercase w-fit px-2.5 py-1 rounded-full text-[#aa3bff] bg-[rgba(170,59,255,0.1)] border border-[rgba(170,59,255,0.2)]"
                >
                    {item.type}
                </span>

                <h3
                    className="text-2xl sm:text-3xl font-black tracking-tight leading-tight pr-6 text-[var(--text-primary)]"
                    style={{ fontFamily: "var(--heading)" }}
                >
                    {item.title}
                </h3>

                <div className="flex flex-wrap gap-2">
                    {item.traits.map((trait) => (
                        <span
                            key={trait}
                            className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full text-[rgba(170,59,255,0.8)] bg-[rgba(170,59,255,0.07)] border border-[rgba(170,59,255,0.15)]"
                        >
                            {trait}
                        </span>
                    ))}
                </div>

                <div className="h-px w-full bg-[rgba(170,59,255,0.15)]" aria-hidden="true" />

                <p className="text-sm sm:text-base leading-relaxed text-[var(--text-dim)]">
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
            description: "Berserk shaped how I think about endurance. Guts taught me that strength is not the absence of suffering. It is continuing to move forward despite carrying wounds that never fully heal.",
        },
        {
            title: "Batman",
            type: "Hero",
            note: "Morals, Character Development, Growth",
            traits: ["Morals", "Character Development", "Growth"],
            description: "Batman shaped how I think about discipline and integrity. The idea that who you are when no one is watching defines you more than any achievement ever could.",
        },
        {
            title: "Supernatural",
            type: "Series",
            note: "Character journey construction",
            traits: ["Loyalty", "Sacrifice", "Identity"],
            description: "Supernatural showed me that loyalty and showing up for the people you care about, even when it costs you everything, is the most quietly human thing there is.",
        },
        {
            title: "The Elder Scrolls",
            type: "Game",
            note: "Agency, Lore, Morality",
            traits: ["Agency", "Lore", "Morality"],
            description: "The Elder Scrolls taught me that the best systems are the ones deep enough to lose yourself in. Every choice carries weight and the world reacts to who you decide to be.",
        },
        {
            title: "Fantastic Mr Fox",
            type: "Animation",
            note: "Selfless, Purpose, Identity",
            traits: ["Selflessness", "Purpose", "Identity"],
            description: "Fantastic Mr Fox reminded me that knowing who you are and being willing to change for the people you love is a kind of quiet courage most people overlook.",
        },
        {
            title: "The Hitchhiker's Guide",
            type: "Reading",
            note: "Absurdity, Perspective, Resilience",
            traits: ["Absurdity", "Perspective", "Resilience"],
            description: "This book reshaped how I handle uncertainty. When the universe is unpredictable and absurd, the only sane response is curiosity and a good sense of humour.",
        },
        {
            title: "Eureka 7",
            type: "Anime",
            note: "Connection, Discovery, Maturity",
            traits: ["Connection", "Discovery", "Maturity"],
            description: "Eureka 7 shaped how I think about growth. Real maturity comes from learning to understand others so deeply that their world genuinely becomes part of yours.",
        },
    ];

    return (
        <>
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
                <div
                    className="pointer-events-none absolute top-0 right-0 w-[500px] h-[400px] opacity-[0.08] blur-3xl"
                    style={{ background: "radial-gradient(ellipse, #aa3bff 0%, transparent 70%)" }}
                    aria-hidden="true"
                />

                <div className="relative">
                    <FadeSection>
                        <div className="flex items-center gap-4 mb-3">
                            <div className="h-px w-12 bg-[#aa3bff]" />
                            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#aa3bff]">
                                The Other World
                            </span>
                        </div>
                        <h2
                            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05] mb-6 text-[var(--text-primary)]"
                            style={{ fontFamily: "var(--heading)" }}
                        >
                            Far from the IDE,{" "}
                            <span className="text-[#aa3bff]">deep in the lore.</span>
                        </h2>
                        <p className="text-base sm:text-lg leading-relaxed max-w-2xl mb-3 text-[var(--text-dim)]">
                            The same analytical skills I use to debug a script are the ones I use to deconstruct a story.
                            Understanding the internal logic of a massive narrative arc and how small details have massive impact
                            on the final outcome is not a distraction. It is the fuel for my problem-solving mindset.
                        </p>
                        <p className="text-xs font-mono tracking-[0.15em] mb-10 text-[rgba(170,59,255,0.5)]">
                            tap any card to learn more
                        </p>
                    </FadeSection>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {interests.map((item, i) => (
                            <FadeSection key={i} delay={i * 0.07}>
                                <button
                                    onClick={() => setSelected(i)}
                                    className="w-full text-left rounded-xl border p-4 flex flex-col gap-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(170,59,255,0.45)] hover:bg-[rgba(170,59,255,0.10)]"
                                    style={{
                                        borderColor: "rgba(170,59,255,0.2)",
                                        background: "rgba(170,59,255,0.05)",
                                    }}
                                >
                                    <span className="text-[9px] font-mono tracking-widest uppercase text-[rgba(170,59,255,0.7)]">
                                        {item.type}
                                    </span>
                                    <span
                                        className="text-sm font-bold leading-snug text-[var(--text-primary)]"
                                        style={{ fontFamily: "var(--heading)" }}
                                    >
                                        {item.title}
                                    </span>
                                    <span className="text-[11px] leading-snug text-[#505070]">
                                        {item.note}
                                    </span>
                                </button>
                            </FadeSection>
                        ))}
                    </div>

                    <FadeSection delay={0.3}>
                        <p className="mt-8 text-sm leading-relaxed max-w-2xl text-[var(--text-dim)]">
                            There is something profoundly satisfying about understanding a system too large for any one person
                            to hold in their head and finding the patterns anyway. That is engineering. That is storytelling.
                            For me they are the same skill.
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
    usePageSEO();

    return (
        <main id="main-content" className="relative w-full bg-[var(--surface)]" aria-labelledby="about-heading">
            <HeroSection />

            <div className="w-full px-[var(--px)] sm:px-[var(--px-sm)] lg:px-[var(--px-lg)] xl:px-[var(--px-xl)] py-16 sm:py-24 flex flex-col gap-0">
                <ManifestoSection />
                <Divider />
                <TechnicalSection />
                <Divider />
                <TimelineSection />
                <Divider />
                <ValuesSection />
                <Divider />
                <NowSection />
                <Divider />
                <OtherWorldSection />
            </div>
        </main>
    );
}