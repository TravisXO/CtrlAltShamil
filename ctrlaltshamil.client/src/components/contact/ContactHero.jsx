import { useEffect, useRef, useState } from "react";

function useFadeIn(threshold = 0.12) {
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

export default function ContactHero() {
    const { ref, visible } = useFadeIn(0.1);

    return (
        <div
            ref={ref}
            className="mb-12 sm:mb-16"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
        >
            {/* Section label */}
            <span className="inline-block text-xs font-mono tracking-[0.2em] uppercase text-[#00CFFF] mb-4">
                Contact
            </span>

            {/* Heading */}
            <h1
                id="contact-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F2F2FA] tracking-tight leading-tight mb-5"
                style={{ fontFamily: "'Syne', sans-serif" }}
            >
                Let's Work{" "}
                <span
                    style={{
                        color: "#aa3bff",
                        textShadow: "0 0 30px rgba(170,59,255,0.35)",
                    }}
                >
                    Together.
                </span>
            </h1>

            {/* Subtitle */}
            <p
                className="text-[#5A5A80] text-base sm:text-lg max-w-xl leading-relaxed font-light mb-6"
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(12px)",
                    transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
                }}
            >
                Open to remote full-time roles, freelance projects, and SEO or development contracts worldwide.
            </p>

            {/* Availability badge */}
            <div
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-sm font-mono"
                style={{
                    background: "rgba(46, 240, 154, 0.07)",
                    borderColor: "rgba(46, 240, 154, 0.3)",
                    color: "#2EF09A",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(8px)",
                    transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
                }}
            >
                {/* Pulsing dot */}
                <span className="relative flex h-2 w-2">
                    <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                        style={{ background: "#2EF09A" }}
                    />
                    <span
                        className="relative inline-flex rounded-full h-2 w-2"
                        style={{ background: "#2EF09A" }}
                    />
                </span>
                Available for new projects
            </div>
        </div>
    );
}
