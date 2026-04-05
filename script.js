// NAV
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ACTIVE NAV on scroll
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (scrollY >= s.offsetTop - 100) current = s.id; });
    navAs.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
});

// TYPING
const words = ['web applications.', 'clean interfaces.', 'smart solutions.', 'scalable systems.'];
let wi = 0, ci = 0, deleting = false;
const el = document.getElementById('typed');
function type() {
    const w = words[wi];
    el.textContent = deleting ? w.substring(0, ci--) : w.substring(0, ci++);
    if (!deleting && ci === w.length + 1) { deleting = true; setTimeout(type, 1200); return; }
    if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0; }
    setTimeout(type, deleting ? 45 : 90);
}
type();

// PROJECTS
const projects = [
    { icon: '🛒', title: 'Amazon Frontend Clone', desc: 'A pixel-perfect clone of the Amazon web interface, recreating the homepage, product listings, navigation bar, and cart UI. Built with pure HTML and CSS, focusing on layout precision and responsive design.', tech: ['HTML', 'CSS'] },
    { icon: '▶️', title: 'YouTube Frontend Clone', desc: 'A faithful recreation of the YouTube web interface including the homepage grid, sidebar navigation, video cards, and header with search bar. Demonstrates strong CSS Grid and Flexbox skills.', tech: ['HTML', 'CSS'] },
];

const grid = document.getElementById('projectsGrid');
projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <div class="project-icon">${p.icon}</div>
        <div class="project-title">${p.title}</div>
        <div class="project-desc">${p.desc}</div>
        <div class="tech-badges">${p.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}</div>
    `;
    grid.appendChild(card);
});

// CONTACT FORM
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const fb = document.getElementById('formFeedback');
    fb.textContent = '✓ Message sent! I\'ll get back to you soon.';
    this.reset();
    setTimeout(() => fb.textContent = '', 5000);
});

// FADE IN ON SCROLL
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .stat-card, .edu-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});