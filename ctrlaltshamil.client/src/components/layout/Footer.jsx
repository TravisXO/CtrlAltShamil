import { Link, NavLink } from "react-router-dom";
import articles from "../../data/alexander-articles.json";

const latestPosts = (articles?.articles ?? [])
    .filter(a => a.status === "published")
    .slice(0, 3);

const NAV_LINKS = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Projects", to: "/projects" },
    { label: "Blog", to: "/blog" },
    { label: "Contact", to: "/contact" },
];

const SOCIAL_LINKS = [
    {
        label: "GitHub",
        href: "https://github.com/ctrlaltshamil",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com/in/ctrlaltshamil",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: "Twitter / X",
        href: "https://twitter.com/ctrlaltshamil",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
            </svg>
        ),
    },
    {
        label: "Email",
        href: "mailto:hello@ctrlaltshamil.dev",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
            </svg>
        ),
    },
];

const TECH_STACK = ["React", "Vite", "Tailwind CSS", "React Router"];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer
            className="relative w-full bg-[#080810] border-t border-[#1A1A30] overflow-hidden"
            aria-label="Site footer"
        >
            {/* Ambient glow top-left */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full opacity-[0.06]"
                style={{ background: "radial-gradient(circle, #00CFFF 0%, transparent 70%)" }}
            />
            {/* Ambient glow bottom-right */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -right-24 w-[360px] h-[360px] rounded-full opacity-[0.05]"
                style={{ background: "radial-gradient(circle, #00FF94 0%, transparent 70%)" }}
            />

            {/* ── CTA Band ── */}
            <div className="relative w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-14 sm:py-20 border-b border-[#1A1A30]">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                    <div className="max-w-xl">
                        <p className="text-xs font-mono text-[#00CFFF] tracking-[0.2em] uppercase mb-3 select-none">
                            open_to_work
                        </p>
                        <h2
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F2F2FA] leading-tight tracking-tight"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            Got a project?{" "}
                            <span className="text-[#00CFFF]">Let's build</span>
                            <br className="hidden sm:block" /> something great.
                        </h2>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 md:shrink-0">
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-semibold text-[#080810] bg-[#00CFFF] hover:bg-[#33D9FF] active:scale-95 transition-all duration-200 shadow-[0_0_24px_rgba(0,207,255,0.35)] hover:shadow-[0_0_36px_rgba(0,207,255,0.55)] tracking-wide"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            Hire Me
                            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                            </svg>
                        </Link>
                        <a
                            href="mailto:hello@ctrlaltshamil.dev"
                            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-semibold text-[#A0A0C0] hover:text-[#F2F2FA] border border-[#1A1A30] hover:border-[#00CFFF40] hover:bg-[#00CFFF08] active:scale-95 transition-all duration-200 tracking-wide"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            Send an Email
                        </a>
                    </div>
                </div>
            </div>

            {/* ── Main Footer Grid ── */}
            <div className="relative w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-14 sm:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

                    {/* Brand column */}
                    <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-5">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center gap-2 group w-fit"
                            aria-label="CtrlAltShamil – Home"
                        >
                            <span
                                className="text-[#00CFFF] text-xl font-bold leading-none select-none transition-opacity duration-200 group-hover:opacity-60"
                                aria-hidden="true"
                            >[</span>
                            <span
                                className="text-2xl font-bold tracking-tight text-[#F2F2FA] group-hover:text-[#00CFFF] transition-colors duration-200"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                                CtrlAltShamil
                            </span>
                            <span
                                className="text-[#00CFFF] text-xl font-bold leading-none select-none transition-opacity duration-200 group-hover:opacity-60"
                                aria-hidden="true"
                            >]</span>
                        </Link>

                        <p className="text-[#606080] text-sm leading-relaxed max-w-sm font-mono">
                            Crafting fast, accessible, and visually sharp digital experiences — one commit at a time.
                        </p>

                        {/* Social icons */}
                        <div className="flex items-center gap-2 flex-wrap" role="list" aria-label="Social media links">
                            {SOCIAL_LINKS.map(({ label, href, icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={href.startsWith("mailto") ? undefined : "_blank"}
                                    rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                                    aria-label={label}
                                    role="listitem"
                                    className="flex items-center justify-center w-10 h-10 rounded-lg text-[#606080] hover:text-[#00CFFF] bg-[#0F0F1C] hover:bg-[#00CFFF0F] border border-[#1A1A30] hover:border-[#00CFFF30] transition-all duration-200 hover:shadow-[0_0_12px_rgba(0,207,255,0.2)]"
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>

                        {/* Status badge */}
                        <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0F0F1C] border border-[#1A1A30] w-fit">
                            <span className="w-2 h-2 rounded-full bg-[#00FF94] shadow-[0_0_6px_#00FF94] shrink-0 animate-pulse" aria-hidden="true" />
                            <span className="text-xs text-[#606080] font-mono tracking-wider">
                                SYSTEM ONLINE · LUSAKA, ZM
                            </span>
                        </div>
                    </div>

                    {/* Navigation column */}
                    <nav aria-label="Footer navigation" className="flex flex-col gap-4">
                        <h3
                            className="text-xs font-mono text-[#00CFFF] tracking-[0.2em] uppercase"
                        >
                            navigate
                        </h3>
                        <ul className="flex flex-col gap-1" role="list">
                            {NAV_LINKS.map(({ label, to }) => (
                                <li key={to}>
                                    <NavLink
                                        to={to}
                                        end={to === "/"}
                                        className={({ isActive }) =>
                                            [
                                                "group flex items-center gap-2 py-1.5 text-sm font-medium transition-colors duration-200",
                                                isActive
                                                    ? "text-[#00CFFF]"
                                                    : "text-[#606080] hover:text-[#F2F2FA]",
                                            ].join(" ")
                                        }
                                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                    >
                                        <span
                                            className="block w-3 h-px bg-current opacity-40 group-hover:opacity-100 group-hover:w-5 transition-all duration-300"
                                            aria-hidden="true"
                                        />
                                        {label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Built with column */}
                    <div className="flex flex-col gap-4">
                        <h3
                            className="text-xs font-mono text-[#00CFFF] tracking-[0.2em] uppercase"
                        >
                            built_with
                        </h3>
                        <ul className="flex flex-col gap-2" role="list">
                            {TECH_STACK.map((tech) => (
                                <li key={tech}>
                                    <span className="flex items-center gap-2 text-sm text-[#606080] font-mono">
                                        <span className="text-[#00CFFF] opacity-60" aria-hidden="true">›</span>
                                        {tech}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-4 px-4 py-3 rounded-lg bg-[#0F0F1C] border border-[#1A1A30]">
                            <p className="text-[10px] font-mono text-[#404060] leading-relaxed tracking-wider uppercase">
                                Lighthouse Score
                            </p>
                            <div className="flex items-center gap-1.5 mt-1.5" aria-label="Lighthouse scores">
                                {[
                                    { label: "Perf", score: "80+" },
                                    { label: "Ab1y", score: "100" },
                                    { label: "BP", score: "95+" },
                                    { label: "SEO", score: "90+" },
                                ].map(({ label, score }) => (
                                    <div key={label} className="flex flex-col items-center gap-0.5">
                                        <span className="text-[10px] font-mono font-bold text-[#00FF94]">{score}</span>
                                        <span className="text-[9px] font-mono text-[#404060]">{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Blog posts column */}
                    <div className="flex flex-col gap-4">
                        <h3
                            className="text-xs font-mono text-[#00CFFF] tracking-[0.2em] uppercase"
                        >
                            latest_posts
                        </h3>
                        <ul className="flex flex-col gap-4" role="list">
                            {latestPosts.map((article) => {
                                const formattedDate = article.published_at
                                    ? new Date(article.published_at).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })
                                    : null;
                                return (
                                    <li key={article.slug}>
                                        <Link
                                            to={`/blog/${article.slug}`}
                                            className="group flex flex-col gap-1"
                                        >
                                            <span
                                                className="text-sm text-[#A0A0C0] group-hover:text-[#F2F2FA] transition-colors duration-200 leading-snug line-clamp-2"
                                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                                            >
                                                {article.content?.title}
                                            </span>
                                            {formattedDate && (
                                                <span className="text-[11px] font-mono text-[#404060] group-hover:text-[#00CFFF] transition-colors duration-200">
                                                    {formattedDate}
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                        <Link
                            to="/blog"
                            className="flex items-center gap-1.5 text-xs font-mono text-[#606080] hover:text-[#00CFFF] transition-colors duration-200 mt-1 w-fit"
                        >
                            All posts
                            <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3" aria-hidden="true">
                                <path fillRule="evenodd" d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── Bottom Bar ── */}
            <div className="relative w-full border-t border-[#1A1A30] px-4 sm:px-8 lg:px-16 xl:px-24 py-5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs font-mono text-[#404060] tracking-wider">
                        &copy; {year} CtrlAltShamil. All rights reserved.
                    </p>
                    <p className="text-xs font-mono text-[#404060] tracking-wider">
                        Designed &amp; built by{" "}
                        <span className="text-[#00CFFF] opacity-80">Shamil</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}