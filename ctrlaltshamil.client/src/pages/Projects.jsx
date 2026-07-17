import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import imgH2HAhrefs from "../assets/h2h-ahrefs.png";
import imgH2HDesktop from "../assets/H2H_-_page_speed__laptop_.png";
import imgCZSCover from "../assets/Classic_Zambia_Safaris_-_ahrefs_1.png";
import imgH2HCover from "../assets/h2h-ahrefs.png";
import imgH2HMobile from "../assets/H2H_-_page_speed__mobile_.png";
import imgCanonicalAuditor from "../assets/canonical-seo-auditor.png";
import imgPortfolio from "../assets/portofolio-landing.png";

/* ── SEO ───────────────────────────────────────────────────────── */
function usePageSEO() {
    useEffect(() => {
        const prev = document.title;
        document.title = "Projects | SEO Case Studies & Web Development Work — CtrlAltShamil";

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

        setMeta("description", "SEO case studies and full-stack web development projects by Alexander Shamil Mondoka. Real traffic data, verified rankings and production applications built with ASP.NET and React.");
        setOG("og:title", "Projects | CtrlAltShamil");
        setOG("og:description", "SEO case studies with verified data and full-stack web applications. Built by a developer and SEO specialist in Lusaka, Zambia.");
        setOG("og:url", "https://YOURDOMAIN.com/projects");

        return () => { document.title = prev; };
    }, []);
}

