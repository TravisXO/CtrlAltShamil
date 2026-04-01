import { useEffect, useRef, useState } from "react";

function useFadeIn(threshold = 0.1) {
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

export default function BlogHero({ totalArticles = 0, activeCategory = "All", onCategoryChange, categories = [] }) {
    const { ref, visible } = useFadeIn(0.1);

    return (
        <div ref={ref} className="mb-12 sm:mb-16">
            {/* Label */}
            <span
                className="inline-block text-xs font-mono tracking-[0.2em] uppercase text-[#aa3bff] mb-4"
                style={{
                    opacity: visible ? 1 : 0,
                    transition: "opacity 0.6s ease",
                }}
            >
                Blog
            </span>

            {/* Heading */}
            <h1
                id="blog-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F2F2FA] tracking-tight leading-tight mb-5"
                style={{
                    fontFamily: "'Syne', sans-serif",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.7s ease 0.05s, transform 0.7s ease 0.05s",
                }}
            >
                Thoughts on{" "}
                <span style={{ color: "#aa3bff", textShadow: "0 0 30px rgba(170,59,255,0.35)" }}>
                    Code & SEO.
                </span>
            </h1>

            {/* Subtitle */}
            <p
                className="text-[#5A5A80] text-base sm:text-lg max-w-xl leading-relaxed font-light mb-8"
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(12px)",
                    transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
                }}
            >
                Practical articles on web development, SEO strategy, and building things that rank and perform.
            </p>

            {/* Category filters */}
            {categories.length > 0 && (
                <div
                    className="flex flex-wrap gap-2"
                    role="tablist"
                    aria-label="Filter articles by category"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(8px)",
                        transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
                    }}
                >
                    {["All", ...categories].map((cat) => (
                        <button
                            key={cat}
                            role="tab"
                            aria-selected={activeCategory === cat}
                            onClick={() => onCategoryChange?.(cat)}
                            className="text-xs font-mono tracking-widest uppercase px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer"
                            style={
                                activeCategory === cat
                                    ? {
                                          background: "rgba(170,59,255,0.12)",
                                          borderColor: "rgba(170,59,255,0.45)",
                                          color: "#aa3bff",
                                          boxShadow: "0 0 12px rgba(170,59,255,0.15)",
                                      }
                                    : {
                                          background: "transparent",
                                          borderColor: "#2A2A45",
                                          color: "#50507A",
                                      }
                            }
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
