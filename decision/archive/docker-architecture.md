# Docker Architecture Decisions

## Decision Date: 2026-05-05

## Phase 1 Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Host Machine  │    │   Docker        │    │   Ngrok         │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │ ngrok       │ │◄──►│ │ nginx       │ │◄──►│ │ internet    │ │
│ │ tunnel      │ │    │ │ server      │ │    │ │ access     │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
│                 │    │ ┌─────────────┐ │    │                 │
│ ┌─────────────┐ │    │ │ static      │ │    │                 │
│ │ port 8080   │ │◄──►│ │ files       │ │    │                 │
│ │ (ngrok)     │ │    │ │ (HTML/CSS/JS)│ │    │                 │
│ └─────────────┘ │    │ └─────────────┘ │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Docker Compose Structure
```yaml
services:
  nginx:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
```

## Nginx Configuration
- **Static files**: Serve from /usr/share/nginx/html
- **Future API routes**: /api/* proxy to backend (Phase 3+)
- **Compression**: gzip for CSS/JS
- **Caching**: Static assets 1 hour
- **Security**: Basic headers and CORS setup

## Volume Structure
```
/home/user/claude-code/
├── html/                 # Static website files
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── assets/
├── nginx/
│   └── nginx.conf        # Nginx configuration
└── docker-compose.yml    # Container orchestration
```

## Development Workflow
1. **Build**: `docker-compose build`
2. **Run**: `docker-compose up -d`
3. **Ngrok**: `ngrok http 8080`
4. **Access**: `http://localhost:8080` or ngrok URL

## Future Phases
### Phase 3: Add Backend
```yaml
services:
  nginx:
    # ... existing config
  backend:
    build: ./backend
    environment:
      - NODE_ENV=development
```

### Phase 4: Add Database
```yaml
services:
  # ... nginx and backend
  mongodb:
    image: mongo:latest
    volumes:
      - mongodb_data:/data/db
```

## Benefits
- **Isolation**: Clean development environment
- **Portability**: Works on any machine with Docker
- **Scalability**: Easy to add services in future phases
- **Consistency**: Same environment dev/prod
