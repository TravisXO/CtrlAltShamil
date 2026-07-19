import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import heroBg from "../../assets/home-hero.mp4";

/* ─── Stat counter ──────────────────────────────────────────────── */
function useCountUp(target, duration = 2000, start = false) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!start) return;
        let raf;
        let t0 = null;
        const num = parseFloat(target);

        const tick = (now) => {
            if (!t0) t0 = now;
            const p = Math.min((now - t0) / duration, 1);
            /* custom ease-out curve for a snappy feel */
            const eased = 1 - Math.pow(1 - p, 4);
            setValue(Math.floor(eased * num));
            if (p < 1) raf = requestAnimationFrame(tick);
            else setValue(num);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [start, target, duration]);

    return value;
}

/* ─── Stat data ─────────────────────────────────────────────────── */
/* Derived from real, documented case study numbers (Classic Zambia Safaris,
   House to Home, Victor's Hill Estates) — see /projects for the per-project data. */
const STATS = [
    { value: 316830, suffix: "", label: "Total Search Impressions" },
    { value: 215, suffix: "%", label: "Average Traffic Growth" },
    { value: 40, suffix: "+", label: "Page 1 Google Keywords" },
    { value: 5, suffix: "", label: "Client Projects Delivered" },
];

/* ─── Single stat cell ──────────────────────────────────────────── */
function StatCell({ value, suffix, label, animate, index }) {
    const count = useCountUp(value, 2200, animate);

    return (
        <div
            className="stat-cell group relative flex flex-col gap-1.5 px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8"
            style={{
                opacity: animate ? 1 : 0,
                transform: animate ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.7s ease ${0.15 + index * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.15 + index * 0.1}s`,
            }}
        >
            {/* Hover shimmer */}
            <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 0%, rgba(0,207,255,0.06) 0%, transparent 70%)",
                }}
                aria-hidden="true"
            />

            <span
                className="relative text-3xl sm:text-4xl lg:text-[2.75rem] font-black tracking-tight leading-none text-[#F2F2FA]"
                style={{ fontFamily: "var(--heading)" }}
                aria-label={`${value}${suffix} ${label}`}
            >
                <span className="tabular-nums">{count.toLocaleString()}</span>
                <span className="text-[#00CFFF]">{suffix}</span>
            </span>

            <span className="relative text-[11px] sm:text-xs font-mono text-[#505070] tracking-[0.15em] uppercase">
                {label}
            </span>
        </div>
    );
}

/* ─── Hero Section ──────────────────────────────────────────────── */
export default function HeroSection() {
    const [mounted, setMounted] = useState(false);
    const [statsVisible, setStatsVisible] = useState(false);
    const statsRef = useRef(null);

    useEffect(() => {
        const id = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(id);
    }, []);

    /* Observe stat bar */
    useEffect(() => {
        const el = statsRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStatsVisible(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.25 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <section
            className="relative w-full min-h-svh flex flex-col"
            aria-label="Hero"
        >
            {/* ── Video backdrop ── */}
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src={heroBg}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-hidden="true"
                />
                {/* Base darken */}
                <div className="absolute inset-0 bg-[#080810]/50" />
                {/* Top fade */}
                <div
                    className="absolute inset-x-0 top-0 h-40"
                    style={{
                        background:
                            "linear-gradient(to bottom, #080810 0%, transparent 100%)",
                    }}
                />
                {/* Bottom fade */}
                <div
                    className="absolute inset-x-0 bottom-0 h-56 sm:h-72"
                    style={{
                        background:
                            "linear-gradient(to top, #080810 0%, transparent 100%)",
                    }}
                />
                {/* Cyan radial glow */}
                <div
                    className="absolute top-1/3 left-1/4 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06]"
                    style={{
                        background:
                            "radial-gradient(circle, #00CFFF 0%, transparent 65%)",
                    }}
                />
                {/* Noise grain */}
                <div className="absolute inset-0 hero-noise opacity-[0.03]" />
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 flex-1 flex flex-col justify-center w-full px-[var(--px)] sm:px-[var(--px-sm)] lg:px-[var(--px-lg)] xl:px-[var(--px-xl)] pt-32 sm:pt-40 pb-16 sm:pb-24">
                {/* Status badge */}
                <div
                    className="mb-7 sm:mb-9"
                    style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0)" : "translateY(16px)",
                        transition:
                            "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
                    }}
                >
                    <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[11px] font-mono tracking-[0.18em] uppercase text-[#00CFFF] bg-[#00CFFF08] border border-[#00CFFF20] backdrop-blur-sm">
                        <span
                            className="relative flex h-2 w-2"
                            aria-hidden="true"
                        >
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00FF94] opacity-60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00FF94] shadow-[0_0_6px_#00FF94]" />
                        </span>
                        Open to new projects
                    </span>
                </div>

                {/* Headline */}
                <h1
                    className="text-[clamp(2.75rem,9vw,7.25rem)] font-black leading-[0.92] tracking-tight text-[#F2F2FA] mb-6 sm:mb-8"
                    style={{ fontFamily: "var(--heading)" }}
                >
                    {[
                        { text: "Build. Optimise.", cyan: false },
                        { text: "Rank.", cyan: true },
                    ].map(({ text, cyan }, i) => (
                        <span key={text} className="block overflow-hidden">
                            <span
                                className="block"
                                style={{
                                    opacity: mounted ? 1 : 0,
                                    transform: mounted
                                        ? "translateY(0)"
                                        : "translateY(110%)",
                                    transition: `opacity 0.7s ease ${0.25 + i * 0.13}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.25 + i * 0.13}s`,
                                    color: cyan ? "#00CFFF" : undefined,
                                }}
                            >
                                {text}
                            </span>
                        </span>
                    ))}
                </h1>

                {/* Subheadline */}
                <p
                    className="text-base sm:text-lg lg:text-xl text-[#A0A0C0] leading-relaxed max-w-2xl mb-10 sm:mb-12 font-mono"
                    style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0)" : "translateY(18px)",
                        transition:
                            "opacity 0.7s ease 0.6s, transform 0.7s ease 0.6s",
                    }}
                >
                    Full-Stack Engineer{" "}
                    <span className="text-[#F2F2FA]">(ASP.NET · React)</span> and
                    Technical SEO based in{" "}
                    <span className="text-[#F2F2FA]">Lusaka, Zambia</span>.
                    Delivering results for clients worldwide.
                </p>

                {/* CTAs */}
                <div
                    className="flex flex-col sm:flex-row gap-4"
                    style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0)" : "translateY(18px)",
                        transition:
                            "opacity 0.7s ease 0.75s, transform 0.7s ease 0.75s",
                    }}
                >
                    <Link
                        to="/projects"
                        className="hero-cta-primary inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-[#080810] bg-[#00CFFF] active:scale-[0.97] transition-all duration-200 tracking-wide"
                        style={{ fontFamily: "var(--heading)" }}
                    >
                        View My Work
                        <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4 shrink-0"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Link>

                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-[#00CFFF] hover:text-[#F2F2FA] border border-[#00CFFF50] bg-[#00CFFF08] hover:border-[#2A2A45] hover:bg-transparent active:scale-[0.97] transition-all duration-200 tracking-wide"
                        style={{ fontFamily: "var(--heading)" }}
                    >
                        Contact Me
                    </Link>
                </div>

                {/* Scroll indicator */}
                <div
                    className="mt-16 sm:mt-20 flex items-center gap-3"
                    aria-hidden="true"
                    style={{
                        opacity: mounted ? 1 : 0,
                        transition: "opacity 1.2s ease 1.4s",
                    }}
                >
                    <div className="w-px h-9 bg-gradient-to-b from-white to-transparent scroll-pulse" />
                    <span className="text-[11px] font-mono text-white tracking-[0.2em] uppercase">
                        Scroll
                    </span>
                </div>
            </div>

            {/* ── Stat bar ── */}
            <div
                ref={statsRef}
                className="relative z-10 w-full border-t border-[#1A1A30]"
                aria-label="Key results"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(8,8,16,0.96), #080810)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(12px)",
                    transition:
                        "opacity 0.7s ease 1s, transform 0.7s ease 1s",
                }}
            >
                {/* Top accent line */}
                <div
                    className="absolute inset-x-0 top-0 h-px"
                    style={{
                        background:
                            "linear-gradient(to right, transparent 5%, #00CFFF30, transparent 95%)",
                    }}
                    aria-hidden="true"
                />

                <div className="w-full px-[var(--px)] sm:px-[var(--px-sm)] lg:px-[var(--px-lg)] xl:px-[var(--px-xl)]">
                    <div className="grid grid-cols-2 lg:grid-cols-4">
                        {STATS.map((stat, i) => (
                            <StatCell
                                key={stat.label}
                                {...stat}
                                animate={statsVisible}
                                index={i}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}