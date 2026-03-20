import { useState, useEffect, useRef } from 'react';
import luminaIcon from '../assets/Icon16x16.svg';

const skillCategories = [
    {
        id: 'frontend',
        title: 'Frontend Development',
        description: 'Crafting responsive, high-performance user interfaces with modern frameworks and pixel-perfect attention to detail.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
        ),
        skills: [
            { name: 'React', slug: 'react' },
            { name: 'Next.js', slug: 'nextjs' },
            { name: 'TypeScript', slug: 'typescript' },
            { name: 'JavaScript', slug: 'javascript' },
            { name: 'Tailwind CSS', slug: 'tailwindcss' },
            { name: 'HTML5', slug: 'html5' },
            { name: 'CSS3', slug: 'css3' }
        ]
    },
    {
        id: 'backend',
        title: 'Backend Architecture',
        description: 'Designing scalable server-side systems and robust APIs that power complex digital ecosystems.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
            </svg>
        ),
        skills: [
            { name: 'Lumina', slug: 'lumina' },
            { name: 'Node.js', slug: 'nodejs' },
            { name: 'Python', slug: 'python' },
            { name: 'Django', slug: 'django' },
            { name: 'GraphQL', slug: 'graphql' },
            { name: 'NestJS', slug: 'nestjs' }
        ]
    },
    {
        id: 'database',
        title: 'Data Management',
        description: 'Architecting efficient data structures and managing databases for reliability and lightning-fast retrieval.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
        ),
        skills: [
            { name: 'PostgreSQL', slug: 'postgresql' },
            { name: 'MySQL', slug: 'mysql' },
            { name: 'MongoDB', slug: 'mongodb' },
            { name: 'Redis', slug: 'redis' },
            { name: 'Firebase', slug: 'firebase' },
            { name: 'Prisma', slug: 'prisma' }
        ]
    },
    {
        id: 'devops',
        title: 'DevOps & Systems',
        description: 'Automating deployment pipelines and ensuring high availability through modern cloud infrastructure.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>
        ),
        skills: [
            { name: 'Docker', slug: 'docker' },
            { name: 'Kubernetes', slug: 'kubernetes' },
            { name: 'AWS', slug: 'amazonwebservices' },
            { name: 'Azure', slug: 'azure' },
            { name: 'Git', slug: 'git' },
            { name: 'Linux', slug: 'linux' },
            { name: 'GitHub', slug: 'github' }
        ]
    },
    {
        id: 'ai',
        title: 'AI & Intelligence',
        description: 'Integrating state-of-the-art Large Language Models and building AI-driven solutions for the next generation.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                <path d="M2 12h20"></path>
            </svg>
        ),
        skills: [
            { name: 'OpenAI', slug: 'openai' },
            { name: 'PyTorch', slug: 'pytorch' },
            { name: 'TensorFlow', slug: 'tensorflow' },
            { name: 'Pandas', slug: 'pandas' },
            { name: 'Numpy', slug: 'numpy' }
        ]
    }
];

const getIconUrl = (slug) => {
    if (slug === 'lumina') return luminaIcon;
    
    // Slugs for Devicon
    if (slug === 'nextjs') return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg';
    if (slug === 'express') return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg';
    if (slug === 'github') return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg';
    if (slug === 'openai') return 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/openai.svg';
    if (slug === 'prisma') return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg';
    
    // Django fix
    if (slug === 'django') return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg';
    if (slug === 'graphql') return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg';
    if (slug === 'amazonwebservices') return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg';
    
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`;
};

export default function Skills() {
    const [activeId, setActiveId] = useState('frontend');

    const selectedCategory = skillCategories.find(cat => cat.id === activeId);

    return (
        <section id="skills" className="skills-section">
            <div className="container">
                <div className="section-header text-center mb-16 reveal">
                    <h2 className="section-title">Technical Expertise</h2>
                    <p className="section-subtitle">A deep dive into the technologies I use to bridge the gap between imagination and digital reality.</p>
                </div>

                {/* Dashboard View (Desktop) */}
                <div className="skills-dashboard reveal">
                    <div className="skills-nav-sidebar">
                        {skillCategories.map((category) => (
                            <button
                                key={category.id}
                                className={`skill-nav-item ${activeId === category.id ? 'active' : ''}`}
                                onClick={() => setActiveId(category.id)}
                            >
                                <span className="nav-item-icon">{category.icon}</span>
                                <div className="nav-item-text">
                                    <h4>{category.title}</h4>
                                    <p>{category.skills.length} Skills</p>
                                </div>
                                <div className="nav-active-indicator"></div>
                            </button>
                        ))}
                    </div>

                    <div className="skills-preview-pane glass">
                        {selectedCategory && (
                            <div key={activeId} className="preview-content animate-fade-in">
                                <div className="preview-header">
                                    <div className="preview-icon-large">{selectedCategory.icon}</div>
                                    <div className="preview-title-group">
                                        <h3>{selectedCategory.title}</h3>
                                        <p>{selectedCategory.description}</p>
                                    </div>
                                </div>
                                
                                <div className="preview-body">
                                    <h4>Core Technologies</h4>
                                    <div className="skill-tags-grid">
                                        {selectedCategory.skills.map((skill, index) => (
                                            <div key={skill.name} className="skill-tag-premium animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                                                <img 
                                                    src={getIconUrl(skill.slug)} 
                                                    alt={skill.name} 
                                                    className="skill-logo"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'block';
                                                    }}
                                                />
                                                <span className="skill-dot" style={{ display: 'none' }}></span>
                                                {skill.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Accordion View (Mobile) */}
                <div className="skills-mobile-accordion reveal">
                    {skillCategories.map((category, index) => (
                        <div 
                            key={`mob-${category.id}`} 
                            className={`accordion-item ${activeId === category.id ? 'open' : ''} reveal-delay-${index + 1}`}
                        >
                            <button 
                                type="button"
                                className="accordion-header" 
                                onClick={() => setActiveId(activeId === category.id ? null : category.id)}
                            >
                                <div className="accordion-header-left">
                                    <span className="accordion-icon">{category.icon}</span>
                                    <h3>{category.title}</h3>
                                </div>
                                <span className="accordion-toggle">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </span>
                            </button>
                            <div className="accordion-content">
                                <div className="accordion-content-inner">
                                    <p className="mobile-cat-desc">{category.description}</p>
                                    <div className="skill-tags">
                                        {category.skills.map((skill) => (
                                            <div key={skill.name} className="skill-tag">
                                                <img src={getIconUrl(skill.slug)} alt={skill.name} className="skill-logo-small" />
                                                {skill.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
