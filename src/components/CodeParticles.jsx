import { useEffect, useRef } from 'react';

export default function CodeParticles() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const particles = [];
        let mouseX = 0, mouseY = 0;
        let isOverPhoto = false;
        let spawnTimer = 0;
        let animationFrameId;

        const codeTokens = [
            '{', '}', '()', '=>', '</>', 'const', 'let', 'fn', 'async',
            '[ ]', '&&', '||', '++', '/**/', 'import', '===', 'return',
            '::', '0x', 'true', 'null', '<T>', '...', '?.', 'await'
        ];
        const colors = ['#c792ea', '#82aaff', '#c3e88d', '#f78c6c', '#89ddff', '#ffcb6b'];

        function resizeCanvas() {
            if (window.innerWidth <= 768) {
                canvas.width = window.innerWidth;
            } else {
                canvas.width = window.innerWidth * 0.6;
            }
            canvas.height = window.innerHeight;
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        function handlePointerMove(clientX, clientY) {
            if (window.innerWidth <= 768 || clientX < window.innerWidth * 0.6) {
                isOverPhoto = true;
                mouseX = clientX;
                mouseY = clientY;
            } else {
                isOverPhoto = false;
            }
        }

        const onMouseMove = (e) => handlePointerMove(e.clientX, e.clientY);
        const onTouchMove = (e) => {
            if (e.touches.length > 0) handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        };
        const onTouchStart = (e) => {
            if (e.touches.length > 0) handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        };
        const onLeave = () => { isOverPhoto = false; };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchstart', onTouchStart);
        document.addEventListener('mouseleave', onLeave);
        document.addEventListener('touchend', onLeave);

        function spawnParticle() {
            const token = codeTokens[Math.floor(Math.random() * codeTokens.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.4 + Math.random() * 1.2;

            particles.push({
                x: mouseX,
                y: mouseY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 0.3,
                text: token,
                color: color,
                alpha: 0.9,
                size: 10 + Math.random() * 4,
                life: 1,
                decay: 0.006 + Math.random() * 0.008,
                rotation: (Math.random() - 0.5) * 0.4,
                rotationSpeed: (Math.random() - 0.5) * 0.02,
            });
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (isOverPhoto) {
                spawnTimer++;
                if (spawnTimer % 3 === 0) {
                    spawnParticle();
                }
            }

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life -= p.decay;
                p.rotation += p.rotationSpeed;

                if (p.life <= 0) {
                    particles.splice(i, 1);
                    continue;
                }

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.font = `${p.size}px 'Courier New', monospace`;
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life * 0.7;
                ctx.fillText(p.text, 0, 0);
                ctx.restore();
            }

            animationFrameId = requestAnimationFrame(animateParticles);
        }
        
        animateParticles();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchstart', onTouchStart);
            document.removeEventListener('mouseleave', onLeave);
            document.removeEventListener('touchend', onLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas id="code-particles" ref={canvasRef} className="code-particles-canvas"></canvas>;
}
