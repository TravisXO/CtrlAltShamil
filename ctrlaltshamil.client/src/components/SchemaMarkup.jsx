/**
 * SchemaMarkup.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * JSON-LD structured data (Schema.org) for Ctrl Alt Shamil portfolio.
 * Renders <script type="application/ld+json"> tags via react-helmet-async.
 *
 * Schemas included:
 *   • Person          — for Google's Knowledge Panel
 *   • WebSite         — enables Sitelinks Searchbox in some regions
 *   • ProfessionalService — local business / freelancer signal
 *   • ItemList        — project portfolio listing
 *   • WebPage         — per-page context
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { Helmet } from 'react-helmet-async';

const DOMAIN = 'https://ctrlaltshamil.com'; // ← replace with your real domain

// ── 1. Person ────────────────────────────────────────────────────────────────
const personSchema = {
    '@context': 'https://schema.org',
    '@type':    'Person',
    '@id':      `${DOMAIN}/#person`,
    name:       'Alexander Shamil Mondoka',
    alternateName: ['Shamil Mondoka', 'Ctrl Alt Shamil'],
    url:        DOMAIN,
    email:      'mondokashamil@gmail.com',
    telephone:  '+260965200082',
    image: {
        '@type':   'ImageObject',
        url:       `${DOMAIN}/headshot.jpg`,
        caption:   'Alexander Shamil Mondoka — Full-Stack Developer & SEO Strategist',
    },
    jobTitle:   'Full-Stack Software Engineer & Technical SEO Strategist',
    description: 'Full-Stack Developer (ASP.NET 8, React, C#) and Technical SEO Strategist with BSc (Hons) Software Engineering from Asia Pacific University. Based in Lusaka, Zambia. Delivered +217% organic traffic growth for international clients.',
    address: {
        '@type':          'PostalAddress',
        addressLocality:  'Lusaka',
        addressRegion:    'Lusaka Province',
        addressCountry:   'ZM',
    },
    sameAs: [
        'https://github.com/TravisXO',
        'https://wa.me/260965200082',
    ],
    knowsAbout: [
        'ASP.NET Core', 'React', 'C#', 'JavaScript', 'Technical SEO',
        'Schema Markup', 'Core Web Vitals', 'Entity Framework',
        'SQL Server', 'Tailwind CSS', 'Full-Stack Development',
        'Software Engineering', 'Web Performance',
    ],
    alumniOf: {
        '@type': 'CollegeOrUniversity',
        name:    'Asia Pacific University of Technology & Innovation',
        url:     'https://www.apu.edu.my',
    },
    hasCredential: {
        '@type':      'EducationalOccupationalCredential',
        name:         'BSc (Honours) Software Engineering',
        credentialCategory: 'degree',
        recognizedBy: {
            '@type': 'CollegeOrUniversity',
            name:    'Asia Pacific University',
        },
    },
};

// ── 2. WebSite ───────────────────────────────────────────────────────────────
const websiteSchema = {
    '@context': 'https://schema.org',
    '@type':    'WebSite',
    '@id':      `${DOMAIN}/#website`,
    name:       'Ctrl Alt Shamil',
    url:        DOMAIN,
    description: 'Portfolio of Alexander Shamil Mondoka — Full-Stack Developer & Technical SEO Strategist, Lusaka, Zambia.',
    author: { '@id': `${DOMAIN}/#person` },
    publisher: { '@id': `${DOMAIN}/#person` },
    inLanguage: 'en',
    potentialAction: {
        '@type':       'SearchAction',
        target: {
            '@type': 'EntryPoint',
            urlTemplate: `${DOMAIN}/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
    },
};

// ── 3. Professional Service (local SEO signal) ───────────────────────────────
const serviceSchema = {
    '@context': 'https://schema.org',
    '@type':    ['ProfessionalService', 'LocalBusiness'],
    '@id':      `${DOMAIN}/#service`,
    name:       'Ctrl Alt Shamil — Web Development & SEO Services',
    url:        DOMAIN,
    telephone:  '+260965200082',
    email:      'mondokashamil@gmail.com',
    description: 'Full-stack web development (ASP.NET, React) and technical SEO services. Available for remote and local projects. Based in Lusaka, Zambia.',
    address: {
        '@type':          'PostalAddress',
        addressLocality:  'Lusaka',
        addressRegion:    'Lusaka Province',
        addressCountry:   'ZM',
    },
    geo: {
        '@type':    'GeoCoordinates',
        latitude:   -15.3875,
        longitude:   28.3228,
    },
    areaServed: [
        { '@type': 'Country', name: 'Zambia' },
        { '@type': 'Country', name: 'Remote Worldwide' },
    ],
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name:    'Development & SEO Services',
        itemListElement: [
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type':       'Service',
                    name:          'Full-Stack Web Development',
                    description:   'ASP.NET 8, React, C#, SQL Server — production-grade web applications.',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type':       'Service',
                    name:          'Technical SEO',
                    description:   'Schema markup, Core Web Vitals, Google Search Console, keyword strategy.',
                },
            },
        ],
    },
    founder: { '@id': `${DOMAIN}/#person` },
};

// ── 4. Portfolio / ItemList ───────────────────────────────────────────────────
const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type':    'ItemList',
    name:       'Alexander Shamil Mondoka — Project Portfolio',
    description: 'Selected projects by Shamil Mondoka: full-stack web apps and technical SEO campaigns.',
    url:        `${DOMAIN}/projects-archive`,
    author: { '@id': `${DOMAIN}/#person` },
    numberOfItems: 4,
    itemListElement: [
        {
            '@type':    'ListItem',
            position:   1,
            item: {
                '@type':      'SoftwareApplication',
                name:         'BNOP Media',
                description:  'Full-stack production site on ASP.NET 8 MVC with CI/CD, Entity Framework Core, and responsive Razor views. Sub-2s load time, 95+ Lighthouse score.',
                applicationCategory: 'WebApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                author: { '@id': `${DOMAIN}/#person` },
            },
        },
        {
            '@type':    'ListItem',
            position:   2,
            item: {
                '@type':      'SoftwareApplication',
                name:         'SEO Canonical Auditor',
                description:  'Automated canonical tag auditing tool built with ASP.NET 8. Detects duplicate content and tag conflicts.',
                applicationCategory: 'UtilitiesApplication',
                operatingSystem: 'Web',
                author: { '@id': `${DOMAIN}/#person` },
            },
        },
        {
            '@type':    'ListItem',
            position:   3,
            item: {
                '@type':      'Article',
                name:         'Classic Zambia Safaris — SEO Growth Campaign',
                description:  '+217% organic traffic growth, #1 rankings in US/UK/AU markets, DR improved from 20 to 32.',
                author: { '@id': `${DOMAIN}/#person` },
                about: { '@type': 'Thing', name: 'Technical SEO Campaign' },
            },
        },
        {
            '@type':    'ListItem',
            position:   4,
            item: {
                '@type':      'SoftwareApplication',
                name:         'Ctrl Alt Shamil Portfolio',
                description:  'Full-stack SPA using React 19 and ASP.NET Core with a Fallout-inspired Vault-Tec design system.',
                applicationCategory: 'WebApplication',
                operatingSystem: 'Web',
                author: { '@id': `${DOMAIN}/#person` },
            },
        },
    ],
};

// ── 5. BreadcrumbList (for /projects-archive) ────────────────────────────────
export const breadcrumbSchema = (page) => ({
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: [
        {
            '@type':    'ListItem',
            position:   1,
            name:       'Home',
            item:       DOMAIN,
        },
        page === 'projects' && {
            '@type':    'ListItem',
            position:   2,
            name:       'Projects Archive',
            item:       `${DOMAIN}/projects-archive`,
        },
    ].filter(Boolean),
});

// ── Render Component ─────────────────────────────────────────────────────────
export default function SchemaMarkup({ page = 'home' }) {
    const schemas = [personSchema, websiteSchema, serviceSchema];

    if (page === 'home') {
        schemas.push(portfolioSchema);
    }
    if (page === 'projects') {
        schemas.push(portfolioSchema, breadcrumbSchema('projects'));
    }

    return (
        <Helmet>
            {schemas.map((schema, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
                />
            ))}
        </Helmet>
    );
}
