// Portfolio GitHub Integration
// Fetch and display selected projects from GitHub

const SELECTED_REPOS = [
    'Master_project',
    'devops-cicd-dashboard',
    'local-pdf-rag-turbovec-ollama',
    'Wine-Prediction-Model',
    'hello-world-mlops',
    'ai-assisted-log-analysis',
    'wazuh'
];

const GITHUB_USERNAME = 'Upshivam786';

async function fetchProjects() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
        if (!response.ok) {
            throw new Error('Failed to fetch repos');
        }
        const repos = await response.json();

        // Filter to selected repos
        const selectedRepos = repos.filter(repo => SELECTED_REPOS.includes(repo.name));

        // Sort by name for consistency
        selectedRepos.sort((a, b) => a.name.localeCompare(b.name));

        return selectedRepos;
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';

    const description = repo.description || 'No description available';
    const language = repo.language || 'Code';

    card.innerHTML = `
        <h3><a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a></h3>
        <p class="project-description">${description}</p>
        <div class="project-meta">
            <span class="language-badge">${language}</span>
            <a href="${repo.html_url}" target="_blank" rel="noopener">View on GitHub →</a>
        </div>
    `;

    return card;
}

async function loadProjects() {
    const grid = document.getElementById('projects-grid');

    const repos = await fetchProjects();

    if (repos.length === 0) {
        grid.innerHTML = '<div class="loading">Unable to load projects. Please check GitHub connection.</div>';
        return;
    }

    grid.innerHTML = '';

    repos.forEach(repo => {
        const card = createProjectCard(repo);
        grid.appendChild(card);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadProjects);