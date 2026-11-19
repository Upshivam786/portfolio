// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initStatsCounter();
    initDevArticles();
});

// Latest DEV articles (public API, no key). Remote data is rendered with
// textContent/DOM methods only, never innerHTML.
const DEV_PROFILE_URL = 'https://dev.to/upshivam786';
const DEV_ARTICLES_API = 'https://dev.to/api/articles?username=upshivam786&per_page=5';
const DEV_MAX_ARTICLES = 4;
const DEV_TIMEOUT_MS = 8000;

function initDevArticles() {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;
    if (!('fetch' in window)) {
        renderArticlesState(grid, 'Read my latest articles on DEV.', true);
        return;
    }

    renderArticlesState(grid, 'Loading latest articles…', false);
    grid.setAttribute('aria-busy', 'true');

    const controller = 'AbortController' in window ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), DEV_TIMEOUT_MS) : null;

    fetch(DEV_ARTICLES_API, { signal: controller ? controller.signal : undefined, headers: { Accept: 'application/json' } })
        .then(response => {
            if (!response.ok) throw new Error(`DEV API responded ${response.status}`);
            return response.json();
        })
        .then(data => {
            const articles = (Array.isArray(data) ? data : [])
                .filter(isPublishedDevArticle)
                .slice(0, DEV_MAX_ARTICLES);
            if (articles.length === 0) {
                renderArticlesState(grid, 'No articles published yet.', true);
                return;
            }
            grid.replaceChildren(...articles.map(createArticleCard));
        })
        .catch(error => {
            console.warn('Could not load DEV articles:', error);
            renderArticlesState(grid, 'Articles could not be loaded right now.', true);
        })
        .finally(() => {
            if (timer) clearTimeout(timer);
            grid.setAttribute('aria-busy', 'false');
        });
}

function isPublishedDevArticle(article) {
    if (!article || typeof article !== 'object') return false;
    if (article.type_of && article.type_of !== 'article') return false;
    if (article.published === false) return false;
    const published = Date.parse(article.published_at);
    if (!Number.isFinite(published) || published > Date.now()) return false;
    return typeof article.title === 'string' && article.title.trim() !== '' && safeDevUrl(article.url) !== null;
}

// Only allow https links to dev.to; anything else is rejected.
function safeDevUrl(value) {
    try {
        const url = new URL(value);
        return url.protocol === 'https:' && url.hostname === 'dev.to' ? url.href : null;
    } catch (e) {
        return null;
    }
}

function devArticleTags(article) {
    const raw = Array.isArray(article.tag_list) ? article.tag_list
        : typeof article.tag_list === 'string' ? article.tag_list.split(',')
        : typeof article.tags === 'string' ? article.tags.split(',') : [];
    return raw
        .filter(tag => typeof tag === 'string')
        .map(tag => tag.trim())
        .filter(tag => /^[a-z0-9]+$/i.test(tag))
        .slice(0, 4);
}

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

function createArticleCard(article) {
    const url = safeDevUrl(article.url);
    const card = el('article', 'project-card article-card');

    const header = el('div', 'project-header');
    const title = el('h3', 'project-title');
    const titleLink = el('a', 'article-title-link', article.title.trim());
    titleLink.href = url;
    titleLink.target = '_blank';
    titleLink.rel = 'noopener noreferrer';
    title.appendChild(titleLink);
    header.appendChild(title);

    const date = new Date(article.published_at);
    const time = el('time', 'article-date', date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }));
    time.dateTime = date.toISOString();
    header.appendChild(time);

    if (typeof article.description === 'string' && article.description.trim() !== '') {
        header.appendChild(el('p', 'project-description', article.description.replace(/\s+/g, ' ').trim()));
    }
    card.appendChild(header);

    const footer = el('div', 'project-footer');
    const topics = el('div', 'project-topics');
    devArticleTags(article).forEach(tag => topics.appendChild(el('span', 'project-topic', `#${tag}`)));
    footer.appendChild(topics);
    const readLink = el('a', 'project-link', 'Read on DEV →');
    readLink.href = url;
    readLink.target = '_blank';
    readLink.rel = 'noopener noreferrer';
    footer.appendChild(readLink);
    card.appendChild(footer);

    return card;
}

function renderArticlesState(grid, message, withProfileLink) {
    const state = el('div', 'articles-state');
    state.appendChild(el('p', null, message));
    if (withProfileLink) {
        const link = el('a', 'btn btn-secondary', 'Visit my DEV profile');
        link.href = DEV_PROFILE_URL;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        state.appendChild(link);
    }
    grid.replaceChildren(state);
}

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle (a <button>, so Enter/Space work natively)
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            const isOpen = navMenu.classList.toggle('active');
            navToggle.classList.toggle('active', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Active link highlighting on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
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

// Scroll effects
function initScrollEffects() {
    const header = document.querySelector('.header');
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
                // Move keyboard focus to the target so Tab continues from there
                if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
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

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});
