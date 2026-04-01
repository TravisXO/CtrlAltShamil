import { useEffect, useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import BlogRelatedPosts from "../components/blog/BlogRelatedPosts";
import articlesData from "../data/alexander-articles.json";

const allArticles = articlesData?.articles ?? [];

/* ── Helpers ─────────────────────────────────────────────────── */
function formatDate(iso) {
    if (!iso) return null;
    return new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

/* ── JSON-LD injector ────────────────────────────────────────── */
function useJsonLd(article) {
    useEffect(() => {
        if (!article) return;
        document.getElementById("article-jsonld")?.remove();
        const s1 = document.createElement("script");
        s1.id = "article-jsonld";
        s1.type = "application/ld+json";
        s1.textContent = JSON.stringify(article.json_ld);
        document.head.appendChild(s1);

        if (article.faq_schema?.mainEntity?.[0]?.name) {
            document.getElementById("faq-jsonld")?.remove();
            const s2 = document.createElement("script");
            s2.id = "faq-jsonld";
            s2.type = "application/ld+json";
            s2.textContent = JSON.stringify(article.faq_schema);
            document.head.appendChild(s2);
        }

        return () => {
            document.getElementById("article-jsonld")?.remove();
            document.getElementById("faq-jsonld")?.remove();
        };
    }, [article]);
}

/* ── SEO meta updater ────────────────────────────────────────── */
function useSeoMeta(article) {
    useEffect(() => {
        if (!article?.seo) return;
        const { seo } = article;
        document.title = seo.title || article.content?.title || "Blog";

        const setMeta = (name, content, prop = false) => {
            if (!content) return;
            const attr = prop ? "property" : "name";
            let el = document.querySelector(`meta[${attr}="${name}"]`);
            if (!el) {
                el = document.createElement("meta");
                el.setAttribute(attr, name);
                document.head.appendChild(el);
            }
            el.setAttribute("content", content);
        };

        setMeta("description", seo.meta_description);
        setMeta("robots", seo.robots);
        setMeta("og:title", seo.og?.title, true);
        setMeta("og:description", seo.og?.description, true);
        setMeta("og:image", seo.og?.image, true);
        setMeta("og:url", seo.og?.url, true);
        setMeta("og:type", seo.og?.type || "article", true);
        setMeta("twitter:card", seo.twitter?.card);
        setMeta("twitter:title", seo.twitter?.title);
        setMeta("twitter:description", seo.twitter?.description);
        setMeta("twitter:image", seo.twitter?.image);

        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement("link");
            canonical.setAttribute("rel", "canonical");
            document.head.appendChild(canonical);
        }
        canonical.setAttribute("href", article.canonical_url || seo.canonical || "");

        return () => { document.title = "Alexander Mondoka"; };
    }, [article]);
}

/* ── Tag chip ────────────────────────────────────────────────── */
function TagChip({ name }) {
    return (
        <span
            className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full border"
            style={{
                background: "rgba(170,59,255,0.08)",
                borderColor: "rgba(170,59,255,0.3)",
                color: "#aa3bff",
            }}
        >
            {name}
        </span>
    );
}

/* ── Breadcrumb ──────────────────────────────────────────────── */
function Breadcrumb({ category, title }) {
    return (
        <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex items-center gap-2 flex-wrap text-xs font-mono text-[#40405A]">
                <li>
                    <Link to="/" className="hover:text-[#aa3bff] transition-colors duration-150">Home</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                    <Link to="/blog" className="hover:text-[#aa3bff] transition-colors duration-150">Blog</Link>
                </li>
                {category && (
                    <>
                        <li aria-hidden="true">/</li>
                        <li className="text-[#5A5A80]">{category}</li>
                    </>
                )}
                <li aria-hidden="true">/</li>
                <li className="text-[#7070A0] truncate max-w-[240px]" aria-current="page">
                    {title}
                </li>
            </ol>
        </nav>
    );
}

/* ── Table of contents ───────────────────────────────────────── */
function TableOfContents({ items }) {
    if (!items || items.length === 0) return null;
    return (
        <nav
            aria-label="Table of contents"
            className="rounded-xl p-5 mb-10"
            style={{ background: "#0d0d1a", border: "1px solid #2A2A45" }}
        >
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#50507A] mb-3">
                Contents
            </p>
            <ol className="flex flex-col gap-2 list-none">
                {items.map((item) => (
                    <li key={item.id} style={{ paddingLeft: item.level > 2 ? "1rem" : 0 }}>
                        <a
                            href={item.anchor}
                            className="text-sm font-mono text-[#5A5A80] hover:text-[#aa3bff] transition-colors duration-150"
                        >
                            {item.heading}
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    );
}

/* ── Author card (inline, below article) ─────────────────────── */
function AuthorCard({ author }) {
    if (!author?.name) return null;
    return (
        <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-14 pt-10 border-t border-[#1A1A30]"
        >
            {author.avatar_url && (
                <img
                    src={author.avatar_url}
                    alt={author.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                    loading="lazy"
                    decoding="async"
                />
            )}
            <div className="flex-1">
                <p
                    className="text-sm font-bold text-[#F2F2FA] mb-1"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                >
                    {author.name}
                </p>
                {author.bio && (
                    <p className="text-xs text-[#5A5A80] leading-relaxed font-light max-w-lg">
                        {author.bio}
                    </p>
                )}
                {(author.social?.github || author.social?.linkedin || author.social?.twitter) && (
                    <div className="flex gap-4 mt-2">
                        {author.social.github && (
                            <a href={author.social.github} target="_blank" rel="noopener noreferrer"
                                className="text-[10px] font-mono text-[#50507A] hover:text-[#aa3bff] transition-colors duration-150">
                                GitHub
                            </a>
                        )}
                        {author.social.linkedin && (
                            <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer"
                                className="text-[10px] font-mono text-[#50507A] hover:text-[#aa3bff] transition-colors duration-150">
                                LinkedIn
                            </a>
                        )}
                        {author.social.twitter && (
                            <a href={author.social.twitter} target="_blank" rel="noopener noreferrer"
                                className="text-[10px] font-mono text-[#50507A] hover:text-[#aa3bff] transition-colors duration-150">
                                X / Twitter
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

/* ── FAQ section ─────────────────────────────────────────────── */
function FaqSection({ faq }) {
    if (!faq?.mainEntity?.[0]?.name) return null;
    return (
        <section className="mt-14 pt-10 border-t border-[#1A1A30]" aria-labelledby="faq-heading">
            <h2
                id="faq-heading"
                className="text-xl font-black text-[#F2F2FA] mb-6"
                style={{ fontFamily: "'Syne', sans-serif" }}
            >
                Frequently Asked Questions
            </h2>
            <div className="flex flex-col gap-3">
                {faq.mainEntity.map((item, i) => (
                    <details
                        key={i}
                        className="rounded-xl p-5 group"
                        style={{ background: "#0d0d1a", border: "1px solid #2A2A45" }}
                    >
                        <summary className="text-sm font-semibold text-[#C0C0D8] cursor-pointer list-none flex items-center justify-between gap-4 font-mono">
                            {item.name}
                            <svg
                                className="w-4 h-4 flex-shrink-0 text-[#aa3bff] transition-transform duration-200 group-open:rotate-180"
                                viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
                            >
                                <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </summary>
                        <p className="mt-3 text-sm text-[#5A5A80] leading-relaxed">
                            {item.acceptedAnswer?.text}
                        </p>
                    </details>
                ))}
            </div>
        </section>
    );
}

/* ── BlogArticle ─────────────────────────────────────────────── */
export default function BlogArticle() {
    const { slug } = useParams();

    const article = useMemo(
        () => allArticles.find((a) => a.slug === slug && a.status === "published"),
        [slug]
    );

    useJsonLd(article);
    useSeoMeta(article);

    const relatedArticles = useMemo(() => {
        if (!article?.internal_linking?.related_articles) return [];
        return article.internal_linking.related_articles
            .map((rel) => allArticles.find((a) => a.slug === rel.slug && a.status === "published"))
            .filter(Boolean);
    }, [article]);

    if (!article) return <Navigate to="/blog" replace />;

    const { content, author, taxonomy, media, published_at, updated_at, faq_schema } = article;

    return (
        <main id="main-content" className="relative w-full flex-1 bg-[#080810]">

            {/* ── Full-width cover image ── */}
            {media?.cover_image?.url && (
                <div
                    className="relative w-full overflow-hidden border-t border-[#1A1A30]"
                    style={{ maxHeight: "520px" }}
                >
                    <img
                        src={media.cover_image.url}
                        alt={media.cover_image.alt || content?.title || ""}
                        className="w-full object-cover"
                        style={{ maxHeight: "520px", display: "block" }}
                        width={media.cover_image.width || 1600}
                        height={media.cover_image.height || 900}
                        fetchpriority="high"
                        decoding="async"
                    />
                    {/* Fade into page bg */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: "linear-gradient(to bottom, rgba(8,8,16,0.2) 0%, rgba(8,8,16,0.85) 100%)",
                        }}
                        aria-hidden="true"
                    />
                </div>
            )}

            {/* ── Editorial column ── */}
            <article
                className="relative mx-auto w-full px-4 sm:px-6 py-14 sm:py-20"
                style={{ maxWidth: "820px" }}
                itemScope
                itemType="https://schema.org/BlogPosting"
            >
                {/* Breadcrumb */}
                <Breadcrumb category={taxonomy?.category?.name} title={content?.title} />

                {/* ── Article header ── */}
                <header className="mb-10">
                    {taxonomy?.category?.name && (
                        <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-[#aa3bff] mb-4">
                            {taxonomy.category.name}
                        </span>
                    )}

                    <h1
                        className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-[#F2F2FA] tracking-tight leading-tight mb-5"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                        itemProp="headline"
                    >
                        {content?.title}
                    </h1>

                    {content?.subtitle && (
                        <p className="text-lg sm:text-xl text-[#5A5A80] leading-relaxed font-light mb-7">
                            {content.subtitle}
                        </p>
                    )}

                    {/* Divider */}
                    <div className="h-px w-full mb-7" style={{ background: "#1A1A30" }} />

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-[#40405A]">
                        {author?.name && (
                            <span itemProp="author" itemScope itemType="https://schema.org/Person">
                                <span itemProp="name" className="text-[#7070A0]">{author.name}</span>
                            </span>
                        )}
                        {published_at && (
                            <time dateTime={published_at} itemProp="datePublished">
                                {formatDate(published_at)}
                            </time>
                        )}
                        {updated_at && updated_at !== published_at && (
                            <time dateTime={updated_at} itemProp="dateModified">
                                Updated {formatDate(updated_at)}
                            </time>
                        )}
                        {content?.reading_time_minutes > 0 && (
                            <span>{content.reading_time_minutes} min read</span>
                        )}
                        {content?.word_count > 0 && (
                            <span itemProp="wordCount">{content.word_count.toLocaleString()} words</span>
                        )}
                    </div>

                    {/* Tags */}
                    {taxonomy?.tags?.length > 0 && taxonomy.tags[0]?.name && (
                        <div className="flex flex-wrap gap-1.5 mt-5">
                            {taxonomy.tags.map((tag) =>
                                tag.name ? <TagChip key={tag.slug} name={tag.name} /> : null
                            )}
                        </div>
                    )}
                </header>

                {/* ── Table of contents ── */}
                <TableOfContents items={content?.table_of_contents} />

                {/* ── Body ── */}
                {content?.body_html ? (
                    <div
                        className="article-body"
                        itemProp="articleBody"
                        dangerouslySetInnerHTML={{ __html: content.body_html }}
                        style={{
                            color: "#8080A0",
                            fontSize: "1.0625rem",
                            lineHeight: "1.85",
                        }}
                    />
                ) : content?.body_markdown ? (
                    <p className="text-[#5A5A80] font-mono text-sm italic">
                        [Populate body_html for rendered output.]
                    </p>
                ) : null}

                {/* ── FAQ ── */}
                <FaqSection faq={faq_schema} />

                {/* ── Author card ── */}
                <AuthorCard author={author} />
            </article>

            {/* ── Related posts — full width section, own centred column ── */}
            <BlogRelatedPosts articles={relatedArticles} />

        </main>
    );
}
