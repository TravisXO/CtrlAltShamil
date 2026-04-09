import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

/* ── useFadeIn ───────────────────────────────────────────────────── */
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

/* ── Shared input styles ─────────────────────────────────────────── */
const fieldBase =
    "w-full bg-[#0d0d1a] border border-[#2A2A45] rounded-lg px-4 py-3 text-[#F2F2FA] text-sm placeholder-[#40405A] font-mono focus:outline-none focus:border-[#aa3bff] focus:ring-1 focus:ring-[#aa3bff] transition-colors duration-200";

/* ── Info row ────────────────────────────────────────────────────── */
function InfoRow({ icon, label, value, href }) {
    const inner = (
        <div className="flex items-start gap-3 group">
            <span
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                style={{ background: "rgba(170,59,255,0.1)", border: "1px solid rgba(170,59,255,0.25)" }}
                aria-hidden="true"
            >
                {icon}
            </span>
            <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#50507A] mb-0.5">{label}</p>
                <p className={`text-sm text-[#C0C0D8] font-mono ${href ? "group-hover:text-[#aa3bff] transition-colors duration-200" : ""}`}>
                    {value}
                </p>
            </div>
        </div>
    );
    if (href) {
        return (
            <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block">
                {inner}
            </a>
        );
    }
    return inner;
}

/* ── Icons ───────────────────────────────────────────────────────── */
const EmailIcon = () => (
    <svg className="w-3.5 h-3.5 text-[#aa3bff]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="16" height="13" rx="2" />
        <path d="M2 7l8 5 8-5" strokeLinecap="round" />
    </svg>
);
const PhoneIcon = () => (
    <svg className="w-3.5 h-3.5 text-[#aa3bff]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 4.5A1.5 1.5 0 014.5 3h.879a1.5 1.5 0 011.414.993l.696 1.984a1.5 1.5 0 01-.374 1.593l-.5.5a10.002 10.002 0 004.315 4.315l.5-.5a1.5 1.5 0 011.593-.374l1.984.696A1.5 1.5 0 0117 13.621V14.5A1.5 1.5 0 0115.5 16C8.596 16 3 10.404 3 3.5v-1A1.5 1.5 0 014.5 1" strokeLinecap="round" />
    </svg>
);
const LocationIcon = () => (
    <svg className="w-3.5 h-3.5 text-[#aa3bff]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 10.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
        <path d="M10 2a6.5 6.5 0 016.5 6.5c0 4.2-5.5 9.5-6.5 9.5S3.5 12.7 3.5 8.5A6.5 6.5 0 0110 2z" strokeLinecap="round" />
    </svg>
);
const ClockIcon = () => (
    <svg className="w-3.5 h-3.5 text-[#aa3bff]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="10" cy="10" r="7.5" />
        <path d="M10 6v4l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const GitHubIcon = () => (
    <svg className="w-3.5 h-3.5 text-[#aa3bff]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.031 1.531 1.031.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
);
const LinkedInIcon = () => (
    <svg className="w-3.5 h-3.5 text-[#aa3bff]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);
const SendIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M17.5 10L3 3.5l3.5 6.5-3.5 6.5L17.5 10z" strokeLinejoin="round" />
    </svg>
);

/* ── Spinner ─────────────────────────────────────────────────────── */
function SpinnerIcon() {
    return (
        <svg
            className="w-4 h-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
        >
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
        </svg>
    );
}

/* ── Contact Info Panel ──────────────────────────────────────────── */
function ContactInfoPanel({ visible }) {
    return (
        <aside
            className="flex flex-col gap-6"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(20px)",
                transition: "opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s",
            }}
        >
            {/* Card */}
            <div
                className="rounded-2xl p-6 flex flex-col gap-5"
                style={{
                    background: "#0d0d1a",
                    border: "1px solid #2A2A45",
                }}
            >
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#50507A]">
                    Contact Info
                </p>

                <div className="flex flex-col gap-4">
                    <InfoRow
                        icon={<EmailIcon />}
                        label="Email"
                        value="mondokashamil@gmail.com"
                        href="mailto:mondokashamil@gmail.com"
                    />
                    <InfoRow
                        icon={<PhoneIcon />}
                        label="Phone"
                        value="+260 965 200 082"
                        href="tel:+260965200082"
                    />
                    <InfoRow
                        icon={<LocationIcon />}
                        label="Location"
                        value="Lusaka, Zambia"
                    />
                    <InfoRow
                        icon={<ClockIcon />}
                        label="Timezone"
                        value="CAT (UTC+2)"
                    />
                </div>

                {/* Divider */}
                <div className="h-px" style={{ background: "#1A1A30" }} />

                <div className="flex flex-col gap-4">
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#50507A]">
                        Socials
                    </p>
                    <InfoRow
                        icon={<GitHubIcon />}
                        label="GitHub"
                        value="TravisXO"
                        href="https://github.com/TravisXO"
                    />
                    <InfoRow
                        icon={<LinkedInIcon />}
                        label="LinkedIn"
                        value="Alexander (Shamil) Mondoka"
                        href="https://linkedin.com/in/alexander-shamil-mondoka"
                    />
                </div>
            </div>

            {/* Response time note */}
            <div
                className="rounded-xl px-5 py-4 text-xs font-mono text-[#40405A] leading-relaxed"
                style={{ background: "#0d0d1a", border: "1px solid #1A1A30" }}
            >
                <span className="text-[#2EF09A]">⊛</span> Typical response within{" "}
                <span className="text-[#C0C0D8]">24–48 hours</span>. For urgent enquiries, email directly.
            </div>
        </aside>
    );
}

