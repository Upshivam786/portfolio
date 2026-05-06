#!/bin/bash

# GitHub Pages Deployment Script
# Usage: ./deploy-github-pages.sh

echo "🚀 Deploying to GitHub Pages..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not initialized. Please run: git init"
    exit 1
fi

# Create gh-pages branch if it doesn't exist
if ! git show-ref --verify --quiet refs/heads/gh-pages; then
    echo "📦 Creating gh-pages branch..."
    git checkout --orphan gh-pages
    git rm -rf .
    echo "# Portfolio Website" > README.md
    git add README.md
    git commit -m "Initial gh-pages setup"
    git checkout main
fi

# Switch to gh-pages branch
echo "🔄 Switching to gh-pages branch..."
git checkout gh-pages

# Copy built files
echo "📁 Copying files..."
cp html/index.html ./
cp html/resume.pdf ./
cp -r html/css ./
cp -r html/js ./
cp -r html/assets ./

# Add .nojekyll for better performance
touch .nojekyll

# Create proper index.html
if [ ! -f "index.html" ]; then
    echo "❌ index.html not found"
    git checkout main
    exit 1
fi

# Add all files
echo "➕ Adding files to git..."
git add .
git add -f css/ js/ assets/
git add -f *.pdf *.png *.jpg *.jpeg *.gif *.ico *.svg

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy portfolio - $(date '+%Y-%m-%d %H:%M:%S')"

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin gh-pages

# Switch back to main branch
git checkout main

echo "✅ Deployment complete!"
echo ""
echo "🌐 Your portfolio will be available at:"
echo "   https://upshivam786.github.io/portfolio"
echo ""
echo "⏱️  It may take a few minutes for changes to appear."
echo ""
echo "📋 To enable GitHub Pages:"
echo "   1. Go to your repository settings"
echo "   2. Scroll to 'GitHub Pages'"
echo "   3. Select 'gh-pages' branch as source"
echo "   4. Select '/(root)' as folder"
echo "   5. Save settings"
