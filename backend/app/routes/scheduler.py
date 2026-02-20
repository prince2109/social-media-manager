from fastapi import APIRouter

router = APIRouter(prefix="/schedule")

scheduled_posts = []

@router.post("/")
def schedule_post(post: dict):
    scheduled_posts.append(post)
    return {"message": "Post scheduled", "data": post}

@router.get("/")
def get_schedule():
    return scheduled_posts
