import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import articles from "../../data/alexander-articles.json";

/* ── Pull latest published articles ────────────────────────────── */
const LATEST = (articles?.articles ?? [])
    .filter((a) => a.status === "published")
    .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
    .slice(0, 3);

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
        <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className={`w-3.5 h-3.5 ${className}`}
            aria-hidden="true"
        >
            <path
                fillRule="evenodd"
                d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z"
                clipRule="evenodd"
            />
        </svg>
    );
}

/* ── Blog card ─────────────────────────────────────────────────── */
function BlogCard({ article, index, visible }) {
    const { slug, content, taxonomy, media, published_at } = article;

    const formattedDate = published_at
        ? new Date(published_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
          })
        : null;

    const category = taxonomy?.category?.name;
    const readTime = content?.reading_time_minutes;
    const hasCover = !!media?.cover_image?.url;

    return (
        <article
            className="group"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${0.1 + index * 0.1}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${0.1 + index * 0.1}s`,
            }}
        >
            <Link
                to={`/blog/${slug}`}
                className="flex flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-raised)] overflow-hidden h-full hover:border-[rgba(0,207,255,0.35)] hover:shadow-[0_0_32px_rgba(0,207,255,0.07)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00CFFF]"
                aria-label={`Read: ${content?.title}`}
            >
                {/* Cover image */}
                {hasCover && (
                    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                        <img
                            src={media.cover_image.url}
                            alt={media.cover_image.alt || content?.title || ""}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                            width={media.cover_image.width || 800}
                            height={media.cover_image.height || 450}
                            loading="lazy"
                            decoding="async"
                        />
                        {/* Gradient fade */}
                        <div
                            className="absolute inset-0"
                            style={{ background: "linear-gradient(to top, #0B0B18 0%, transparent 55%)" }}
                            aria-hidden="true"
                        />
                    </div>
                )}

                {/* Body */}
                <div className="flex flex-col flex-1 p-5 sm:p-6 gap-3">
                    {/* Meta row */}
                    <div className="flex items-center justify-between">
                        {category && (
                            <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-[#00CFFF]">
                                {category}
                            </span>
                        )}
                        {readTime > 0 && (
                            <span className="text-[9px] font-mono text-[#505070]">
                                {readTime} min read
                            </span>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-[rgba(255,255,255,0.06)]" aria-hidden="true" />

                    {/* Title */}
                    <h3
                        className="text-base sm:text-lg font-bold leading-snug text-[var(--text-primary)] group-hover:text-[#00CFFF] transition-colors duration-200"
                        style={{ fontFamily: "var(--heading)" }}
                    >
                        {content?.title}
                    </h3>

                    {/* Excerpt */}
                    {content?.excerpt && (
                        <p className="text-sm leading-relaxed text-[#606080] line-clamp-2">
                            {content.excerpt}
                        </p>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 mt-auto border-t border-[rgba(255,255,255,0.06)]">
                        {formattedDate && (
                            <span className="text-[10px] font-mono text-[#404060]">
                                {formattedDate}
                            </span>
                        )}
                        <span className="text-[10px] font-mono text-[#00CFFF] flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                            Read
                            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                <path d="M2 6h8M7 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
}

/* ── Section ───────────────────────────────────────────────────── */
export default function BlogPostSection() {
    const { ref: headRef, visible: headVisible } = useFadeIn(0.2);
    const { ref: gridRef, visible: gridVisible } = useFadeIn(0.08);
    const { ref: ctaRef, visible: ctaVisible } = useFadeIn(0.2);

    if (LATEST.length === 0) return null;

    return (
        <section
            className="relative w-full bg-[var(--surface)] py-20 sm:py-28 border-t border-[var(--border-subtle)]"
            aria-labelledby="latest-posts-heading"
        >
            {/* Ambient glow */}
            <div
                className="pointer-events-none absolute top-0 left-1/3 w-[500px] h-[300px] opacity-[0.04] blur-3xl"
                style={{ background: "radial-gradient(ellipse, #00CFFF 0%, transparent 70%)" }}
                aria-hidden="true"
            />

            <div className="relative w-full px-[var(--px)] sm:px-[var(--px-sm)] lg:px-[var(--px-lg)] xl:px-[var(--px-xl)]">
                {/* Header */}
                <div
                    ref={headRef}
                    className="mb-12 sm:mb-16"
                    style={{
                        opacity: headVisible ? 1 : 0,
                        transform: headVisible ? "translateY(0)" : "translateY(20px)",
                        transition: "opacity 0.6s ease, transform 0.6s ease",
                    }}
                >
                    <span className="inline-block text-xs font-mono tracking-[0.2em] uppercase text-[var(--cyan)] mb-4">
                        Blog
                    </span>
                    <h2
                        id="latest-posts-heading"
                        className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight"
                        style={{ fontFamily: "var(--heading)" }}
                    >
                        Fresh off the{" "}
                        <span className="text-[var(--cyan)]">keyboard.</span>
                    </h2>
                </div>

                {/* Grid */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
                >
                    {LATEST.map((article, i) => (
                        <BlogCard
                            key={article.id || article.slug}
                            article={article}
                            index={i}
                            visible={gridVisible}
                        />
                    ))}
                </div>

                {/* View all CTA */}
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
                        to="/blog"
                        className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-[#2A2A45] text-sm font-semibold text-[#A0A0C0] hover:text-[var(--cyan)] hover:border-[#00CFFF40] hover:bg-[#00CFFF08] active:scale-[0.97] transition-all duration-200 tracking-wide"
                        style={{ fontFamily: "var(--heading)" }}
                    >
                        View all posts
                        <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
