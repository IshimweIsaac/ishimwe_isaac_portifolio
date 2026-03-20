document.addEventListener('DOMContentLoaded', () => {

    // ── Typing Animation ──────────────────────────────
    const roles = ['Software Engineer', 'Full-Stack Developer', 'AI Engineer'];
    const typingEl = document.getElementById('typing-text');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseAfterType = 2000;
    const pauseAfterDelete = 500;

    function type() {
        const currentRole = roles[roleIndex];

        if (!isDeleting) {
            typingEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(type, pauseAfterType);
                return;
            }
            setTimeout(type, typeSpeed);
        } else {
            typingEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(type, pauseAfterDelete);
                return;
            }
            setTimeout(type, deleteSpeed);
        }
    }

    type();

    // ── Smooth Scroll ─────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ── Intersection Observer for Fade-in ─────────────
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Staggered fade-in for hero children
    const heroChildren = document.querySelectorAll('.headline, .sub-headline, .descriptionText, .cta-buttons, .stats-bar, .social-links');
    heroChildren.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`;
        observer.observe(el);
    });

    // ── Code Particle Effect on Photo Hover ────────────
    const canvas = document.getElementById('code-particles');
    const ctx = canvas.getContext('2d');
    const particles = [];
    let mouseX = 0, mouseY = 0;
    let isOverPhoto = false;
    let spawnTimer = 0;

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

    // Track mouse/touch over viewport
    function handlePointerMove(clientX, clientY) {
        if (window.innerWidth <= 768 || clientX < window.innerWidth * 0.6) {
            isOverPhoto = true;
            mouseX = clientX;
            mouseY = clientY;
        } else {
            isOverPhoto = false;
        }
    }

    document.addEventListener('mousemove', (e) => handlePointerMove(e.clientX, e.clientY));
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        }
    });
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
            handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        }
    });

    document.addEventListener('mouseleave', () => { isOverPhoto = false; });
    document.addEventListener('touchend', () => { isOverPhoto = false; });

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

        // Spawn particles when hovering
        if (isOverPhoto) {
            spawnTimer++;
            if (spawnTimer % 3 === 0) {  // spawn every 3 frames
                spawnParticle();
            }
        }

        // Update and draw particles
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

        requestAnimationFrame(animateParticles);
    }
    animateParticles();


    // ── Navbar scroll effect ──────────────────────────
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.style.background = 'rgba(10, 12, 16, 0.7)';
            navbar.style.backdropFilter = 'blur(12px)';
            navbar.style.borderRadius = '0';
            navbar.style.top = '0';
            navbar.style.width = '100%';
            navbar.style.maxWidth = '100%';
            navbar.style.padding = '0 5%';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.top = '20px';
            navbar.style.width = '92%';
            navbar.style.maxWidth = '1200px';
            navbar.style.padding = '0 8px';
        }
    });

    // ── Fade-in style ─────────────────────────────────
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    // ── Mobile Sidebar Toggle ─────────────────────────
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-links a');

    function toggleSidebar() {
        if (!menuToggle || !sidebar || !overlay) return;
        menuToggle.classList.toggle('active');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }

    if (overlay) {
        overlay.addEventListener('click', toggleSidebar);
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sidebar && sidebar.classList.contains('active')) {
                toggleSidebar();
            }
        });
    });

    // ── Scroll Reveal Animations ──────────────────────
    const revealElements = document.querySelectorAll('.reveal, .reveal-delay-1, .reveal-delay-2, .reveal-delay-3');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // ── Tab Auto-Cycling Logic ─────────────────────────
    const tabBtns = document.querySelectorAll('.tab-btn');
    if (tabBtns.length > 0) {
        let currentTabIndex = 0;
        let tabCycleInterval;

        const cycleTabs = () => {
            currentTabIndex = (currentTabIndex + 1) % tabBtns.length;
            tabBtns[currentTabIndex].click();
        };

        // Start cycling
        tabCycleInterval = setInterval(cycleTabs, 4000);

        // Optional: stop auto-cycling if user manually interacts with tabs
        document.querySelector('.skills-tabs').addEventListener('click', (e) => {
            if (e.isTrusted) { // Only clear if it was an actual user click
                clearInterval(tabCycleInterval);
            }
        });
    }
});

// Global function to toggle project menus
window.toggleProjectMenu = function (button) {
    const dropdown = button.nextElementSibling;
    dropdown.classList.toggle('active');

    // Close when clicking outside
    const closeDropdown = (e) => {
        if (!button.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
            document.removeEventListener('click', closeDropdown);
        }
    };

    // Attach listener on next tick to avoid immediate trigger
    setTimeout(() => {
        if (dropdown.classList.contains('active')) {
            document.addEventListener('click', closeDropdown);
        }
    }, 0);
};

// Global function to handle Skills Tab switching
window.openTab = function (evt, tabName) {
    // Hide all tab content
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }

    // Remove active class from all tab buttons
    const tabBtns = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabBtns.length; i++) {
        tabBtns[i].classList.remove("active");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).classList.add("active");

    // Only add active to the target if evt exists (might be called programmatically)
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add("active");
    } else if (evt && evt.target) {
        evt.target.classList.add("active");
    }
};

// ── IDE Typing Animation ──────────────────────
const ideSnippets = [
    {
        title: "ishimwe_isaac — bash — node server.js — 80x24",
        code: `
