/**
 * SEOHead.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Drop-in per-page SEO component for Ctrl Alt Shamil portfolio.
 * Uses react-helmet-async — install with: npm install react-helmet-async
 *
 * Usage:
 *   <SEOHead page="home" />
 *   <SEOHead page="projects" />
 *   <SEOHead page="custom" title="..." description="..." />
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { Helmet } from 'react-helmet-async';

// ── Site-wide constants ──────────────────────────────────────────────────────
const SITE = {
    name:        'Ctrl Alt Shamil',
    domain:      'https://ctrlaltshamil.com',          // ← replace with your real domain
    author:      'Alexander Shamil Mondoka',
    twitterHandle: '@ctrlaltshamil',                   // ← update if you have one
    locale:      'en_ZM',
    themeColor:  '#E8AA3A',
};

// ── Per-page SEO configurations ──────────────────────────────────────────────
const PAGE_META = {
    home: {
        title:       'Ctrl Alt Shamil | Full-Stack Developer & SEO Strategist | Lusaka, Zambia',
        description: 'Alexander Shamil Mondoka — Full-Stack Software Engineer (ASP.NET 8, React, C#) and Technical SEO Strategist based in Lusaka, Zambia. Delivered +217% organic traffic growth. Available for remote and local projects.',
        canonical:   '/',
        ogType:      'website',
        ogImage:     '/og-home.jpg',
    },
    projects: {
        title:       'Projects Archive | Ctrl Alt Shamil — Full-Stack & SEO Portfolio',
        description: 'View all projects by Alexander Shamil Mondoka: BNOP Media (ASP.NET 8 MVC), SEO Canonical Auditor, Classic Zambia Safaris (+217% organic traffic), and more.',
        canonical:   '/projects-archive',
        ogType:      'website',
        ogImage:     '/og-projects.jpg',
    },
};

// ── Component ────────────────────────────────────────────────────────────────
export default function SEOHead({
    page = 'home',
    // Override any field individually:
    title,
    description,
    canonical,
    ogType,
    ogImage,
    noIndex = false,
}) {
    const meta   = PAGE_META[page] ?? PAGE_META.home;
    const _title = title       ?? meta.title;
    const _desc  = description ?? meta.description;
    const _canon = canonical   ?? meta.canonical;
    const _type  = ogType      ?? meta.ogType;
    const _image = ogImage     ?? meta.ogImage;

    const fullCanonical = `${SITE.domain}${_canon}`;
    const fullImage     = `${SITE.domain}${_image}`;

    return (
        <Helmet>
            {/* ── Primary ─────────────────────────────── */}
            <html lang="en" />
            <title>{_title}</title>
            <meta name="description"        content={_desc} />
            <meta name="author"             content={SITE.author} />
            <link rel="canonical"           href={fullCanonical} />
            {noIndex && <meta name="robots" content="noindex, nofollow" />}

            {/* ── Open Graph ──────────────────────────── */}
            <meta property="og:type"        content={_type} />
            <meta property="og:title"       content={_title} />
            <meta property="og:description" content={_desc} />
            <meta property="og:url"         content={fullCanonical} />
            <meta property="og:site_name"   content={SITE.name} />
            <meta property="og:image"       content={fullImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt"   content={_title} />
            <meta property="og:locale"      content={SITE.locale} />

            {/* ── Twitter Card ────────────────────────── */}
            <meta name="twitter:card"        content="summary_large_image" />
            <meta name="twitter:site"        content={SITE.twitterHandle} />
            <meta name="twitter:title"       content={_title} />
            <meta name="twitter:description" content={_desc} />
            <meta name="twitter:image"       content={fullImage} />

            {/* ── Geo / Regional ──────────────────────── */}
            <meta name="geo.region"          content="ZM-09" />
            <meta name="geo.placename"       content="Lusaka, Zambia" />
            <meta name="geo.position"        content="-15.3875;28.3228" />
            <meta name="ICBM"                content="-15.3875, 28.3228" />

            {/* ── Theme ───────────────────────────────── */}
            <meta name="theme-color"         content={SITE.themeColor} />
        </Helmet>
    );
}
