import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

const NAV_LINKS = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Projects", to: "/projects" },
    { label: "Blog", to: "/blog" },
    { label: "Contact", to: "/contact" },
];

/* ── Live Lusaka clock (CAT / UTC+2) ──────────────────────────── */
function LusakaClock() {
    const [time, setTime] = useState(() => formatLusakaTime());

    useEffect(() => {
        const id = setInterval(() => setTime(formatLusakaTime()), 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-[#0F0F1C] border border-[var(--border-subtle)]">
            <span className="text-xs text-[#505070] font-mono tracking-wider">
                LOCAL TIME
            </span>
            <span className="text-xs text-[var(--text-primary)] font-mono tracking-wider tabular-nums">
                {time}
            </span>
        </div>
    );
}

function formatLusakaTime() {
    return new Date().toLocaleTimeString("en-GB", {
        timeZone: "Africa/Lusaka",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }) + " CAT";
}

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* Lock body scroll when menu is open */
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    /* Close menu on route change via resize (e.g. rotating device) */
    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 1024 && menuOpen) setMenuOpen(false);
        };
        window.addEventListener("resize", onResize, { passive: true });
        return () => window.removeEventListener("resize", onResize);
    }, [menuOpen]);

    const navLinkClass = ({ isActive }) =>
        [
            "relative text-sm font-medium tracking-wide transition-colors duration-200 group",
            isActive ? "text-[#00CFFF]" : "text-[#A0A0C0] hover:text-[#F2F2FA]",
        ].join(" ");

    return (
        <>
            <header
                className={[
                    "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
                    scrolled
                        ? "bg-[#080810]/90 backdrop-blur-md border-b border-[var(--border-subtle)] shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                        : "bg-transparent",
                ].join(" ")}
                style={{ height: "64px", overflow: "visible" }}
            >
                <div className="w-full h-full px-[var(--px)] sm:px-[var(--px-sm)] lg:px-[var(--px-lg)] xl:px-[var(--px-xl)]">
                    <div className="flex items-center justify-between h-full">

                        {/* ── Logo ── */}
                        <Link
                            to="/"
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-2 group shrink-0"
                            aria-label="CtrlAltShamil home"
                        >
                            <span
                                className="text-[#00CFFF] text-lg font-bold leading-none select-none transition-opacity duration-200 group-hover:opacity-70"
                                aria-hidden="true"
                            >
                                [
                            </span>
                            <span
                                className="text-xl font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[#00CFFF] transition-colors duration-200"
                                style={{ fontFamily: "var(--heading)" }}
                            >
                                CtrlAltShamil
                            </span>
                            <span
                                className="text-[#00CFFF] text-lg font-bold leading-none select-none transition-opacity duration-200 group-hover:opacity-70"
                                aria-hidden="true"
                            >
                                ]
                            </span>
                        </Link>

                        {/* ── Desktop Nav ── */}
                        <nav
                            className="hidden lg:flex items-center gap-1"
                            aria-label="Primary navigation"
                        >
                            {NAV_LINKS.map(({ label, to }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    end={to === "/"}
                                    className={navLinkClass}
                                >
                                    {({ isActive }) => (
                                        <span className="px-3 py-1.5 rounded-md inline-block">
                                            {label}
                                            <span
                                                className={[
                                                    "absolute bottom-0 left-3 right-3 h-px rounded-full transition-all duration-300",
                                                    isActive
                                                        ? "bg-[#00CFFF] opacity-100"
                                                        : "bg-[#00CFFF] opacity-0 group-hover:opacity-40",
                                                ].join(" ")}
                                            />
                                        </span>
                                    )}
                                </NavLink>
                            ))}

                            <Link
                                to="/contact"
                                className="hero-cta-primary ml-3 px-4 py-2 rounded-lg text-sm font-semibold text-[#080810] bg-[#00CFFF] active:scale-95 transition-all duration-200 tracking-wide"
                                style={{ fontFamily: "var(--heading)" }}
                            >
                                Hire Me
                            </Link>
                        </nav>

                        {/* ── Hamburger ── */}
                        <button
                            className="relative z-[110] shrink-0 lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-md overflow-visible hover:bg-[#14142A] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00CFFF]"
                            onClick={() => setMenuOpen((v) => !v)}
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={menuOpen}
                            aria-controls="mobile-menu"
                        >
                            <span
                                className={[
                                    "block w-5 h-0.5 bg-[var(--text-primary)] rounded-full transition-all duration-300 origin-center",
                                    menuOpen ? "rotate-45 translate-y-[7px]" : "",
                                ].join(" ")}
                            />
                            <span
                                className={[
                                    "block w-5 h-0.5 bg-[var(--text-primary)] rounded-full transition-all duration-300",
                                    menuOpen ? "opacity-0 scale-x-0" : "",
                                ].join(" ")}
                            />
                            <span
                                className={[
                                    "block w-5 h-0.5 bg-[var(--text-primary)] rounded-full transition-all duration-300 origin-center",
                                    menuOpen ? "-rotate-45 -translate-y-[7px]" : "",
                                ].join(" ")}
                            />
                        </button>
                    </div>
                </div>
            </header>

            {/* ── Mobile Menu (portal-level, outside header) ── */}
            <div
                id="mobile-menu"
                className={[
                    "lg:hidden fixed inset-0 z-[99] flex flex-col transition-all duration-300",
                    menuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none",
                ].join(" ")}
                style={{
                    paddingTop: "64px",
                    background: "rgba(8, 8, 16, 0.98)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                }}
                aria-hidden={!menuOpen}
            >
                {/* Accent line */}
                <div
                    className="h-px w-full shrink-0"
                    style={{ background: "linear-gradient(to right, transparent, #00CFFF40, transparent)" }}
                    aria-hidden="true"
                />

                <nav
                    className="flex flex-col px-[var(--px)] sm:px-[var(--px-sm)] pt-8 pb-6 gap-1 overflow-y-auto flex-1"
                    aria-label="Mobile navigation"
                >
                    {NAV_LINKS.map(({ label, to }, i) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === "/"}
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                [
                                    "flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium tracking-wide border transition-all duration-200",
                                    isActive
                                        ? "text-[#00CFFF] bg-[#00CFFF0F] border-[#00CFFF25]"
                                        : "text-[#A0A0C0] hover:text-[var(--text-primary)] hover:bg-[#14142A] border-transparent",
                                ].join(" ")
                            }
                            style={{
                                fontFamily: "var(--heading)",
                                transform: menuOpen ? "translateX(0)" : "translateX(-16px)",
                                opacity: menuOpen ? 1 : 0,
                                transition: `opacity 0.3s ease ${i * 50}ms, transform 0.3s ease ${i * 50}ms, background-color 0.2s, color 0.2s`,
                            }}
                        >
                            <span className="text-xs text-[#505070] font-mono w-4 shrink-0">
                                0{i + 1}
                            </span>
                            {label}
                        </NavLink>
                    ))}

                    <Link
                        to="/contact"
                        onClick={() => setMenuOpen(false)}
                        className="hero-cta-primary mt-6 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-base font-semibold text-[#080810] bg-[#00CFFF] active:scale-95 transition-all duration-200 tracking-wide"
                        style={{
                            fontFamily: "var(--heading)",
                            transform: menuOpen ? "translateX(0)" : "translateX(-16px)",
                            opacity: menuOpen ? 1 : 0,
                            transition: `opacity 0.3s ease ${NAV_LINKS.length * 50 + 30}ms, transform 0.3s ease ${NAV_LINKS.length * 50 + 30}ms, background-color 0.2s`,
                        }}
                    >
                        Hire Me
                    </Link>
                </nav>

                {/* Bottom status bar */}
                <div className="shrink-0 px-[var(--px)] sm:px-[var(--px-sm)] pb-8 flex flex-col gap-3">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#0F0F1C] border border-[var(--border-subtle)]">
                        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00FF94] opacity-60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00FF94] shadow-[0_0_6px_#00FF94]" />
                        </span>
                        <span className="text-xs text-[#505070] font-mono tracking-wider">
                            SYSTEM ONLINE · LUSAKA, ZM
                        </span>
                    </div>
                    <LusakaClock />
                </div>
            </div>
        </>
    );
}