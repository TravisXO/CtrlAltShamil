import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ProjectsGrid from '../components/ProjectsGrid';
import ProjectDetails from '../components/ProjectDetails';

// Mirrors the projects list so we can look up a full project object by id
const projects = [
    {
        id: '01', title: 'BNOP Media', subtitle: 'Website Mock-up', type: 'ASP.NET 8 MVC',
        tag: 'WEB_APP', status: 'DEPLOYED', impact: 'Sub-2s load time · 95+ Lighthouse',
        stack: ['ASP.NET 8', 'MVC', 'EF Core', 'SQL Server', 'C#'], github: '#', live: '#',
    },
    {
        id: '02', title: 'SEO Canonical Auditor', subtitle: 'Audit Tool', type: 'ASP.NET 8 MVC',
        tag: 'TOOL', status: 'ACTIVE', impact: 'Detects duplicate content & tag conflicts',
        stack: ['ASP.NET 8', 'C#', 'HTML Agility Pack', 'SEO Logic', 'Automation'], github: '#', live: '#',
    },
    {
        id: '03', title: 'Classic Zambia Safaris', subtitle: 'SEO Growth Campaign', type: 'Technical SEO',
        tag: 'SEO', status: 'LIVE', impact: '+217% Organic Traffic · #1 Rankings US/UK/AU',
        stack: ['Technical SEO', 'Schema Markup', 'Core Web Vitals', 'GSC', 'Analytics'], github: null, live: '#',
    },
    {
        id: '04', title: 'Ctrl Alt Shamil', subtitle: 'Portfolio', type: 'React + ASP.NET Core',
        tag: 'FULL_STACK', status: 'IN PROGRESS', impact: 'Vault-Tec design system · Full-stack SPA',
        stack: ['React 19', 'ASP.NET Core', 'Vite', 'Tailwind v4', 'Framer Motion'], github: '#', live: '#',
    },
];

export default function ProjectPage() {
    const location = useLocation();
    const [selectedProject, setSelectedProject] = useState(null);

    // On mount (or when navigated to with state), auto-open the right project
    useEffect(() => {
        const incomingId = location.state?.openProjectId;
        if (incomingId) {
            const match = projects.find(p => p.id === incomingId);
            if (match) setSelectedProject(match);
        }
    }, [location.state]);

    const handleSelect = (project) => {
        setSelectedProject(prev => prev?.id === project.id ? null : project);
    };

    const handleClose = () => setSelectedProject(null);

    return (
        <main className="relative min-h-screen bg-[#070d0c] pt-20">
            {/* ── Page Header Readout ── */}
            <header className="relative z-[100] max-w-[1400px] mx-auto px-6 lg:px-12 pt-10">
                <div className="flex items-center gap-4 mb-2">
                    <span className="font-display text-[10px] tracking-[0.4em] text-[var(--color-vault-gold)]">
                        ■ DIRECTORY: /ARCHIVE/PROJECTS
                    </span>
                    <div className="h-[1px] flex-grow bg-[rgba(232,170,58,0.2)]" />
                </div>
            </header>

            {/* Project Grid */}
            <ProjectsGrid
                onSelect={handleSelect}
                selectedId={selectedProject?.id}
            />

            {/* Project Details — renders below grid on selection */}
            <AnimatePresence mode="wait">
                {selectedProject && (
                    <ProjectDetails
                        key={selectedProject.id}
                        project={selectedProject}
                        onClose={handleClose}
                    />
                )}
            </AnimatePresence>
        </main>
    );
}