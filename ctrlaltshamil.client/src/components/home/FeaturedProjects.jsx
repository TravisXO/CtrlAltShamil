import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PROJECTS, ProjectCard } from "../../pages/Projects";

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

/* ── Icons ─────────────────────────────────────────────────────── */
function ArrowIcon({ className = "" }) {
    return (
        <svg viewBox="0 0 16 16" fill="currentColor" className={`w-3.5 h-3.5 ${className}`} aria-hidden="true">
            <path fillRule="evenodd" d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z" clipRule="evenodd" />
        </svg>
    );
}
function ChevronIcon({ className = "" }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 ${className}`} aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
        </svg>
    );
}

/* ── Chunk helper ──────────────────────────────────────────────── */
function chunk(arr, size) {
    const out = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
}

/* ── Section ───────────────────────────────────────────────────── */
export default function FeaturedProjects() {
    const { ref: headRef, visible: headVisible } = useFadeIn(0.2);
    const { ref: ctaRef, visible: ctaVisible } = useFadeIn(0.2);
    const { ref: trackRef, visible: trackVisible } = useFadeIn(0.05);

    const [perPage, setPerPage] = useState(2);
    const [page, setPage] = useState(0);
    const [paused, setPaused] = useState(false);
    const [lightbox, setLightbox] = useState(null);

    /* 2 cards per page on desktop, 1 on mobile — driven off live width so it
       stays correct through any resize, not just at breakpoint crossings */
    useEffect(() => {
        const apply = () => setPerPage(window.innerWidth >= 640 ? 2 : 1);
        apply();
        window.addEventListener("resize", apply, { passive: true });
        return () => window.removeEventListener("resize", apply);
    }, []);

    const pages = chunk(PROJECTS, perPage);
    const pageCount = pages.length;

    /* Keep the current page valid when the layout (perPage) changes */
    useEffect(() => {
        setPage((p) => Math.min(p, pageCount - 1));
    }, [pageCount]);

    const goTo = useCallback((i) => setPage(((i % pageCount) + pageCount) % pageCount), [pageCount]);
    const next = useCallback(() => goTo(page + 1), [goTo, page]);
    const prev = useCallback(() => goTo(page - 1), [goTo, page]);

    /* Auto-advance, paused on hover/focus or when off-screen */
    useEffect(() => {
        if (paused || !trackVisible || pageCount <= 1) return;
        const id = setInterval(() => setPage((p) => (p + 1) % pageCount), 6000);
        return () => clearInterval(id);
    }, [paused, trackVisible, pageCount]);

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
                        onClick={(e) => e.stopPropagation()}
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

            <div className="relative w-full px-[var(--px)] sm:px-[var(--px-sm)] lg:px-[var(--px-lg)] xl:px-[var(--px-xl)]">
                {/* Header */}
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
                            Featured Projects
                        </span>
                        <h2
                            id="projects-heading"
                            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight"
                            style={{ fontFamily: "var(--heading)" }}
                        >
                            Results that{" "}
                            <span className="text-[var(--cyan)]">do the talking.</span>
                        </h2>
                    </div>

                    {/* Desktop nav buttons */}
                    <div className="hidden sm:flex items-center gap-2 shrink-0">
                        <button
                            type="button"
                            onClick={prev}
                            className="w-11 h-11 rounded-full border border-[#2A2A45] text-[#A0A0C0] hover:text-[var(--cyan)] hover:border-[#00CFFF40] hover:bg-[#00CFFF08] active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer backdrop-blur-sm"
                            aria-label="Previous projects"
                        >
                            <ChevronIcon className="rotate-180" />
                        </button>
                        <button
                            type="button"
                            onClick={next}
                            className="w-11 h-11 rounded-full border border-[#2A2A45] text-[#A0A0C0] hover:text-[var(--cyan)] hover:border-[#00CFFF40] hover:bg-[#00CFFF08] active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer backdrop-blur-sm"
                            aria-label="Next projects"
                        >
                            <ChevronIcon />
                        </button>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="h-0.5 w-full rounded-full overflow-hidden bg-white/[0.06] mb-6">
                    <div
                        className="h-full rounded-full"
                        style={{
                            width: `${((page + 1) / pageCount) * 100}%`,
                            background: "linear-gradient(to right, #00CFFF, #2EF09A)",
                            transition: "width 0.6s cubic-bezier(0.23,1,0.32,1)",
                        }}
                    />
                </div>

                {/* Carousel viewport */}
                <div
                    ref={trackRef}
                    className="overflow-hidden"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onFocusCapture={() => setPaused(true)}
                    onBlurCapture={() => setPaused(false)}
                    style={{ opacity: trackVisible ? 1 : 0, transition: "opacity 0.6s ease" }}
                >
                    <div
                        className="flex items-stretch"
                        style={{
                            transform: `translateX(-${page * 100}%)`,
                            transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)",
                        }}
                    >
                        {pages.map((group, pi) => (
                            <div
                                key={pi}
                                className="w-full shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 px-0.5"
                                aria-hidden={pi !== page}
                            >
                                {group.map((project, i) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        index={i}
                                        visible={trackVisible}
                                        onImageClick={setLightbox}
                                    />
                                ))}
                                {/* Keep a single-card final page left-aligned rather than stretched */}
                                {group.length === 1 && perPage === 2 && <div aria-hidden="true" />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Indicators + mobile nav */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                        type="button"
                        onClick={prev}
                        className="sm:hidden w-10 h-10 rounded-full border border-[#2A2A45] text-[#A0A0C0] active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer"
                        aria-label="Previous projects"
                    >
                        <ChevronIcon className="rotate-180 w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2" role="tablist" aria-label="Project pages">
                        {pages.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                role="tab"
                                aria-selected={i === page}
                                aria-label={`Go to project page ${i + 1}`}
                                onClick={() => goTo(i)}
                                className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                                style={{
                                    width: i === page ? 28 : 10,
                                    background: i === page ? "var(--cyan)" : "rgba(255,255,255,0.18)",
                                }}
                            />
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={next}
                        className="sm:hidden w-10 h-10 rounded-full border border-[#2A2A45] text-[#A0A0C0] active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer"
                        aria-label="Next projects"
                    >
                        <ChevronIcon className="w-4 h-4" />
                    </button>
                </div>

                {/* View All CTA */}
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
                        to="/projects"
                        className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-[#2A2A45] text-sm font-semibold text-[#A0A0C0] hover:text-[var(--cyan)] hover:border-[#00CFFF40] hover:bg-[#00CFFF08] active:scale-[0.97] transition-all duration-200 tracking-wide"
                        style={{ fontFamily: "var(--heading)" }}
                    >
                        View all projects
                        <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
