# Technology Stack Decisions

## Decision Date: 2026-05-05

## Phase 1 (Current)
- **Container**: Docker with docker-compose
- **Web Server**: Nginx (alpine image for small size)
- **Static Files**: HTML5, CSS3, Vanilla JavaScript
- **Tunnel**: ngrok (HTTP port 80)

## Phase 2
- **Contact Form**: Vanilla JS with local JSON storage
- **Form Data**: Stored in Docker volume

## Phase 3
- **Backend**: Node.js with Express
- **API Pattern**: RESTful JSON API
- **Admin Panel**: Static HTML/JS

## Phase 4
- **Database**: MongoDB (flexible for blog/projects data)
- **ORM**: Mongoose

## Rationale
- Nginx chosen for efficiency and easy reverse proxy setup for future backend
- Vanilla JS avoids framework overhead for Phase 1
- MongoDB selected by user - flexible schema for varied project data
- Docker ensures consistency across environments