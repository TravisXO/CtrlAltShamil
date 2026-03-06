// eslint-disable-next-line no-unused-vars
import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';

const contactDetails = [
    { icon: <FaEnvelope />, label: 'Email_Address', value: 'mondokashamil@gmail.com', href: 'mailto:mondokashamil@gmail.com' },
    { icon: <FaPhone />, label: 'Voice_Line', value: '+260 965 200 082', href: 'tel:+260965200082' },
    { icon: <FaMapMarkerAlt />, label: 'Base_Location', value: 'Lusaka, Zambia · Remote Worldwide', href: null },
];

const socials = [
    { icon: <FaGithub size={18} />, label: 'GitHub', href: 'https://github.com/TravisXO' },
    { icon: <FaLinkedin size={18} />, label: 'LinkedIn', href: '#' },
    { icon: <FaWhatsapp size={18} />, label: 'WhatsApp', href: 'https://wa.me/260965200082' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export default function Contact() {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formState),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || 'Transmission failed. Please try again.');
            }
            setSent(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="contact"
            className="relative py-24 lg:py-32 overflow-hidden"
            style={{
                background: `
                    radial-gradient(ellipse at 10% 50%,  rgba(46,110,101,0.18) 0%, transparent 55%),
                    radial-gradient(ellipse at 90% 20%,  rgba(27,45,79,0.4)   0%, transparent 55%),
                    #070d0c
                `,
            }}
        >
            {/* Overlays */}
            <div className="absolute inset-0 pointer-events-none z-10"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.26) 2px, rgba(0,0,0,0.26) 4px)', backgroundSize: '100% 4px', mixBlendMode: 'multiply' }} />
            <div className="absolute inset-0 pointer-events-none z-10"
                style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(0,0,0,0.75) 100%)' }} />
            <div className="absolute inset-0 pointer-events-none z-[5] opacity-[0.035]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '120px 120px' }} />
            <div className="absolute inset-0 pointer-events-none z-[4] opacity-[0.022]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='30,2 58,17 58,47 30,62 2,47 2,17' stroke='%23E8AA3A' stroke-width='1' fill='none'/%3E%3C/svg%3E")`, backgroundSize: '60px 52px' }} />
            <div className="absolute top-0 left-0 right-0 h-[1px] z-20"
                style={{ background: 'linear-gradient(90deg, transparent, var(--color-vault-gold) 30%, var(--color-pipboy-green) 70%, transparent)' }} />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] z-20"
                style={{ background: 'linear-gradient(90deg, transparent, var(--color-vault-gold) 30%, var(--color-pipboy-green) 70%, transparent)' }} />

            {/* HUD labels */}
            <div className="absolute top-6 left-6 z-20 flex flex-col gap-1">
                <span className="font-display text-[9px] tracking-[0.35em] uppercase" style={{ color: 'var(--color-pipboy-green)' }}>■ COMM_RELAY v4.0</span>
                <span className="font-display text-[8px] tracking-[0.2em] opacity-50" style={{ color: 'var(--color-pipboy-green)' }}>CHANNEL: SECURE LINE</span>
            </div>
            <div className="absolute top-6 right-6 z-20 text-right flex flex-col gap-1">
                <span className="font-display text-[9px] tracking-[0.2em] opacity-60" style={{ color: 'var(--color-vault-gold)' }}>SIGNAL: OPEN</span>
                <span className="font-display text-[8px] tracking-[0.15em] opacity-35" style={{ color: 'var(--color-vault-gold)' }}>ENCRYPTION: ACTIVE</span>
            </div>

            {/* Ghost watermark */}
            <div className="absolute top-0 left-0 pointer-events-none select-none z-[3] overflow-hidden">
                <span className="font-display font-black leading-none" style={{ fontSize: 'clamp(6rem, 18vw, 16rem)', opacity: 0.022, color: 'white', letterSpacing: '-0.05em' }}>SIG</span>
            </div>

            <div className="relative z-20 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">

                {/* Section Header */}
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-14 lg:mb-20">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex flex-col gap-[3px]">
                            <span className="block w-8 h-[1px]" style={{ background: 'var(--color-vault-gold)' }} />
                            <span className="block w-5 h-[1px]" style={{ background: 'var(--color-vault-gold)', opacity: 0.5 }} />
                        </div>
                        <span className="font-display text-[10px] tracking-[0.5em] uppercase" style={{ color: 'var(--color-vault-gold)' }}>
                            // SECURE_COMM_LINK: ESTABLISH_CONNECTION
                        </span>
                        <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1.1 }}
                            className="inline-block w-[7px] h-[14px]" style={{ background: 'var(--color-vault-gold)' }} />
                    </div>
                    <h2 className="font-display font-black uppercase leading-none">
                        <span className="block text-[clamp(2.5rem,6vw,5.5rem)] text-white" style={{ textShadow: '0 0 40px rgba(46,110,101,0.45)' }}>BROADCAST</span>
                        <span className="block text-[clamp(2.5rem,6vw,5.5rem)]" style={{ WebkitTextStroke: '2px var(--color-vault-gold)', color: 'transparent', textShadow: '0 0 50px rgba(232,170,58,0.25)', filter: 'drop-shadow(0 0 12px rgba(232,170,58,0.2))' }}>SIGNAL</span>
                    </h2>
                    <p className="font-sans text-sm mt-4 max-w-lg leading-relaxed" style={{ color: 'rgba(240,224,196,0.45)' }}>
                        Ready for remote opportunities or technical consultation. Signal response time typically within 24 cycles.
                    </p>
                    <div className="flex items-center gap-3 mt-6">
                        <span className="flex-1 max-w-xs h-[1px]" style={{ background: 'linear-gradient(90deg, rgba(232,170,58,0.5), transparent)' }} />
                        <span className="font-display text-[8px] tracking-[0.4em] uppercase" style={{ color: 'rgba(232,170,58,0.35)' }}>CLASSIFIED</span>
                    </div>
                </motion.div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* LEFT: Contact info */}
                    <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col gap-8">

                        {/* Quote block */}
                        <motion.div variants={itemVariants} className="relative px-5 py-4"
                            style={{ borderLeft: '2px solid var(--color-vault-gold)', background: 'rgba(232,170,58,0.04)' }}>
                            <span className="block font-display text-[8px] uppercase tracking-[0.4em] mb-2" style={{ color: 'var(--color-pipboy-green)' }}>// FIELD_QUOTE</span>
                            <p className="font-sans text-base italic leading-relaxed" style={{ color: 'rgba(240,224,196,0.75)' }}>
                                "Ready for remote opportunities or technical consultation."
                            </p>
                            <span className="font-display text-[10px] uppercase tracking-[0.3em] mt-2 block" style={{ color: 'var(--color-vault-gold)' }}>
                                — Shamil, Vault Dev #101
                            </span>
                        </motion.div>

                        {/* Contact items */}
                        <div className="flex flex-col gap-2">
                            {contactDetails.map((item, i) => (
                                <motion.div key={i} variants={itemVariants}>
                                    {item.href ? (
                                        <a href={item.href}
                                            className="group flex items-center gap-4 overflow-hidden relative transition-all duration-300"
                                            style={{ border: '1px solid rgba(232,170,58,0.13)', background: 'rgba(7,13,12,0.75)', padding: '1rem 1.25rem' }}
                                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,170,58,0.5)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(232,170,58,0.06)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(232,170,58,0.13)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                            <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[1px] transition-all duration-500 pointer-events-none"
                                                style={{ background: 'var(--color-vault-gold)' }} />
                                            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 transition-all duration-300"
                                                style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)' }}
                                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-vault-gold)'; e.currentTarget.style.color = 'var(--color-vault-gold)'; }}
                                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}>
                                                {item.icon}
                                            </div>
                                            <div>
                                                <p className="font-display text-[9px] uppercase tracking-[0.3em] mb-1" style={{ color: 'rgba(240,224,196,0.35)' }}>{item.label}</p>
                                                <p className="font-display text-sm text-white transition-colors duration-300 group-hover:text-[--color-vault-gold]">{item.value}</p>
                                            </div>
                                        </a>
                                    ) : (
                                        <div className="flex items-center gap-4" style={{ border: '1px solid rgba(232,170,58,0.08)', background: 'rgba(7,13,12,0.5)', padding: '1rem 1.25rem' }}>
                                            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)' }}>{item.icon}</div>
                                            <div>
                                                <p className="font-display text-[9px] uppercase tracking-[0.3em] mb-1" style={{ color: 'rgba(240,224,196,0.25)' }}>{item.label}</p>
                                                <p className="font-display text-sm" style={{ color: 'rgba(240,224,196,0.7)' }}>{item.value}</p>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Socials */}
                        <motion.div variants={itemVariants}>
                            <p className="font-display text-[9px] uppercase tracking-[0.4em] mb-4" style={{ color: 'rgba(46,110,101,0.5)' }}>// Encrypted_Socials</p>
                            <div className="flex gap-3">
                                {socials.map(({ icon, label, href }) => (
                                    <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                                        className="w-11 h-11 flex items-center justify-center transition-all duration-300"
                                        style={{ border: '1px solid rgba(255,255,255,0.13)', color: 'rgba(255,255,255,0.5)' }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-vault-gold)'; e.currentTarget.style.color = 'var(--color-vault-gold)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(232,170,58,0.2)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.13)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                        {icon}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT: Form terminal */}
                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative" style={{ border: '1px solid rgba(232,170,58,0.3)', background: 'rgba(7,13,12,0.85)' }}>
                        {/* Corner accents */}
                        <span className="absolute -top-[1px] -left-[1px] w-5 h-5 border-t-2 border-l-2 pointer-events-none" style={{ borderColor: 'var(--color-vault-gold)' }} />
                        <span className="absolute -bottom-[1px] -right-[1px] w-5 h-5 border-b-2 border-r-2 pointer-events-none" style={{ borderColor: 'var(--color-vault-gold)' }} />

                        {/* Terminal header */}
                        <div className="border-b px-6 py-3 flex items-center gap-3" style={{ borderColor: 'rgba(232,170,58,0.2)', background: 'rgba(46,110,101,0.07)' }}>
                            <div className="flex gap-[6px]">
                                <span className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
                                <span className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
                                <span className="w-2 h-2 rounded-full" style={{ background: 'rgba(232,170,58,0.6)' }} />
                            </div>
                            <span className="font-display text-[10px] uppercase tracking-[0.3em]" style={{ color: 'rgba(232,170,58,0.6)' }}>
                                VT-Terminal — Message_Composer
                            </span>
                        </div>

                        <div className="p-6 lg:p-8">
                            {sent ? (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                                    <div className="w-12 h-12 flex items-center justify-center" style={{ border: '2px solid var(--color-vault-gold)' }}>
                                        <span className="text-xl" style={{ color: 'var(--color-vault-gold)' }}>✓</span>
                                    </div>
                                    <p className="font-display font-black text-white uppercase tracking-wider">Transmission Sent</p>
                                    <p className="font-display text-[10px] uppercase tracking-widest" style={{ color: 'rgba(240,224,196,0.35)' }}>
                                        Signal received. Response within 24 cycles.
                                    </p>
                                    <button onClick={() => { setSent(false); setFormState({ name: '', email: '', message: '' }); }}
                                        className="mt-4 font-display text-[10px] uppercase tracking-widest px-4 py-2 transition-all duration-200"
                                        style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(240,224,196,0.4)' }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-vault-gold)'; e.currentTarget.style.color = 'var(--color-vault-gold)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(240,224,196,0.4)'; }}>
                                        New_Transmission
                                    </button>
                                </motion.div>
                            ) : (
                                <div className="flex flex-col gap-5">
                                    {[
                                        { key: 'name', label: 'Sender_Identity', type: 'text', placeholder: 'Enter Name...' },
                                        { key: 'email', label: 'Return_Frequency', type: 'email', placeholder: 'Enter Email...' },
                                    ].map(({ key, label, type, placeholder }) => (
                                        <div key={key} className="flex flex-col gap-1">
                                            <label className="font-display text-[10px] text-white uppercase tracking-widest">{label}</label>
                                            <input type={type} placeholder={placeholder}
                                                value={formState[key]}
                                                onChange={(e) => setFormState({ ...formState, [key]: e.target.value })}
                                                className="w-full px-4 py-3 font-display text-xs text-white outline-none transition-all duration-200"
                                                style={{ background: 'rgba(7,13,12,0.9)', border: '1px solid rgba(232,170,58,0.2)' }}
                                                onFocus={e => e.currentTarget.style.borderColor = 'var(--color-vault-gold)'}
                                                onBlur={e => e.currentTarget.style.borderColor = 'rgba(232,170,58,0.2)'}
                                                required />
                                        </div>
                                    ))}

                                    <div className="flex flex-col gap-1">
                                        <label className="font-display text-[10px] text-white uppercase tracking-widest">Transmission_Data</label>
                                        <textarea rows="5" placeholder="Enter Message..."
                                            value={formState.message}
                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                            className="w-full px-4 py-3 font-display text-xs text-white outline-none transition-all duration-200 resize-none"
                                            style={{ background: 'rgba(7,13,12,0.9)', border: '1px solid rgba(232,170,58,0.2)' }}
                                            onFocus={e => e.currentTarget.style.borderColor = 'var(--color-vault-gold)'}
                                            onBlur={e => e.currentTarget.style.borderColor = 'rgba(232,170,58,0.2)'}
                                            required />
                                    </div>

                                    {error && (
                                        <p className="font-display text-[10px] uppercase tracking-widest text-center"
                                            style={{ color: '#ff6b6b', border: '1px solid rgba(255,107,107,0.3)', padding: '8px', background: 'rgba(255,107,107,0.05)' }}>
                                            ⚠ {error}
                                        </p>
                                    )}

                                    <button onClick={handleSubmit} disabled={loading}
                                        className="w-full font-display font-black py-4 uppercase tracking-[0.2em] transition-all duration-200"
                                        style={{ background: loading ? 'rgba(232,170,58,0.5)' : 'var(--color-vault-gold)', color: '#070d0c', border: '2px solid var(--color-vault-gold)', boxShadow: '4px 4px 0px rgba(46,110,101,0.8)', cursor: loading ? 'not-allowed' : 'pointer' }}
                                        onMouseEnter={e => { if (!loading) { e.currentTarget.style.boxShadow = '2px 2px 0px rgba(46,110,101,0.8)'; e.currentTarget.style.transform = 'translate(1px,1px)'; e.currentTarget.style.filter = 'brightness(1.1)'; } }}
                                        onMouseLeave={e => { e.currentTarget.style.boxShadow = '4px 4px 0px rgba(46,110,101,0.8)'; e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.filter = 'none'; }}>
                                        {loading ? 'Transmitting...' : 'Send_Broadcast'}
                                    </button>

                                    <p className="font-display text-[9px] uppercase tracking-widest text-center" style={{ color: 'rgba(240,224,196,0.2)' }}>
                                        Encrypted_Transmission · Vault-Tec Secure Line
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Bottom bar */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-14 pt-5 border-t flex items-center justify-between" style={{ borderColor: 'rgba(232,170,58,0.1)' }}>
                    <span className="font-display text-[8px] tracking-[0.4em] uppercase" style={{ color: 'rgba(46,110,101,0.5)' }}>SYS: COMM-LINK STATUS: OPEN</span>
                    <div className="flex items-center gap-2">
                        <span className="font-display text-[8px] tracking-[0.3em] uppercase" style={{ color: 'rgba(232,170,58,0.25)' }}>VAULT-TEC SECURE CHANNEL</span>
                        <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.9, ease: 'steps(1)' }}
                            className="font-display text-[9px]" style={{ color: 'var(--color-pipboy-green)' }}>▌</motion.span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}