/* ── useFadeIn ─────────────────────────────────────────────────── */
function useFadeIn(threshold = 0.12) {
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

/* ── Tag colours ───────────────────────────────────────────────── */
const TAG_STYLES = {
    SEO: { bg: "#0D2A1F", border: "#1A6644", text: "#2EF09A" },
    "Full-Stack": { bg: "#0D1E2A", border: "#1A4466", text: "#00CFFF" },
    "Open Source": { bg: "#1F1A0D", border: "#665A1A", text: "#F0C22E" },
    "Web Dev": { bg: "#1A0D2A", border: "#5A1A66", text: "#C07AF0" },
};

function Tag({ label }) {
    const s = TAG_STYLES[label] || TAG_STYLES["Full-Stack"];
    return (
        <span
            className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full border"
            style={{ background: s.bg, borderColor: s.border, color: s.text }}
        >
            {label}
        </span>
    );
}

/* ── Keyword ranking bar visual ────────────────────────────────── */
function RankingBars({ data }) {
    const max = Math.max(...data.map(d => d.count));
    const colours = ["#2EF09A", "#00CFFF", "#7B8EFF", "#A78BFA", "#C4B5FD", "#DDD6FE"];
    return (
        <div className="mt-3">
            <p className="text-[10px] font-mono text-[#50507A] uppercase tracking-widest mb-2">Keyword ranking distribution</p>
            <div className="flex items-end gap-1.5 h-10">
                {data.map((d, i) => (
                    <div key={d.range} className="flex flex-col items-center gap-1 flex-1">
                        <span className="text-[10px] font-mono font-bold text-white/75">{d.count}</span>
                        <div
                            className="w-full rounded-sm transition-all duration-700"
                            style={{ height: `${Math.max(4, (d.count / max) * 36)}px`, background: colours[i], opacity: 0.85 }}
                        />
                    </div>
                ))}
            </div>
            <div className="flex gap-1.5 mt-1">
                {data.map((d) => (
                    <div key={d.range} className="flex-1 text-center text-[9px] font-mono leading-tight text-white/50">{d.range}</div>
                ))}
            </div>
        </div>
    );
}

/* ── Chips ──────────────────────────────────────────────────────── */
function MetricChip({ label, accent }) {
    return (
        <span
            className="inline-flex items-center text-[11px] font-mono px-3 py-1 rounded-full border"
            style={{ background: `${accent}12`, borderColor: `${accent}40`, color: accent }}
        >
            {label}
        </span>
    );
}

function StatusChip({ label }) {
    return (
        <span className="inline-flex items-center text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full border border-[#665A1A] bg-[#1F1A0D] text-[#F0C22E]">
            {label}
        </span>
    );
}

function TechChip({ label }) {
    return (
        <span className="text-[10px] font-mono tracking-wider px-2.5 py-1 rounded border border-[#2A2A45] bg-[#0F0F20] text-[#7070A0]">
            {label}
        </span>
    );
}

/* ── Icons ──────────────────────────────────────────────────────── */
function ExternalIcon() {
    return (
        <svg className="w-3 h-3 opacity-60" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 10L10 2M5 2h5v5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function GitHubIcon() {
    return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.031 1.531 1.031.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
    );
}

/* ── Cover placeholder ─────────────────────────────────────────── */
function CoverPlaceholder({ type }) {
    const configs = {
        seo: {
            bg: "linear-gradient(135deg, #0a1a12 0%, #0d2a1f 50%, #071510 100%)", accent: "#2EF09A", label: "SEO Analytics",
            icon: (<svg viewBox="0 0 48 48" className="w-10 h-10 opacity-60" fill="none" stroke="#2EF09A" strokeWidth="1.5"><polyline points="4,36 14,22 22,28 32,12 44,18" /><circle cx="44" cy="18" r="2" fill="#2EF09A" stroke="none" /><path d="M4 40h40" strokeOpacity="0.3" /></svg>),
        },
        webdev: {
            bg: "linear-gradient(135deg, #080e1a 0%, #0d1e2e 50%, #060c15 100%)", accent: "#00CFFF", label: "Web App",
            icon: (<svg viewBox="0 0 48 48" className="w-10 h-10 opacity-60" fill="none" stroke="#00CFFF" strokeWidth="1.5"><rect x="4" y="8" width="40" height="28" rx="3" /><polyline points="12,24 18,18 24,24 30,16 36,20" strokeOpacity="0.8" /><line x1="4" y1="40" x2="44" y2="40" strokeOpacity="0.4" /></svg>),
        },
        cli: {
            bg: "linear-gradient(135deg, #0a0a10 0%, #12121e 50%, #08080e 100%)", accent: "#F0C22E", label: "CLI Tool",
            icon: (<svg viewBox="0 0 48 48" className="w-10 h-10 opacity-60" fill="none" stroke="#F0C22E" strokeWidth="1.5"><rect x="4" y="6" width="40" height="36" rx="2" /><circle cx="12" cy="14" r="2" fill="#F0C22E" stroke="none" opacity="0.6" /><circle cx="18" cy="14" r="2" fill="#F0C22E" stroke="none" opacity="0.4" /><circle cx="24" cy="14" r="2" fill="#F0C22E" stroke="none" opacity="0.3" /><text x="10" y="28" fontSize="7" fill="#F0C22E" opacity="0.7" fontFamily="monospace">$ audit --scan</text><text x="10" y="35" fontSize="7" fill="#2EF09A" opacity="0.5" fontFamily="monospace">✓ 0 canonical issues</text></svg>),
        },
        portfolio: {
            bg: "linear-gradient(135deg, #0a0d1a 0%, #10152a 50%, #080a15 100%)", accent: "#7B8EFF", label: "Portfolio",
            icon: (<svg viewBox="0 0 48 48" className="w-10 h-10 opacity-60" fill="none" stroke="#7B8EFF" strokeWidth="1.5"><rect x="4" y="6" width="40" height="28" rx="3" /><rect x="10" y="12" width="10" height="8" rx="1" opacity="0.5" /><rect x="26" y="12" width="12" height="4" rx="1" opacity="0.3" /><rect x="26" y="18" width="8" height="4" rx="1" opacity="0.2" /><rect x="10" y="24" width="28" height="4" rx="1" opacity="0.2" /><line x1="16" y1="38" x2="32" y2="38" strokeOpacity="0.5" /><line x1="4" y1="42" x2="44" y2="42" strokeOpacity="0.2" /></svg>),
        },
    };
    const c = configs[type] || configs.webdev;
    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-3 overflow-hidden" style={{ background: c.bg }}>
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(${c.accent} 1px, transparent 1px), linear-gradient(90deg, ${c.accent} 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />
            <div className="absolute inset-0 flex items-center justify-center"><div className="w-32 h-32 rounded-full blur-3xl opacity-10" style={{ background: c.accent }} /></div>
            {c.icon}
            <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: c.accent, opacity: 0.5 }}>{c.label}</span>
        </div>
    );
}

