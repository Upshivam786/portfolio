# SHIVAM UPADHYAY - Portfolio Website

A professional portfolio website showcasing projects in biotechnology, medical device innovation, and DevOps engineering.

## Features

- **Responsive Design**: Mobile-first design with modern UI/UX
- **GitHub Integration**: Dynamic project showcase from GitHub API
- **Professional Styling**: Clean, modern design with blue/gray color scheme
- **Contact Form**: Functional contact form with local storage
- **Performance Optimized**: Fast loading with nginx compression and caching
- **Future-Ready**: Architecture prepared for backend and database integration

## Technology Stack

### Phase 1 (Current)
- **Container**: Docker with docker-compose
- **Web Server**: Nginx (alpine image)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Tunnel**: ngrok for development

### Future Phases
- **Phase 2**: Enhanced contact form with local JSON storage
- **Phase 3**: Node.js/Express backend with admin panel
- **Phase 4**: MongoDB database integration

## Quick Start

### Prerequisites
- Docker and Docker Compose
- ngrok (for development tunneling)

### Development Setup

1. **Build and start the container:**
   ```bash
   docker compose up -d
   ```

2. **Access the website:**
   - Local: http://localhost:8080
   - With ngrok: `./scripts/ngrok.sh`

3. **Development commands:**
   ```bash
   # View available commands
   make help
   
   # Start development with ngrok
   make dev
   
   # View logs
   make logs
   
   # Stop containers
   make down
   ```

## Project Structure

```
/home/user/claude-code/
├── html/                  # Static website files
│   ├── css/
│   │   └── styles.css     # Professional styling
│   ├── js/
│   │   └── main.js        # JavaScript functionality
│   └── index.html         # Main HTML structure
├── nginx/
│   └── nginx.conf         # Nginx configuration
├── scripts/
│   └── ngrok.sh          # Ngrok integration script
├── decision/             # Decision tracking
│   ├── tech-stack.md
│   ├── project-requirements.md
│   ├── github-api-strategy.md
│   └── docker-architecture.md
├── Dockerfile            # Container configuration
├── docker-compose.yml    # Service orchestration
├── Makefile             # Development commands
└── task.md              # Task tracking
```

## Website Sections

- **Hero**: Professional introduction with call-to-action buttons
- **About**: Biotechnology and DevOps background with highlights
- **Skills**: Categorized skills in biotechnology, DevOps, and programming
- **Projects**: Dynamic GitHub repository showcase (non-forked only)
- **Blog**: Placeholder for healthcare innovation and tech articles
- **Contact**: Contact form with name and email fields
- **Footer**: Social links and navigation

## GitHub API Integration

The website automatically fetches and displays your public repositories from GitHub:
- Excludes forked repositories
- Sorts by stars and update date
- Caches results for 5 minutes
- Displays language badges and statistics

## Configuration

### Environment Variables
No environment variables required for Phase 1.

### Customization
- Update personal information in `html/index.html`
- Modify color scheme in `html/css/styles.css` (CSS variables)
- Add custom skills and project filters in JavaScript

## Deployment

### Development
```bash
# Start with ngrok tunnel
make dev
```

### Production
```bash
# Build and deploy
docker compose -f docker-compose.prod.yml up -d
```

## Future Development

See `task.md` for detailed phase-by-phase development plan.

### Phase 2: Contact Form Enhancement
- Form data persistence
- Spam protection
- Admin interface for viewing submissions

### Phase 3: Blog & Admin Backend
- Node.js/Express API
- Content management system
- Authentication system

### Phase 4: Database Integration
- MongoDB for data persistence
- Advanced search and filtering
- Analytics and reporting

## Contributing

1. Check the decision tracking in `/decision/` folder
2. Update tasks in `task.md`
3. Follow the established architecture patterns
4. Test changes with Docker container

## License

© 2026 SHIVAM UPADHYAY. All rights reserved.

## Contact

- **Email**: Available through contact form
- **LinkedIn**: https://linkedin.com/in/su021
- **GitHub**: https://github.com/Upshivam786
