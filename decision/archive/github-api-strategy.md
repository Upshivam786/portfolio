# GitHub API Integration Strategy

## Decision Date: 2026-05-05

## API Endpoint
- **Base URL**: https://api.github.com/users/Upshivam786/repos
- **Filter**: Exclude repositories where `fork = true`
- **Sort**: `updated` descending (most recently updated first)

## Data to Fetch
```javascript
// For each repository:
{
  name: string,
  description: string,
  html_url: string,
  language: string,
  stargazers_count: number,
  forks_count: number,
  updated_at: string,
  topics: string[],
  homepage: string
}
```

## Implementation Details
- **Client-side fetching** using vanilla JavaScript fetch API
- **CORS handling** via GitHub API (no authentication needed for public repos)
- **Error handling** for API failures and rate limits
- **Loading states** during data fetch
- **Caching strategy**: Store in localStorage for 5 minutes

## Display Strategy
- **Grid layout** responsive cards
- **Language badges** with colors
- **Star/fork counts** as icons
- **Last updated** as relative time
- **Topics** as pills below description
- **Direct links** to GitHub repositories

## Fallback
- If API fails, show predefined project list from decision/projects.md
- Graceful degradation with static content