<div class="ide-prompt"><span class="prompt-arrow">➜</span> <span class="prompt-dir">~/portfolio</span> npx ts-node src/system-architect.ts</div>
<span class="keyword">import</span> { <span class="type">Logger</span> } <span class="keyword">from</span> <span class="string">'@api/utils'</span>;
<span class="keyword">import</span> { <span class="variable">db</span> } <span class="keyword">from</span> <span class="string">'@db/client'</span>;

<span class="keyword">class</span> <span class="type">SystemArchitect</span> {
    <span class="keyword">private readonly</span> role = <span class="string">"Full-stack engineer"</span>;
    <span class="keyword">private readonly</span> focus = [<span class="string">"Scalability"</span>, <span class="string">"Reliability"</span>, <span class="string">"AI-Integration"</span>];

    <span class="keyword">async</span> <span class="function">handleProductionLoad</span>(<span class="variable">req</span>: <span class="type">Request</span>): <span class="type">Promise</span>&#60;<span class="type">Response</span>&#62; {
        <span class="comment">// Optimize for observability before performance</span>
        <span class="type">Logger</span>.<span class="function">info</span>(<span class="string">\`Processing request\`</span>, { traceId: <span class="variable">req</span>.headers[<span class="string">'x-trace-id'</span>] });

        <span class="keyword">try</span> {
            <span class="comment">// Start simple, scale when evidence demands it</span>
            <span class="keyword">const</span> data = <span class="keyword">await</span> <span class="variable">db</span>.<span class="function">query</span>(<span class="string">'SELECT * FROM active_systems LIMIT 100'</span>);
            
            <span class="comment">// Reliability and clarity beat cleverness</span>
            <span class="keyword">return</span> <span class="type">Response</span>.<span class="function">json</span>({ status: <span class="string">'healthy'</span>, data });
        } <span class="keyword">catch</span> (<span class="variable">error</span>) {
            <span class="type">Logger</span>.<span class="function">error</span>(<span class="string">'System failure'</span>, { <span class="variable">error</span> });
            <span class="keyword">throw new</span> <span class="type">SystemError</span>(<span class="string">'Fallback engaged'</span>);
        }
    }
}
<p class="ide-text output mt-4">[INFO] SystemArchitect initialized perfectly.</p>
`
    },
    {
        title: "ishimwe_isaac — python — main.py — 80x24",
        code: `
<div class="ide-prompt"><span class="prompt-arrow">➜</span> <span class="prompt-dir">~/portfolio</span> uvicorn main:app --reload</div>
<span class="keyword">from</span> fastapi <span class="keyword">import</span> FastAPI, Depends, HTTPException
<span class="keyword">import</span> logging
<span class="keyword">from</span> pydantic <span class="keyword">import</span> BaseModel

<span class="variable">app</span> = <span class="type">FastAPI</span>(title=<span class="string">"Isaac's Portfolio API"</span>)
<span class="variable">logger</span> = logging.<span class="function">getLogger</span>(<span class="string">"production_monitor"</span>)

<span class="keyword">class</span> <span class="type">ArchitectureDocs</span>(<span class="type">BaseModel</span>):
    <span class="variable">principles</span>: <span class="type">list</span>[<span class="type">str</span>]
    <span class="variable">tech_stack</span>: <span class="type">dict</span>

<span class="type">@app</span>.<span class="function">get</span>(<span class="string">"/api/v1/system/philosophy"</span>, response_model=<span class="type">ArchitectureDocs</span>)
<span class="keyword">async def</span> <span class="function">get_system_philosophy</span>():
    <span class="comment"># Prefer type-safety and structured data for resilience</span>
    <span class="keyword">try</span>:
        <span class="keyword">return</span> <span class="type">ArchitectureDocs</span>(
            principles=[
                <span class="string">"Start simple, scale when evidence demands it"</span>,
                <span class="string">"Proven technology unless complexity is justified"</span>,
                <span class="string">"Reliability and clarity beat cleverness"</span>
            ],
            tech_stack={<span class="string">"backend"</span>: <span class="string">"Django/FastAPI"</span>, <span class="string">"frontend"</span>: <span class="string">"React/TS"</span>}
        )
    <span class="keyword">except</span> <span class="type">Exception</span> <span class="keyword">as</span> e:
        <span class="variable">logger</span>.<span class="function">error</span>(<span class="string">f"Failed to generate philosophy: {e}"</span>)
        <span class="keyword">raise</span> <span class="type">HTTPException</span>(status_code=500, detail=<span class="string">"Observability first"</span>)
<p class="ide-text output mt-4">INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)</p>
`
    },
    {
        title: "ishimwe_isaac — go run main.go — 80x24",
        code: `
<div class="ide-prompt"><span class="prompt-arrow">➜</span> <span class="prompt-dir">~/portfolio</span> go run cmd/api/main.go</div>
<span class="keyword">package</span> main

<span class="keyword">import</span> (
    <span class="string">"context"</span>
    <span class="string">"log"</span>
    <span class="string">"time"</span>
)

<span class="keyword">type</span> <span class="type">Engineer</span> <span class="keyword">struct</span> {
    <span class="variable">Name</span>  <span class="type">string</span>
    <span class="variable">Focus</span> []<span class="type">string</span>
}

<span class="comment">// executeSystemDesign implements my core philosophy</span>
<span class="keyword">func</span> (<span class="variable">e</span> *<span class="type">Engineer</span>) <span class="function">executeSystemDesign</span>(<span class="variable">ctx</span> <span class="type">context.Context</span>) <span class="type">error</span> {
    <span class="comment">// Start simple, scale when evidence demands it</span>
    <span class="variable">timeoutCtx</span>, <span class="variable">cancel</span> := context.<span class="function">WithTimeout</span>(<span class="variable">ctx</span>, 5*time.<span class="function">Second</span>)
    <span class="keyword">defer</span> <span class="function">cancel</span>()

    <span class="comment">// Reliability and clarity beat cleverness</span>
    log.<span class="function">Printf</span>(<span class="string">"Initializing %s's system architectures..."</span>, <span class="variable">e.Name</span>)

    <span class="keyword">select</span> {
    <span class="keyword">case</span> <-time.<span class="function">After</span>(1 * time.<span class="function">Second</span>):
        log.<span class="function">Println</span>(<span class="string">"SYSTEM HEALTHY: Observability before performance."</span>)
        <span class="keyword">return nil</span>
    <span class="keyword">case</span> <-<span class="variable">timeoutCtx</span>.<span class="function">Done</span>():
        log.<span class="function">Fatalf</span>(<span class="string">"TIMEOUT: Prefer type-safety and structured data."</span>)
        <span class="keyword">return</span> <span class="variable">timeoutCtx</span>.<span class="function">Err</span>()
    }
}
<p class="ide-text output mt-4">2026/03/09 17:35:12 Initializing Ishimwe Isaac's system architectures...<br>2026/03/09 17:35:13 SYSTEM HEALTHY: Observability before performance.</p>
`
    },
    {
        title: "ishimwe_isaac — psql — 80x24",
        code: `
<div class="ide-prompt"><span class="prompt-arrow">➜</span> <span class="prompt-dir">~/portfolio</span> psql -U admin -d portfolio_db</div>
<span class="comment">-- Use proven technology unless complexity is justified</span>
<span class="keyword">WITH</span> <span class="type">production_metrics</span> <span class="keyword">AS</span> (
    <span class="keyword">SELECT</span> 
        <span class="variable">e</span>.engineer_id,
        <span class="variable">e</span>.specialty,
        <span class="function">COUNT</span>(<span class="variable">s</span>.incident_id) <span class="keyword">as</span> <span class="variable">active_incidents</span>
    <span class="keyword">FROM</span> <span class="type">engineers</span> <span class="variable">e</span>
    <span class="keyword">LEFT JOIN</span> <span class="type">systems</span> <span class="variable">s</span> <span class="keyword">ON</span> <span class="variable">e</span>.id = <span class="variable">s</span>.owner_id
    <span class="keyword">WHERE</span> <span class="variable">e</span>.name = <span class="string">'Ishimwe Isaac'</span>
    <span class="keyword">GROUP BY</span> <span class="variable">e</span>.engineer_id, <span class="variable">e</span>.specialty
)
<span class="comment">-- Reliability and clarity beat cleverness</span>
<span class="keyword">SELECT</span> 
    <span class="variable">specialty</span> <span class="keyword">AS</span> <span class="string">"Full-Stack AI Integrator"</span>,
    <span class="keyword">CASE</span> 
        <span class="keyword">WHEN</span> <span class="variable">active_incidents</span> = 0 <span class="keyword">THEN</span> <span class="string">'System Highly Reliable'</span>
        <span class="keyword">ELSE</span> <span class="string">'Scaling required'</span>
    <span class="keyword">END AS</span> <span class="variable">system_status</span>
<span class="keyword">FROM</span> <span class="type">production_metrics</span>;

<p class="ide-text output mt-4"> Full-Stack AI Integrator |     system_status      <br>--------------------------+------------------------<br> Backend & Integration    | System Highly Reliable <br>(1 row)</p>
`
    }
];

