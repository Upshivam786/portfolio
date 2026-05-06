# Ngrok Integration Strategy

## Decision Date: 2026-05-05

## Configuration
- **Domain**: stuffy-mom-speller.ngrok-free.dev
- **Authtoken**: 3DIkJqYBvDxv8bnQaWFy4q5xyoQ_3iKgXbAFWvTvxnEiSZMA3
- **Target Port**: 8080 (Docker nginx container)
- **Protocol**: HTTP

## Usage Commands

### Full Development Stack
```bash
make dev
```
- Starts Docker containers
- Waits for startup
- Launches ngrok with configured domain

### Ngrok Only
```bash
make ngrok-only
```
- Assumes containers are already running
- Starts ngrok tunnel immediately

### Manual Ngrok
```bash
./scripts/ngrok.sh
```

## Access URLs
- **Local Development**: http://localhost:8080
- **External Access**: https://stuffy-mom-speller.ngrok-free.dev
- **Ngrok Dashboard**: https://dashboard.ngrok.com

## Security Features Available
- OAuth authentication (Google, GitHub, Facebook)
- Webhook verification
- JWT validation
- IP restrictions
- OpenID Connect
- Mutual TLS

## Traffic Monitoring
- Traffic Inspector for HTTP request debugging
- Real-time request viewer
- Traffic events export to monitoring systems

## Production Considerations
- Ngrok is for development/testing only
- For production, consider:
  - Cloud hosting (AWS, Vercel, Netlify)
  - Custom domain with SSL
  - CDN integration
  - Production-grade reverse proxy

## Troubleshooting
1. **Port conflicts**: Ensure port 8080 is available
2. **Container not running**: Run `make status` to check
3. **Authtoken issues**: Verify token in ngrok dashboard
4. **Domain conflicts**: Domain is reserved for your account

## Workflow Integration
1. Development: `make dev` → Full stack with ngrok
2. Testing: Share ngrok URL with stakeholders
3. Production: Deploy static files to hosting service
