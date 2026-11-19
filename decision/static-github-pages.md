# Static Site on GitHub Pages via GitHub Actions

## Decision Date: 2026-11-19

## Decision
- GitHub Pages is the only production hosting.
- GitHub Actions publishes only the `site/` directory (`.github/workflows/pages.yml`).
- The site stays static HTML/CSS/JavaScript.
- Removed: Express backend, MongoDB, JWT, Nodemailer, admin pages, FormSubmit/Replit contact
  scripts, Docker/Nginx, ngrok and the branch-switching `deploy-github-pages.sh` script.
- Contact uses `mailto:`, LinkedIn and GitHub links.
- One resume PDF lives at `site/assets/resume/Shivam_Upadhyay_DevOps_Resume.pdf`. The workflow
  copies it to `/resume.pdf` so old links keep working.
- Blog placeholders are removed until genuine posts exist.
- Featured projects are a curated static list (see `projects.md`); no GitHub API calls at runtime.

## Rationale
- Recruiters need a fast, reliable static page. A backend added cost, a broken contact form
  (Replit dev URL) and a credential-exposure surface.
- The old `gh-pages` branch published the entire repository, including backend source, decision
  docs and scripts. Publishing only `site/` limits the public surface to the website itself.
- An Actions-based deploy needs no application secrets and no local branch switching.

## Supersedes
See `decision/archive/`, especially `hosting-strategy.md`, `github-api-strategy.md`, `tech-stack.md`,
`docker-architecture.md`, `phase2-implementation.md` and `contact-form-explanation.md`.

## Follow-ups
- Switch Pages source to "GitHub Actions" after merging to `main`.
- Keep the legacy `gh-pages` branch until the Actions deploy is confirmed live.