/* ── Project card ──────────────────────────────────────────────── */
function ProjectCard({ project, index, visible, onImageClick }) {
    return (
        <article
            className="group flex flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-raised)] overflow-hidden hover:border-[#2A2A45] hover:shadow-[0_0_40px_rgba(0,207,255,0.04)] transition-all duration-500"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s, border-color 0.3s, box-shadow 0.3s`,
            }}
        >
            {/* Cover */}
            <div className="relative w-full h-44 overflow-hidden bg-[#07070F] border-b border-[var(--border-subtle)]">
                {project.coverImage ? (
                    <img
                        src={project.coverImage}
                        alt={`${project.title} preview`}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] cursor-zoom-in"
                        loading="lazy"
                        decoding="async"
                        onClick={() => onImageClick({ src: project.coverImage, alt: `${project.title} preview` })}
                    />
                ) : (
                    <CoverPlaceholder type={project.coverType} />
                )}
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(7,7,15,0.6) 0%, transparent 60%)" }} aria-hidden="true" />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {project.tags.map(t => <Tag key={t} label={t} />)}
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-5 gap-4">
                <h3 className="text-base font-bold text-[var(--text-primary)] leading-snug group-hover:text-white transition-colors duration-200" style={{ fontFamily: "var(--heading)" }}>
                    {project.title}
                </h3>
                <p className="text-sm text-[var(--text-dim)] leading-relaxed flex-1">{project.summary}</p>

                {project.rankingData && <RankingBars data={project.rankingData} />}

                {project.metrics && (
                    <div className="flex flex-wrap gap-2">
                        {project.metrics.map(m => <MetricChip key={m.label} label={m.label} accent={m.accent} />)}
                    </div>
                )}

                {project.status && (
                    <div className="flex flex-wrap gap-2">
                        {project.status.map(s => <StatusChip key={s} label={s} />)}
                    </div>
                )}

                {project.tech && (
                    <div className="flex flex-wrap gap-1.5">
                        {project.tech.map(t => <TechChip key={t} label={t} />)}
                    </div>
                )}

                {/* Links */}
                <div className="flex flex-wrap gap-2 pt-1 border-t border-[#14142A] mt-auto">
                    {project.links.map(link => {
                        const cls = "inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg border transition-all duration-200";
                        const style = link.primary
                            ? { borderColor: "#00CFFF40", color: "#00CFFF", background: "#00CFFF0D" }
                            : { borderColor: "#30304A", color: "#7070A0", background: "transparent" };

                        if (link.caseStudyLink) {
                            return (
                                <Link key={link.label} to={link.href} className={`${cls} hover:text-[var(--text-primary)] hover:border-[#50506A]`} style={style}>
                                    {link.label}<ExternalIcon />
                                </Link>
                            );
                        }

                        return (
                            <a key={link.label} href={link.href} target={link.href !== "#" ? "_blank" : undefined} rel="noopener noreferrer"
                                className={`${cls} hover:text-[var(--text-primary)] hover:border-[#50506A]`} style={style}>
                                {link.github ? <GitHubIcon /> : null}
                                {link.label}
                                {!link.github && <ExternalIcon />}
                            </a>
                        );
                    })}
                </div>
            </div>
        </article>
    );
}

