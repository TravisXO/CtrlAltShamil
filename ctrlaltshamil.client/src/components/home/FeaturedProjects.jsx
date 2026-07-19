import { useEffect, useRef, useState } from "react";
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
            ([e]) => {
                if (e.isIntersecting) {
                    setVisible(true);
                    obs.disconnect();
                }
            },
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

/* ── Section ───────────────────────────────────────────────────── */
export default function FeaturedProjects() {
    const { ref: headRef, visible: headVisible } = useFadeIn(0.2);
    const { ref: ctaRef, visible: ctaVisible } = useFadeIn(0.2);
    const { ref: trackRef, visible: trackVisible } = useFadeIn(0.05);
    const scrollerRef = useRef(null);
    const [lightbox, setLightbox] = useState(null);

    const scrollByCard = (dir) => {
        const el = scrollerRef.current;
        if (!el) return;
        const card = el.querySelector("[data-carousel-card]");
        const step = card ? card.getBoundingClientRect().width + 20 : 340;
        el.scrollBy({ left: dir * step, behavior: "smooth" });
    };

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

                    {/* Prev/Next controls */}
                    <div className="hidden sm:flex items-center gap-2 shrink-0">
                        <button
                            type="button"
                            onClick={() => scrollByCard(-1)}
                            className="w-10 h-10 rounded-full border border-[#2A2A45] text-[#A0A0C0] hover:text-[var(--cyan)] hover:border-[#00CFFF40] transition-all duration-200 flex items-center justify-center cursor-pointer"
                            aria-label="Previous project"
                        >
                            <ArrowIcon className="rotate-180" />
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollByCard(1)}
                            className="w-10 h-10 rounded-full border border-[#2A2A45] text-[#A0A0C0] hover:text-[var(--cyan)] hover:border-[#00CFFF40] transition-all duration-200 flex items-center justify-center cursor-pointer"
                            aria-label="Next project"
                        >
                            <ArrowIcon />
                        </button>
                    </div>
                </div>

                {/* Carousel */}
                <div
                    ref={trackRef}
                    style={{ opacity: trackVisible ? 1 : 0, transform: trackVisible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
                >
                    <div
                        ref={scrollerRef}
                        className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scroll-smooth"
                        style={{ scrollbarWidth: "thin" }}
                    >
                        {PROJECTS.map((project, i) => (
                            <div
                                key={project.id}
                                data-carousel-card
                                className="snap-start shrink-0 w-[82vw] sm:w-[340px]"
                            >
                                <ProjectCard project={project} index={i} visible={trackVisible} onImageClick={setLightbox} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile prev/next controls */}
                <div className="flex sm:hidden items-center justify-center gap-3 mt-6">
                    <button
                        type="button"
                        onClick={() => scrollByCard(-1)}
                        className="w-10 h-10 rounded-full border border-[#2A2A45] text-[#A0A0C0] flex items-center justify-center active:scale-95 transition-all duration-200 cursor-pointer"
                        aria-label="Previous project"
                    >
                        <ArrowIcon className="rotate-180" />
                    </button>
                    <button
                        type="button"
                        onClick={() => scrollByCard(1)}
                        className="w-10 h-10 rounded-full border border-[#2A2A45] text-[#A0A0C0] flex items-center justify-center active:scale-95 transition-all duration-200 cursor-pointer"
                        aria-label="Next project"
                    >
                        <ArrowIcon />
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
