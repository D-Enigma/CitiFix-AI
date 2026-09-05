import asyncio
import os

from dotenv import load_dotenv

from app.core.database import init_database
from app.core.security import hash_password
from app.models.user import User

# Load admin credentials from the private environment file.
load_dotenv()


# Create the admin account in MongoDB.
async def create_admin():

    # Connect to the configured MongoDB database.
    await init_database()

    # Read the admin credentials from environment variables.
    admin_email = os.getenv("ADMIN_EMAIL")
    admin_password = os.getenv("ADMIN_PASSWORD")

    # Stop if the required admin credentials are missing.
    if not admin_email or not admin_password:
        print("ADMIN_EMAIL and ADMIN_PASSWORD must be set in the environment.")
        return

    # Check whether this admin email already exists.
    existing_user = await User.find_one(
        User.email == admin_email
    )

    if existing_user:
        print("Admin account already exists.")
        return

    # Create the admin user with a securely hashed password.
    admin = User(
        name="CitiFix Administrator",
        email=admin_email,
        password=hash_password(admin_password),
        role="admin",
    )

    # Save the admin account to MongoDB.
    await admin.insert()

    print("Admin account created successfully.")


# Run the admin creation function.
asyncio.run(create_admin())