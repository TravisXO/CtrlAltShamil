import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ── useFadeIn ───────────────────────────────────────────────────── */
function useFadeIn(threshold = 0.04) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, visible };
}

/* ── Tag chip ────────────────────────────────────────────────────── */
function TagChip({ name }) {
    return (
        <span
            className="text-[9px] font-mono tracking-[0.18em] uppercase px-2.5 py-0.5 rounded-full border"
            style={{
                background: "rgba(170,59,255,0.08)",
                borderColor: "rgba(170,59,255,0.28)",
                color: "#aa3bff",
            }}
        >
            {name}
        </span>
    );
}

/* ── Arrow icon ──────────────────────────────────────────────────── */
function ArrowIcon() {
    return (
        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 6h8M7 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

/* ── BlogCard ────────────────────────────────────────────────────── */
function BlogCard({ article, index, visible }) {
    const { slug, content, taxonomy, media, published_at } = article;

    const formattedDate = published_at
        ? new Date(published_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
        : null;

    const issueNum = String(index + 1).padStart(2, "0");

    return (
        <article
            className="break-inside-avoid mb-5"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.55s ease ${index * 0.07}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${index * 0.07}s`,
            }}
        >
            <Link
                to={`/blog/${slug}`}
                className="group flex flex-col rounded-2xl border overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#aa3bff]"
                style={{
                    background: "#0B0B1A",
                    borderColor: "rgba(255,255,255,0.07)",
                    transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(170,59,255,0.35)";
                    e.currentTarget.style.boxShadow = "0 0 32px rgba(170,59,255,0.07)";
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.boxShadow = "none";
                }}
                aria-label={`Read: ${content?.title}`}
            >
                {/* Cover image */}
                {media?.cover_image?.url && (
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
                        {/* Gradient fade into card body */}
                        <div
                            className="absolute inset-0"
                            style={{ background: "linear-gradient(to top, #0B0B1A 0%, transparent 55%)" }}
                            aria-hidden="true"
                        />
                        {/* Issue number — top-left badge */}
                        <span
                            className="absolute top-3 left-3 text-[9px] font-mono tracking-[0.2em] uppercase px-2 py-0.5 rounded border"
                            style={{
                                background: "rgba(8,8,16,0.75)",
                                borderColor: "rgba(255,255,255,0.12)",
                                color: "rgba(255,255,255,0.45)",
                                backdropFilter: "blur(6px)",
                            }}
                        >
                            #{issueNum}
                        </span>
                    </div>
                )}

                {/* No image fallback: show issue badge inline */}
                {!media?.cover_image?.url && (
                    <div
                        className="px-5 pt-5 pb-0 flex items-center justify-between"
                    >
                        <span
                            className="text-[9px] font-mono tracking-[0.2em] uppercase"
                            style={{ color: "rgba(255,255,255,0.25)" }}
                        >
                            #{issueNum}
                        </span>
                        {taxonomy?.category?.name && (
                            <span
                                className="text-[9px] font-mono uppercase tracking-widest"
                                style={{ color: "#aa3bff" }}
                            >
                                {taxonomy.category.name}
                            </span>
                        )}
                    </div>
                )}

                {/* Body */}
                <div className="flex flex-col flex-1 px-5 pt-4 pb-5 gap-3">

                    {/* Category + read time (only when image present) */}
                    {media?.cover_image?.url && (
                        <div className="flex items-center justify-between">
                            {taxonomy?.category?.name && (
                                <span
                                    className="text-[9px] font-mono uppercase tracking-widest"
                                    style={{ color: "#aa3bff" }}
                                >
                                    {taxonomy.category.name}
                                </span>
                            )}
                            {content?.reading_time_minutes > 0 && (
                                <span
                                    className="text-[9px] font-mono"
                                    style={{ color: "rgba(255,255,255,0.35)" }}
                                >
                                    {content.reading_time_minutes} min read
                                </span>
                            )}
                        </div>
                    )}

                    {/* Ruled separator — editorial touch */}
                    <div
                        className="w-full h-px"
                        style={{ background: "rgba(255,255,255,0.06)" }}
                        aria-hidden="true"
                    />

                    {/* Title */}
                    <h2
                        className="text-base sm:text-[1.05rem] font-bold leading-snug transition-colors duration-200"
                        style={{
                            fontFamily: "'Syne', sans-serif",
                            color: "#F2F2FA",
                        }}
                    >
                        <span className="group-hover:text-[#aa3bff] transition-colors duration-200">
                            {content?.title}
                        </span>
                    </h2>

                    {/* Excerpt */}
                    {content?.excerpt && (
                        <p
                            className="text-sm leading-relaxed line-clamp-3 font-light"
                            style={{ color: "rgba(255,255,255,0.52)" }}
                        >
                            {content.excerpt}
                        </p>
                    )}

                    {/* Tags */}
                    {taxonomy?.tags?.length > 0 && taxonomy.tags[0]?.name && (
                        <div className="flex flex-wrap gap-1.5">
                            {taxonomy.tags.slice(0, 3).map(tag =>
                                tag.name && <TagChip key={tag.slug} name={tag.name} />
                            )}
                        </div>
                    )}

                    {/* Footer */}
                    <div
                        className="flex items-center justify-between pt-3 mt-auto border-t"
                        style={{ borderColor: "rgba(255,255,255,0.06)" }}
                    >
                        {formattedDate ? (
                            <span
                                className="text-[10px] font-mono"
                                style={{ color: "rgba(255,255,255,0.30)" }}
                            >
                                {formattedDate}
                            </span>
                        ) : <span />}

                        <span
                            className="text-[10px] font-mono flex items-center gap-1 group-hover:gap-2 transition-all duration-200"
                            style={{ color: "#aa3bff" }}
                        >
                            Read
                            <ArrowIcon />
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
}

/* ── Empty state ─────────────────────────────────────────────────── */
function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-28 text-center">
            <span
                className="block text-3xl mb-5 font-mono"
                style={{ color: "rgba(255,255,255,0.1)" }}
                aria-hidden="true"
            >
                ◈
            </span>
            <p
                className="font-mono text-sm"
                style={{ color: "rgba(255,255,255,0.3)" }}
            >
                No articles in this category yet.
            </p>
        </div>
    );
}

/* ── BlogGrid ────────────────────────────────────────────────────── */
export default function BlogGrid({ articles = [] }) {
    const { ref, visible } = useFadeIn(0.04);

    if (articles.length === 0) {
        return <EmptyState />;
    }

    return (
        <>
            {/* Editorial section rule */}
            <div
                className="flex items-center gap-4 mb-8"
                aria-hidden="true"
            >
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
                <span
                    className="text-[9px] font-mono tracking-[0.25em] uppercase"
                    style={{ color: "rgba(255,255,255,0.25)" }}
                >
                    {articles.length} {articles.length === 1 ? "article" : "articles"}
                </span>
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
            </div>

            {/* CSS masonry via columns */}
            <div
                ref={ref}
                className="masonry-grid"
            >
                {articles.map((article, i) => (
                    <BlogCard
                        key={article.id || article.slug}
                        article={article}
                        index={i}
                        visible={visible}
                    />
                ))}
            </div>
        </>
    );
}