/* ── Success state ───────────────────────────────────────────────── */
function SuccessState() {
    return (
        <div
            className="flex flex-col items-start gap-5 py-10 px-6 rounded-2xl"
            style={{ background: "#0d0d1a", border: "1px solid rgba(46,240,154,0.2)" }}
            role="alert"
            aria-live="polite"
        >
            <span
                className="flex items-center justify-center w-12 h-12 rounded-full text-xl"
                style={{ background: "rgba(46,240,154,0.1)", border: "1px solid rgba(46,240,154,0.3)" }}
                aria-hidden="true"
            >
                ✓
            </span>
            <div>
                <h2 className="text-xl font-black text-[#F2F2FA] mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                    Message sent!
                </h2>
                <p className="text-sm text-[#5A5A80] font-mono leading-relaxed max-w-sm">
                    Thanks for reaching out. I'll get back to you within{" "}
                    <span className="text-[#2EF09A]">24–48 hours</span>.
                </p>
            </div>
        </div>
    );
}

/* ── Main ContactForm component ──────────────────────────────────── */
export default function ContactForm() {
    const { ref, visible } = useFadeIn(0.05);
    const recaptchaRef = useRef(null);

    const [form, setForm] = useState({
        name: "",
        email: "",
        service: "",
        budget: "",
        message: "",
    });
    const [status, setStatus] = useState("idle"); // idle | sending | success | error

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const token = await recaptchaRef.current.executeAsync();
            recaptchaRef.current.reset();

            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, recaptchaToken: token }),
            });

            if (!res.ok) throw new Error();
            setStatus("success");
        } catch {
            setStatus("error");
        }
    };

    return (
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-10 items-start">

            {/* ── Form ── */}
            <div
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(-20px)",
                    transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
                }}
            >
                {status === "success" ? (
                    <SuccessState />
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        noValidate
                        aria-label="Contact form"
                        className="flex flex-col gap-5"
                    >
                        {/* Name + Email row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-[10px] font-mono uppercase tracking-widest text-[#50507A] mb-2">
                                    Name <span className="text-[#aa3bff]" aria-hidden="true">*</span>
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    autoComplete="name"
                                    placeholder="Your name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className={fieldBase}
                                    style={{ caretColor: "#aa3bff" }}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-[10px] font-mono uppercase tracking-widest text-[#50507A] mb-2">
                                    Email <span className="text-[#aa3bff]" aria-hidden="true">*</span>
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    className={fieldBase}
                                    style={{ caretColor: "#aa3bff" }}
                                />
                            </div>
                        </div>

                        {/* Service dropdown */}
                        <div>
                            <label htmlFor="service" className="block text-[10px] font-mono uppercase tracking-widest text-[#50507A] mb-2">
                                Service <span className="text-[#aa3bff]" aria-hidden="true">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="service"
                                    name="service"
                                    required
                                    value={form.service}
                                    onChange={handleChange}
                                    className={`${fieldBase} appearance-none pr-10 cursor-pointer`}
                                    style={{ caretColor: "#aa3bff" }}
                                >
                                    <option value="" disabled>Select a service…</option>
                                    <option value="freelance">Freelance Web Development</option>
                                    <option value="seo">SEO Audit &amp; Strategy</option>
                                    <option value="fulltime">Remote Full-Time Role</option>
                                    <option value="enquiry">General Enquiry</option>
                                </select>
                                {/* Custom chevron */}
                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#50507A]" aria-hidden="true">
                                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* Budget dropdown (optional) */}
                        <div>
                            <label htmlFor="budget" className="block text-[10px] font-mono uppercase tracking-widest text-[#50507A] mb-2">
                                Budget <span className="text-[#40405A] normal-case tracking-normal font-sans text-[10px]">(optional)</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="budget"
                                    name="budget"
                                    value={form.budget}
                                    onChange={handleChange}
                                    className={`${fieldBase} appearance-none pr-10 cursor-pointer`}
                                >
                                    <option value="">Not sure / Flexible</option>
                                    <option value="under500">Under $500</option>
                                    <option value="500-1500">$500 – $1,500</option>
                                    <option value="1500-5000">$1,500 – $5,000</option>
                                    <option value="5000-15000">$5,000 – $15,000</option>
                                    <option value="15000plus">$15,000+</option>
                                </select>
                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#50507A]" aria-hidden="true">
                                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label htmlFor="message" className="block text-[10px] font-mono uppercase tracking-widest text-[#50507A] mb-2">
                                Message <span className="text-[#aa3bff]" aria-hidden="true">*</span>
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={5}
                                placeholder="Tell me about your project or role…"
                                value={form.message}
                                onChange={handleChange}
                                className={`${fieldBase} resize-y min-h-[120px]`}
                                style={{ caretColor: "#aa3bff" }}
                            />
                        </div>

                        {/* Invisible reCAPTCHA — executes on submit */}
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                            size="invisible"
                        />

                        {/* Submit */}
                        <div>
                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg text-sm font-semibold font-mono tracking-wide transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                                style={{
                                    background: status === "sending"
                                        ? "rgba(170,59,255,0.6)"
                                        : "#aa3bff",
                                    color: "#fff",
                                    boxShadow: status === "sending"
                                        ? "none"
                                        : "0 0 20px rgba(170,59,255,0.35), 0 4px 12px rgba(0,0,0,0.4)",
                                }}
                            >
                                {status === "sending" ? (
                                    <>
                                        <SpinnerIcon />
                                        Sending…
                                    </>
                                ) : (
                                    <>
                                        <SendIcon />
                                        Send Message
                                    </>
                                )}
                            </button>

                            {status === "error" && (
                                <p className="mt-3 text-xs font-mono text-red-400">
                                    Something went wrong. Please try again or email directly.
                                </p>
                            )}
                        </div>
                    </form>
                )}
            </div>

            {/* ── Info panel ── */}
            <ContactInfoPanel visible={visible} />
        </div>
    );
}