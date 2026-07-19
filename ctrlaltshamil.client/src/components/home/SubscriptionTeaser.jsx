import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PLANS } from "../../pages/Subscription";

/* ── Intersection helper ───────────────────────────────────────── */
function useFadeIn(threshold = 0.15) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
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
        <svg viewBox="0 0 16 16" fill="currentColor" className={`w-3.5 h-3.5 ${className}`} aria-hidden="true">
            <path fillRule="evenodd" d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z" clipRule="evenodd" />
        </svg>
    );
}

/* ── Starting price for a plan, regardless of shape ──────────────── */
function startingZmw(plan) {
    if (plan.variants) return plan.variants[0].priceZmw;
    if (plan.priceZmwMin) return plan.priceZmwMin;
    return plan.priceZmw;
}

/* ── Mini plan card ────────────────────────────────────────────── */
function MiniPlanCard({ plan, delay }) {
    const { ref, visible } = useFadeIn(0.15);
    return (
        <div
            ref={ref}
            className="flex flex-col rounded-2xl border p-5 sm:p-6 gap-3"
            style={{
                borderColor: plan.featured ? `${plan.accent}45` : "var(--border-subtle)",
                background: "var(--surface-raised)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
            }}
        >
            {plan.featured && (
                <span className="self-start text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded-full" style={{ background: `${plan.accent}18`, color: plan.accent }}>
                    Most Popular
                </span>
            )}
            <h3 className="text-lg font-black text-[var(--text-primary)]" style={{ fontFamily: "var(--heading)" }}>{plan.name}</h3>
            <p className="text-sm text-[var(--text-dim)] leading-relaxed flex-1">{plan.tagline}</p>
            <div className="flex items-end gap-2 pt-1">
                <span className="text-xs text-[#7070A0] mb-1">From</span>
                <span className="text-2xl font-black leading-none" style={{ color: plan.accent, fontFamily: "var(--heading)" }}>K{startingZmw(plan).toLocaleString()}</span>
                <span className="text-xs text-[#7070A0] mb-0.5">/mo</span>
            </div>
        </div>
    );
}

/* ── Section ───────────────────────────────────────────────────── */
export default function SubscriptionTeaser() {
    const { ref: headRef, visible: headVisible } = useFadeIn(0.2);
    const { ref: ctaRef, visible: ctaVisible } = useFadeIn(0.2);

    return (
        <section className="relative w-full bg-[var(--surface)] py-20 sm:py-28 border-t border-[var(--border-subtle)]" aria-labelledby="subscription-heading">
            <div className="relative w-full px-[var(--px)] sm:px-[var(--px-sm)] lg:px-[var(--px-lg)] xl:px-[var(--px-xl)]">
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
                            Monthly Plans
                        </span>
                        <h2 id="subscription-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight" style={{ fontFamily: "var(--heading)" }}>
                            Ongoing support,{" "}
                            <span className="text-[var(--cyan)]">not a one-off invoice.</span>
                        </h2>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm rounded-lg border px-3.5 py-2 self-start" style={{ borderColor: "#2EF09A30", background: "#2EF09A0A", color: "#2EF09A" }}>
                        ● Priced in Kwacha — save up to 25% paying quarterly or annually
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {PLANS.map((plan, i) => (
                        <MiniPlanCard key={plan.id} plan={plan} delay={0.1 + i * 0.08} />
                    ))}
                </div>

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
                        to="/subscription"
                        className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-[#080810] bg-[#00CFFF] hover:bg-[#33D9FF] active:scale-[0.97] transition-all duration-200 tracking-wide"
                        style={{ fontFamily: "var(--heading)" }}
                    >
                        See full plans & pricing
                        <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
