# SocialAI - Technical Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Backend Documentation](#backend-documentation)
3. [Frontend Documentation](#frontend-documentation)
4. [AI Services](#ai-services)
5. [API Reference](#api-reference)
6. [Database Schema](#database-schema)
7. [Configuration](#configuration)
8. [Deployment Guide](#deployment-guide)

---

## Architecture Overview

SocialAI follows a modern client-server architecture with a clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (React)                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │Dashboard │ │ Compose  │ │ Calendar │ │Analytics │           │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘           │
│       │            │            │            │                   │
│       └────────────┴────────────┴────────────┘                   │
│                          │                                       │
│                    Axios HTTP Client                             │
└──────────────────────────┬──────────────────────────────────────┘
                           │ REST API
┌──────────────────────────┴──────────────────────────────────────┐
│                      Backend (FastAPI)                           │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐               │
│  │ Posts   │ │Insights │ │   AI    │ │  Auth   │  Routes       │
│  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘               │
│       │           │           │           │                      │
│  ┌────┴───────────┴───────────┴───────────┴────┐                │
│  │              Services Layer                  │                │
│  │  ┌────────────┐ ┌────────────┐ ┌──────────┐ │                │
│  │  │AI Services │ │ Analytics  │ │Social API│ │                │
│  │  └────────────┘ └────────────┘ └──────────┘ │                │
│  └──────────────────────┬──────────────────────┘                │
│                         │                                        │
│  ┌──────────────────────┴──────────────────────┐                │
│  │           Database (SQLAlchemy)              │                │
│  └──────────────────────────────────────────────┘                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Backend Documentation

### Main Application (`app/main.py`)

The FastAPI application is configured with CORS middleware and includes all route modules:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="SocialAI API", version="1.0.0")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Route Registration
app.include_router(posts.router, prefix="/posts", tags=["posts"])
app.include_router(insights.router, prefix="/insights", tags=["insights"])
app.include_router(ai_router, prefix="/ai", tags=["ai"])
```

### Database Models (`app/models.py`)

#### Post Model
```python
class Post(Base):
    __tablename__ = "posts"
    
    id = Column(Integer, primary_key=True, index=True)
    content = Column(String, nullable=False)
    platform = Column(String, nullable=False)  # twitter, instagram, linkedin, facebook
    status = Column(String, default="draft")   # draft, scheduled, published
    scheduled_time = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, onupdate=datetime.utcnow)
    
    # Engagement metrics
    likes = Column(Integer, default=0)
    comments = Column(Integer, default=0)
    shares = Column(Integer, default=0)
    impressions = Column(Integer, default=0)
```

### Routes Structure

#### Posts Routes (`app/routes/posts.py`)
- `GET /posts/` - Retrieve all posts with optional filtering
- `POST /posts/` - Create a new post
- `GET /posts/{id}` - Get a specific post
- `PUT /posts/{id}` - Update a post
- `DELETE /posts/{id}` - Delete a post

#### AI Routes (`app/routes/ai.py`)
- `POST /ai/predict-engagement` - Predict engagement metrics
- `POST /ai/score-content` - Get content quality score
- `GET /ai/trends` - Fetch trending topics
- `GET /ai/audience-segments` - Get audience segmentation
- `POST /ai/analyze-sentiment` - Analyze sentiment of comments
- `POST /ai/competitors` - Analyze competitor accounts
- `POST /ai/rewrite-caption` - Rewrite content in different styles
- `POST /ai/translate` - Translate content to multiple languages

---

## Frontend Documentation

### Component Architecture

```
App.jsx
├── Sidebar.jsx (Navigation)
└── Routes
    ├── Dashboard.jsx
    │   ├── Header.jsx
    │   ├── StatsCards.jsx
    │   ├── ComposePost.jsx
    │   ├── RecentPosts.jsx
    │   ├── ContentCalendar.jsx
    │   └── AIInsights.jsx
    ├── Compose.jsx
    ├── Calendar.jsx
    ├── Analytics.jsx
    └── Settings.jsx
```

### Key Components

#### Sidebar (`components/Sidebar.jsx`)
Navigation component with links to all main sections:
- Dashboard
- Compose
- Calendar
- Analytics
- Settings

#### StatsCards (`components/StatsCards.jsx`)
Displays key metrics:
- Total Followers
- Post Impressions
- Engagement Rate
- Link Clicks

#### ComposePost (`components/ComposePost.jsx`)
Multi-platform post composer with:
- Platform selection (Twitter, Instagram, LinkedIn, Facebook)
- Character count
- Post scheduling
- AI content analysis

#### ContentCalendar (`components/ContentCalendar.jsx`)
Visual calendar showing:
- Scheduled posts by date
- Platform indicators (color-coded)
- Post counts per day

#### AIInsights (`components/AIInsights.jsx`)
AI-powered recommendations:
- Optimal posting times
- Trending hashtags
- Content gap detection

### API Client (`api/api.js`)

```javascript
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000"
});

// Posts API
export const getPosts = () => API.get("/posts/");
export const createPost = (post) => API.post("/posts/", post);

// AI Features API
export const predictEngagement = (data) => API.post("/ai/predict-engagement", data);
export const scoreContent = (data) => API.post("/ai/score-content", data);
export const getTrends = () => API.get("/ai/trends");
export const analyzeSentiment = (comments) => API.post("/ai/analyze-sentiment", { comments });
export const rewriteCaption = (content, style, platform) => 
  API.post("/ai/rewrite-caption", { content, style, platform });
```

### Styling

The application uses CSS custom properties for theming:

```css
:root {
  --primary: #f97316;           /* Orange accent */
  --secondary: #1e293b;         /* Dark sidebar */
  --bg-primary: #f8fafc;        /* Light background */
  --bg-secondary: #ffffff;      /* Card background */
  --text-primary: #1e293b;      /* Main text */
  --text-secondary: #64748b;    /* Muted text */
  --border-light: #e2e8f0;      /* Borders */
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

---

## AI Services

### Overview

The AI services module (`app/services/ai_services.py`) provides ML-powered features using simulated models for demonstration purposes. In production, these can be replaced with actual trained models.

### Functions

#### 1. Engagement Prediction
```python
def predict_engagement(
    content: str,
    platform: str,
    scheduled_time: Optional[str] = None,
    content_type: str = "text",
    hashtags: Optional[List[str]] = None
) -> dict:
    """
    Predicts engagement metrics for a post.
    
    Returns:
        dict: {
            "predicted_likes": int,
            "predicted_comments": int,
            "predicted_shares": int,
            "engagement_score": float (0-1),
            "virality_potential": str,
            "best_time_to_post": str,
            "recommendations": list
        }
    """
```

#### 2. Content Scoring
```python
def score_content(
    content: str,
    platform: str = "general"
) -> dict:
    """
    Analyzes content quality and provides scoring.
    
    Returns:
        dict: {
            "overall_score": float (0-100),
            "readability_score": float,
            "emotional_appeal": float,
            "call_to_action": bool,
            "hashtag_quality": float,
            "suggestions": list
        }
    """
```

#### 3. Trend Detection
```python
def detect_trends() -> dict:
    """
    Identifies current trending topics.
    
    Returns:
        dict: {
            "trending_hashtags": list,
            "trending_topics": list,
            "emerging_trends": list,
            "industry_trends": list
        }
    """
```

#### 4. Sentiment Analysis
```python
def analyze_sentiment(comments: List[str]) -> dict:
    """
    Analyzes sentiment of user comments.
    
    Returns:
        dict: {
            "overall_sentiment": str,
            "sentiment_breakdown": {
                "positive": float,
                "neutral": float,
                "negative": float
            },
            "key_themes": list,
            "action_items": list
        }
    """
```

#### 5. Caption Rewriter
```python
def rewrite_caption(
    content: str,
    style: str = "professional",
    platform: str = "general"
) -> dict:
    """
    Rewrites content in different tones.
    
    Styles: professional, casual, humorous, urgent, inspirational
    
    Returns:
        dict: {
            "original": str,
            "rewritten": str,
            "style": str,
            "improvements": list
        }
    """
```

#### 6. Multilingual Translation
```python
def generate_multilingual(
    content: str,
    languages: List[str]
) -> dict:
    """
    Translates content to multiple languages.
    
    Returns:
        dict: {
            "original": str,
            "translations": {
                "es": str,  # Spanish
                "fr": str,  # French
                "de": str,  # German
                ...
            }
        }
    """
```

---

## API Reference

### Authentication
Currently, the API operates without authentication for development. In production, implement JWT-based authentication.

### Request/Response Format

All API responses follow this structure:
```json
{
    "status": "success",
    "data": { ... },
    "message": "Optional message"
}
```

Error responses:
```json
{
    "status": "error",
    "detail": "Error description",
    "code": "ERROR_CODE"
}
```

### Rate Limiting
No rate limiting implemented in development. For production, consider implementing rate limiting using FastAPI middleware.

---

## Database Schema

### Posts Table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| content | VARCHAR | Post content |
| platform | VARCHAR | twitter/instagram/linkedin/facebook |
| status | VARCHAR | draft/scheduled/published |
| scheduled_time | DATETIME | Scheduled publish time |
| created_at | DATETIME | Creation timestamp |
| updated_at | DATETIME | Last update timestamp |
| likes | INTEGER | Like count |
| comments | INTEGER | Comment count |
| shares | INTEGER | Share count |
| impressions | INTEGER | View count |

---

## Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
DATABASE_URL=sqlite:///./social_ai.db

# API Keys (for production)
TWITTER_API_KEY=your_key
TWITTER_API_SECRET=your_secret
INSTAGRAM_ACCESS_TOKEN=your_token
LINKEDIN_CLIENT_ID=your_id
LINKEDIN_CLIENT_SECRET=your_secret

# Server
HOST=0.0.0.0
PORT=8000
DEBUG=true
```

### Vite Configuration (`vite.config.js`)

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
});
```

---

## Deployment Guide

### Docker Deployment

#### Backend Dockerfile
```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Frontend Dockerfile
```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=sqlite:///./data/social_ai.db
    volumes:
      - ./data:/app/data

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
```

### Production Checklist

- [ ] Enable HTTPS
- [ ] Set up proper CORS origins
- [ ] Implement authentication (JWT)
- [ ] Add rate limiting
- [ ] Set up logging and monitoring
- [ ] Configure database backups
- [ ] Set up CI/CD pipeline
- [ ] Add health check endpoints
- [ ] Implement proper error handling
- [ ] Add API versioning

---

## Support

For issues and feature requests, please open an issue on GitHub:
https://github.com/prince2109/social-media-manager/issues

---

**Author:** prince2109  
**Last Updated:** February 2026
