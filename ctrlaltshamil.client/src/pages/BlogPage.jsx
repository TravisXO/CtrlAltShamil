import { useMemo, useState } from "react";
import BlogHero from "../components/blog/BlogHero";
import BlogGrid from "../components/blog/BlogGrid";
import articles from "../data/alexander-articles.json";

const allArticles = (articles?.articles ?? []).filter((a) => a.status === "published");

/* Derive unique categories from published articles */
function getCategories(list) {
    const seen = new Set();
    list.forEach((a) => {
        if (a.taxonomy?.category?.name) seen.add(a.taxonomy.category.name);
    });
    return [...seen];
}

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const categories = useMemo(() => getCategories(allArticles), []);

    const filtered = useMemo(() => {
        if (activeCategory === "All") return allArticles;
        return allArticles.filter(
            (a) => a.taxonomy?.category?.name === activeCategory
        );
    }, [activeCategory]);

    return (
        <main id="main-content" className="relative w-full flex-1 bg-[#080810]">
            {/* Ambient glow */}
            <div
                className="pointer-events-none absolute top-0 left-1/3 w-[500px] h-[300px] opacity-[0.04] blur-3xl"
                style={{ background: "radial-gradient(ellipse, #aa3bff 0%, transparent 70%)" }}
                aria-hidden="true"
            />

            <section
                className="relative w-full border-t border-[#1A1A30] py-20 sm:py-28"
                aria-labelledby="blog-heading"
            >
                <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24">
                    <BlogHero
                        totalArticles={allArticles.length}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                        categories={categories}
                    />
                    <BlogGrid articles={filtered} />
                </div>
            </section>
        </main>
    );
}
