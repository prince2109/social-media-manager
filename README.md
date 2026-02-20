# SocialAI - AI-Powered Social Media Manager

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi" alt="FastAPI">
  <img src="https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python" alt="Python">
  <img src="https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite" alt="Vite">
</p>

A modern, full-stack social media management platform with AI-powered features for engagement prediction, content optimization, sentiment analysis, and more.

## Features

### Dashboard
- **Real-time Analytics** - Track followers, impressions, engagement rate, and link clicks
- **Content Calendar** - Visual calendar showing scheduled posts across platforms
- **Recent Posts** - Quick view of published, scheduled, and draft posts
- **AI Insights** - Smart recommendations for optimal posting times and trending hashtags

### AI-Powered Features
- **Engagement Prediction** - ML model predicts expected likes, comments, and shares
- **Content Scoring** - Analyze content quality and get optimization suggestions
- **Sentiment Analysis** - Understand audience sentiment from comments
- **Competitor Analysis** - Track competitor performance metrics
- **Caption Rewriter** - AI rewrites captions in different tones (professional, casual, humorous)
- **Multilingual Support** - Auto-translate content to multiple languages
- **Trend Detection** - Identify trending topics and hashtags
- **Audience Segmentation** - Segment audience by demographics and behavior

### Multi-Platform Support
- Twitter / X
- Instagram
- LinkedIn
- Facebook

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Vite** - Next-generation frontend build tool
- **Custom CSS** - Modern UI with CSS variables and responsive design

### Backend
- **FastAPI** - High-performance Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **Uvicorn** - Lightning-fast ASGI server
- **Pydantic** - Data validation using Python type annotations

## Project Structure

```
project/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI application entry
│   │   ├── database.py          # Database configuration
│   │   ├── models.py            # SQLAlchemy models
│   │   ├── routes/
│   │   │   ├── auth.py          # Authentication routes
│   │   │   ├── posts.py         # Post CRUD operations
│   │   │   ├── insights.py      # Analytics endpoints
│   │   │   └── ai.py            # AI feature endpoints
│   │   └── services/
│   │       ├── ai_services.py   # AI/ML service functions
│   │       ├── analytics.py     # Analytics processing
│   │       ├── content_generator.py
│   │       └── social_api.py    # Social platform integrations
│   └── worker/
│       └── celery_worker.py     # Background task worker
│
├── frontend/
│   ├── api/
│   │   └── api.js               # API client functions
│   ├── components/
│   │   ├── Sidebar.jsx          # Navigation sidebar
│   │   ├── Header.jsx           # Page header with search
│   │   ├── StatsCards.jsx       # Analytics stats display
│   │   ├── ContentCalendar.jsx  # Calendar component
│   │   ├── ComposePost.jsx      # Post composer
│   │   ├── RecentPosts.jsx      # Posts list
│   │   └── AIInsights.jsx       # AI suggestions panel
│   ├── pages/
│   │   ├── Dashboard.jsx        # Main dashboard
│   │   ├── Compose.jsx          # Full post editor
│   │   ├── Calendar.jsx         # Calendar view
│   │   ├── Analytics.jsx        # Analytics page
│   │   └── Settings.jsx         # User settings
│   ├── App.jsx                  # Root component
│   ├── main.jsx                 # Entry point
│   ├── styles.css               # Global styles
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── DOCUMENTATION.md
```

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- pip

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/prince2109/social-media-manager.git
   cd social-media-manager
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install fastapi uvicorn sqlalchemy pandas scikit-learn python-dotenv
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. **Start the Backend** (Terminal 1)
   ```bash
   cd backend
   python -m uvicorn app.main:app --reload --port 8000
   ```

2. **Start the Frontend** (Terminal 2)
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## API Endpoints

### Posts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts/` | Get all posts |
| POST | `/posts/` | Create a new post |
| GET | `/posts/{id}` | Get post by ID |
| PUT | `/posts/{id}` | Update a post |
| DELETE | `/posts/{id}` | Delete a post |

### AI Features
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/ai/predict-engagement` | Predict post engagement |
| POST | `/ai/score-content` | Get content quality score |
| GET | `/ai/trends` | Get trending topics |
| GET | `/ai/audience-segments` | Get audience segments |
| POST | `/ai/analyze-sentiment` | Analyze comment sentiment |
| POST | `/ai/competitors` | Analyze competitors |
| POST | `/ai/rewrite-caption` | Rewrite caption in different styles |
| POST | `/ai/translate` | Translate content |

### Insights
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/insights/` | Get analytics overview |
| GET | `/insights/engagement` | Get engagement metrics |

## Screenshots

### Dashboard
Modern dashboard with stats cards, content calendar, and AI insights panel.

### Compose Post
Multi-platform post composer with AI-powered content analysis.

### Analytics
Comprehensive analytics with charts and demographic breakdowns.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**prince2109** - [GitHub Profile](https://github.com/prince2109)

## Acknowledgments

- FastAPI for the amazing Python framework
- React team for the powerful UI library
- Vite for the blazing fast build tool

---

<p align="center">Made with ❤️ by prince2109</p>
