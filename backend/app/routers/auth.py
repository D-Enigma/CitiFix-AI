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


@router.post("/register")
async def register(user_data: UserCreate):

    existing_user = await User.find_one(
        User.email == user_data.email
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )

    user = User(
        name=user_data.name,
        email=user_data.email,
        password=hash_password(user_data.password),
        role="citizen",
    )

    await user.insert()

    return {
        "message": "User registered successfully",
        "user_id": str(user.id),
        "role": user.role,
    }


@router.post("/login", response_model=TokenResponse)
async def login(user_data: UserLogin):

    user = await User.find_one(
        User.email == user_data.email
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
        )

    if not verify_password(
        user_data.password,
        user.password,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
        )

    token = create_access_token(
        str(user.id),
        user.role,
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role,
    }