import { useState, useEffect, useRef } from 'react';

function ProjectCard({ project }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        if (menuOpen) {
            document.addEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <div className="project-card fade-in">
            <div className="project-image">
                <img src={project.image} alt={project.title} />
            </div>
            <div className="project-info">
                <div className="project-menu-container" ref={menuRef}>
                    <button 
                        className="project-menu-btn" 
                        aria-label="Project Options"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                    </button>
                    <div className={`project-dropdown ${menuOpen ? 'active' : ''}`}>
                        <button className="dropdown-item" onClick={() => alert(`Project Description: ${project.description}`)}>
                            Project Description
                        </button>
                        <button className="dropdown-item" onClick={() => {
                            navigator.clipboard.writeText(project.link).then(() => alert('Project link copied to clipboard!'));
                        }}>
                            Share Project
                        </button>
                        <a href={project.sourceLink} target="_blank" rel="noopener noreferrer" className="dropdown-item">
                            Read Source Code
                        </a>
                    </div>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="tech-stack" style={{ marginBottom: '24px' }}>
                    {project.tech.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                    ))}
                </div>

                <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-light-blue" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                    Checkout Platform
                </a>
            </div>
        </div>
    );
}

export default function Projects() {
    const projectsData = [
        {
            title: 'Urukari: Chatbot OS',
            description: 'A modern, intuitive Chatbot Operating System allowing users to seamlessly interact with AI. Features a clean interface with chat history, an app ecosystem context, and comprehensive community tools.',
            image: '/urukari.png',
            tech: ['React', 'Node.js', 'TailwindCSS', 'AI / LLMs'],
            link: 'https://urukari.web.app',
            sourceLink: 'https://github.com/bodyempire/ishimwe_isaac_portifolio'
        }
    ];

    return (
        <section id="projects" className="projects-section">
            <div className="container">
                <h2 className="section-title">Featured Projects</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: '1.6' }}>
                    Here are some of my recent works. This section slides gracefully over the hero area as you scroll down, creating a seamlessly layered page effect.
                </p>

                <div className="projects-grid">
                    {projectsData.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}
