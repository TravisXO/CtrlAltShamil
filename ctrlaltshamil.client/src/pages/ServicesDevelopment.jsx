import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ── SEO ───────────────────────────────────────────────────────── */
function usePageSEO() {
    useEffect(() => {
        const prev = document.title;
        document.title = "Web Development Services | Full-Stack Builds — CtrlAltShamil";

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

        setMeta("description", "Full-stack web development for businesses in Zambia and worldwide — custom builds, ongoing feature delivery through a managed queue, and fast, modern, mobile-ready sites.");
        setOG("og:title", "Web Development Services | CtrlAltShamil");
        setOG("og:description", "Fast, modern websites and web applications, built to last — delivered as a one-time project or an ongoing managed queue.");
        setOG("og:url", "https://www.ctrlaltshamil.com/services/development");

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

function SectionHeading({ eyebrow, title, accentText, accent = "#00CFFF" }) {
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
    { n: "1", title: "Scoping", text: "Understanding what actually needs to be built, in plain terms, before a single line of code is written." },
    { n: "2", title: "Build", text: "A modern stack — React on the frontend, ASP.NET Core on the backend — chosen for speed and reliability, not because it's trendy." },
    { n: "3", title: "Review", text: "Tested across devices and screen sizes before anything ships, not after a customer finds the problem." },
    { n: "4", title: "Ongoing delivery", text: "Larger builds are delivered in agreed stages, so you see working progress rather than waiting months for one big reveal." },
];

const USE_CASES = [
    "Property or product listing platforms",
    "Booking, enquiry, or lead-capture systems",
    "Custom admin dashboards for managing your own data",
    "Content-managed business sites you can update yourself",
    "Integrations with third-party tools (payments, CRMs, mapping, etc.)",
];

const INDUSTRIES = ["Real estate", "Hospitality & tourism", "Professional services", "E-commerce", "Any business outgrowing a template site"];

const ADVANTAGES = [
    "Access to genuinely custom builds, not templated fixes stretched to fit",
    "A clear, agreed price upfront — no surprise invoices mid-project",
    "A developer who already knows your codebase, instead of re-explaining context to someone new each time",
];
const LIMITATIONS = [
    "Larger projects are staged over several weeks or months rather than delivered instantly",
    "Domain and hosting aren't included by default — arranged separately when needed",
    "This is development work, not advertising — any ad spend for a project is always handled and billed separately",
];

const FAQS = [
    { q: "Can you build [specific feature]?", a: "Very likely — describe what you need via the project form and it'll get an honest answer, including roughly what it would cost. Modern AI-assisted development means custom features, integrations, and tools that would once have needed a full engineering team are realistically achievable for a much wider range of projects than before." },
    { q: "Do I own the code and content?", a: "Yes. Once a project is paid for, you own what was built specifically for you. Reusable tools, patterns, and general know-how developed along the way remain part of the toolkit used across projects." },
    { q: "How is a build priced?", a: "As a one-off project fee, agreed upfront in a written quote before any work starts — not a monthly subscription. Published prices are starting points; the final figure depends on how many pages, features and integrations your project actually needs." },
    { q: "What happens after it launches?", a: "Nothing is forced on you. If you want the site kept updated, secure and climbing on Google afterwards, the SiteCare or SEO Momentum monthly plans are there — but a build is a complete deliverable on its own." },
];

export default function ServicesDevelopment() {
    usePageSEO();
    const { ref: heroRef, visible: heroVisible } = useFadeIn(0.05);

    return (
        <main id="main-content" className="relative w-full bg-[var(--surface)] min-h-screen">
            <div
                className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] opacity-[0.06] blur-3xl"
                style={{ background: "radial-gradient(ellipse, #00CFFF 0%, transparent 70%)" }}
                aria-hidden="true"
            />
            <div className="relative w-full px-[var(--px)] sm:px-[var(--px-sm)] lg:px-[var(--px-lg)] xl:px-[var(--px-xl)] pt-28 sm:pt-36 pb-20 sm:pb-28">

                {/* Hero */}
                <div ref={heroRef} className="max-w-3xl mb-4" style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
                    <span className="inline-block text-xs font-mono tracking-[0.2em] uppercase text-[var(--cyan)] mb-5">Web Development Services</span>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.05] mb-6 text-[var(--text-primary)]" style={{ fontFamily: "var(--heading)" }}>
                        Built to last,{" "}<span className="text-[var(--cyan)]">not just launched.</span>
                    </h1>
                    <p className="text-base sm:text-lg leading-relaxed text-[var(--text-dim)] mb-4">
                        Fast, modern websites and web applications — built with the same engineering standard whether it's a five-page business site or a full platform with an admin system behind it.
                    </p>
                    <p className="text-base leading-relaxed text-[var(--text-dim)]">
                        A slow, outdated, or hard-to-update website costs a business more than it looks like — lost customers who bounce, lost credibility, and a growing backlog of changes nobody has time to make. Development work shouldn't mean starting from scratch with a new quote every time something needs to change.
                    </p>
                </div>

                <Divider />

                {/* How it works */}
                <FadeSection>
                    <SectionHeading eyebrow="How It Works" title="What actually" accentText="happens." />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {STEPS.map((s) => (
                            <div key={s.n} className="rounded-2xl border p-5 flex flex-col gap-2.5" style={{ borderColor: "var(--border-subtle)", background: "var(--surface-raised)" }}>
                                <span className="text-xs font-mono text-[var(--cyan)]">{s.n}</span>
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
                                Fast, mobile-responsive pages and features scoped to what you actually asked for. Thanks to modern AI-assisted development, that scope is wider than it used to be — custom features, integrations, and tools that would normally need a full engineering team are realistically on the table within a managed queue, not just small template tweaks.
                            </p>
                            <p className="text-sm font-bold text-white/90 mb-2">Example use cases</p>
                            <ul className="flex flex-col gap-2">
                                {USE_CASES.map((u) => (
                                    <li key={u} className="text-sm text-[var(--text-dim)] leading-snug flex items-start gap-2">
                                        <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" aria-hidden="true" />{u}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white/90 mb-3">Suitable industries</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {INDUSTRIES.map((ind) => (
                                    <span key={ind} className="text-xs font-mono px-3 py-1.5 rounded-full border" style={{ borderColor: "#00CFFF30", background: "#00CFFF0A", color: "var(--cyan)" }}>{ind}</span>
                                ))}
                            </div>
                            <p className="text-sm font-bold text-white/90 mb-2">What we need from you</p>
                            <p className="text-sm text-[var(--text-dim)] leading-relaxed">
                                A clear idea of the problem you're solving, even if not the exact technical solution. Access to existing hosting, domain, or codebase if there is one. Brand assets and content if you have them — or just a heads-up that these need to be created too.
                            </p>
                        </div>
                    </div>
                </FadeSection>

                <Divider />

                {/* Advantages / Limitations */}
                <FadeSection>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="rounded-2xl border p-6" style={{ borderColor: "#00CFFF25", background: "#00CFFF08" }}>
                            <p className="text-xs font-mono tracking-widest uppercase text-[var(--cyan)] mb-3">Advantages</p>
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
                    <SectionHeading eyebrow="Pricing" title="Ongoing, or" accentText="one-time." />
                    <p className="text-sm text-[var(--text-dim)] leading-relaxed max-w-2xl mb-3">
                        Builds are priced as one-off projects — websites from K2,500, mobile apps from K15,000, and custom software from K10,000 — with a written quote confirming the exact cost before work starts. Once it's live, the SiteCare or SEO Momentum monthly plans can keep it maintained and growing.
                    </p>
                    <div className="flex flex-wrap gap-3 mb-10">
                        <Link to="/subscription#projects" className="inline-flex items-center gap-2 text-sm font-mono px-5 py-2.5 rounded-xl border transition-all duration-200 hover:brightness-125" style={{ borderColor: "#00CFFF40", color: "var(--cyan)", background: "#00CFFF0D" }}>
                            See one-off project pricing
                        </Link>
                        <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-mono px-5 py-2.5 rounded-xl border border-[#2A2A45] text-[#A0A0C0] hover:text-white hover:border-[#50506A] transition-all duration-200">
                            Get a one-time project quote
                        </Link>
                    </div>
                    <p className="text-sm font-bold text-white/90 mb-2">Proof it works</p>
                    <p className="text-sm text-[var(--text-dim)] leading-relaxed">
                        See real projects built this way:{" "}
                        <Link to="/projects/victors-hill-estates" className="text-[var(--cyan)] underline underline-offset-2 hover:text-white transition-colors">Victor's Hill Estates</Link>,{" "}
                        <Link to="/projects/summit-stone-properties" className="text-[var(--cyan)] underline underline-offset-2 hover:text-white transition-colors">Summit &amp; Stone Properties</Link>,{" "}
                        and{" "}
                        <Link to="/projects/house-to-home" className="text-[var(--cyan)] underline underline-offset-2 hover:text-white transition-colors">House to Home</Link>.
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
                                    <span className="shrink-0 text-[var(--cyan)] transition-transform duration-200 group-open:rotate-45 text-xl leading-none">+</span>
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
