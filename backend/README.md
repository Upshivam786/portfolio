# Portfolio Backend - Phase 2

Production-ready backend API for SHIVAM UPADHYAY portfolio website with reliable email notifications and contact management.

## Features

### 🚀 Production Ready
- **Express.js** REST API
- **MongoDB** database with Mongoose ODM
- **Nodemailer** for email notifications
- **Rate limiting** for spam protection
- **Helmet** for security headers
- **CORS** for cross-origin requests

### 📧 Email System
- **Gmail integration** with nodemailer
- **Auto-reply** to visitors
- **HTML email templates**
- **Professional formatting**
- **Error handling** and retries

### 🛡️ Security & Validation
- **Input validation** and sanitization
- **Spam detection** algorithm
- **Rate limiting** (5 requests per 15 minutes)
- **IP tracking** and user agent logging
- **XSS protection** with Helmet

### 📊 Admin Dashboard
- **Contact management** interface
- **Status tracking** (new/read/replied)
- **Search and filter** functionality
- **Statistics and analytics**
- **Bulk operations** support

## Quick Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
```bash
cp .env.example .env
# Edit .env with your credentials
```

### 3. Gmail Setup
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Add to .env:
   ```
   EMAIL_USER=upadhyayshivam1628@gmail.com
   EMAIL_PASS=your-16-character-app-password
   ```

### 4. Database Setup
```bash
# Option A: MongoDB Atlas (Recommended)
# Create free cluster at https://www.mongodb.com/atlas
# Get connection string and add to .env:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# Option B: Local MongoDB
# Install MongoDB locally and use:
MONGODB_URI=mongodb://localhost:27017/portfolio
```

### 5. Start Server
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Contact Form
- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check

### Admin Dashboard
- `GET /api/admin/contacts` - Get all contacts
- `PUT /api/admin/contacts/:id` - Update contact status
- `DELETE /api/admin/contacts/:id` - Delete contact

## Deployment Options

### Option 1: Replit (Easiest)
1. Fork this repository
2. Create Replit account
3. Import the backend folder
4. Add environment variables in Replit secrets
5. Click "Run" → Get your API URL

### Option 2: Railway
1. Connect GitHub repository to Railway
2. Add environment variables
3. Deploy automatically

### Option 3: Vercel
1. Install Vercel CLI
2. Run `vercel` in backend folder
3. Add environment variables

### Option 4: DigitalOcean
1. Create droplet
2. Install Node.js and MongoDB
3. Deploy with PM2

## Frontend Integration

Update your portfolio contact form to use the new API:

```javascript
// In your HTML
<script src="js/phase2-contact.js"></script>

// Update the API endpoint in phase2-contact.js
this.apiEndpoint = 'https://your-backend-url.com/api/contact';
```

## Email Templates

### Notification Email (to you)
- Professional HTML design
- Contact details and message
- Reply button
- Spam score indicator
- IP and timestamp information

### Auto-reply Email (to visitor)
- Personalized greeting
- Message confirmation
- Your portfolio links
- Professional signature

## Security Features

### Spam Detection
- URL detection in messages
- Keyword filtering
- Email pattern analysis
- Score-based blocking

### Rate Limiting
- 5 requests per 15 minutes per IP
- Automatic blocking of spammers
- Configurable limits

### Input Validation
- Email format validation
- Length limits on all fields
- XSS protection
- SQL injection prevention

## Monitoring & Analytics

### Health Check
```bash
curl https://your-api.com/api/health
```

### Statistics
- Total contacts
- New messages
- Monthly/weekly counts
- Spam detection rates

## Troubleshooting

### Email Not Working
1. Check Gmail App Password setup
2. Verify environment variables
3. Check email logs in console
4. Test with different email service

### Database Connection
1. Verify MongoDB URI
2. Check network access
3. Confirm credentials
4. Test connection manually

### Rate Limiting Issues
1. Check IP address logging
2. Adjust rate limit settings
3. Clear rate limit cache

## Environment Variables

```env
# Required
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
MONGODB_URI=mongodb://localhost:27017/portfolio

# Optional
PORT=3001
NODE_ENV=production
JWT_SECRET=your-secret-key
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
```

## Production Checklist

- [ ] Set up production database
- [ ] Configure email service
- [ ] Set up monitoring
- [ ] Enable HTTPS
- [ ] Configure domain
- [ ] Set up backups
- [ ] Test all endpoints
- [ ] Update frontend API URL
- [ ] Monitor error logs
- [ ] Set up alerts

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review console logs
3. Test endpoints individually
4. Check environment variables
5. Verify network connectivity

## Next Steps (Phase 3)

- Blog API with markdown support
- File upload system
- User authentication
- Advanced analytics
- CRM integration
- Multi-language support
