import os

from dotenv import load_dotenv

# Load environment variables from the local .env file.
load_dotenv()


# Read the MongoDB connection string from the environment.
MONGO_URI = os.getenv("MONGO_URI")

# Read the MongoDB database name from the environment.
DATABASE_NAME = os.getenv("DATABASE_NAME", "citifix")

# Read the JWT signing secret from the environment.
SECRET_KEY = os.getenv("SECRET_KEY")

# Stop the application if the required MongoDB connection string is missing.
if not MONGO_URI:
    raise RuntimeError("MONGO_URI is not configured.")

# Stop the application if the required JWT secret is missing.
if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY is not configured.")

# Use HS256 for signing and verifying JWT tokens.
ALGORITHM = "HS256"