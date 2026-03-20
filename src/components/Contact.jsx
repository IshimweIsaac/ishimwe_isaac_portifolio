import { useEffect, useRef } from 'react';

export default function Contact() {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        alert("Thank you! I'll get back to you soon.");
    };

    return (
        <section id="contact" className="contact-section" ref={sectionRef}>
            <div className="container">
                <div className="section-header reveal">
                    <h2 className="section-title">Get in Touch</h2>
                    <p className="section-subtitle">Have a project in mind or just want to chat? I'm always open to new opportunities.</p>
                </div>

                <div className="contact-grid">
                    {/* Left: Contact Form */}
                    <div className="contact-form-container reveal reveal-delay-1">
                        <form className="contact-form glass" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input type="text" id="name" placeholder="John Doe" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email" id="email" placeholder="john@example.com" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" rows="5" placeholder="How can I help you?" required></textarea>
                            </div>
                            <button type="submit" className="submit-btn gradient-btn">
                                Send Message
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </form>
                    </div>

                    {/* Right: Contact Info */}
                    <div className="contact-info reveal reveal-delay-2">
                        <div className="info-card glass">
                            <div className="info-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </div>
                            <div className="info-text">
                                <h3>Email</h3>
                                <p>ishimweisaac123@gmail.com</p>
                            </div>
                        </div>

                        <div className="info-card glass">
                            <div className="info-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                            </div>
                            <div className="info-text">
                                <h3>Location</h3>
                                <p>Kigali, Rwanda</p>
                            </div>
                        </div>

                        <a href="https://www.linkedin.com/in/ishimwe-isaac/" target="_blank" rel="noopener noreferrer" className="info-card glass" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="info-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </div>
                            <div className="info-text">
                                <h3>LinkedIn</h3>
                                <p>ishimwe-isaac</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
