import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function useFadeIn(threshold = 0.08) {
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

/* ── Single related card ─────────────────────────────────────── */
function RelatedCard({ article, index, visible }) {
    const { slug, content, taxonomy, media, published_at } = article;

    const formattedDate = published_at
        ? new Date(published_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
          })
        : null;

    return (
        <Link
            to={`/blog/${slug}`}
            className="group flex flex-col rounded-xl border overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#aa3bff]"
            style={{
                background: "#0d0d1a",
                borderColor: "#2A2A45",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, border-color 0.2s ease, box-shadow 0.2s ease`,
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(170,59,255,0.4)";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(170,59,255,0.08)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#2A2A45";
                e.currentTarget.style.boxShadow = "none";
            }}
            aria-label={`Read: ${content?.title}`}
        >
            {/* Thumbnail */}
            {media?.cover_image?.url && (
                <div className="w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <img
                        src={media.cover_image.url}
                        alt={media.cover_image.alt || content?.title || ""}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        width={media.cover_image.width || 600}
                        height={media.cover_image.height || 338}
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            )}

            <div className="flex flex-col gap-2 p-4 flex-1">
                {taxonomy?.category?.name && (
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#50507A]">
                        {taxonomy.category.name}
                    </span>
                )}
                <h3
                    className="text-sm font-bold text-[#F2F2FA] leading-snug group-hover:text-[#aa3bff] transition-colors duration-200 flex-1"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                >
                    {content?.title}
                </h3>
                <div className="flex items-center justify-between mt-auto pt-2">
                    {formattedDate && (
                        <span className="text-[10px] font-mono text-[#40405A]">{formattedDate}</span>
                    )}
                    {content?.reading_time_minutes > 0 && (
                        <span className="text-[10px] font-mono text-[#40405A]">
                            {content.reading_time_minutes} min
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}

/* ── BlogRelatedPosts ────────────────────────────────────────── */
export default function BlogRelatedPosts({ articles = [] }) {
    const { ref, visible } = useFadeIn(0.08);

    if (!articles || articles.length === 0) return null;

    return (
        /* Full-width dark band */
        <section
            ref={ref}
            className="w-full border-t border-[#1A1A30] py-14 sm:py-20"
            aria-label="Related articles"
        >
            {/* Centred editorial column — matches article max-width */}
            <div className="mx-auto w-full px-4 sm:px-6" style={{ maxWidth: "820px" }}>
                <p
                    className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#50507A] mb-8"
                    style={{
                        opacity: visible ? 1 : 0,
                        transition: "opacity 0.5s ease",
                    }}
                >
                    Related Articles
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {articles.slice(0, 3).map((article, i) => (
                        <RelatedCard
                            key={article.id || article.slug}
                            article={article}
                            index={i}
                            visible={visible}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
