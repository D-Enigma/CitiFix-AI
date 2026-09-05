from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.core.database import init_database
from app.routers.auth import router as auth_router
from app.routers.complaints import router as complaint_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize the MongoDB database when the backend starts.
    await init_database()

    yield


app = FastAPI(
    title="CitiFix AI Backend",
    description="AI-powered urban infrastructure monitoring API",
    version="1.0.0",
    lifespan=lifespan
)


# CORS
# Allow the live Vercel domains and local frontend to access the API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://citifix-ai.vercel.app",
        "https://citi-fix-l17g06w19-citi-fix-ai.vercel.app",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Create the upload directory before serving uploaded images.
Path("uploads").mkdir(parents=True, exist_ok=True)

# Serve uploaded complaint evidence images through the backend.
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)


# Register authentication routes.
app.include_router(auth_router)

# Register complaint routes.
app.include_router(complaint_router)


@app.get("/")
async def root():
    # Return a simple message to confirm that the backend is running.
    return {
        "message": "CitiFix AI Backend is running"
    }