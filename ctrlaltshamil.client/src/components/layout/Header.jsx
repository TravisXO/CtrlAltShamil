import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

const NAV_LINKS = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Projects", to: "/projects" },
    { label: "Blog", to: "/blog" },
    { label: "Contact", to: "/contact" },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const navLinkClass = ({ isActive }) =>
        [
            "relative text-sm font-medium tracking-wide transition-colors duration-200 group",
            isActive ? "text-[#00CFFF]" : "text-[#A0A0C0] hover:text-[#F2F2FA]",
        ].join(" ");

    return (
        <header
            className={[
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-[#080810]/90 backdrop-blur-md border-b border-[#1A1A30] shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                    : "bg-transparent",
            ].join(" ")}
        >
            {/* Full-width inner — padding only, no max-width */}
            <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24">
                <div className="flex items-center justify-between h-16 md:h-18">

                    {/* ── Logo ── */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 group shrink-0"
                        aria-label="Shamil – Home"
                    >
                        <span
                            className="text-[#00CFFF] text-lg font-bold leading-none select-none transition-opacity duration-200 group-hover:opacity-70"
                            aria-hidden="true"
                        >[</span>
                        <span className="text-xl font-bold tracking-tight text-[#F2F2FA] group-hover:text-[#00CFFF] transition-colors duration-200"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            CtrlAltShamil
                        </span>
                        <span
                            className="text-[#00CFFF] text-lg font-bold leading-none select-none transition-opacity duration-200 group-hover:opacity-70"
                            aria-hidden="true"
                        >]</span>
                    </Link>

                    {/* ── Desktop Nav ── */}
                    <nav
                        className="hidden md:flex items-center gap-1"
                        aria-label="Primary navigation"
                    >
                        {NAV_LINKS.map(({ label, to }) => (
                            <NavLink key={to} to={to} end={to === "/"} className={navLinkClass}>
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
                            className="ml-3 px-4 py-2 rounded-lg text-sm font-semibold text-[#080810] bg-[#00CFFF] hover:bg-[#33D9FF] active:scale-95 transition-all duration-200 shadow-[0_0_16px_rgba(0,207,255,0.35)] hover:shadow-[0_0_24px_rgba(0,207,255,0.5)] tracking-wide"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            Hire Me
                        </Link>
                    </nav>

                    {/* ── Mobile Hamburger ── */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-md hover:bg-[#14142A] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00CFFF]"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                    >
                        <span className={["block w-5 h-px bg-[#F2F2FA] rounded-full transition-all duration-300 origin-center", menuOpen ? "rotate-45 translate-y-[7px]" : ""].join(" ")} />
                        <span className={["block w-5 h-px bg-[#F2F2FA] rounded-full transition-all duration-300", menuOpen ? "opacity-0 scale-x-0" : ""].join(" ")} />
                        <span className={["block w-5 h-px bg-[#F2F2FA] rounded-full transition-all duration-300 origin-center", menuOpen ? "-rotate-45 -translate-y-[7px]" : ""].join(" ")} />
                    </button>
                </div>
            </div>

            {/* ── Mobile Menu ── */}
            <div
                id="mobile-menu"
                className={[
                    "md:hidden fixed inset-0 top-16 bg-[#080810]/97 backdrop-blur-lg z-40 transition-all duration-300 flex flex-col",
                    menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                ].join(" ")}
                aria-hidden={!menuOpen}
            >
                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00CFFF40] to-transparent" />

                <nav
                    className="flex flex-col px-4 sm:px-8 pt-8 pb-6 gap-1"
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
                                    "flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 tracking-wide",
                                    isActive
                                        ? "text-[#00CFFF] bg-[#00CFFF0F] border border-[#00CFFF25]"
                                        : "text-[#A0A0C0] hover:text-[#F2F2FA] hover:bg-[#14142A] border border-transparent",
                                ].join(" ")
                            }
                            style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                transitionDelay: menuOpen ? `${i * 40}ms` : "0ms",
                                transform: menuOpen ? "translateX(0)" : "translateX(-16px)",
                                opacity: menuOpen ? 1 : 0,
                                transition: `opacity 0.3s ease ${i * 40}ms, transform 0.3s ease ${i * 40}ms, background-color 0.2s, color 0.2s`,
                            }}
                        >
                            <span className="text-xs text-[#606080] font-mono w-4 shrink-0">0{i + 1}</span>
                            {label}
                        </NavLink>
                    ))}

                    <Link
                        to="/contact"
                        onClick={() => setMenuOpen(false)}
                        className="mt-6 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-base font-semibold text-[#080810] bg-[#00CFFF] hover:bg-[#33D9FF] active:scale-95 transition-all duration-200 shadow-[0_0_24px_rgba(0,207,255,0.3)] tracking-wide"
                        style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            transitionDelay: menuOpen ? `${NAV_LINKS.length * 40 + 20}ms` : "0ms",
                            transform: menuOpen ? "translateX(0)" : "translateX(-16px)",
                            opacity: menuOpen ? 1 : 0,
                            transition: `opacity 0.3s ease ${NAV_LINKS.length * 40 + 20}ms, transform 0.3s ease ${NAV_LINKS.length * 40 + 20}ms, background-color 0.2s`,
                        }}
                    >
                        Hire Me
                    </Link>
                </nav>

                <div className="mt-auto px-4 sm:px-8 pb-8">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#0F0F1C] border border-[#1A1A30]">
                        <span className="w-2 h-2 rounded-full bg-[#00FF94] shadow-[0_0_6px_#00FF94] shrink-0" />
                        <span className="text-xs text-[#606080] font-mono tracking-wider">
                            SYSTEM ONLINE · LUSAKA, ZM
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}