// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initGitHubProjects();
    initContactForm();
    initScrollEffects();
    initStatsCounter();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Active link highlighting on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// GitHub API integration
async function initGitHubProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    try {
        // Check cache first
        const cachedData = localStorage.getItem('githubProjects');
        const cacheTime = localStorage.getItem('githubProjectsTime');
        
        if (cachedData && cacheTime && (Date.now() - parseInt(cacheTime)) < 300000) { // 5 minutes cache
            displayProjects(JSON.parse(cachedData));
            return;
        }

        // Fetch from GitHub API
        const response = await fetch('https://api.github.com/users/Upshivam786/repos?sort=updated&per_page=100');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const repos = await response.json();
        
        // Filter out forked repositories
        const nonForkedRepos = repos.filter(repo => !repo.fork);
        
        // Sort by stars and updated date
        const sortedRepos = nonForkedRepos.sort((a, b) => {
            const scoreA = (a.stargazers_count * 10) + new Date(a.updated_at).getTime();
            const scoreB = (b.stargazers_count * 10) + new Date(b.updated_at).getTime();
            return scoreB - scoreA;
        });

        // Cache the results
        localStorage.setItem('githubProjects', JSON.stringify(sortedRepos));
        localStorage.setItem('githubProjectsTime', Date.now().toString());

        displayProjects(sortedRepos);

    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        displayFallbackProjects();
    }
}

function displayProjects(repos) {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    // Clear loading indicator
    projectsGrid.innerHTML = '';

    // Limit to featured projects
    const featuredRepos = repos.slice(0, 6);

    if (featuredRepos.length === 0) {
        projectsGrid.innerHTML = `
            <div class="no-projects">
                <p>No projects found. Check back soon!</p>
            </div>
        `;
        return;
    }

    featuredRepos.forEach(repo => {
        const projectCard = createProjectCard(repo);
        projectsGrid.appendChild(projectCard);
    });
}

function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';

    // Format date
    const updatedDate = new Date(repo.updated_at);
    const formattedDate = updatedDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });

    // Get language color
    const languageColor = getLanguageColor(repo.language);

    card.innerHTML = `
        <div class="project-header">
            <h3 class="project-title">
                <a href="${repo.html_url}" target="_blank" rel="noopener" class="project-link">
                    ${repo.name}
                </a>
            </h3>
            <p class="project-description">
                ${repo.description || 'No description available'}
            </p>
            <div class="project-meta">
                ${repo.language ? `<span class="project-language" style="background-color: ${languageColor}">${repo.language}</span>` : ''}
                <div class="project-stats">
                    <span class="project-stat">
                        ⭐ ${repo.stargazers_count}
                    </span>
                    <span class="project-stat">
                        🍴 ${repo.forks_count}
                    </span>
                </div>
            </div>
        </div>
        <div class="project-footer">
            <div class="project-topics">
                ${repo.topics.slice(0, 3).map(topic => 
                    `<span class="project-topic">${topic}</span>`
                ).join('')}
            </div>
            <div class="project-date">
                Updated ${formattedDate}
            </div>
        </div>
    `;

    return card;
}

function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f1e05a',
        'Python': '#3572A5',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Java': '#b07219',
        'Go': '#00ADD8',
        'Ruby': '#701516',
        'PHP': '#4F5D95',
        'C++': '#f34b7d',
        'TypeScript': '#2b7489',
        'Shell': '#89e051',
        'Dockerfile': '#384d54',
        'Jupyter Notebook': '#DA5B0B',
        'Vue': '#41B883',
        'React': '#61DAFB',
        'Angular': '#DD0031'
    };
    return colors[language] || '#586069';
}

function displayFallbackProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    const fallbackProjects = [
        {
            name: 'Master_project',
            description: 'Main project showcasing comprehensive development skills',
            html_url: 'https://github.com/Upshivam786/Master_project',
            language: 'JavaScript',
            stargazers_count: 0,
            forks_count: 0,
            updated_at: new Date().toISOString(),
            topics: ['javascript', 'web-development']
        },
        {
            name: 'devops-cicd-dashboard',
            description: 'DevOps dashboard for CI/CD pipeline monitoring',
            html_url: 'https://github.com/Upshivam786/devops-cicd-dashboard',
            language: 'Python',
            stargazers_count: 0,
            forks_count: 0,
            updated_at: new Date().toISOString(),
            topics: ['devops', 'cicd', 'dashboard']
        }
    ];

    displayProjects(fallbackProjects);
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');

        // Basic validation
        if (!name || !email) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Store contact data (Phase 1: local storage)
        const contactData = {
            name: name,
            email: email,
            timestamp: new Date().toISOString()
        };

        // Get existing contacts
        const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        contacts.push(contactData);
        localStorage.setItem('contacts', JSON.stringify(contacts));

        // Show success message with email info
        showNotification('Thank you for your message! I\'ll get back to you at upadhyayshivam1628@gmail.com soon.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6'
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Scroll effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Header background on scroll
        if (currentScroll > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Stats counter animation
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
                observer.unobserve(stat);
            }
        });
    }, observerOptions);

    stats.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element, target) {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
        }, 0);
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Service Worker registration for future PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when ready to implement PWA
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}
