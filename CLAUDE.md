# Portfolio Website for Upshivam786

Static, recruiter-facing portfolio hosted on GitHub Pages.

## Architecture (decided 2026-11-19, see `decision/static-github-pages.md`)
- GitHub Pages is the only production host, published by GitHub Actions from `site/`.
- Plain HTML/CSS/JavaScript. No backend, database, auth, server-side email, Docker/Nginx or ngrok.
- Contact uses `mailto:`, LinkedIn and GitHub links. No forms.
- No secrets in current files or the workflow. Git history still contains old exposed credentials; rotate rather than assume history is clean.

## Quick Start
```bash
python3 -m http.server 8000 --directory site   # local preview
```

## Project Structure
- `site/`: the published website (`index.html`, `css/`, `js/`, `assets/resume/`)
- `.github/workflows/pages.yml`: deploys `site/` and adds `/resume.pdf` as a compatibility copy
- `decision/`: architecture decisions; `decision/archive/` holds superseded ones
- `task.md`: development task tracking

## Rules
- Do not invent experience, achievements, metrics, skills or blog posts. Ask for real content.
- Keep the resume at `site/assets/resume/Shivam_Upadhyay_DevOps_Resume.pdf`.
- Never commit credentials. `.claude/settings.local.json` is local-only (gitignored).
- Do not use or modify the legacy `gh-pages` branch.
