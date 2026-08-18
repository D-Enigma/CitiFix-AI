from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.core.database import init_database
from app.routers.auth import router as auth_router
from app.routers.complaints import router as complaint_router


@asynccontextmanager
async def lifespan(app: FastAPI):

    await init_database()

    yield


app = FastAPI(
    title="CitiFix AI Backend",
    description="AI-powered urban infrastructure monitoring API",
    version="1.0.0",
    lifespan=lifespan
)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Serve uploaded complaint images
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)


# Routers
app.include_router(auth_router)
app.include_router(complaint_router)


@app.get("/")
async def root():

    return {
        "message": "CitiFix AI Backend is running"
    }