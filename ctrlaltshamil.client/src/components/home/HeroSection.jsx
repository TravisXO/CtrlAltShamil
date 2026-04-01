import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import heroBg from "../../assets/home-hero.mp4";

/* ─── Stat counter hook ─────────────────────────────────────────── */
function useCountUp(target, duration = 1800, start = false) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime = null;
        const numeric = parseFloat(target);
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
            setValue(Math.floor(eased * numeric));
            if (progress < 1) requestAnimationFrame(step);
            else setValue(numeric);
        };
        requestAnimationFrame(step);
    }, [start, target, duration]);
    return value;
}

/* ─── Individual stat ───────────────────────────────────────────── */
const STATS = [
    { value: 900, suffix: "%", label: "Traffic Growth" },
    { value: 102, suffix: "%", label: "Visibility Increase" },
    { value: 80, suffix: "+", label: "Keywords on Page 1" },
    { value: 315000, suffix: "", label: "Total Impressions" },
];

function StatItem({ value, suffix, label, animate }) {
    const count = useCountUp(value, 1800, animate);
    return (
        <div className="flex flex-col items-center sm:items-start gap-1 px-6 sm:px-8 py-5 sm:py-6 relative group">
            {/* vertical divider — hidden on first item via CSS sibling trick using flex order */}
            <span
                aria-hidden="true"
                className="absolute left-0 top-1/4 h-1/2 w-px bg-[#1A1A30] hidden sm:block first:hidden"
            />
            <span
                className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black tracking-tight leading-none text-[#F2F2FA]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                aria-label={`${count}${suffix} ${label}`}
            >
                <span className="tabular-nums">{count.toLocaleString()}</span>
                <span className="text-[#00CFFF]">{suffix}</span>
            </span>
            <span className="text-xs sm:text-sm font-mono text-[#606080] tracking-wider uppercase">
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

    /* Trigger CSS enter animations after first paint */
    useEffect(() => {
        const t = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(t);
    }, []);

    /* Trigger stat counters when stat bar scrolls into view */
    useEffect(() => {
        const el = statsRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            className="relative w-full min-h-svh flex flex-col"
            aria-label="Hero — Build. Optimize. Rank."
        >
            {/* ── Video Background ── */}
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
                {/* Multi-layer dark tint overlay */}
                <div className="absolute inset-0 bg-[#080810]/45" />
                {/* Cyan-tinted vignette — top */}
                <div
                    className="absolute inset-x-0 top-0 h-40"
                    style={{ background: "linear-gradient(to bottom, #080810 0%, transparent 100%)" }}
                />
                {/* Bottom fade — blends into page background */}
                <div
                    className="absolute inset-x-0 bottom-0 h-48 sm:h-64"
                    style={{ background: "linear-gradient(to top, #080810 0%, transparent 100%)" }}
                />
                {/* Subtle cyan radial glow centre-left */}
                <div
                    className="absolute top-1/3 left-1/4 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07]"
                    style={{ background: "radial-gradient(circle, #00CFFF 0%, transparent 65%)" }}
                />
            </div>

            {/* ── Hero Content ── */}
            <div className="relative z-10 flex-1 flex flex-col justify-center w-full px-4 sm:px-8 lg:px-16 xl:px-24 pt-32 sm:pt-40 pb-16 sm:pb-24">

                {/* Badge */}
                <div
                    className="mb-6 sm:mb-8"
                    style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0)" : "translateY(20px)",
                        transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
                    }}
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-[0.18em] uppercase text-[#00CFFF] bg-[#00CFFF0F] border border-[#00CFFF25]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] shadow-[0_0_6px_#00FF94] animate-pulse" aria-hidden="true" />
                        Available for Remote Work
                    </span>
                </div>

                {/* Headline */}
                <h1
                    className="text-[clamp(3rem,10vw,7.5rem)] font-black leading-[0.92] tracking-tight text-[#F2F2FA] mb-6 sm:mb-8"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                    {[
                        { text: "Build. Optimize.", cyan: false },
                        { text: "Rank.", cyan: true },
                    ].map(({ text, cyan }, i) => (
                        <span key={text} className="block overflow-hidden">
                            <span
                                className="block"
                                style={{
                                    opacity: mounted ? 1 : 0,
                                    transform: mounted ? "translateY(0)" : "translateY(110%)",
                                    transition: `opacity 0.7s ease ${0.25 + i * 0.12}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.25 + i * 0.12}s`,
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
                        transform: mounted ? "translateY(0)" : "translateY(20px)",
                        transition: "opacity 0.7s ease 0.65s, transform 0.7s ease 0.65s",
                    }}
                >
                    Full-Stack Engineer{" "}
                    <span className="text-[#F2F2FA]">(ASP.NET · React)</span>{" "}
                    and Technical SEO based in{" "}
                    <span className="text-[#F2F2FA]">Lusaka, Zambia</span>{" "}
                    — available for remote work worldwide.
                </p>

                {/* CTAs */}
                <div
                    className="flex flex-col sm:flex-row gap-4"
                    style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0)" : "translateY(20px)",
                        transition: "opacity 0.7s ease 0.8s, transform 0.7s ease 0.8s",
                    }}
                >
                    <Link
                        to="/projects"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-[#080810] bg-[#00CFFF] hover:bg-[#33D9FF] active:scale-95 transition-all duration-200 shadow-[0_0_28px_rgba(0,207,255,0.4)] hover:shadow-[0_0_40px_rgba(0,207,255,0.6)] tracking-wide"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        View My Work
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden="true">
                            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                        </svg>
                    </Link>

                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-[#F2F2FA] hover:text-[#00CFFF] border border-[#2A2A45] hover:border-[#00CFFF50] hover:bg-[#00CFFF08] active:scale-95 transition-all duration-200 tracking-wide"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        Contact Me
                    </Link>
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

            {/* ── Stat Bar ── */}
            <div
                ref={statsRef}
                className="relative z-10 w-full border-t border-[#1A1A30]"
                aria-label="Key metrics"
                style={{
                    background: "linear-gradient(to bottom, rgba(8,8,16,0.95), #080810)",
                    backdropFilter: "blur(12px)",
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(16px)",
                    transition: "opacity 0.7s ease 1s, transform 0.7s ease 1s",
                }}
            >
                {/* Cyan top-border accent */}
                <div
                    className="absolute inset-x-0 top-0 h-px"
                    style={{ background: "linear-gradient(to right, transparent, #00CFFF40, transparent)" }}
                    aria-hidden="true"
                />

                <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24">
                    <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#1A1A30]">
                        {STATS.map((stat) => (
                            <StatItem key={stat.label} {...stat} animate={statsVisible} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}