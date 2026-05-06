# GitHub Pages Deployment Guide

## Quick Setup (5 minutes)

### Step 1: Create GitHub Repository
```bash
# If not already done
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/Upshivam786/portfolio.git
git push -u origin main
```

### Step 2: Deploy to GitHub Pages
```bash
# One command deployment
./deploy-github-pages.sh
```

### Step 3: Enable GitHub Pages
1. Go to: https://github.com/Upshivam786/portfolio/settings/pages
2. Source: Deploy from a branch
3. Branch: gh-pages
4. Folder: /(root)
5. Save

### Step 4: Access Your Site
**URL**: https://upshivam786.github.io/portfolio

## Alternative: Manual Deployment

### Export Static Files
```bash
# Create deployment directory
mkdir -p deploy

# Copy files (excluding Docker files)
cp -r html/* deploy/
cp -r html/css deploy/
cp -r html/js deploy/
cp -r html/assets deploy/

# Add GitHub Pages file
touch deploy/.nojekyll

# Deploy
cd deploy
git init
git add .
git commit -m "Deploy portfolio"
git branch -M main
git remote add origin https://github.com/Upshivam786/portfolio.git
git push -u origin main
```

## Custom Domain Setup

### Option 1: GitHub Pages Domain
1. Go to repository settings → Pages
2. Add custom domain: yourdomain.com
3. Update DNS records

### Option 2: Free Domain Services
- **Freenom**: .tk, .ml, .ga, .cf domains (free)
- **EU.org**: Free domain with application

## Netlify Alternative (Even Easier)

### Quick Deploy
1. Drag-and-drop `html` folder to https://netlify.com
2. Get instant URL: random-name.netlify.app
3. Connect GitHub repository for auto-deploys

### Benefits
- Free SSL certificate
- Continuous deployment
- Form handling (100 submissions/month free)
- Analytics

## Vercel Alternative

### Deploy via GitHub
1. Connect repository to https://vercel.com
2. Automatic deployment on push
3. URL: your-portfolio.vercel.app

### Benefits
- Excellent performance
- Global CDN
- Analytics
- Easy custom domain

## Recommendation

### For Immediate Results:
**GitHub Pages** - Free, professional, GitHub integration

### For Enhanced Features:
**Netlify** - Form handling, analytics, better performance

### For Future Growth:
**Vercel** - Best performance, serverless ready

## Next Steps

1. **Choose Platform**: GitHub Pages (free) or Netlify/Vercel
2. **Deploy**: Use automated script or drag-and-drop
3. **Test**: Verify all links work
4. **Custom Domain**: Optional but recommended
5. **Analytics**: Set up visitor tracking

## Production Checklist

- [ ] Resume download works
- [ ] Contact form functions
- [ ] All links are correct
- [ ] Mobile responsive
- [ ] Loading performance
- [ ] SSL certificate active
- [ ] Custom domain configured
