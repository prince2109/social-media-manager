from fastapi import APIRouter
from app.services.analytics import extract_insights

router = APIRouter(prefix="/insights")

sample_posts = [
    {"hour": 9, "engagement": 120, "content_type": "image"},
    {"hour": 18, "engagement": 300, "content_type": "video"},
    {"hour": 18, "engagement": 250, "content_type": "text"},
]

@router.get("/")
def get_insights():
    return extract_insights(sample_posts)
