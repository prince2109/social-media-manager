from fastapi import APIRouter
from typing import List, Optional
from pydantic import BaseModel
from app.services.ai_services import (
    predict_engagement,
    score_content_performance,
    detect_trends,
    segment_audience,
    analyze_sentiment,
    analyze_competitors,
    rewrite_caption,
    generate_multilingual
)

router = APIRouter(prefix="/ai", tags=["AI Features"])


class EngagementRequest(BaseModel):
    content: str
    platform: str = "twitter"
    content_type: str = "text"
    scheduled_time: Optional[str] = None


class ContentScoreRequest(BaseModel):
    content: str
    platform: str = "twitter"


class SentimentRequest(BaseModel):
    comments: List[str]


class CompetitorRequest(BaseModel):
    handles: Optional[List[str]] = None


class RewriteRequest(BaseModel):
    content: str
    style: str = "engaging"
    platform: str = "twitter"


class MultilingualRequest(BaseModel):
    content: str
    languages: Optional[List[str]] = None


@router.post("/predict-engagement")
def api_predict_engagement(request: EngagementRequest):
    """Predict engagement metrics before publishing"""
    return predict_engagement(
        content=request.content,
        platform=request.platform,
        content_type=request.content_type,
        scheduled_time=request.scheduled_time
    )


@router.post("/score-content")
def api_score_content(request: ContentScoreRequest):
    """Score content performance potential"""
    return score_content_performance(
        content=request.content,
        platform=request.platform
    )


@router.get("/trends")
def api_get_trends():
    """Get trending hashtags, topics, and news"""
    return detect_trends()


@router.get("/audience-segments")
def api_get_audience_segments():
    """Get audience segmentation analysis"""
    return segment_audience()


@router.post("/analyze-sentiment")
def api_analyze_sentiment(request: SentimentRequest):
    """Analyze sentiment of comments"""
    return analyze_sentiment(comments=request.comments)


@router.get("/sentiment-demo")
def api_sentiment_demo():
    """Get sentiment analysis with demo data"""
    return analyze_sentiment()


@router.post("/competitors")
def api_analyze_competitors(request: CompetitorRequest):
    """Analyze competitor performance"""
    return analyze_competitors(competitor_handles=request.handles)


@router.get("/competitors-demo")
def api_competitors_demo():
    """Get competitor analysis with demo data"""
    return analyze_competitors()


@router.post("/rewrite-caption")
def api_rewrite_caption(request: RewriteRequest):
    """Rewrite caption for higher engagement"""
    return rewrite_caption(
        original=request.content,
        style=request.style,
        platform=request.platform
    )


@router.post("/translate")
def api_translate(request: MultilingualRequest):
    """Generate multilingual content"""
    return generate_multilingual(
        content=request.content,
        target_languages=request.languages
    )
