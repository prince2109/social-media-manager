from fastapi import APIRouter

router = APIRouter(prefix="/posts")

@router.get("/")
def get_posts():
    return []

@router.post("/")
def create_post(post: dict):
    return {"message": "Post created", "data": post}
