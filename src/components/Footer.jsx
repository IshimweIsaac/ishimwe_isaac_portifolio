export default function Footer() {
    return (
        <footer className="footer-v2">
            <div className="footer-glow"></div>
            <div className="container">
                <div className="footer-cta">
                    <h2 className="footer-cta-title">Ready to build something <span className="gradient-text">extraordinary?</span></h2>
                    <p className="footer-cta-subtitle">Let's collaborate and turn your vision into a digital reality.</p>
                    <a href="#contact" className="btn btn-primary">Start a Conversation</a>
                </div>

                <div className="footer-content">
                    <div className="footer-brand">
                        <a href="#" className="footer-logo">Ishimwe Isaac.</a>
                        <p>A passionate developer dedicated to crafting premium, high-performance digital experiences that leave a lasting impression.</p>
                    </div>
                    
                    <div className="footer-links-group">
                        <div className="footer-nav">
                            <h4>Explore</h4>
                            <ul>
                                <li><a href="#projects">Projects</a></li>
                                <li><a href="#skills">Skills</a></li>
                                <li><a href="#blogs">Insights</a></li>
                            </ul>
                        </div>

                        <div className="footer-nav">
                            <h4>Connect</h4>
                            <ul>
                                <li><a href="https://github.com/IshimweIsaac" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                                <li><a href="https://www.linkedin.com/in/ishimwe-isaac/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                                <li><a href="#contact">Contact Me</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <div className="footer-copyright">
                        <p>&copy; {new Date().getFullYear()} Ishimwe Isaac. Designed & Built with passion.</p>
                    </div>
                    <button className="back-to-top" aria-label="Back to Top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
        </footer>
    );
}
