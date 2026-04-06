// NAVIGATION MENU
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// ACTIVE NAV LINK ON SCROLL
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href').substring(1);
        if (href === current) {
            item.classList.add('active');
        }
    });
});

// TYPING ANIMATION
const words = ['web applications.', 'clean interfaces.', 'smart solutions.', 'scalable systems.'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedElement = document.getElementById('typed');

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typedElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 100);
        return;
    }
    
    const speed = isDeleting ? 45 : 90;
    setTimeout(typeEffect, speed);
}

typeEffect();

// PROJECT DATA with GitHub Links
const projects = [
    {
        icon: '🛒',
        title: 'Amazon Frontend Clone',
        desc: 'A pixel-perfect clone of the Amazon web interface, recreating the homepage, product listings, navigation bar, and cart UI with interactive add-to-cart functionality. Built with HTML, CSS, and JavaScript.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        githubUrl: 'https://github.com/SeneshkaR/amazon-project',
        liveUrl: null // No live demo yet
    },
    {
        icon: '▶️',
        title: 'YouTube Frontend Clone',
        desc: 'A faithful recreation of the YouTube web interface including the homepage grid, sidebar navigation, video cards, and header with search bar. Demonstrates strong CSS Grid and Flexbox skills. Built for SESA Mentorship Task 01.',
        tech: ['HTML', 'CSS'],
        githubUrl: 'https://github.com/SeneshkaR/youtube-frontend-clone',
        liveUrl: null // Add live demo URL if available
    },
    {
        icon: '🎬',
        title: 'Netflix Landing Page',
        desc: 'Responsive Netflix landing page clone with hero section, content rows, and hover effects. Built to practice modern CSS techniques and layout patterns.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        githubUrl: null,
        liveUrl: null
    },
    {
        icon: '✅',
        title: 'Task Manager App',
        desc: 'A feature-rich task management application with add, edit, delete, and filter functionalities. Uses local storage to persist user data.',
        tech: ['JavaScript', 'HTML', 'CSS'],
        githubUrl: null,
        liveUrl: null
    }
];

// RENDER PROJECTS with GitHub Links
const projectsGrid = document.getElementById('projectsGrid');

if (projectsGrid) {
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        const techBadges = project.tech.map(tech => 
            `<span class="tech-badge">${tech}</span>`
        ).join('');
        
        // Create buttons HTML based on available URLs
        let buttonsHtml = '';
        if (project.githubUrl) {
            buttonsHtml += `<a href="${project.githubUrl}" target="_blank" class="project-link-btn github-btn">🐙 GitHub</a>`;
        }
        if (project.liveUrl) {
            buttonsHtml += `<a href="${project.liveUrl}" target="_blank" class="project-link-btn live-btn">🔗 Live Demo</a>`;
        }
        
        projectCard.innerHTML = `
            <div class="project-icon">${project.icon}</div>
            <div class="project-title">${project.title}</div>
            <div class="project-desc">${project.desc}</div>
            <div class="tech-badges">${techBadges}</div>
            ${buttonsHtml ? `<div class="project-links">${buttonsHtml}</div>` : ''}
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}
// CONTACT FORM HANDLING
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        if (!name || !email || !message) {
            formFeedback.textContent = '⚠️ Please fill in all fields.';
            formFeedback.style.color = '#e74c3c';
            setTimeout(() => {
                formFeedback.textContent = '';
                formFeedback.style.color = '';
            }, 3000);
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formFeedback.textContent = '⚠️ Please enter a valid email address.';
            formFeedback.style.color = '#e74c3c';
            setTimeout(() => {
                formFeedback.textContent = '';
                formFeedback.style.color = '';
            }, 3000);
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call (replace with actual backend integration)
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Store in localStorage for demo (optional)
            const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            messages.push({ name, email, message, date: new Date().toISOString() });
            localStorage.setItem('contactMessages', JSON.stringify(messages));
            
            // Show success message
            formFeedback.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
            formFeedback.style.color = '#1D9E75';
            
            // Reset form
            contactForm.reset();
            
            setTimeout(() => {
                formFeedback.textContent = '';
                formFeedback.style.color = '';
            }, 5000);
            
        } catch (error) {
            formFeedback.textContent = '❌ Something went wrong. Please try again later.';
            formFeedback.style.color = '#e74c3c';
            setTimeout(() => {
                formFeedback.textContent = '';
                formFeedback.style.color = '';
            }, 3000);
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// SCROLL REVEAL ANIMATION
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
const animateElements = document.querySelectorAll('.project-card, .stat-card, .edu-card, .about-text, .contact-info, .contact-form');

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// SMOOTH SCROLLING FOR NAVIGATION LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// DOWNLOAD CV FUNCTIONALITY - Downloads Word Document
const downloadBtn = document.getElementById('downloadCV');

if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Path to your CV file
        const cvFilePath = 'CV.docx';
        const fileName = 'Seneshka_Randilini_CV.docx';
        
        // Show loading state
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '📄 Downloading...';
        downloadBtn.style.opacity = '0.7';
        
        // Create a temporary anchor element to trigger download
        const link = document.createElement('a');
        link.href = cvFilePath;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success message
        setTimeout(() => {
            downloadBtn.innerHTML = originalText;
            downloadBtn.style.opacity = '1';
            
            // Show feedback notification
            showNotification('✓ CV download started! Check your downloads folder.', '#1D9E75');
        }, 500);
    });
}

// Helper function to show beautiful notifications
function showNotification(message, color) {
    // Remove any existing notification
    const existingNotification = document.querySelector('.cv-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cv-notification';
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 20px;">📄</span>
            <span>${message}</span>
        </div>
    `;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${color};
        color: white;
        padding: 12px 20px;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease;
        font-family: 'DM Sans', sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// NAVBAR BACKGROUND CHANGE ON SCROLL
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        nav.style.background = 'rgba(10,15,14,0.95)';
        nav.style.backdropFilter = 'blur(20px)';
    } else {
        nav.style.background = 'rgba(10,15,14,0.7)';
        nav.style.backdropFilter = 'blur(20px)';
    }
    
    lastScroll = currentScroll;
});

// ADD HOVER EFFECT TO SOCIAL LINKS (optional)
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// CONSOLE WELCOME MESSAGE
console.log('%c👋 Welcome to Seneshka\'s Portfolio!', 'color: #1D9E75; font-size: 16px; font-weight: bold;');
console.log('%cFeel free to explore my work and connect with me!', 'color: #5DCAA5; font-size: 12px;');