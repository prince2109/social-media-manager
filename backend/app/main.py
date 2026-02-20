from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import posts, insights, scheduler, ai

app = FastAPI(title="Autonomous Social Media Manager")

# Enable CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(posts.router)
app.include_router(insights.router)
app.include_router(scheduler.router)
app.include_router(ai.router)

@app.get("/")
def root():
    return {"status": "Backend running"}