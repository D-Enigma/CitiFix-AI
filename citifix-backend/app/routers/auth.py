from fastapi import APIRouter, HTTPException

from app.models.user import User
from app.schemas.user import (
    UserCreate,
    UserLogin,
    TokenResponse,
    UserResponse,
)
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


# Register a new citizen account.
@router.post("/register")
async def register(user_data: UserCreate):

    # Check whether the email is already registered.
    existing_user = await User.find_one(
        User.email == user_data.email
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )

    # Create a new citizen account with a securely hashed password.
    user = User(
        name=user_data.name,
        email=user_data.email,
        password=hash_password(user_data.password),
        role="citizen",
    )

    await user.insert()

    # Return the newly created user's basic account information.
    return {
        "message": "User registered successfully",
        "user_id": str(user.id),
        "name": user.name,
        "role": user.role,
    }


# Login a citizen or admin account.
@router.post("/login", response_model=TokenResponse)
async def login(user_data: UserLogin):

    # Find the account using the submitted email.
    user = await User.find_one(
        User.email == user_data.email
    )

    # Reject the login when the email does not exist.
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
        )

    # Verify the submitted password against the stored password hash.
    if not verify_password(
        user_data.password,
        user.password,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
        )

    # Create a JWT containing the user's ID and role.
    token = create_access_token(
        str(user.id),
        user.role,
    )

    # Return the token and complete user information after login.
    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role,
        "name": user.name,
        "user_id": str(user.id),
    }