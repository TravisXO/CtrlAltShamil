// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaLinkedin, FaGithub } from 'react-icons/fa';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects-archive' },
    { name: 'Skills', path: '/#skills' },
    { name: 'Contact', path: '/#contact' }
];

const socials = [
    { icon: <FaWhatsapp />, label: 'WhatsApp', href: 'https://wa.me/260965200082' },
    { icon: <FaLinkedin />, label: 'LinkedIn', href: '#' },
    { icon: <FaGithub />, label: 'GitHub', href: 'https://github.com/TravisXO' },
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleNavClick = (e, path) => {
        const hash = path.includes('#') ? path.split('#')[1] : null;
        if (!hash) return;
        e.preventDefault();
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 w-full z-[1000] pt-5 lg:pt-6 transition-all duration-300"
            style={scrolled ? {
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(232,170,58,0.15)',
            } : {}}>

            {/* ── Scan line strip across header ── */}
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
                    backgroundSize: '100% 4px',
                }} />

            {/* ── Bottom ruled line ── */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(232,170,58,0.3) 30%, rgba(46,110,101,0.3) 70%, transparent)' }} />

            <div className="relative max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between pb-5 lg:pb-6">

                {/* ── Logo ── */}
                <Link to="/" className="flex items-center gap-3 cursor-pointer group">
                    {/* Animated bracket around the C */}
                    <div className="relative w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center font-display font-black text-xl lg:text-2xl transition-all duration-300"
                        style={{ background: 'var(--color-vault-gold)', color: '#070d0c', border: '2px solid rgba(255,255,255,0.15)', boxShadow: '0 0 16px rgba(232,170,58,0.35)' }}>
                        C
                        {/* Corner sparks on hover */}
                        <span className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                            style={{ borderColor: 'rgba(255,255,255,0.6)' }} />
                        <span className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                            style={{ borderColor: 'rgba(255,255,255,0.6)' }} />
                    </div>

                    <div className="flex flex-col leading-tight">
                        <span className="font-display font-bold text-base lg:text-xl text-white tracking-tighter uppercase italic"
                            style={{ textShadow: '0 0 12px rgba(255,255,255,0.25)' }}>
                            Ctrl Alt <span style={{ color: 'var(--color-vault-gold)', textShadow: '0 0 10px rgba(232,170,58,0.4)' }}>Shamil</span>
                        </span>
                        <span className="font-display text-[8px] tracking-[0.35em] uppercase hidden sm:block"
                            style={{ color: 'rgba(46,110,101,0.7)' }}>
                            ■ VAULT-TEC CERTIFIED
                        </span>
                    </div>
                </Link>

                {/* ── Desktop Nav ── */}
                <nav className="hidden xl:flex items-center gap-1">
                    {navItems.map((item, i) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={e => handleNavClick(e, item.path)}
                            className="group relative px-4 py-2 font-display text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-200"
                            style={{ color: 'rgba(255,255,255,0.65)' }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-vault-gold)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                        >
                            {/* Underline sweep */}
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full pointer-events-none"
                                style={{ background: 'var(--color-vault-gold)' }} />
                            {/* Index number */}
                            <span className="absolute top-[3px] left-2 font-display text-[7px] transition-colors duration-200 opacity-0 group-hover:opacity-100"
                                style={{ color: 'rgba(232,170,58,0.5)' }}>
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* ── Desktop Socials + CTA ── */}
                <div className="hidden xl:flex items-center gap-6">
                    {/* Socials */}
                    <div className="flex gap-3">
                        {socials.map(({ icon, label, href }) => (
                            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                                className="w-8 h-8 flex items-center justify-center text-base transition-all duration-200"
                                style={{ color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}
                                onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-vault-gold)'; e.currentTarget.style.borderColor = 'var(--color-vault-gold)'; e.currentTarget.style.boxShadow = '0 0 10px rgba(232,170,58,0.2)'; }}
                                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                {icon}
                            </a>
                        ))}
                    </div>

                    {/* Divider */}
                    <span className="w-[1px] h-6" style={{ background: 'rgba(232,170,58,0.2)' }} />

                    {/* CTA */}
                    <Link to="/#contact"
                        className="font-display font-black uppercase text-[10px] tracking-[0.2em] px-5 py-[9px] transition-all duration-200"
                        style={{ background: 'var(--color-vault-gold)', color: '#070d0c', border: '2px solid var(--color-vault-gold)', boxShadow: '3px 3px 0px rgba(46,110,101,0.7)' }}
                        onMouseEnter={e => { e.currentTarget.style.boxShadow = '1px 1px 0px rgba(46,110,101,0.7)'; e.currentTarget.style.transform = 'translate(1px,1px)'; e.currentTarget.style.filter = 'brightness(1.08)'; }}
                        onMouseLeave={e => { e.currentTarget.style.boxShadow = '3px 3px 0px rgba(46,110,101,0.7)'; e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.filter = 'none'; }}>
                        [ Initiate Comms ]
                    </Link>
                </div>

                {/* ── Mobile: Socials + Hamburger ── */}
                <div className="flex xl:hidden items-center gap-4">
                    <div className="hidden sm:flex gap-3">
                        {socials.map(({ icon, label, href }) => (
                            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                                className="w-8 h-8 flex items-center justify-center text-base transition-all duration-200"
                                style={{ color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}
                                onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-vault-gold)'; e.currentTarget.style.borderColor = 'rgba(232,170,58,0.5)'; }}
                                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                                {icon}
                            </a>
                        ))}
                    </div>

                    {/* Hamburger */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex flex-col gap-[5px] p-2 transition-all duration-200"
                        style={{ border: `1px solid ${menuOpen ? 'var(--color-vault-gold)' : 'rgba(255,255,255,0.2)'}` }}
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                        <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                        <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                    </button>
                </div>
            </div>

            {/* ── Mobile Dropdown ── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="xl:hidden mx-6 sm:mx-8 origin-top"
                        style={{ border: '1px solid rgba(232,170,58,0.25)', background: 'rgba(7,13,12,0.96)', backdropFilter: 'blur(12px)' }}
                    >
                        {/* Terminal header */}
                        <div className="flex items-center gap-3 px-5 py-2 border-b" style={{ borderColor: 'rgba(232,170,58,0.15)', background: 'rgba(46,110,101,0.07)' }}>
                            <div className="flex gap-[5px]">
                                <span className="w-[6px] h-[6px] rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
                                <span className="w-[6px] h-[6px] rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
                                <span className="w-[6px] h-[6px] rounded-full" style={{ background: 'rgba(232,170,58,0.6)' }} />
                            </div>
                            <span className="font-display text-[9px] uppercase tracking-[0.35em]" style={{ color: 'rgba(232,170,58,0.5)' }}>
                                NAV_DIRECTORY
                            </span>
                            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1.1 }}
                                className="inline-block w-[5px] h-[10px] ml-1" style={{ background: 'var(--color-vault-gold)' }} />
                        </div>

                        <nav className="flex flex-col">
                            {navItems.map((item, i) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={e => handleNavClick(e, item.path)}
                                    className="group relative flex items-center gap-4 px-5 py-4 font-display text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-200 overflow-hidden"
                                    style={{
                                        color: 'rgba(240,224,196,0.6)',
                                        borderBottom: i !== navItems.length - 1 ? '1px solid rgba(232,170,58,0.08)' : 'none',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-vault-gold)'; e.currentTarget.style.background = 'rgba(46,110,101,0.06)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(240,224,196,0.6)'; e.currentTarget.style.background = 'transparent'; }}
                                >
                                    {/* Left sweep */}
                                    <span className="absolute left-0 top-0 w-[2px] h-0 group-hover:h-full transition-all duration-300 pointer-events-none"
                                        style={{ background: 'var(--color-vault-gold)' }} />
                                    <span className="font-display text-[9px] opacity-40 group-hover:opacity-100 transition-opacity flex-shrink-0"
                                        style={{ color: 'var(--color-vault-gold)' }}>
                                        [{String(i + 1).padStart(2, '0')}]
                                    </span>
                                    {item.name}
                                </Link>
                            ))}

                            {/* CTA row */}
                            <div className="px-5 py-4 border-t flex items-center justify-between gap-4" style={{ borderColor: 'rgba(232,170,58,0.12)' }}>
                                <div className="flex sm:hidden gap-3">
                                    {socials.map(({ icon, label, href }) => (
                                        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                                            className="w-8 h-8 flex items-center justify-center text-base transition-all duration-200"
                                            style={{ color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.1)' }}
                                            onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-vault-gold)'; e.currentTarget.style.borderColor = 'rgba(232,170,58,0.4)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                                            {icon}
                                        </a>
                                    ))}
                                </div>
                                <Link to="/#contact" onClick={() => setMenuOpen(false)}
                                    className="font-display font-black uppercase text-[10px] tracking-[0.2em] px-5 py-2 transition-all duration-200"
                                    style={{ background: 'var(--color-vault-gold)', color: '#070d0c', border: '2px solid var(--color-vault-gold)', boxShadow: '3px 3px 0px rgba(46,110,101,0.7)' }}>
                                    [ Initiate Comms ]
                                </Link>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}