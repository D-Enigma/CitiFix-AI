from pymongo import AsyncMongoClient
from beanie import init_beanie

from app.core.config import MONGO_URI, DATABASE_NAME
from app.models.user import User
from app.models.complaint import Complaint


async def init_database():

    client = AsyncMongoClient(MONGO_URI)

    database = client[DATABASE_NAME]

    await init_beanie(
        database=database,
        document_models=[
            User,
            Complaint
        ]
    )