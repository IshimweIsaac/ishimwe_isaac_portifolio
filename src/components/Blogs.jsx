import { useEffect, useRef } from 'react';

const blogPosts = [
    {
        id: 1,
        title: "Building the Future with AI",
        date: "March 15, 2024",
        excerpt: "Exploring how generative AI is transforming the landscape of modern software development and what it means for engineers.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
        category: "AI & Tech"
    },
    {
        id: 2,
        title: "The Art of Clean Code",
        date: "Feb 28, 2024",
        excerpt: "Why readability matters more than cleverness. A guide to writing maintainable, scalable, and truly 'clean' codebases.",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop",
        category: "Development"
    },
    {
        id: 3,
        title: "Why React is Still King in 2024",
        date: "Jan 22, 2024",
        excerpt: "An in-depth look at the React ecosystem, Server Components, and why it remains the top choice for innovative web apps.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
        category: "Frontend"
    }
];

export default function Blogs() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        const reveals = sectionRef.current.querySelectorAll('.reveal');
        reveals.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section id="blogs" className="blogs-section" ref={sectionRef}>
            <div className="container">
                <div className="section-header reveal">
                    <h2 className="section-title">Latest Insights</h2>
                    <p className="section-subtitle">Thoughts on technology, design, and building premium digital experiences.</p>
                </div>

                <div className="blogs-grid">
                    {blogPosts.map((post, index) => (
                        <article key={post.id} className={`blog-card reveal reveal-delay-${index + 1}`}>
                            <div className="blog-image-container">
                                <img src={post.image} alt={post.title} className="blog-image" loading="lazy" />
                                <span className="blog-category">{post.category}</span>
                            </div>
                            <div className="blog-content">
                                <span className="blog-date">{post.date}</span>
                                <h3 className="blog-title">{post.title}</h3>
                                <p className="blog-excerpt">{post.excerpt}</p>
                                <a href="#" className="blog-link">
                                    Read More
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
