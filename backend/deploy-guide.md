# Phase 2 Deployment Guide

## 🚀 Quick Deployment with Replit (Recommended for Testing)

### Step 1: Create Replit Account
1. Go to https://replit.com
2. Sign up with GitHub account
3. Click "Create Repl"

### Step 2: Import Backend Code
1. Choose "Import from GitHub"
2. Enter: `Upshivam786/portfolio` 
3. Select only the `backend/` folder
4. Click "Import Repl"

### Step 3: Configure Environment Variables
1. In Replit, go to "Secrets" (lock icon)
2. Add these secrets:
   ```
   EMAIL_USER=upadhyayshivam1628@gmail.com
   EMAIL_PASS=nqgcpdqqxgmezjt
   MONGODB_URI=mongodb+srv://upshivam786:portfolio123@cluster0.mongodb.net/portfolio
   PORT=3001
   NODE_ENV=production
   JWT_SECRET=portfolio-jwt-secret-key-2026
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=5
   ```

### Step 4: Install Dependencies
In Replit console, run:
```bash
npm install
```

### Step 5: Start Server
Click "Run" button or run:
```bash
npm start
```

### Step 6: Get Your API URL
Your API will be available at:
```
https://your-repl-name.upshivam786.repl.co
```

### Step 7: Update Frontend
1. Edit `html/js/phase2-contact.js`
2. Update the API endpoint:
```javascript
this.apiEndpoint = 'https://your-repl-name.upshivam786.repl.co/api/contact';
```

### Step 8: Deploy Frontend
```bash
cp html/index.html . && cp -r html/css . && cp -r html/js . && cp -r html/assets . && touch .nojekyll
git add .
git commit -m "Deploy Phase 2 contact form with backend API"
git push origin gh-pages
```

## 🎯 Production Deployment with Railway

### Step 1: Connect GitHub to Railway
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select `Upshivam786/portfolio`
5. Set root directory to `backend`

### Step 2: Configure Environment Variables
In Railway project settings:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=3001
NODE_ENV=production
JWT_SECRET=portfolio-jwt-secret-key-2026
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
```

### Step 3: Deploy
Railway will automatically deploy and give you a URL like:
```
https://portfolio-api-production.up.railway.app
```

### Step 4: Update Frontend
Update the API endpoint in `html/js/phase2-contact.js` to your Railway URL.

## 🗄️ MongoDB Atlas Setup (Free)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/atlas
2. Sign up for free account
3. Create "New Project"

### Step 2: Create Cluster
1. Click "Build a Cluster"
2. Choose "M0 Sandbox" (free)
3. Select cloud provider and region
4. Click "Create Cluster"

### Step 2: Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Choose a secure username and password
4. Click "Add User"

### Step 3: Configure Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 4: Get Connection String
1. Go to "Database" → "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your actual password
5. Use this in your environment variables

## 📧 Test Email Configuration

### Test Email Sending
Once backend is running, test with curl:
```bash
curl -X POST https://your-api-url.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Test message"}'
```

### Check Email Inbox
You should receive:
1. **Notification email** with contact details
2. **Auto-reply** sent to test@example.com

## 🔧 Troubleshooting

### Email Not Working
1. Verify Gmail App Password is correct
2. Check environment variables in Replit/Railway
3. Look at server logs for errors
4. Try sending test email manually

### Database Connection Issues
1. Verify MongoDB Atlas connection string
2. Check IP access is configured (0.0.0.0/0)
3. Ensure database user has correct permissions
4. Check network access in MongoDB Atlas

### API Not Responding
1. Check server is running (look at logs)
2. Verify PORT environment variable
3. Check CORS configuration
4. Test health endpoint: `/api/health`

### Rate Limiting Issues
1. Check IP address is correct
2. Verify rate limit settings
3. Clear browser cache
4. Wait 15 minutes between tests

## 📊 Admin Dashboard Access

Once backend is deployed, access admin dashboard at:
```
https://your-api-url.com/admin-dashboard.html
```

Features:
- View all contact submissions
- Mark as read/replied
- Search and filter
- Reply via email
- Delete contacts

## 🚀 Production Checklist

- [ ] Backend deployed and running
- [ ] Email notifications working
- [ ] Database connected
- [ ] Frontend API endpoint updated
- [ ] Admin dashboard accessible
- [ ] Rate limiting active
- [ ] CORS properly configured
- [ ] Environment variables secured

## 📱 Testing Complete System

1. **Visit**: https://upshivam786.github.io/portfolio
2. **Fill out contact form**
3. **Submit** the form
4. **Check email**: upadhyayshivam1628@gmail.com
5. **Check admin dashboard**: View submission
6. **Test auto-reply**: Check visitor's email

## 🎯 Success Metrics

- ✅ Email delivery rate > 95%
- ✅ API response time < 500ms
- ✅ No spam messages getting through
- ✅ Admin dashboard working
- ✅ Auto-replies being sent

## 🔄 Next Steps

After successful deployment:
1. Monitor email delivery rates
2. Check admin dashboard regularly
3. Optimize spam detection if needed
4. Plan Phase 3 implementation
5. Set up monitoring and alerts
