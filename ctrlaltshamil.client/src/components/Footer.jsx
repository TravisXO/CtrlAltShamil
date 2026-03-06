// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaWhatsapp, FaLinkedin, FaGithub, FaArrowUp } from 'react-icons/fa';

const navLinks = ['About', 'Projects', 'Case Study', 'Skills', 'Contact'];

const footerProjects = [
    { label: 'BNOP Media', tag: 'MVC' },
    { label: 'SEO Canonical Auditor', tag: 'MVC' },
    { label: 'Classic Zambia Safaris', tag: 'SEO' },
    { label: 'Ctrl Alt Shamil', tag: 'FULL STACK' },
];

const socials = [
    { icon: <FaWhatsapp />, label: 'WhatsApp', href: 'https://wa.me/260965200082' },
    { icon: <FaLinkedin />, label: 'LinkedIn', href: '#' },
    { icon: <FaGithub />, label: 'GitHub', href: 'https://github.com/TravisXO' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer
            className="relative overflow-hidden"
            style={{
                background: `
                    radial-gradient(ellipse at 50% 0%,   rgba(27,45,79,0.5)   0%, transparent 60%),
                    radial-gradient(ellipse at 10% 100%, rgba(46,110,101,0.15) 0%, transparent 50%),
                    #040a09
                `,
                borderTop: '1px solid var(--color-vault-gold)',
            }}
        >
            {/* Scan lines */}
            <div className="absolute inset-0 pointer-events-none z-[2]"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)', backgroundSize: '100% 4px', mixBlendMode: 'multiply' }} />
            {/* CRT vignette */}
            <div className="absolute inset-0 pointer-events-none z-[2]"
                style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.65) 100%)' }} />
            {/* Noise */}
            <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.03]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '120px 120px' }} />
            {/* Hex grid */}
            <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.02]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='30,2 58,17 58,47 30,62 2,47 2,17' stroke='%23E8AA3A' stroke-width='1' fill='none'/%3E%3C/svg%3E")`, backgroundSize: '60px 52px' }} />

            {/* Gold top ruled line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] z-10"
                style={{ background: 'linear-gradient(90deg, transparent, var(--color-vault-gold) 30%, var(--color-pipboy-green) 70%, transparent)' }} />

            {/* Ghost watermark */}
            <div className="absolute bottom-0 left-0 pointer-events-none select-none z-[1] overflow-hidden">
                <span className="font-display font-black leading-none" style={{ fontSize: 'clamp(8rem, 20vw, 18rem)', opacity: 0.02, color: 'var(--color-vault-gold)', letterSpacing: '-0.05em' }}>VAULT</span>
            </div>

            <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 pt-12 pb-8">

                {/* TOP GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 items-start mb-12">

                    {/* Brand */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        className="flex flex-col gap-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 flex items-center justify-center font-display font-black text-xl"
                                style={{ background: 'var(--color-vault-gold)', color: '#070d0c', border: '2px solid rgba(255,255,255,0.15)', boxShadow: '0 0 15px rgba(232,170,58,0.3)' }}>
                                C
                            </div>
                            <span className="font-display font-bold text-base lg:text-lg text-white tracking-tighter uppercase italic"
                                style={{ textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
                                Ctrl Alt <span style={{ color: 'var(--color-vault-gold)' }}>Shamil</span>
                            </span>
                        </div>

                        <p className="font-display text-[11px] leading-relaxed max-w-xs uppercase tracking-wider pl-4"
                            style={{ color: 'rgba(240,224,196,0.4)', borderLeft: '2px solid var(--color-vault-gold)' }}>
                            Optimizing the wasteland through superior code and architecture. Built for resilience. Tested for survival.
                        </p>

                        <div className="flex items-center gap-2 mt-1">
                            <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}
                                className="w-[6px] h-[6px] rounded-full" style={{ background: 'var(--color-pipboy-green)', boxShadow: '0 0 6px var(--color-pipboy-green)' }} />
                            <span className="font-display text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(240,224,196,0.3)' }}>Vault Status: Online</span>
                        </div>
                    </motion.div>

                    {/* Directory */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.12 }}
                        className="flex flex-col gap-5">
                        <div className="flex items-center gap-3 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            <span className="w-1 h-4" style={{ background: 'var(--color-vault-gold)' }} />
                            <h4 className="font-display text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: 'var(--color-vault-gold)' }}>Directory</h4>
                        </div>
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <a key={link} href={`#${link.toLowerCase().replace(' ', '')}`}
                                    className="group flex items-center gap-3 font-display text-[10px] uppercase tracking-widest transition-all"
                                    style={{ color: 'rgba(240,224,196,0.45)' }}
                                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,224,196,0.45)'}>
                                    <span className="h-[1px] transition-all duration-300 group-hover:w-6"
                                        style={{ width: '1rem', background: 'rgba(255,255,255,0.2)' }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'var(--color-vault-gold)'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} />
                                    {link}
                                </a>
                            ))}
                        </nav>
                    </motion.div>

                    {/* Projects */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.22 }}
                        className="flex flex-col gap-5">
                        <div className="flex items-center gap-3 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            <span className="w-1 h-4" style={{ background: 'var(--color-vault-gold)' }} />
                            <h4 className="font-display text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: 'var(--color-vault-gold)' }}>Projects</h4>
                        </div>
                        <nav className="flex flex-col gap-2">
                            {footerProjects.map(({ label, tag }) => (
                                <a key={label} href="#projects"
                                    className="group flex items-center justify-between gap-3 font-display text-[10px] uppercase tracking-widest transition-all"
                                    style={{ color: 'rgba(240,224,196,0.45)' }}
                                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,224,196,0.45)'}>
                                    <span className="flex items-center gap-3">
                                        <span className="h-[1px] w-4 transition-all duration-300" style={{ background: 'rgba(255,255,255,0.2)' }} />
                                        {label}
                                    </span>
                                    <span className="text-[8px] tracking-wider flex-shrink-0 transition-colors" style={{ color: 'rgba(240,224,196,0.2)' }}>{tag}</span>
                                </a>
                            ))}
                        </nav>
                    </motion.div>

                    {/* Comm-Links */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col gap-5 lg:items-end">
                        <div className="flex items-center gap-3 pb-3 w-full lg:justify-end" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            <span className="w-1 h-4" style={{ background: 'var(--color-vault-gold)' }} />
                            <h4 className="font-display text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: 'var(--color-vault-gold)' }}>Comm-Links</h4>
                        </div>

                        <div className="flex gap-3">
                            {socials.map(({ icon, label, href }) => (
                                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                                    className="w-10 h-10 flex items-center justify-center text-lg transition-all duration-300"
                                    style={{ border: '1px solid rgba(255,255,255,0.13)', color: 'rgba(255,255,255,0.45)' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-vault-gold)'; e.currentTarget.style.color = 'var(--color-vault-gold)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(232,170,58,0.2)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.13)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                    {icon}
                                </a>
                            ))}
                        </div>

                        <button onClick={scrollToTop}
                            className="group flex items-center gap-3 mt-2 px-4 py-2 transition-all duration-300"
                            style={{ border: '1px solid rgba(255,255,255,0.13)' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-vault-gold)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(232,170,58,0.1)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.13)'; e.currentTarget.style.boxShadow = 'none'; }}
                            aria-label="Return to Top">
                            <FaArrowUp className="text-sm transition-all duration-300 group-hover:-translate-y-1" style={{ color: 'rgba(255,255,255,0.45)' }} />
                            <span className="font-display text-[9px] tracking-[0.3em] uppercase transition-colors" style={{ color: 'rgba(240,224,196,0.35)' }}>Return to Top</span>
                        </button>
                    </motion.div>
                </div>

                {/* BOTTOM BAR */}
                <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(232,170,58,0.1)' }}>
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                        <span className="font-display text-[9px] tracking-widest uppercase text-center sm:text-left" style={{ color: 'rgba(240,224,196,0.2)' }}>
                            © {currentYear} Vault-Tec Industries Portfolio
                        </span>
                        <div className="hidden sm:block w-[1px] h-3" style={{ background: 'rgba(255,255,255,0.12)' }} />
                        <div className="flex items-center gap-2">
                            <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}
                                className="w-[6px] h-[6px] rounded-full" style={{ background: '#4ade80', boxShadow: '0 0 5px #4ade80' }} />
                            <span className="font-display text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(240,224,196,0.2)' }}>System_Online</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-display text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(232,170,58,0.2)' }}>Encrypted_Handshake: 0x8849202F</span>
                        <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.9, ease: 'steps(1)' }}
                            className="font-display text-[9px]" style={{ color: 'var(--color-pipboy-green)' }}>▌</motion.span>
                    </div>
                </div>
            </div>
        </footer>
    );
}