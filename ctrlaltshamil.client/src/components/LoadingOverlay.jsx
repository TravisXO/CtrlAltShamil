import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tips = [
    "TIP: A well-architected system survives the apocalypse. Spaghetti code does not.",
    "TIP: Always commit your work. The wasteland has no undo button.",
    "TIP: Clean code is a weapon. Wield it with precision.",
    "TIP: Every great product was once just a Pip-Boy prototype.",
    "TIP: The best debugging tool is still a good night's sleep.",
];

export default function LoadingOverlay() {
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [tip] = useState(() => tips[Math.floor(Math.random() * tips.length)]);

    useEffect(() => {
        // Only show once per browser session
        if (!sessionStorage.getItem('vault-entered')) {
            setVisible(true);

            // Animate progress bar over ~3.8s then fade out at 4s
            const start = Date.now();
            const duration = 3800;
            const tick = setInterval(() => {
                const elapsed = Date.now() - start;
                const pct = Math.min((elapsed / duration) * 100, 100);
                setProgress(pct);
                if (pct >= 100) clearInterval(tick);
            }, 30);

            const hide = setTimeout(() => {
                setVisible(false);
                sessionStorage.setItem('vault-entered', 'true');
            }, 4200);

            return () => { clearInterval(tick); clearTimeout(hide); };
        }
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="loading"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-end overflow-hidden"
                    style={{ background: '#070d0c' }}
                >
                    {/* Background image — same Fallout 4 teaser from your CSS */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url('https://www.windowscentral.com/sites/wpcentral.com/files/styles/larger/public/field/image/2015/06/fallout-4-teaser.jpg?itok=L6Ln4CRc')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.35,
                        }}
                    />

                    {/* CRT scanlines */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
                            backgroundSize: '100% 4px',
                        }}
                    />

                    {/* Vignette */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.85) 100%)' }}
                    />

                    {/* Flicker overlay */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        animate={{ opacity: [0.03, 0, 0.05, 0, 0.02, 0] }}
                        transition={{ repeat: Infinity, duration: 0.18, ease: 'linear' }}
                        style={{ background: 'rgba(255,255,255,1)' }}
                    />

                    {/* ── Bottom UI ── */}
                    <div className="relative z-10 w-full px-8 lg:px-16 pb-10 flex flex-col gap-4">

                        {/* Tip text */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="font-sans text-xs lg:text-sm max-w-2xl leading-relaxed"
                            style={{ color: 'rgba(240,224,196,0.6)' }}
                        >
                            {tip}
                        </motion.p>

                        {/* PLEASE WAIT label + bar */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <motion.span
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ repeat: Infinity, duration: 0.7, ease: 'steps(1)' }}
                                        className="font-display text-[10px] tracking-[0.4em] uppercase"
                                        style={{ color: 'var(--color-vault-gold)' }}
                                    >
                                        ▌
                                    </motion.span>
                                    <span
                                        className="font-display text-[11px] tracking-[0.5em] uppercase"
                                        style={{ color: 'var(--color-vault-gold)' }}
                                    >
                                        PLEASE WAIT...
                                    </span>
                                </div>
                                <span
                                    className="font-display text-[10px] tracking-[0.3em]"
                                    style={{ color: 'rgba(232,170,58,0.4)' }}
                                >
                                    {Math.round(progress)}%
                                </span>
                            </div>

                            {/* Loading bar */}
                            <div
                                className="w-full h-[3px]"
                                style={{ background: 'rgba(232,170,58,0.15)', border: '1px solid rgba(232,170,58,0.2)' }}
                            >
                                <motion.div
                                    className="h-full"
                                    style={{
                                        width: `${progress}%`,
                                        background: 'var(--color-vault-gold)',
                                        boxShadow: '0 0 8px rgba(232,170,58,0.6)',
                                        transition: 'width 0.03s linear',
                                    }}
                                />
                            </div>
                        </div>

                        {/* Bottom ruled line */}
                        <div
                            className="w-full h-[1px]"
                            style={{ background: 'linear-gradient(90deg, transparent, rgba(232,170,58,0.4) 30%, rgba(46,110,101,0.4) 70%, transparent)' }}
                        />

                        {/* Footer HUD */}
                        <div className="flex items-center justify-between">
                            <span className="font-display text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(46,110,101,0.6)' }}>
                                ■ VAULT-TEC SYSTEMS ONLINE
                            </span>
                            <span className="font-display text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(232,170,58,0.35)' }}>
                                PIP-BOY 3000 Mk IV
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}