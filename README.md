# SHIVAM UPADHYAY - Portfolio Website

Recruiter-facing portfolio for a DevOps / AIOps / MLOps Engineer: experience, education, skills, curated projects, resume and contact links.

**Live site:** https://upshivam786.github.io/portfolio/

## Architecture

- **Static site only:** HTML, CSS and vanilla JavaScript in `site/`.
- **Hosting:** GitHub Pages, published by GitHub Actions (`.github/workflows/pages.yml`).
- **No backend:** no server, database, authentication, server-side email or tunnels.
- **No secrets:** the deploy workflow uses only GitHub's built-in Pages token.
- **Contact:** plain `mailto:`, LinkedIn and GitHub links.
- **Projects:** a curated, static list of six repositories (see `decision/projects.md`). No runtime API calls.

## Project Structure

```
.
├── site/                         # Everything that is published
│   ├── index.html
│   ├── css/styles.css
│   ├── js/main.js
│   └── assets/resume/Shivam_Upadhyay_DevOps_Resume.pdf
├── .github/workflows/pages.yml   # Deploys site/ to GitHub Pages
├── decision/                     # Architecture decisions
│   └── archive/                  # Superseded decisions (history only)
├── task.md                       # Task tracking
└── README.md
```

Only `site/` is published. Repository docs, decisions and config are not served.

## Local Preview

No Docker or build step is needed:

```bash
python3 -m http.server 8000 --directory site
# open http://localhost:8000
```

`/resume.pdf` exists only on the deployed site (the workflow copies it in). Locally, use
`http://localhost:8000/assets/resume/Shivam_Upadhyay_DevOps_Resume.pdf`.

## Deployment

1. One-time setup: in **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**.
2. Merge changes to `main`. Any change under `site/` triggers the workflow, which can also be run manually from the **Actions** tab.

The workflow copies `site/` into the Pages artifact and adds `/resume.pdf` as a copy of the current resume, so the old resume URL keeps working.

## Updating Content

- **Page content:** `site/index.html`
- **Styles:** `site/css/styles.css` (CSS variables at the top)
- **Featured projects:** project cards in `site/index.html` (keep `decision/projects.md` in sync)
- **Behaviour (mobile menu, smooth scroll, stats counter):** `site/js/main.js`
- **Resume:** replace `site/assets/resume/Shivam_Upadhyay_DevOps_Resume.pdf`, keeping the same filename.
- **Blog:** removed until genuine posts exist. When adding one, add a `#blog` section and the matching nav/footer links.

## Contact

- **Email:** upadhyayshivam1628@gmail.com
- **LinkedIn:** https://linkedin.com/in/su021
- **GitHub:** https://github.com/Upshivam786

## License

© 2026 SHIVAM UPADHYAY. All rights reserved.