/* ── Data ───────────────────────────────────────────────────────── */
export const PROJECTS = [
    {
        id: "summit-stone-properties",
        title: "Summit & Stone Properties — Full-Stack Real Estate Platform",
        tags: ["SEO", "Full-Stack"],
        coverType: "webdev",
        coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=70",
        summary:
            "A production real estate platform for a Lusaka, Zambia agency — public property search, a JSON-driven blog engine, and an internal admin system, built as a React SPA over an ASP.NET Core API with a custom middleware layer that makes the client-rendered site fully crawlable.",
        tech: ["React 19", "Vite", "ASP.NET Core 8", "EF Core", "PostgreSQL", "Cloudinary", "Leaflet"],
        status: ["Case Study Coming Soon"],
        links: [
            { label: "Live Site", href: "#", primary: true },
        ],
        filter: ["All", "SEO", "Full-Stack"],
    },
    {
        id: "classic-zambia",
        title: "Classic Zambia Safaris — SEO Case Study",
        tags: ["SEO"],
        coverType: "seo",
        coverImage: imgCZSCover,
        summary:
            "3-month SEO engagement that grew monthly organic visitors from 132 to 227. Domain Rating climbed from DR 19 to DR 23 and 137 keywords entered the rankings across all positions.",
        rankingData: [
            { range: "#1-3", count: 13 },
            { range: "#4-10", count: 22 },
            { range: "#11-20", count: 47 },
            { range: "#21-30", count: 18 },
            { range: "#31-40", count: 22 },
            { range: "#41-50", count: 12 },
        ],
        metrics: [
            { label: "200K Impressions", accent: "#2EF09A" },
            { label: "132 → 227 monthly visitors", accent: "#2EF09A" },
            { label: "$75 → $187 traffic value", accent: "#2EF09A" },
        ],
        caseStudy: {
            impressions: "200,000",
            before: { traffic: 132, value: "$75" },
            after: { traffic: 227, value: "$187" },
            whatIDid: [
                "Conducted a full technical SEO audit. Fixed crawl errors, canonical issues and missing meta tags site-wide.",
                "Performed keyword research targeting high-intent safari and tourism queries in the Zambian market.",
                "Rewrote and expanded page content across all core landing pages to match search intent.",
                "Built a consistent internal linking structure to pass authority from high-DR pages to target pages.",
                "Optimised Google Business Profile and aligned on-page signals with local SEO best practices.",
                "Monitored Google Search Console weekly, iterating on underperforming pages throughout the engagement.",
            ],
            images: [
                { src: "/src/assets/Classic_Zambia_Safaris_-_ahrefs.png", alt: "Ahrefs site audit showing a 99/100 health score and Domain Rating of 27", caption: "99/100 Ahrefs health score with zero broken or blocked links across 77 crawled pages." },
                { src: "/src/assets/Classic_Zambia_Safaris_-_lighthouse_scores.png", alt: "Google Lighthouse scores: Performance 83, Accessibility 100, Best Practices 73, SEO 92", caption: "Lighthouse audit with perfect accessibility score and 92 SEO, measured in a controlled lab environment." },
                { src: "/src/assets/Classic_Zambia_Safaris_-_page_speed__laptop_.png", alt: "Google PageSpeed Insights desktop report showing Core Web Vitals passed", caption: "Desktop Core Web Vitals passed with 1.2s LCP and 48ms INP with real Chrome user data." },
                { src: "/src/assets/Classic_Zambia_Safaris_-_page_speed__mobile_.png", alt: "Google PageSpeed Insights mobile report showing Core Web Vitals passed", caption: "Mobile Core Web Vitals passed with 1.9s LCP and 96ms INP across real mobile devices." },
            ],
        },
        links: [
            { label: "Live Site", href: "https://classiczambiasafaris.com", primary: true },
            { label: "Case Study", href: "/projects/classic-zambia", caseStudyLink: true },
        ],
        filter: ["All", "SEO"],
    },
    {
        id: "house-to-home",
        title: "House to Home — SEO & Web Development",
        tags: ["SEO", "Web Dev"],
        coverType: "webdev",
        coverImage: imgH2HCover,
        summary:
            "11-month engagement building the platform from scratch in React and ASP.NET Core, paired with a full SEO campaign. Monthly visitors grew from 0 to 20 and DR jumped from 2 to 18.",
        rankingData: [
            { range: "#1-3", count: 1 },
            { range: "#4-10", count: 2 },
            { range: "#11-20", count: 15 },
            { range: "#21-30", count: 9 },
            { range: "#31-40", count: 7 },
            { range: "#41-50", count: 2 },
        ],
        metrics: [
            { label: "111K Impressions", accent: "#00CFFF" },
            { label: "0 → 20 Monthly Visitors", accent: "#00CFFF" },
            { label: "DR 2 → 18", accent: "#00CFFF" },
        ],
        caseStudy: {
            impressions: "111,000",
            before: { traffic: 0, value: "$0" },
            after: { traffic: 20, value: "$1" },
            whatIDid: [
                "Designed and built the full platform from scratch. React frontend, ASP.NET Core 8 backend, SQL Server database, deployed on Render with CI/CD.",
                "Implemented server-side meta tag injection via middleware to enable bot-friendly rendering without a full SSR rewrite.",
                "Built a three-tier slug lookup system so property URLs remain clean and SEO-friendly across listing types.",
                "Generated and submitted a clean XML sitemap. Resolved all coverage errors flagged in Google Search Console.",
                "Conducted keyword research targeting Zambian real estate queries and aligned page content to match search intent.",
                "Set up Cloudflare for DNS, caching and performance, contributing to a 95+ Lighthouse score across all categories.",
            ],
            images: [
                { src: imgH2HAhrefs, alt: "Ahrefs site audit dashboard showing a 95/100 health score rated Excellent", caption: "95/100 Ahrefs health score with 216 of 228 URLs completely error-free across 360 crawled pages." },
                { src: imgH2HDesktop, alt: "Google Lighthouse desktop scores: Performance 81, Accessibility 84, Best Practices 96, SEO 92", caption: "Desktop Lighthouse audit with 96 Best Practices and 92 SEO out of 100." },
                { src: imgH2HMobile, alt: "Google Lighthouse mobile scores: Performance 73, Accessibility 89, Best Practices 92, SEO 92", caption: "Mobile Lighthouse audit with 92 SEO and Best Practices scores on real mobile conditions." },
            ],
        },
        links: [
            { label: "Live Site", href: "https://housetohomezam.com", primary: true },
            { label: "Case Study", href: "/projects/house-to-home", caseStudyLink: true },
        ],
        filter: ["All", "SEO", "Full-Stack"],
    },
    {
        id: "canonical-auditor",
        title: "Canonical SEO Auditor",
        tags: ["Open Source"],
        coverType: "cli",
        coverImage: imgCanonicalAuditor,
        summary:
            "Automated CLI tool that detects canonical tag issues and duplicate content across large websites. Built for digital marketers and SEO professionals who need fast, scriptable audits.",
        status: ["Prototype", "Open Source"],
        links: [
            { label: "GitHub", href: "#", github: true },
        ],
        filter: ["All", "Open Source"],
    },
    {
        id: "portfolio",
        title: "Portfolio Website",
        tags: ["Full-Stack"],
        coverType: "portfolio",
        coverImage: imgPortfolio,
        summary:
            "Built with React on the frontend and ASP.NET 8 Core on the backend, deployed on Render with full CI/CD pipelines. Scored 95+ across all Lighthouse categories.",
        tech: ["React", "ASP.NET 8", "SQL Server", "CI/CD"],
        caseStudy: {
            impressions: "N/A",
            before: { traffic: 0, value: "$0" },
            after: { traffic: 0, value: "$0" },
            whatIDid: [
                "Designed and built the entire portfolio as a single-page React application with ASP.NET 8 backend.",
                "Implemented full JSON-LD structured data for Person, ProfessionalService and WebSite schemas.",
                "Achieved 95+ Lighthouse scores across all categories with optimised Core Web Vitals.",
                "Deployed on Render with CI/CD from GitHub for automated builds on every push.",
            ],
            images: [],
        },
        links: [
            { label: "Live Site", href: "#", primary: true },
            { label: "Case Study", href: "/projects/portfolio", caseStudyLink: true },
        ],
        filter: ["All", "Full-Stack"],
    },
];

