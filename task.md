# Portfolio Website Tasks

The original phase plan (Docker, ngrok, backend, MongoDB) is archived in
`decision/archive/task-original.md`.

## Cleanup and Migration (branch `cleanup/static-portfolio`)
- [x] Move frontend into `site/`
- [x] Remove backend, database, admin, ngrok, Docker/Nginx and old deploy script
- [x] Replace contact form with email/LinkedIn/GitHub links
- [x] Single resume PDF plus `/resume.pdf` compatibility copy at deploy time
- [x] Remove blog placeholders
- [x] Add GitHub Actions Pages workflow
- [ ] Review and commit, open PR, merge to `main`
- [ ] Set Pages source to "GitHub Actions" and confirm live deploy
- [ ] Retire legacy `gh-pages` branch after the live site is confirmed

## Content (needs real information from the site owner)
- [x] Update About/hero text for DevOps, AIOps and MLOps focus
- [x] Add Experience section
- [x] Add Education section
- [x] Review Skills list (aligned with resume)
- [x] Choose featured projects (see `decision/projects.md`)
- [ ] Publish genuine blog posts, then add a Blog section
- [x] Fix mobile overflow (About clipping, off-canvas menu) and tablet nav/hero layout
