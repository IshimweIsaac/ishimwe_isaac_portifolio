import { useEffect } from 'react';

export function useReveal() {
    useEffect(() => {
        const revealElements = document.querySelectorAll('.reveal, .reveal-delay-1, .reveal-delay-2, .reveal-delay-3');
        const revealOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        revealElements.forEach(el => revealObserver.observe(el));

        return () => {
            revealObserver.disconnect();
        };
    }, []);
}
