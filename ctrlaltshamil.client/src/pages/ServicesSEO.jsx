import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ── SEO ───────────────────────────────────────────────────────── */
function usePageSEO() {
    useEffect(() => {
        const prev = document.title;
        document.title = "SEO Services | Technical SEO & Search Growth — CtrlAltShamil";

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

        setMeta("description", "Technical SEO services for businesses in Zambia and worldwide — audits, keyword research, on-page fixes, and monthly reporting that shows real movement in Google rankings.");
        setOG("og:title", "SEO Services | CtrlAltShamil");
        setOG("og:description", "Technical SEO that shows real, trackable movement in Google rankings — not tricks, not shortcuts.");
        setOG("og:url", "https://www.ctrlaltshamil.com/services/seo");

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

function FadeSection({ children, className = "", delay = 0 }) {
    const { ref, visible } = useFadeIn();
    return (
        <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
            {children}
        </div>
    );
}

function SectionHeading({ eyebrow, title, accentText, accent = "#2EF09A" }) {
    return (
        <div className="mb-8 sm:mb-10">
            <span className="inline-block text-xs font-mono tracking-[0.2em] uppercase mb-4" style={{ color: accent }}>{eyebrow}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-primary)] tracking-tight leading-tight" style={{ fontFamily: "var(--heading)" }}>
                {title}{" "}{accentText && <span style={{ color: accent }}>{accentText}</span>}
            </h2>
        </div>
    );
}

function Divider() {
    return <div className="w-full h-px my-12 sm:my-16" style={{ background: "rgba(255,255,255,0.06)" }} />;
}

const STEPS = [
    { n: "1", title: "Technical audit", text: "Checking for the hidden issues — broken links, missing tags, slow pages — that quietly stop Google from trusting a site." },
    { n: "2", title: "Keyword research", text: "Finding out exactly what your customers are searching for, in their own words, not just what sounds good internally." },
    { n: "3", title: "On-page fixes", text: "Rewriting titles, descriptions, and page content so they actually answer what someone typed into Google." },
    { n: "4", title: "Tracking & reporting", text: "Connecting Google Search Console and Analytics so progress is measurable, not guesswork." },
    { n: "5", title: "Ongoing iteration", text: "Reviewing what's working every month and adjusting — search rankings move, so the work doesn't stop after launch." },
];

const USE_CASES = [
    "A local service business wanting to rank for \"[service] in [city]\" searches",
    "An e-commerce site wanting more organic (unpaid) product traffic",
    "A content-heavy site wanting to rank for informational, research-stage searches",
    "A property or listings site wanting local search visibility",
];

const INDUSTRIES = ["Real estate", "Tourism & hospitality", "Professional services", "E-commerce", "Local retail"];

const ADVANTAGES = [
    "Real, trackable movement in Google rankings over time",
    "Monthly reporting written in plain English, not a wall of jargon",
    "Built on genuine technical fixes, not tricks that risk a Google penalty later",
];
const LIMITATIONS = [
    "SEO takes months, not days, to show its full effect",
    "No one can honestly guarantee a #1 ranking — treat anyone who promises that with caution",
    "Results depend partly on how competitive your market and chosen keywords are",
];

const FAQS = [
    { q: "How long until I see results?", a: "Most sites start showing measurable movement within 2–3 months, with more substantial gains building over 6–12 months. New domains generally take longer than established ones. It's ongoing work, not a one-time fix." },
    { q: "Do you guarantee rankings?", a: "No — and be cautious of anyone who does. Google's ranking algorithm isn't controlled by any single SEO provider. What's realistic to promise is the work itself: proper technical fixes, real keyword targeting, and honest monthly reporting on what's moving." },
    { q: "What if I'm already working with someone else on SEO?", a: "That's fine — get in touch and describe where things stand. A quick technical audit can usually show whether the existing work is on the right track before you commit to anything new." },
    { q: "Is SEO worth it for a small business?", a: "It depends on whether your customers search for what you offer. If people are already Googling for businesses like yours, SEO is one of the few marketing channels that keeps paying off long after the work is done — unlike ads, which stop the moment you stop paying." },
];

export default function ServicesSEO() {
    usePageSEO();
    const { ref: heroRef, visible: heroVisible } = useFadeIn(0.05);

    return (
        <main id="main-content" className="relative w-full bg-[var(--surface)] min-h-screen">
            <div
                className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] opacity-[0.06] blur-3xl"
                style={{ background: "radial-gradient(ellipse, #2EF09A 0%, transparent 70%)" }}
                aria-hidden="true"
            />
            <div className="relative w-full px-[var(--px)] sm:px-[var(--px-sm)] lg:px-[var(--px-lg)] xl:px-[var(--px-xl)] pt-28 sm:pt-36 pb-20 sm:pb-28">

                {/* Hero */}
                <div ref={heroRef} className="max-w-3xl mb-4" style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
                    <span className="inline-block text-xs font-mono tracking-[0.2em] uppercase text-[#2EF09A] mb-5">SEO Services</span>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.05] mb-6 text-[var(--text-primary)]" style={{ fontFamily: "var(--heading)" }}>
                        Turn search traffic into{" "}<span className="text-[#2EF09A]">real enquiries.</span>
                    </h1>
                    <p className="text-base sm:text-lg leading-relaxed text-[var(--text-dim)] mb-4">
                        Search Engine Optimisation (SEO) is the ongoing work of making a website easier for Google to find, understand, and trust — so it shows up when the right people search for what you offer. It isn't a one-time fix you can tick off; it's steady, compounding work.
                    </p>
                    <p className="text-base leading-relaxed text-[var(--text-dim)]">
                        Most small businesses have a website that nobody finds. It might look great, but if it's missing behind-the-scenes technical signals, clear page content, or basic tracking, Google has little reason to rank it above competitors — no matter how good the business itself is.
                    </p>
                </div>

                <Divider />

                {/* How it works */}
                <FadeSection>
                    <SectionHeading eyebrow="How It Works" title="What actually" accentText="happens." />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {STEPS.map((s) => (
                            <div key={s.n} className="rounded-2xl border p-5 flex flex-col gap-2.5" style={{ borderColor: "var(--border-subtle)", background: "var(--surface-raised)" }}>
                                <span className="text-xs font-mono text-[#2EF09A]">{s.n}</span>
                                <h3 className="text-sm font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--heading)" }}>{s.title}</h3>
                                <p className="text-xs text-[var(--text-dim)] leading-relaxed">{s.text}</p>
                            </div>
                        ))}
                    </div>
                </FadeSection>

                <Divider />

                {/* What you receive + use cases + industries */}
                <FadeSection>
                    <SectionHeading eyebrow="The Details" title="What you" accentText="receive." />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-white/80 leading-relaxed mb-4">
                                Ongoing technical SEO fixes, on-page optimisation for your key pages, tracking of the search terms that matter to your business, and a monthly report you can actually understand — plus a call to walk through it. If paid traffic makes sense alongside the organic work, Google Ads management can run in parallel.
                            </p>
                            <p className="text-sm font-bold text-white/90 mb-2">Example use cases</p>
                            <ul className="flex flex-col gap-2">
                                {USE_CASES.map((u) => (
                                    <li key={u} className="text-sm text-[var(--text-dim)] leading-snug flex items-start gap-2">
                                        <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[#2EF09A]" aria-hidden="true" />{u}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white/90 mb-3">Suitable industries</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {INDUSTRIES.map((ind) => (
                                    <span key={ind} className="text-xs font-mono px-3 py-1.5 rounded-full border" style={{ borderColor: "#2EF09A30", background: "#2EF09A0A", color: "#2EF09A" }}>{ind}</span>
                                ))}
                            </div>
                            <p className="text-sm font-bold text-white/90 mb-2">What we need from you</p>
                            <p className="text-sm text-[var(--text-dim)] leading-relaxed">
                                Access to make changes to your website (or a way to request them), access to Google Search Console and Analytics — or help getting these set up — and a sense of what makes your business different from the competitors people are also searching for.
                            </p>
                        </div>
                    </div>
                </FadeSection>

                <Divider />

                {/* Advantages / Limitations */}
                <FadeSection>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="rounded-2xl border p-6" style={{ borderColor: "#2EF09A25", background: "#2EF09A08" }}>
                            <p className="text-xs font-mono tracking-widest uppercase text-[#2EF09A] mb-3">Advantages</p>
                            <ul className="flex flex-col gap-2.5">
                                {ADVANTAGES.map((a) => <li key={a} className="text-sm text-white/80 leading-snug">{a}</li>)}
                            </ul>
                        </div>
                        <div className="rounded-2xl border p-6" style={{ borderColor: "#F0C22E25", background: "#F0C22E08" }}>
                            <p className="text-xs font-mono tracking-widest uppercase text-[#F0C22E] mb-3">Realistic limitations</p>
                            <ul className="flex flex-col gap-2.5">
                                {LIMITATIONS.map((l) => <li key={l} className="text-sm text-white/80 leading-snug">{l}</li>)}
                            </ul>
                        </div>
                    </div>
                </FadeSection>

                <Divider />

                {/* Pricing + proof */}
                <FadeSection>
                    <SectionHeading eyebrow="Pricing" title="Included in the" accentText="SEO Momentum plan." />
                    <p className="text-sm text-[var(--text-dim)] leading-relaxed max-w-2xl mb-3">
                        This work is delivered through the SEO Momentum monthly plan. If you'd rather run paid Google Ads without the full SEO retainer, that's available separately as a standalone management fee — your ad budget is always kept separate from the service fee, on either option.
                    </p>
                    <div className="flex flex-wrap gap-3 mb-10">
                        <Link to="/subscription#plans" className="inline-flex items-center gap-2 text-sm font-mono px-5 py-2.5 rounded-xl border transition-all duration-200 hover:brightness-125" style={{ borderColor: "#2EF09A40", color: "#2EF09A", background: "#2EF09A0D" }}>
                            See SEO Momentum pricing
                        </Link>
                        <Link to="/subscription#get-started" className="inline-flex items-center gap-2 text-sm font-mono px-5 py-2.5 rounded-xl border border-[#2A2A45] text-[#A0A0C0] hover:text-white hover:border-[#50506A] transition-all duration-200">
                            Tell me about your project
                        </Link>
                    </div>
                    <p className="text-sm font-bold text-white/90 mb-2">Proof it works</p>
                    <p className="text-sm text-[var(--text-dim)] leading-relaxed">
                        See the real, verified numbers from{" "}
                        <Link to="/projects/classic-zambia" className="text-[#2EF09A] underline underline-offset-2 hover:text-white transition-colors">Classic Zambia Safaris</Link>{" "}
                        and{" "}
                        <Link to="/projects/house-to-home" className="text-[#2EF09A] underline underline-offset-2 hover:text-white transition-colors">House to Home</Link>.
                    </p>
                </FadeSection>

                <Divider />

                {/* FAQ */}
                <FadeSection>
                    <SectionHeading eyebrow="Questions" title="Frequently" accentText="asked." />
                    <div className="flex flex-col gap-3">
                        {FAQS.map((f) => (
                            <details key={f.q} className="group rounded-2xl border overflow-hidden" style={{ borderColor: "var(--border-subtle)", background: "var(--surface-raised)" }}>
                                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 p-5 text-sm font-semibold text-white/90">
                                    {f.q}
                                    <span className="shrink-0 text-[#2EF09A] transition-transform duration-200 group-open:rotate-45 text-xl leading-none">+</span>
                                </summary>
                                <p className="px-5 pb-5 text-sm text-[var(--text-dim)] leading-relaxed">{f.a}</p>
                            </details>
                        ))}
                    </div>
                </FadeSection>
            </div>
        </main>
    );
}
