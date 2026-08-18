import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv(
    "MONGO_URI",
    "mongodb://localhost:27017"
)

DATABASE_NAME = os.getenv(
    "DATABASE_NAME",
    "citifix"
)

SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "citifix-secret-key"
)

ALGORITHM = "HS256"