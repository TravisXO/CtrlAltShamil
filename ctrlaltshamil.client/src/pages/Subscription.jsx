import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

/* ── SEO ───────────────────────────────────────────────────────── */
function usePageSEO() {
    useEffect(() => {
        const prev = document.title;
        document.title = "Plans & Pricing | Monthly Website & SEO Support — CtrlAltShamil";

        const setMeta = (name, content) => {
            let el = document.querySelector(`meta[name="${name}"]`);
            if (!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
            el.setAttribute("content", content);
        };
        const setOG = (prop, content) => {
            let el = document.querySelector(`meta[property="${prop}"]`);
            if (!el) { el = document.createElement("meta"); el.setAttribute("property", prop); document.head.appendChild(el); }
            el.setAttribute("content", content);
        };

        setMeta("description", "Monthly website care, SEO, and development plans for businesses in Zambia and worldwide. Clear pricing, no long contracts, pay by bank transfer or mobile money.");
        setOG("og:title", "Plans & Pricing | CtrlAltShamil");
        setOG("og:description", "Monthly website care, SEO, and development plans. Clear pricing, no long contracts, pay by bank transfer or mobile money.");
        setOG("og:url", "https://www.ctrlaltshamil.com/subscription");

        return () => { document.title = prev; };
    }, []);
}

/* ── useFadeIn ─────────────────────────────────────────────────── */
function useFadeIn(threshold = 0.1) {
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

/* ── Plan data ─────────────────────────────────────────────────── */
export const PLANS = [
    {
        id: "sitecare",
        name: "SiteCare",
        tagline: "Keep an existing site healthy, and steadily better.",
        bestFor: "Small businesses with a website that just needs to stay reliable and fresh.",
        variants: [
            { id: "basic", label: "Basic", priceZmw: 500, priceUsd: 25 },
            { id: "seo", label: "+ SEO", priceZmw: 750, priceUsd: 40 },
        ],
        deliverables: [
            { text: "Regular health checks — updates, security, broken links, uptime", variant: "basic" },
            { text: "Backups reviewed every month", variant: "basic" },
            { text: "Up to 3 small changes or content updates a month", variant: "basic" },
            { text: "A short monthly summary of what was checked and changed", variant: "basic" },
            { text: "Technical SEO implementation — the fixes that help Google find and trust your pages", variant: "seo" },
            { text: "Analytics and search tracking set up and monitored (Google Analytics, Search Console)", variant: "seo" },
            { text: "A monthly SEO health check, included in your summary", variant: "seo" },
        ],
        limits: "Requires an existing website, domain, and hosting — SiteCare doesn't include or set these up. Small requests only; standard turnaround 2 business days.",
        pros: [
            "Predictable, low monthly cost",
            "Peace of mind — someone is actually watching the site",
            "Upgrade to the SEO option any time you're ready",
        ],
        cons: [
            "Not for big changes or new features",
            "SEO tracking only included on the + SEO option",
        ],
        accent: "#00CFFF",
    },
    {
        id: "seo-momentum",
        name: "SEO Momentum",
        tagline: "Fix what's holding your site back on Google, and start climbing.",
        bestFor: "Businesses with a website already live that isn't getting found.",
        variants: [
            { id: "basic", label: "Basic", priceZmw: 3500, priceUsd: 190 },
            { id: "ads", label: "+ Google Ads", priceZmw: 5000, priceUsd: 275 },
        ],
        deliverables: [
            { text: "Ongoing technical SEO fixes — the issues quietly hurting your rankings", variant: "basic" },
            { text: "Up to 2 pages optimised for search every month", variant: "basic" },
            { text: "Tracking up to 25 search terms relevant to your business", variant: "basic" },
            { text: "A plain-English monthly report, plus a 30-minute review call", variant: "basic" },
            { text: "$50–$100 of your monthly fee spent directly on a managed Google Ads campaign", variant: "ads" },
            { text: "Ad performance tracked and optimised alongside your organic SEO", variant: "ads" },
        ],
        limits: "One website. Requests handled in 2–3 business days. Strategy reviewed and adjusted monthly, not daily.",
        pros: [
            "Real, trackable movement in Google rankings over time",
            "A monthly report you can actually understand",
            "The Ads option gets you paid traffic while SEO builds up",
        ],
        cons: [
            "SEO takes months to show its full effect — not an overnight fix",
            "Doesn't include building new pages or features (see Build Queue)",
        ],
        accent: "#2EF09A",
        featured: true,
        learnMoreHref: "/services/seo",
        learnMoreLabel: "How the SEO work happens",
    },
    {
        id: "build-queue",
        name: "Build Queue",
        tagline: "An ongoing stream of website changes and improvements, always moving.",
        bestFor: "Businesses that keep needing things built, fixed, or improved, without a new quote every time.",
        priceZmwMin: 2500,
        priceZmwMax: 7500,
        priceUsdMin: 135,
        priceUsdMax: 410,
        deliverables: [
            { text: "Unlimited requests in your queue — new pages, design polish, backend work, SEO implementation, tracking setup, and more" },
            { text: "Custom features, integrations, and complex builds — genuinely possible, not just small tweaks" },
            { text: "One request worked on at a time, so nothing sits half-finished" },
            { text: "Small requests typically done in 2–4 business days; bigger ones are broken into stages" },
            { text: "Requests are acknowledged the next business day" },
            { text: "Direct access to me — no account managers or ticket queues in between" },
        ],
        limits: "One active request at a time. Domain and hosting aren't included but can be arranged (quoted separately). Advertising only runs if you supply a separate ad budget.",
        pros: [
            "No new invoice for every small request — it's already covered",
            "Access to genuinely custom, complex builds, not just templated fixes",
            "Flexible — a landing page this month, an integration the next",
        ],
        cons: [
            "Not built for one giant task needing a full month at once — big projects are staged",
            "Works best when you already have a running list of things to improve",
        ],
        accent: "#00CFFF",
        learnMoreHref: "/services/development",
        learnMoreLabel: "How Build Queue works",
    },
];

/* ── Billing cycle math ───────────────────────────────────────────
   Quarterly = monthly × 3 × 0.85 (15% off). Annual = monthly × 12 × 0.75 (25% off).
   Everything here derives from each plan's existing monthly price — no separate
   discounted numbers are ever hand-entered, so cards can't drift out of sync. */
export const BILLING_CYCLES = [
    { id: "monthly", label: "Monthly", save: null },
    { id: "quarterly", label: "Quarterly", save: "Save 15%" },
    { id: "annual", label: "Annual", save: "Save 25%" },
];

export function billingPrice(monthly, cycle) {
    if (cycle === "quarterly") {
        const total = Math.round(monthly * 3 * 0.85);
        return { total, perMonth: Math.round(total / 3), billedLabel: "billed every 3 months" };
    }
    if (cycle === "annual") {
        const total = Math.round(monthly * 12 * 0.75);
        return { total, perMonth: Math.round(total / 12), billedLabel: "billed annually" };
    }
    return { total: monthly, perMonth: monthly, billedLabel: "billed monthly" };
}

/* ── Flattened plan options (for the intake form dropdown) ───────── */
export function getPlanOptions() {
    return PLANS.flatMap((plan) => {
        if (plan.variants) {
            return plan.variants.map((v) => ({
                id: `${plan.id}-${v.id}`,
                label: `${plan.name} — ${v.label} (K${v.priceZmw.toLocaleString()}/mo)`,
            }));
        }
        const priceLabel = plan.priceZmwMin
            ? `K${plan.priceZmwMin.toLocaleString()}–K${plan.priceZmwMax.toLocaleString()}/mo`
            : `K${plan.priceZmw.toLocaleString()}/mo`;
        return [{ id: plan.id, label: `${plan.name} (${priceLabel})` }];
    });
}

/* ── Section heading ───────────────────────────────────────────── */
function SectionHeading({ eyebrow, title, accentText, accent = "var(--cyan)", center }) {
    return (
        <div className={`mb-10 sm:mb-14 ${center ? "text-center" : ""}`}>
            <span className="inline-block text-xs font-mono tracking-[0.2em] uppercase mb-4" style={{ color: accent }}>
                {eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight" style={{ fontFamily: "var(--heading)" }}>
                {title}{" "}
                {accentText && <span style={{ color: accent }}>{accentText}</span>}
            </h2>
        </div>
    );
}

/* ── Hero ──────────────────────────────────────────────────────── */
function Hero() {
    const { ref, visible } = useFadeIn(0.05);
    return (
        <div
            ref={ref}
            className="pt-32 sm:pt-40 pb-14 sm:pb-20"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
        >
            <span className="inline-block text-xs font-mono tracking-[0.2em] uppercase text-[var(--cyan)] mb-5">
                Monthly Plans
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-6 max-w-3xl text-[var(--text-primary)]" style={{ fontFamily: "var(--heading)" }}>
                Ongoing website growth,{" "}
                <span className="text-[var(--cyan)]">not a one-off invoice.</span>
            </h1>
            <p className="text-base sm:text-lg max-w-2xl leading-relaxed text-[var(--text-dim)] mb-6">
                Most businesses don't need another quote for another one-time job. They need someone who keeps the site healthy, keeps it visible on Google, and keeps shipping small improvements — every single month, for one predictable price.
            </p>
            <div
                className="inline-flex flex-wrap items-center gap-2 text-sm rounded-xl border px-4 py-3"
                style={{ borderColor: "#2EF09A30", background: "#2EF09A0A", color: "#2EF09A" }}
            >
                <span aria-hidden="true">●</span>
                Priced in Kwacha for local businesses — pay monthly, or save by paying quarterly or annually.
            </div>
            <p className="text-sm text-[var(--text-dim)] mt-6">
                Need a brand-new website built first?{" "}
                <Link to="/contact" className="text-[var(--cyan)] underline underline-offset-2 hover:text-white transition-colors">
                    Get a one-time project quote
                </Link>{" "}
                — once it's live, any plan below keeps it fast, secure, and growing.
            </p>
        </div>
    );
}

/* ── How it works ──────────────────────────────────────────────── */
const STEPS = [
    { n: "01", title: "Pick a plan", text: "Choose the plan below that fits, or pick \"not sure yet\" in the form and describe what you need." },
    { n: "02", title: "Fill out the project form", text: "One detailed form, so I have everything needed to start — no back-and-forth phone calls required." },
    { n: "03", title: "Pay by bank or mobile money", text: "Use the bank transfer or mobile money details on this page to pay for your first month." },
    { n: "04", title: "Email your receipt", text: "Send the payment receipt or screenshot to confirm. Your plan activates within 24 hours." },
];
function HowItWorks() {
    const { ref, visible } = useFadeIn(0.1);
    return (
        <div ref={ref}>
            <SectionHeading eyebrow="The Process" title="How it" accentText="works." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {STEPS.map((s, i) => (
                    <div
                        key={s.n}
                        className="rounded-2xl border p-5 sm:p-6 flex flex-col gap-3"
                        style={{
                            borderColor: "var(--border-subtle)", background: "var(--surface-raised)",
                            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)",
                            transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
                        }}
                    >
                        <span className="text-xs font-mono tracking-widest text-[var(--cyan)]">{s.n}</span>
                        <h3 className="text-base font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--heading)" }}>{s.title}</h3>
                        <p className="text-sm text-[var(--text-dim)] leading-relaxed">{s.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── Billing toggle ────────────────────────────────────────────── */
function BillingToggle({ cycle, onChange }) {
    return (
        <div className="inline-flex gap-1 p-1 rounded-xl mb-8" style={{ background: "#0d0d1a", border: "1px solid #1A1A30" }}>
            {BILLING_CYCLES.map((c) => (
                <button
                    key={c.id}
                    type="button"
                    onClick={() => onChange(c.id)}
                    className="flex flex-col items-center gap-0.5 px-4 sm:px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer"
                    style={cycle === c.id ? { background: "#00CFFF", color: "#080810" } : { background: "transparent", color: "#7070A0" }}
                >
                    {c.label}
                    <span className="text-[10px] font-mono" style={{ color: cycle === c.id ? "#080810" : "#2EF09A", visibility: c.save ? "visible" : "hidden" }}>
                        {c.save || "—"}
                    </span>
                </button>
            ))}
        </div>
    );
}

/* ── Price block (handles single / variant / range pricing) ──────── */
function PriceBlock({ monthlyZmw, monthlyUsd, rangeMaxZmw, rangeMaxUsd, cycle, accent }) {
    const z = billingPrice(monthlyZmw, cycle);
    const u = billingPrice(monthlyUsd, cycle);
    const isRange = rangeMaxZmw != null;
    const zMax = isRange ? billingPrice(rangeMaxZmw, cycle) : null;
    const uMax = isRange ? billingPrice(rangeMaxUsd, cycle) : null;

    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-end gap-2 flex-wrap">
                <span className="text-3xl font-black leading-none" style={{ color: accent, fontFamily: "var(--heading)" }}>
                    K{z.perMonth.toLocaleString()}{isRange && `–K${zMax.perMonth.toLocaleString()}`}
                </span>
                <span className="text-sm text-[var(--text-dim)] mb-0.5">/ month</span>
            </div>
            <span className="text-xs font-mono text-[#7070A0]">
                ≈ ${u.perMonth}{isRange && `–$${uMax.perMonth}`} per month{isRange && ", depending on workload"}
            </span>
            {cycle !== "monthly" && (
                <span className="text-xs" style={{ color: accent }}>
                    K{z.total.toLocaleString()}{isRange && `–K${zMax.total.toLocaleString()}`} {z.billedLabel}
                </span>
            )}
        </div>
    );
}

/* ── Plan card ─────────────────────────────────────────────────── */
function CheckIcon({ dim }) {
    return (
        <svg className="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none" stroke={dim ? "#3A3A55" : "#2EF09A"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.5 8.5l3 3 6-7" />
        </svg>
    );
}
function DotIcon() {
    return <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[#7070A0]" aria-hidden="true" />;
}
function PlanCard({ plan, index, visible, cycle, onChoose }) {
    const hasVariants = !!plan.variants;
    const [variantId, setVariantId] = useState(hasVariants ? plan.variants[0].id : null);
    const activeVariant = hasVariants ? plan.variants.find((v) => v.id === variantId) : null;

    const isItemActive = (item) => !item.variant || item.variant === "basic" || item.variant === variantId;

    return (
        <div
            className="relative flex flex-col rounded-2xl border overflow-hidden"
            style={{
                borderColor: plan.featured ? `${plan.accent}50` : "var(--border-subtle)",
                background: "var(--surface-raised)",
                boxShadow: plan.featured ? `0 0 48px ${plan.accent}12` : "none",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s`,
            }}
        >
            {plan.featured && (
                <div
                    className="text-center text-[10px] font-mono tracking-[0.2em] uppercase py-1.5"
                    style={{ background: `${plan.accent}18`, color: plan.accent }}
                >
                    Most Popular
                </div>
            )}
            <div className="flex flex-col flex-1 p-6 gap-4">
                <div className="flex flex-col gap-4">
                    <div>
                        <h3 className="text-xl font-black text-[var(--text-primary)] mb-1.5" style={{ fontFamily: "var(--heading)" }}>{plan.name}</h3>
                        <p className="text-sm text-[var(--text-dim)] leading-relaxed">{plan.tagline}</p>
                    </div>

                    {hasVariants && (
                        <div className="flex gap-1.5 p-1 rounded-lg" style={{ background: "#0d0d1a" }}>
                            {plan.variants.map((v) => (
                                <button
                                    key={v.id}
                                    type="button"
                                    onClick={() => setVariantId(v.id)}
                                    className="flex-1 text-xs font-mono tracking-wide px-2 py-2 rounded-md transition-all duration-200 cursor-pointer"
                                    style={
                                        variantId === v.id
                                            ? { background: plan.accent, color: "#080810", fontWeight: 700 }
                                            : { background: "transparent", color: "#7070A0" }
                                    }
                                >
                                    {v.label}
                                </button>
                            ))}
                        </div>
                    )}

                    <PriceBlock
                        monthlyZmw={hasVariants ? activeVariant.priceZmw : (plan.priceZmwMin ?? plan.priceZmw)}
                        monthlyUsd={hasVariants ? activeVariant.priceUsd : (plan.priceUsdMin ?? plan.priceUsd)}
                        rangeMaxZmw={plan.priceZmwMax}
                        rangeMaxUsd={plan.priceUsdMax}
                        cycle={cycle}
                        accent={plan.accent}
                    />

                    <p className="text-xs text-[#7070A0] italic">{plan.bestFor}</p>

                    <ul className="flex flex-col gap-2.5">
                        {plan.deliverables.map((d) => {
                            const active = isItemActive(d);
                            const unlockLabel = d.variant && d.variant !== "basic" ? plan.variants?.find((v) => v.id === d.variant)?.label : null;
                            return (
                                <li key={d.text} className="flex items-start gap-2.5 text-sm leading-snug" style={{ color: active ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)" }}>
                                    <CheckIcon dim={!active} />
                                    <span>
                                        {d.text}
                                        {unlockLabel && !active && (
                                            <span className="ml-1.5 text-[10px] font-mono uppercase tracking-wide px-1.5 py-0.5 rounded" style={{ background: `${plan.accent}15`, color: plan.accent }}>
                                                {unlockLabel}
                                            </span>
                                        )}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>

                    <p className="text-xs text-[#7070A0] leading-relaxed border-t border-[#14142A] pt-4">{plan.limits}</p>
                </div>

                <button
                    type="button"
                    onClick={() => onChoose(hasVariants ? `${plan.id}-${variantId}` : plan.id)}
                    className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] cursor-pointer"
                    style={{ background: plan.accent, color: "#080810", fontFamily: "var(--heading)" }}
                >
                    Choose {plan.name}
                </button>

                {/* Reserve this row's height on every card, even when unused, so buttons stay aligned across the grid */}
                <Link
                    to={plan.learnMoreHref || "#"}
                    tabIndex={plan.learnMoreHref ? undefined : -1}
                    aria-hidden={plan.learnMoreHref ? undefined : true}
                    className={`text-xs font-mono text-center underline underline-offset-2 ${plan.learnMoreHref ? "" : "invisible pointer-events-none"}`}
                    style={{ color: plan.accent }}
                >
                    {plan.learnMoreLabel || "placeholder"} →
                </Link>

                <details className="group">
                    <summary className="cursor-pointer list-none flex items-center justify-between gap-2 text-xs font-mono uppercase tracking-widest pt-3 border-t border-[#14142A]" style={{ color: "#7070A0" }}>
                        View full plan details
                        <span className="shrink-0 transition-transform duration-200 group-open:rotate-45 text-base leading-none">+</span>
                    </summary>
                    <div className="flex flex-col gap-4 pt-4">
                        <div>
                            <p className="text-[10px] font-mono tracking-widest uppercase text-[#2EF09A] mb-2">Advantages</p>
                            <ul className="flex flex-col gap-1.5">
                                {plan.pros.map((p) => (
                                    <li key={p} className="flex items-start gap-2 text-xs text-white/65 leading-snug">
                                        <DotIcon />{p}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="text-[10px] font-mono tracking-widest uppercase text-[#F0C22E] mb-2">Limitations</p>
                            <ul className="flex flex-col gap-1.5">
                                {plan.cons.map((c) => (
                                    <li key={c} className="flex items-start gap-2 text-xs text-white/65 leading-snug">
                                        <DotIcon />{c}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </details>
            </div>
        </div>
    );
}

/* ── Plans grid ────────────────────────────────────────────────── */
function PlansGrid({ cycle, onCycleChange, onChoose }) {
    const { ref, visible } = useFadeIn(0.05);
    return (
        <div ref={ref}>
            <SectionHeading eyebrow="Pricing" title="Pick the level of" accentText="support you need." />
            <BillingToggle cycle={cycle} onChange={onCycleChange} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {PLANS.map((plan, i) => (
                    <PlanCard key={plan.id} plan={plan} index={i} visible={visible} cycle={cycle} onChoose={onChoose} />
                ))}
            </div>
        </div>
    );
}

/* ── Comparison table ──────────────────────────────────────────── */
const LABEL_STYLES = {
    "Included": { color: "#2EF09A", background: "#2EF09A12" },
    "Optional add-on": { color: "#00CFFF", background: "#00CFFF12" },
    "Quoted separately": { color: "#C07AF0", background: "#C07AF012" },
    "Not included": { color: "#50507A", background: "transparent" },
    "Requires advertising budget": { color: "#F0C22E", background: "#F0C22E12" },
};
function ComparisonCell({ value }) {
    const style = LABEL_STYLES[value];
    if (!style) return <span className="text-xs text-white/70">{value}</span>;
    return (
        <span className="inline-flex text-[11px] font-mono px-2.5 py-1 rounded-full" style={{ color: style.color, background: style.background }}>
            {value}
        </span>
    );
}
const COMPARISON_ROWS = [
    { label: "Website design & development", values: ["Not included", "Not included", "Included"] },
    { label: "Mobile responsiveness", values: ["Not included", "Not included", "Included"] },
    { label: "Content management", values: ["Included", "Not included", "Included"] },
    { label: "Search engine optimisation", values: ["Optional add-on", "Included", "Included"] },
    { label: "Analytics & tracking", values: ["Optional add-on", "Included", "Included"] },
    { label: "Domain provision", values: ["Not included", "Not included", "Quoted separately"] },
    { label: "Hosting provision", values: ["Not included", "Not included", "Quoted separately"] },
    { label: "Website maintenance", values: ["Included", "Not included", "Included"] },
    { label: "Content updates", values: ["Included", "Not included", "Included"] },
    { label: "Technical support", values: ["Included", "Included", "Included"] },
    { label: "Google Ads support", values: ["Not included", "Optional add-on", "Requires advertising budget"] },
    { label: "Advertising budget requirement", values: ["Not included", "Not included", "Requires advertising budget"] },
    { label: "Custom integrations", values: ["Not included", "Not included", "Included"] },
    { label: "Typical delivery timeline", values: ["2 business days", "2–3 business days", "2–4 business days, staged for larger work"] },
    { label: "Revision / request limits", values: ["Up to 3 per month", "2 pages per month", "One active request at a time"] },
    { label: "Ongoing monthly support", values: ["Included", "Included", "Included"] },
    { label: "Ownership & access", values: ["You keep full ownership", "You keep full ownership", "You keep full ownership"] },
];
function ComparisonTable() {
    const { ref, visible } = useFadeIn(0.05);
    return (
        <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            <SectionHeading eyebrow="Compare" title="See it all," accentText="side by side." />
            <div className="rounded-2xl border overflow-x-auto" style={{ borderColor: "var(--border-subtle)", background: "var(--surface-raised)" }}>
                <table className="w-full text-sm border-collapse min-w-[700px]">
                    <thead>
                        <tr className="border-b" style={{ borderColor: "#1A1A30" }}>
                            <th className="text-left font-mono text-[10px] uppercase tracking-widest text-[#50507A] p-4">Feature</th>
                            {PLANS.map((p) => (
                                <th key={p.id} className="text-left font-bold p-4" style={{ color: p.accent, fontFamily: "var(--heading)" }}>{p.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {COMPARISON_ROWS.map((row, i) => (
                            <tr key={row.label} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                                <td className="p-4 text-xs text-white/75 whitespace-nowrap">{row.label}</td>
                                {row.values.map((v, j) => (
                                    <td key={j} className="p-4"><ComparisonCell value={v} /></td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="text-xs text-[#5A5A80] mt-4">Scroll sideways on smaller screens to see every plan.</p>
        </div>
    );
}

/* ── Info block (shared shell for Domain/Hosting & Advertising) ──── */
function InfoBlock({ eyebrow, title, accentText, accent, children }) {
    const { ref, visible } = useFadeIn(0.1);
    return (
        <div
            ref={ref}
            className="rounded-2xl border p-6 sm:p-8"
            style={{
                borderColor: "var(--border-subtle)", background: "var(--surface-raised)",
                opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
        >
            <SectionHeading eyebrow={eyebrow} title={title} accentText={accentText} accent={accent} />
            <div className="flex flex-col gap-4 -mt-6">{children}</div>
        </div>
    );
}

/* ── Domain & hosting ──────────────────────────────────────────── */
function DomainHosting() {
    return (
        <InfoBlock eyebrow="Domains & Hosting" title="Do you provide" accentText="domains and hosting?">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border p-5" style={{ borderColor: "#1A1A30", background: "#0D0D1A" }}>
                    <p className="text-sm font-bold text-white/90 mb-2">SiteCare</p>
                    <p className="text-sm text-[var(--text-dim)] leading-relaxed">
                        SiteCare assumes you already have an active website with its own domain and hosting in place — that's what SiteCare maintains. It doesn't include registering a domain or setting up hosting. If you need your site or domain migrated to a new host, that's quoted separately.
                    </p>
                </div>
                <div className="rounded-xl border p-5" style={{ borderColor: "#1A1A30", background: "#0D0D1A" }}>
                    <p className="text-sm font-bold text-white/90 mb-2">Build Queue</p>
                    <p className="text-sm text-[var(--text-dim)] leading-relaxed">
                        If you need a domain registered or hosting set up as part of your project, it can be arranged for you — this is quoted separately based on what you need (e.g. domain registrar fees, hosting tier). It isn't a free or unlimited inclusion, and ongoing costs like domain renewals are the client's responsibility going forward.
                    </p>
                </div>
            </div>
        </InfoBlock>
    );
}

/* ── Advertising ───────────────────────────────────────────────── */
function Advertising() {
    return (
        <InfoBlock eyebrow="Advertising" title="Google Ads &amp;" accentText="ad spend, explained.">
            <div className="rounded-xl border p-5" style={{ borderColor: "#1A1A30", background: "#0D0D1A" }}>
                <div className="flex items-end gap-2 flex-wrap mb-2">
                    <span className="text-2xl font-black leading-none" style={{ color: "var(--cyan)", fontFamily: "var(--heading)" }}>$350</span>
                    <span className="text-sm text-[var(--text-dim)]">/ month — Google Ads management fee</span>
                </div>
                <p className="text-sm text-[var(--text-dim)] leading-relaxed">
                    This is a recurring monthly fee for setting up, running, and optimising your Google Ads campaigns. <strong className="text-white/85">It does not include your advertising budget</strong> — the money spent on the ads themselves is paid directly to Google, separately, based on whatever budget you choose to set.
                </p>
            </div>

            <div className="rounded-xl border p-5" style={{ borderColor: "#1A1A30", background: "#0D0D1A" }}>
                <p className="text-sm font-bold text-white/90 mb-2">Advertising on Build Queue</p>
                <p className="text-sm text-[var(--text-dim)] leading-relaxed">
                    Build Queue's monthly fee is a development fee — it is never presented as your advertising spend. Advertising is only ever included on Build Queue when you separately provide an ad budget; the project fee, the ad-management fee, and your ad budget are always kept distinct.
                </p>
            </div>

            <div className="rounded-xl border p-5" style={{ borderColor: "#F0C22E30", background: "#F0C22E0A" }}>
                <p className="text-sm font-bold mb-2" style={{ color: "#F0C22E" }}>$150 advertising contribution</p>
                <p className="text-sm text-white/80 leading-relaxed">
                    Clients who commit an advertising budget of $500 or more receive a guaranteed $150 advertising contribution toward that spend, subject to campaign terms. This is a contribution to your ad budget — <strong className="text-white/95">not</strong> guaranteed profit, leads, sales, or a specific return on ad spend. Campaign results depend on targeting, market demand, competition, landing-page quality, and your overall budget.
                </p>
            </div>
        </InfoBlock>
    );
}

/* ── Which plan is right for me? ──────────────────────────────────── */
const RECOMMENDATIONS = [
    { plan: "SiteCare", text: "you already have a website and just need ongoing updates, maintenance, and technical support." },
    { plan: "SEO Momentum", text: "your website exists but isn't showing up on Google, and you want steady, trackable movement in search rankings." },
    { plan: "Build Queue", text: "you need an ongoing stream of development work — new pages, features, integrations — delivered through a managed queue instead of one-off quotes." },
];
function PlanRecommendation() {
    const { ref, visible } = useFadeIn(0.1);
    return (
        <div ref={ref}>
            <SectionHeading eyebrow="Not Sure?" title="Which plan is" accentText="right for me?" />
            <div className="flex flex-col gap-3">
                {RECOMMENDATIONS.map((r, i) => {
                    const plan = PLANS.find((p) => p.name === r.plan);
                    return (
                        <div
                            key={r.plan}
                            className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 rounded-2xl border p-5"
                            style={{
                                borderColor: "var(--border-subtle)", background: "var(--surface-raised)",
                                opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)",
                                transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`,
                            }}
                        >
                            <span className="shrink-0 text-sm font-bold sm:w-40" style={{ color: plan?.accent, fontFamily: "var(--heading)" }}>Choose {r.plan}</span>
                            <p className="text-sm text-white/75 leading-relaxed">when {r.text}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ── Payment instructions ──────────────────────────────────────── */
function PaymentInstructions() {
    const { ref, visible } = useFadeIn(0.1);
    return (
        <div
            ref={ref}
            className="rounded-2xl border p-6 sm:p-8"
            style={{
                borderColor: "var(--border-subtle)", background: "var(--surface-raised)",
                opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
        >
            <SectionHeading eyebrow="Payment" title="How to" accentText="pay." />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl border p-5" style={{ borderColor: "#1A1A30", background: "#0D0D1A" }}>
                    <p className="text-xs font-mono tracking-widest uppercase text-[var(--cyan)] mb-3">Bank Transfer</p>
                    <dl className="flex flex-col gap-2 text-sm">
                        <div className="flex justify-between gap-3"><dt className="text-[#7070A0]">Bank</dt><dd className="text-white/85 text-right">Zambia Industrial Commercial Bank (ZICB)</dd></div>
                        <div className="flex justify-between gap-3"><dt className="text-[#7070A0]">Account Number</dt><dd className="text-white/85 font-mono">1010 1906 8325 7</dd></div>
                        <div className="flex justify-between gap-3"><dt className="text-[#7070A0]">Account Name</dt><dd className="text-white/85 text-right">Alexander Shamil Mondoka</dd></div>
                    </dl>
                </div>
                <div className="rounded-xl border p-5" style={{ borderColor: "#1A1A30", background: "#0D0D1A" }}>
                    <p className="text-xs font-mono tracking-widest uppercase text-[#2EF09A] mb-3">Mobile Money</p>
                    <dl className="flex flex-col gap-2 text-sm">
                        <div className="flex justify-between gap-3"><dt className="text-[#7070A0]">Network</dt><dd className="text-white/85">MTN Mobile Money</dd></div>
                        <div className="flex justify-between gap-3"><dt className="text-[#7070A0]">Number</dt><dd className="text-white/85 font-mono">+260 965 200 082</dd></div>
                        <div className="flex justify-between gap-3"><dt className="text-[#7070A0]">Registered Name</dt><dd className="text-white/85 text-right">Alexander Shamil Mondoka</dd></div>
                    </dl>
                </div>
            </div>
            <div className="rounded-xl border p-5 flex flex-col sm:flex-row sm:items-center gap-3" style={{ borderColor: "#00CFFF30", background: "#00CFFF0A" }}>
                <span className="text-lg shrink-0" aria-hidden="true">✉</span>
                <p className="text-sm text-white/85 leading-relaxed">
                    After paying, email your receipt or a screenshot of the transaction to{" "}
                    <a href="mailto:mondokashamil@gmail.com" className="text-[var(--cyan)] underline underline-offset-2">mondokashamil@gmail.com</a>{" "}
                    with your name, the plan you've chosen, and whether it's monthly, quarterly, or annual. Your plan is confirmed and work begins within 24 hours.
                </p>
            </div>
        </div>
    );
}

/* ── FAQ ───────────────────────────────────────────────────────── */
const FAQS = [
    { q: "How does billing work?", a: "Plans are billed in advance, starting the day your first payment is confirmed. There's no setup fee. Choose monthly, quarterly, or annual billing — quarterly saves 15% and annual saves 25%, calculated straight off the monthly price." },
    { q: "Can I pause or cancel?", a: "Yes. Cancel any time with at least 7 days' notice before your next billing date — no long contracts. Build Queue can also be paused once every 90 days, for up to 14 days." },
    { q: "What if I need something outside my plan?", a: "Anything beyond what's included gets quoted separately as its own project, or added to your queue for the following month. You'll always know the cost before it happens." },
    { q: "Do you offer refunds?", a: "If you cancel before any work has started, you get a full refund. Once work has begun or been delivered for the month, that month isn't refunded — but nothing renews without your next payment confirmation either." },
    { q: "What if I'm not sure which plan is right for me?", a: "Choose \"Not sure yet — help me choose\" in the form below and describe what you need. I'll recommend the right plan before anything is charged." },
    { q: "Is this a long-term contract?", a: "No. Every plan is month-to-month. You're never locked in." },
    { q: "What currency do I actually pay in?", a: "Either — pay the USD amount or the ZMW equivalent, whichever is easier for your bank or mobile money. The ZMW figures are estimates and can shift slightly with the exchange rate; I'll always confirm the exact amount before you pay." },
];
function FAQ() {
    const { ref, visible } = useFadeIn(0.1);
    return (
        <div ref={ref}>
            <SectionHeading eyebrow="Questions" title="Common" accentText="questions." />
            <div className="flex flex-col gap-3">
                {FAQS.map((f, i) => (
                    <details
                        key={f.q}
                        className="group rounded-2xl border overflow-hidden"
                        style={{
                            borderColor: "var(--border-subtle)", background: "var(--surface-raised)",
                            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)",
                            transition: `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`,
                        }}
                    >
                        <summary className="cursor-pointer list-none flex items-center justify-between gap-4 p-5 text-sm font-semibold text-white/90">
                            {f.q}
                            <span className="shrink-0 text-[var(--cyan)] transition-transform duration-200 group-open:rotate-45 text-xl leading-none">+</span>
                        </summary>
                        <p className="px-5 pb-5 text-sm text-[var(--text-dim)] leading-relaxed">{f.a}</p>
                    </details>
                ))}
            </div>
        </div>
    );
}

/* ── Intake form ───────────────────────────────────────────────── */
const fieldBase =
    "w-full bg-[#0d0d1a] border rounded-lg px-4 py-3 text-[#F2F2FA] text-sm placeholder-[#40405A] focus:outline-none focus:ring-1 transition-colors duration-200";
const labelBase = "block text-[10px] font-mono uppercase tracking-widest text-[#50507A] mb-2";

const PRIORITY_OPTIONS = [
    "More traffic / visibility on Google",
    "More enquiries or leads",
    "Faster loading site",
    "Fix broken or outdated design",
    "Ongoing content updates",
    "Something new needs to be built",
];
const FEATURE_OPTIONS = [
    "Online payments",
    "Booking / appointments",
    "Property or product listings",
    "Blog",
    "Multiple languages",
    "Live chat / WhatsApp button",
];

function CheckboxGroup({ label, options, values, onToggle, name }) {
    return (
        <div>
            <label className={labelBase}>{label}</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {options.map((opt) => (
                    <label key={opt} className="flex items-center gap-2.5 text-sm text-white/75 rounded-lg border border-[#2A2A45] bg-[#0d0d1a] px-3.5 py-2.5 cursor-pointer hover:border-[#3A3A55] transition-colors">
                        <input
                            type="checkbox"
                            name={name}
                            checked={values.includes(opt)}
                            onChange={() => onToggle(opt)}
                            className="w-4 h-4 accent-[#00CFFF] shrink-0"
                        />
                        {opt}
                    </label>
                ))}
            </div>
        </div>
    );
}

function FormSection({ n, title, children }) {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
                <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black font-mono" style={{ background: "#00CFFF15", color: "#00CFFF", border: "1px solid #00CFFF35" }}>
                    {n}
                </span>
                <h3 className="text-base font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--heading)" }}>{title}</h3>
            </div>
            <div className="flex flex-col gap-4 pl-10">{children}</div>
        </div>
    );
}

const EMPTY_FORM = {
    name: "", business: "", email: "", phone: "", location: "",
    plan: "", payMethod: "",
    hasWebsite: "", currentUrl: "", currentPlatform: "", hasHostingDomain: "",
    goal: "", priorities: [], audience: "", references: "",
    hasBrandAssets: "", hasContent: "", features: [],
    startTime: "", deadline: "",
    notes: "",
};

const FORM_STEPS = [
    { title: "You & your plan", required: ["name", "email", "phone", "location", "plan"] },
    { title: "Your website today", required: ["hasWebsite"] },
    { title: "Goals & priorities", required: ["goal"] },
    { title: "Assets, features & timeline", required: ["startTime"] },
    { title: "Anything else", required: [] },
];

/* ── Step progress indicator ──────────────────────────────────── */
function StepProgress({ step }) {
    return (
        <div className="mb-8">
            <div className="flex items-center mb-4">
                {FORM_STEPS.map((s, i) => (
                    <div key={s.title} className="flex items-center flex-1 last:flex-none">
                        <span
                            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black font-mono transition-colors duration-300"
                            style={
                                i < step
                                    ? { background: "#2EF09A", color: "#080810" }
                                    : i === step
                                        ? { background: "#00CFFF", color: "#080810" }
                                        : { background: "#14142A", color: "#50507A", border: "1px solid #2A2A45" }
                            }
                        >
                            {i < step ? "✓" : i + 1}
                        </span>
                        {i < FORM_STEPS.length - 1 && (
                            <div className="h-px flex-1 mx-1.5 transition-colors duration-300" style={{ background: i < step ? "#2EF09A50" : "#1A1A30" }} />
                        )}
                    </div>
                ))}
            </div>
            <p className="text-xs font-mono uppercase tracking-widest text-[var(--cyan)]">Step {step + 1} of {FORM_STEPS.length}</p>
            <h3 className="text-lg font-bold text-[var(--text-primary)] mt-1" style={{ fontFamily: "var(--heading)" }}>{FORM_STEPS[step].title}</h3>
        </div>
    );
}

function IntakeForm({ selectedPlan }) {
    const { ref, visible } = useFadeIn(0.05);
    const formTopRef = useRef(null);
    const recaptchaRef = useRef(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [status, setStatus] = useState("idle");
    const [step, setStep] = useState(0);
    const [stepError, setStepError] = useState(false);

    useEffect(() => {
        if (selectedPlan) setForm((f) => ({ ...f, plan: selectedPlan }));
    }, [selectedPlan]);

    const set = (name, value) => setForm((f) => ({ ...f, [name]: value }));
    const handleChange = (e) => set(e.target.name, e.target.value);
    const toggle = (name, opt) => setForm((f) => ({
        ...f,
        [name]: f[name].includes(opt) ? f[name].filter((v) => v !== opt) : [...f[name], opt],
    }));

    const fieldClass = (name) => {
        const hasError = stepError && FORM_STEPS[step].required.includes(name) && !form[name];
        return `${fieldBase} ${hasError ? "border-red-500/70 focus:border-red-500 focus:ring-red-500" : "border-[#2A2A45] focus:border-[#00CFFF] focus:ring-[#00CFFF]"}`;
    };

    const isStepValid = (i) => FORM_STEPS[i].required.every((f) => form[f] && form[f].toString().trim() !== "");

    const goToStep = (next) => {
        setStep(next);
        setStepError(false);
        formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const handleNext = () => {
        if (!isStepValid(step)) { setStepError(true); return; }
        goToStep(step + 1);
    };
    const handleBack = () => goToStep(step - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isStepValid(step)) { setStepError(true); return; }
        setStatus("sending");
        try {
            const token = await recaptchaRef.current.executeAsync();
            recaptchaRef.current.reset();

            const res = await fetch("/api/subscriptionrequest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, recaptchaToken: token }),
            });

            if (!res.ok) throw new Error();
            setStatus("success");
            setForm(EMPTY_FORM);
            setStep(0);
        } catch {
            setStatus("error");
        }
    };

    const planLabel = (id) => getPlanOptions().find((p) => p.id === id)?.label;

    if (status === "success") {
        return (
            <div
                className="flex flex-col items-start gap-5 py-10 px-6 sm:px-8 rounded-2xl"
                style={{ background: "var(--surface-raised)", border: "1px solid rgba(46,240,154,0.2)" }}
                role="alert" aria-live="polite"
            >
                <span className="flex items-center justify-center w-12 h-12 rounded-full text-xl" style={{ background: "rgba(46,240,154,0.1)", border: "1px solid rgba(46,240,154,0.3)" }}>✓</span>
                <div>
                    <h3 className="text-xl font-black text-[var(--text-primary)] mb-2" style={{ fontFamily: "var(--heading)" }}>Got it — thank you!</h3>
                    <p className="text-sm text-[#5A5A80] leading-relaxed max-w-md">
                        Your project details have been sent. Go ahead and pay using the bank or mobile money details above, then email the receipt to confirm — your plan activates within 24 hours.
                    </p>
                </div>
            </div>
        );
    }

    const isLastStep = step === FORM_STEPS.length - 1;

    return (
        <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            <SectionHeading eyebrow="Get Started" title="Tell me about your" accentText="project." />
            <p className="text-sm text-[var(--text-dim)] -mt-8 mb-10 max-w-2xl leading-relaxed">
                A few short steps, so I have everything I need to get started without a phone call.
            </p>

            <div ref={formTopRef} className="scroll-mt-24 max-w-2xl rounded-2xl border p-6 sm:p-8" style={{ borderColor: "var(--border-subtle)", background: "var(--surface-raised)" }}>
                <StepProgress step={step} />

                <form onSubmit={handleSubmit} noValidate aria-label="Subscription project form" className="flex flex-col gap-8">

                    {step === 0 && (
                        <>
                            <FormSection n="1" title="Contact & business">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className={labelBase}>Your name <span className="text-[#00CFFF]">*</span></label>
                                        <input id="name" name="name" required value={form.name} onChange={handleChange} className={fieldClass("name")} placeholder="Your full name" autoComplete="name" />
                                    </div>
                                    <div>
                                        <label htmlFor="business" className={labelBase}>Business / company name</label>
                                        <input id="business" name="business" value={form.business} onChange={handleChange} className={fieldClass("business")} placeholder="If applicable" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className={labelBase}>Email <span className="text-[#00CFFF]">*</span></label>
                                        <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className={fieldClass("email")} placeholder="you@example.com" autoComplete="email" />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className={labelBase}>Phone / WhatsApp <span className="text-[#00CFFF]">*</span></label>
                                        <input id="phone" name="phone" required value={form.phone} onChange={handleChange} className={fieldClass("phone")} placeholder="+260 9XX XXX XXX" autoComplete="tel" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="location" className={labelBase}>City / country <span className="text-[#00CFFF]">*</span></label>
                                        <input id="location" name="location" required value={form.location} onChange={handleChange} className={fieldClass("location")} placeholder="e.g. Lusaka, Zambia" />
                                    </div>
                                </div>
                            </FormSection>

                            <FormSection n="2" title="Plan & payment">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="plan" className={labelBase}>Which plan? <span className="text-[#00CFFF]">*</span></label>
                                        <select id="plan" name="plan" required value={form.plan} onChange={handleChange} className={`${fieldClass("plan")} cursor-pointer`}>
                                            <option value="" disabled>Select a plan…</option>
                                            {getPlanOptions().map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
                                            <option value="not-sure">Not sure yet — help me choose</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="payMethod" className={labelBase}>How will you pay?</label>
                                        <select id="payMethod" name="payMethod" value={form.payMethod} onChange={handleChange} className={`${fieldClass("payMethod")} cursor-pointer`}>
                                            <option value="">Not sure yet</option>
                                            <option value="bank">Bank transfer (ZICB)</option>
                                            <option value="momo">Mobile money (MTN)</option>
                                        </select>
                                    </div>
                                </div>
                            </FormSection>
                        </>
                    )}

                    {step === 1 && (
                        <FormSection n="3" title="Current website">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="hasWebsite" className={labelBase}>Do you have a website already? <span className="text-[#00CFFF]">*</span></label>
                                    <select id="hasWebsite" name="hasWebsite" required value={form.hasWebsite} onChange={handleChange} className={`${fieldClass("hasWebsite")} cursor-pointer`}>
                                        <option value="" disabled>Select…</option>
                                        <option value="live">Yes, live and working</option>
                                        <option value="broken">Yes, but broken or outdated</option>
                                        <option value="none">No, starting from scratch</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="currentPlatform" className={labelBase}>Built on, if known</label>
                                    <select id="currentPlatform" name="currentPlatform" value={form.currentPlatform} onChange={handleChange} className={`${fieldClass("currentPlatform")} cursor-pointer`}>
                                        <option value="">Not sure / not applicable</option>
                                        <option value="wordpress">WordPress</option>
                                        <option value="shopify">Shopify</option>
                                        <option value="wix">Wix / Squarespace</option>
                                        <option value="custom">Custom-built</option>
                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="currentUrl" className={labelBase}>Current website URL</label>
                                    <input id="currentUrl" name="currentUrl" value={form.currentUrl} onChange={handleChange} className={fieldClass("currentUrl")} placeholder="https://…  (leave blank if none)" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="hasHostingDomain" className={labelBase}>Do you already have hosting and a domain?</label>
                                    <select id="hasHostingDomain" name="hasHostingDomain" value={form.hasHostingDomain} onChange={handleChange} className={`${fieldClass("hasHostingDomain")} cursor-pointer`}>
                                        <option value="">Not sure</option>
                                        <option value="yes">Yes, both</option>
                                        <option value="domain-only">Domain only</option>
                                        <option value="no">No, need help getting set up</option>
                                    </select>
                                </div>
                            </div>
                        </FormSection>
                    )}

                    {step === 2 && (
                        <FormSection n="4" title="Goals & priorities">
                            <div>
                                <label htmlFor="goal" className={labelBase}>What's the main goal for your website? <span className="text-[#00CFFF]">*</span></label>
                                <textarea id="goal" name="goal" required rows={3} value={form.goal} onChange={handleChange} className={`${fieldClass("goal")} resize-y`} placeholder="e.g. get more enquiries, sell online, look more credible, replace an old site…" />
                            </div>
                            <CheckboxGroup label="Top priorities right now (pick any that apply)" options={PRIORITY_OPTIONS} values={form.priorities} onToggle={(o) => toggle("priorities", o)} name="priorities" />
                            <div>
                                <label htmlFor="audience" className={labelBase}>Who is your target audience or customer?</label>
                                <input id="audience" name="audience" value={form.audience} onChange={handleChange} className={fieldClass("audience")} placeholder="e.g. homeowners in Lusaka, small business owners…" />
                            </div>
                            <div>
                                <label htmlFor="references" className={labelBase}>Any websites you like, as a reference? <span className="text-[#40405A] normal-case tracking-normal">(optional)</span></label>
                                <input id="references" name="references" value={form.references} onChange={handleChange} className={fieldClass("references")} placeholder="Paste a link or two, if you have any in mind" />
                            </div>
                        </FormSection>
                    )}

                    {step === 3 && (
                        <>
                            <FormSection n="5" title="Assets & features">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="hasBrandAssets" className={labelBase}>Logo, colours, fonts?</label>
                                        <select id="hasBrandAssets" name="hasBrandAssets" value={form.hasBrandAssets} onChange={handleChange} className={`${fieldClass("hasBrandAssets")} cursor-pointer`}>
                                            <option value="">Not sure</option>
                                            <option value="ready">Yes, ready to send over</option>
                                            <option value="some">Some of it</option>
                                            <option value="none">No, need help with this</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="hasContent" className={labelBase}>Content ready (text, photos)?</label>
                                        <select id="hasContent" name="hasContent" value={form.hasContent} onChange={handleChange} className={`${fieldClass("hasContent")} cursor-pointer`}>
                                            <option value="">Not sure</option>
                                            <option value="ready">Yes, ready to send over</option>
                                            <option value="some">Some of it</option>
                                            <option value="none">No, need help writing it</option>
                                        </select>
                                    </div>
                                </div>
                                <CheckboxGroup label="Any specific features you need? (optional)" options={FEATURE_OPTIONS} values={form.features} onToggle={(o) => toggle("features", o)} name="features" />
                            </FormSection>

                            <FormSection n="6" title="Timeline">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="startTime" className={labelBase}>When would you like to start? <span className="text-[#00CFFF]">*</span></label>
                                        <select id="startTime" name="startTime" required value={form.startTime} onChange={handleChange} className={`${fieldClass("startTime")} cursor-pointer`}>
                                            <option value="" disabled>Select…</option>
                                            <option value="asap">As soon as possible</option>
                                            <option value="2weeks">Within 2 weeks</option>
                                            <option value="month">Within a month</option>
                                            <option value="exploring">Just exploring for now</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="deadline" className={labelBase}>Any hard deadline? <span className="text-[#40405A] normal-case tracking-normal">(optional)</span></label>
                                        <input id="deadline" name="deadline" value={form.deadline} onChange={handleChange} className={fieldClass("deadline")} placeholder="e.g. needs to launch by 15 September" />
                                    </div>
                                </div>
                            </FormSection>
                        </>
                    )}

                    {step === 4 && (
                        <FormSection n="7" title="Anything else">
                            <div>
                                <label htmlFor="notes" className={labelBase}>Additional notes <span className="text-[#40405A] normal-case tracking-normal">(optional)</span></label>
                                <textarea id="notes" name="notes" rows={4} value={form.notes} onChange={handleChange} className={`${fieldClass("notes")} resize-y`} placeholder="Anything else I should know before we start…" />
                            </div>
                        </FormSection>
                    )}

                    {stepError && (
                        <p className="text-xs text-red-400">Please fill in the required fields (marked *) before continuing.</p>
                    )}

                    {isLastStep && <ReCAPTCHA ref={recaptchaRef} sitekey="6LcxsVctAAAAANe2yhsyFXyoFrjPTKj9fvh8g4M6" size="invisible" />}

                    <div className="flex items-center gap-3 pt-2 border-t border-[#14142A]">
                        {step > 0 && (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] cursor-pointer border"
                                style={{ borderColor: "#2A2A45", color: "#A0A0C0", fontFamily: "var(--heading)" }}
                            >
                                ← Back
                            </button>
                        )}
                        {!isLastStep ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="ml-auto inline-flex items-center gap-2.5 px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] cursor-pointer"
                                style={{ background: "#00CFFF", color: "#080810", fontFamily: "var(--heading)" }}
                            >
                                Continue →
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className="ml-auto inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                                style={{ background: status === "sending" ? "rgba(0,207,255,0.6)" : "#00CFFF", color: "#080810", fontFamily: "var(--heading)" }}
                            >
                                {status === "sending" ? "Sending…" : `Send project details${form.plan && form.plan !== "not-sure" ? ` for ${planLabel(form.plan) || ""}` : ""}`}
                            </button>
                        )}
                    </div>

                    {isLastStep && (
                        <p className="text-xs text-[#5A5A80] max-w-md leading-relaxed">
                            This just sends me your details — no payment is taken here. Payment instructions are above; your plan starts once I receive your payment receipt by email.
                        </p>
                    )}
                    {status === "error" && (
                        <p className="text-xs text-red-400">Something went wrong sending this. Please try again, or email me directly.</p>
                    )}
                </form>
            </div>
        </div>
    );
}

/* ── Subscription page ─────────────────────────────────────────── */
export default function Subscription() {
    usePageSEO();
    const [selectedPlan, setSelectedPlan] = useState("");
    const [cycle, setCycle] = useState("monthly");

    const handleChoose = (planId) => {
        setSelectedPlan(planId);
        document.getElementById("get-started")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <main id="main-content" className="relative w-full bg-[var(--surface)] min-h-screen">
            <div
                className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] opacity-[0.06] blur-3xl"
                style={{ background: "radial-gradient(ellipse, #00CFFF 0%, transparent 70%)" }}
                aria-hidden="true"
            />

            <div className="relative w-full px-[var(--px)] sm:px-[var(--px-sm)] lg:px-[var(--px-lg)] xl:px-[var(--px-xl)] pb-20 sm:pb-28">
                <Hero />

                <div className="py-14 sm:py-20 border-t border-[var(--border-subtle)]">
                    <HowItWorks />
                </div>

                <div id="plans" className="py-14 sm:py-20 border-t border-[var(--border-subtle)]">
                    <PlansGrid cycle={cycle} onCycleChange={setCycle} onChoose={handleChoose} />
                </div>

                <div className="py-14 sm:py-20 border-t border-[var(--border-subtle)] flex flex-col gap-5">
                    <DomainHosting />
                    <Advertising />
                </div>

                <div className="py-14 sm:py-20 border-t border-[var(--border-subtle)]">
                    <ComparisonTable />
                </div>

                <div className="py-14 sm:py-20 border-t border-[var(--border-subtle)]">
                    <PlanRecommendation />
                </div>

                <div className="py-14 sm:py-20 border-t border-[var(--border-subtle)]">
                    <PaymentInstructions />
                </div>

                <div className="py-14 sm:py-20 border-t border-[var(--border-subtle)]">
                    <FAQ />
                </div>

                <div id="get-started" className="py-14 sm:py-20 border-t border-[var(--border-subtle)] scroll-mt-20">
                    <IntakeForm selectedPlan={selectedPlan} />
                </div>
            </div>
        </main>
    );
}
