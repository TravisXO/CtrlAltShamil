/**
 * vite.config.js  (UPDATED — Performance / Core Web Vitals)
 * ─────────────────────────────────────────────────────────────────────────────
 * Changes from original:
 *   1. Manual chunk splitting — vendor libs separated from app code
 *   2. Chunk size warnings raised (framer-motion is large by design)
 *   3. CSS code splitting enabled
 *   4. Source maps off in production (smaller build)
 *   5. Asset file name hashing for cache busting
 * ─────────────────────────────────────────────────────────────────────────────
 */
/* eslint-disable */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

const target = 'https://localhost:7163';

function getHttpsConfig() {
    const baseFolder =
        process.env.APPDATA
            ? path.join(process.env.APPDATA, 'ASP.NET', 'https')
            : path.join(process.env.HOME, '.aspnet', 'https');

    const certName = 'ctrlaltshamil.client';
    const certFile = path.join(baseFolder, `${certName}.pem`);
    const keyFile = path.join(baseFolder, `${certName}.key`);

    if (!fs.existsSync(certFile) || !fs.existsSync(keyFile)) {
        console.warn(
            '\n⚠️  HTTPS certs not found. Run this command, then restart:\n' +
            `   dotnet dev-certs https --export-path "${certFile}" --format Pem --no-password\n`
        );
        return undefined;
    }

    return {
        key: fs.readFileSync(keyFile),
        cert: fs.readFileSync(certFile),
    };
}

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],

    // ── Development server ─────────────────────────────────────────────────
    server: {
        port: 5173,
        https: getHttpsConfig(),
        proxy: {
            '/api': {
                target,
                secure: false,
                changeOrigin: true,
            },
            '/sitemap.xml': {        // ← ADD
                target,
                secure: false,
            },
            '/robots.txt': {         // ← ADD
                target,
                secure: false,
            },
        },
    },

    // ── Production build optimisations ────────────────────────────────────
    build: {
        // Raise warning threshold — framer-motion alone is ~150 kB gzipped
        chunkSizeWarningLimit: 600,

        // CSS splitting: each lazy chunk gets its own CSS (better caching)
        cssCodeSplit: true,

        // No source maps in production (smaller payload)
        sourcemap: false,

        rollupOptions: {
            output: {
                // ── Manual chunks: isolate stable vendor libs for long-term caching ──
                manualChunks(id) {
                    // React core
                    if (id.includes('node_modules/react') ||
                        id.includes('node_modules/react-dom') ||
                        id.includes('node_modules/scheduler')) {
                        return 'vendor-react';
                    }
                    // Router
                    if (id.includes('node_modules/react-router')) {
                        return 'vendor-router';
                    }
                    // Framer Motion (large — give it its own chunk)
                    if (id.includes('node_modules/framer-motion')) {
                        return 'vendor-framer';
                    }
                    // Helmet (small but keep with other meta libs)
                    if (id.includes('node_modules/react-helmet-async')) {
                        return 'vendor-seo';
                    }
                    // Everything else from node_modules
                    if (id.includes('node_modules')) {
                        return 'vendor-misc';
                    }
                },

                // Hashed filenames for cache busting
                entryFileNames: 'assets/[name]-[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]',
            },
        },

        // Minify with esbuild (default, fastest)
        minify: 'esbuild',

        // Target modern browsers (smaller output, better tree-shaking)
        target: ['es2020', 'chrome80', 'firefox80', 'safari14'],
    },
});
