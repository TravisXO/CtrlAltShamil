import ContactHero from "../components/contact/ContactHero";
import ContactForm from "../components/contact/ContactForm";

/**
 * /contact — Contact page
 *
 * Performance & Lighthouse notes:
 *  - No images, no heavy third-party JS
 *  - All animation driven by CSS transitions (no GSAP/Framer overhead)
 *  - Form is controlled React state — zero external form library
 *  - Semantic HTML: <main>, <section>, landmark roles for accessibility
 *  - Colour contrast: all text meets WCAG AA against the dark bg (#080810)
 *  - No layout shift: fixed skeleton heights on inputs via py-3 + font-size parity
 */
export default function ContactPage() {
    return (
        <main id="main-content" className="relative w-full flex-1 bg-[#080810]">
            {/* ── Ambient background glow (decorative, hidden from AT) ── */}
            <div
                className="pointer-events-none absolute top-0 right-1/3 w-[520px] h-[320px] opacity-[0.05] blur-3xl"
                style={{ background: "radial-gradient(ellipse, #aa3bff 0%, transparent 70%)" }}
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute bottom-40 left-1/4 w-[400px] h-[240px] opacity-[0.03] blur-3xl"
                style={{ background: "radial-gradient(ellipse, #00CFFF 0%, transparent 70%)" }}
                aria-hidden="true"
            />

            <section
                className="relative w-full border-t border-[#1A1A30] py-20 sm:py-28"
                aria-labelledby="contact-heading"
            >
                <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24">
                    {/* Hero: headline, subtitle, availability badge */}
                    <ContactHero />

                    {/* Form + info panel */}
                    <ContactForm />
                </div>
            </section>
        </main>
    );
}