async function runIdeAnimation() {
    const titleEl = document.getElementById('ide-title');
    const contentEl = document.getElementById('ide-content-container');

    if (!titleEl || !contentEl) return;

    let currentIndex = 0;

    while (true) {
        const snippet = ideSnippets[currentIndex];
        titleEl.textContent = snippet.title;
        contentEl.innerHTML = '';

        let htmlText = snippet.code.trim();
        let currentHTML = "";
        let isTag = false;

        // Fast typing speed
        const baseSpeed = 8;

        for (let i = 0; i < htmlText.length; i++) {
            let char = htmlText.charAt(i);

            if (char === '<') isTag = true;

            currentHTML += char;

            if (char === '>') {
                isTag = false;
                continue; // don't pause after a tag finishes
            }

            if (!isTag && char.trim() !== '') {
                // Only update DOM and pause if we are typing visible characters
                contentEl.innerHTML = currentHTML + '<span class="blink-cursor">_</span>';
                await new Promise(r => setTimeout(r, baseSpeed + Math.random() * 10));
            }
        }

        // Finish block without cursor in the middle of flow, append a final prompt line
        contentEl.innerHTML = currentHTML + '<div class="ide-prompt mt-4"><span class="prompt-arrow">➜</span> <span class="prompt-dir">~</span> <span class="blink-cursor">_</span></div>';

        // Wait 5 seconds before switching language
        await new Promise(r => setTimeout(r, 6000));

        // Clear screen quickly before next language
        contentEl.innerHTML = '<div class="ide-prompt"><span class="prompt-arrow">➜</span> <span class="prompt-dir">~</span> <span class="blink-cursor">_</span></div>';
        await new Promise(r => setTimeout(r, 300));

        currentIndex = (currentIndex + 1) % ideSnippets.length;
    }
}

// Start animation on load
document.addEventListener('DOMContentLoaded', () => {
    // Only start if the element exists and we have an IntersectionObserver to start it when visible
    const ideWindow = document.querySelector('.ide-window');
    if (ideWindow) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                runIdeAnimation();
                observer.disconnect();
            }
        }, { threshold: 0.2 });
        observer.observe(ideWindow);
    }
});
