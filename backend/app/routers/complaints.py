from fastapi import APIRouter, UploadFile, File, Form, Depends
import os

from app.models.complaint import Complaint
from app.models.user import User
from app.services.priority import calculate_priority
from app.core.security import get_current_user


router = APIRouter(
    prefix="/complaints",
    tags=["Complaints"],
)


@router.post("/")
async def create_complaint(
    issue_type: str = Form(...),
    description: str = Form(""),
    latitude: float = Form(...),
    longitude: float = Form(...),
    image: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
):

    # Create uploads folder if it doesn't exist
    os.makedirs("uploads", exist_ok=True)

    # Save image
    image_path = f"uploads/{image.filename}"

    with open(image_path, "wb") as file:
        content = await image.read()
        file.write(content)

    # No AI model yet
    # Therefore confidence is None
    severity, priority = calculate_priority(
        confidence=None
    )

    # Create database document
    complaint = Complaint(
        issue_type=issue_type,
        description=description or "",
        latitude=latitude,
        longitude=longitude,
        image_path=image_path,
        severity=severity,
        priority=priority,
        created_by=str(current_user.id),
    )

    # Save to MongoDB
    await complaint.insert()

    return {
        "message": "Complaint submitted successfully",
        "complaint_id": str(complaint.id),
        "severity": severity,
        "priority": priority,
        "created_by": str(current_user.id),
    }


@router.get("/")
async def get_complaints(
    current_user: User = Depends(get_current_user),
):

    complaints = await Complaint.find(
        Complaint.created_by == str(current_user.id)
    ).to_list()

    return complaints