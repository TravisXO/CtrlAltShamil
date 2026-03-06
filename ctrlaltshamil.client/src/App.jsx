/**
 * App.jsx  (UPDATED — SEO + Performance)
 * ─────────────────────────────────────────────────────────────────────────────
 * Changes:
 *   1. SEOHead + SchemaMarkup added per route
 *   2. Lazy loading for ProjectPage (code-splits it into a separate chunk)
 *   3. Suspense fallback for smooth lazy loading
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';            // ← ADD

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Project from './components/Project';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingOverlay from './components/LoadingOverlay';

// ── SEO imports ──────────────────────────────────────────────────────────────
import SEOHead from './components/SEOHead';
import SchemaMarkup from './components/SchemaMarkup';

// ── Lazy-load the heavy ProjectPage (Core Web Vitals — reduces initial bundle) ──
const ProjectPage = lazy(() => import('./pages/ProjectPage'));

// ── Minimal Suspense fallback — matches your Vault-Tec theme ─────────────────
function VaultLoader() {
    return (
        <div
            style={{
                minHeight: '100vh',
                background: '#070d0c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <span
                style={{
                    fontFamily: 'var(--font-display, monospace)',
                    fontSize: '11px',
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    color: 'rgba(232,170,58,0.6)',
                }}
            >
                LOADING ARCHIVE...
            </span>
        </div>
    );
}

function App() {
    return (
        <div className="relative min-h-screen">
            <LoadingOverlay />
            <Header />

            <main>
                <Routes>

                    {/* ── Home Route ──────────────────────────────────── */}
                    <Route path="/" element={
                        <>
                            {/* Per-page SEO for home */}
                            <SEOHead page="home" />
                            <SchemaMarkup page="home" />

                            <Hero />
                            <About />
                            <Project />
                            <Skills />
                            <Experience />
                            <Contact />
                        </>
                    } />

                    {/* ── Projects Archive Route ──────────────────────── */}
                    <Route path="/projects-archive" element={
                        <Suspense fallback={<VaultLoader />}>
                            {/* Per-page SEO for projects archive */}
                            <SEOHead page="projects" />
                            <SchemaMarkup page="projects" />

                            <ProjectPage />
                        </Suspense>
                    } />

                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;
