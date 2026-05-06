# Portfolio Website for Upshivam786

Docker-based portfolio site with Nginx, showcasing selected GitHub projects.

## Quick Start
```bash
# Build and run
docker-compose up --build

# In another terminal, create ngrok tunnel
ngrok http 80
```

## Project Structure
- `docker-compose.yml` - Container orchestration
- `nginx/` - Nginx configuration
- `html/` - Static website files
- `decision/` - Architecture decisions
- `task.md` - Development task tracking

## Development Phases
- Phase 1: Static site (current)
- Phase 2: Contact form
- Phase 3: Blog + Admin
- Phase 4: MongoDB backend

See `decision/` folder for architecture decisions.