const FILTERS = ["All", "SEO", "Full-Stack", "Open Source"];

/* ── Projects page ─────────────────────────────────────────────── */
export default function Projects() {
    usePageSEO();
    const [lightbox, setLightbox] = useState(null);
    const [active, setActive] = useState("All");
    const { ref: heroRef, visible: heroVisible } = useFadeIn(0.1);
    const { ref: gridRef, visible: gridVisible } = useFadeIn(0.05);

    const filtered = PROJECTS.filter(p => p.filter.includes(active));

    return (
        <section
            className="relative w-full bg-[var(--surface)] py-20 sm:py-28 border-t border-[var(--border-subtle)]"
            aria-labelledby="projects-heading"
        >
            {/* Lightbox */}
            {lightbox && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-zoom-out"
                    onClick={() => setLightbox(null)}
                >
                    <img
                        src={lightbox.src}
                        alt={lightbox.alt}
                        className="max-w-[92vw] max-h-[90vh] object-contain rounded-xl shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    />
                    <button
                        onClick={() => setLightbox(null)}
                        className="absolute top-5 right-6 text-white/60 hover:text-white text-3xl font-light leading-none transition-colors"
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>
            )}

            <div
                className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-[0.04] blur-3xl"
                style={{ background: "radial-gradient(ellipse, #00CFFF 0%, transparent 70%)" }}
                aria-hidden="true"
            />

            <div className="relative w-full px-[var(--px)] sm:px-[var(--px-sm)] lg:px-[var(--px-lg)] xl:px-[var(--px-xl)]">

                {/* Hero */}
                <div
                    ref={heroRef}
                    className="mb-10 sm:mb-14"
                    style={{
                        opacity: heroVisible ? 1 : 0,
                        transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                        transition: "opacity 0.7s ease, transform 0.7s ease",
                    }}
                >
                    <span className="inline-block text-xs font-mono tracking-[0.2em] uppercase text-[var(--cyan)] mb-4">
                        Projects
                    </span>
                    <h2
                        id="projects-heading"
                        className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight mb-4"
                        style={{ fontFamily: "var(--heading)" }}
                    >
                        Work That Speaks{" "}
                        <span className="text-[var(--cyan)]">in Numbers.</span>
                    </h2>
                    <p className="text-[var(--text-dim)] text-base sm:text-lg max-w-xl leading-relaxed">
                        From SEO case studies with verified traffic data to open-source tools and production applications.
                    </p>
                </div>

                {/* Filter tabs */}
                <div
                    className="flex flex-wrap gap-2 mb-10 sm:mb-12"
                    style={{
                        opacity: heroVisible ? 1 : 0,
                        transform: heroVisible ? "translateY(0)" : "translateY(12px)",
                        transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
                    }}
                    role="tablist"
                    aria-label="Filter projects"
                >
                    {FILTERS.map(f => (
                        <button
                            key={f}
                            role="tab"
                            aria-selected={active === f}
                            onClick={() => setActive(f)}
                            className="text-xs font-mono tracking-widest uppercase px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer"
                            style={
                                active === f
                                    ? { background: "#00CFFF15", borderColor: "#00CFFF50", color: "#00CFFF", boxShadow: "0 0 12px rgba(0,207,255,0.15)" }
                                    : { background: "transparent", borderColor: "#2A2A45", color: "#50507A" }
                            }
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {filtered.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} visible={gridVisible} onImageClick={setLightbox} />
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <span className="text-4xl mb-4 opacity-30">◈</span>
                        <p className="text-[#40405A] font-mono text-sm">No projects in this category yet.</p>
                    </div>
                )}
            </div>
        </section>
    );
}