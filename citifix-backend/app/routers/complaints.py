from pathlib import Path
from typing import Optional

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form,
    Depends,
    HTTPException,
)

from app.models.complaint import Complaint
from app.models.user import User
from app.services.ai_service import analyze_image
from app.services.priority import calculate_priority
from app.core.security import get_current_user, get_current_admin


router = APIRouter(
    prefix="/complaints",
    tags=["Complaints"],
)


# Create a new complaint and analyze its image with AI.
@router.post("/")
async def create_complaint(
    issue_type: Optional[str] = Form(None),
    description: str = Form(""),
    latitude: float = Form(...),
    longitude: float = Form(...),
    image: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
):

    # Make sure the upload folder exists.
    upload_dir = Path("uploads")
    upload_dir.mkdir(parents=True, exist_ok=True)

    # Save the uploaded complaint image.
    image_path = upload_dir / image.filename

    content = await image.read()

    with open(image_path, "wb") as file:
        file.write(content)

    # Analyze the image using the trained AI models.
    ai_result = analyze_image(str(image_path))

    detected_issue_type = ai_result["issue_type"]
    confidence = ai_result["confidence"]

    # Reject images when none of the supported civic issues is detected.
    if detected_issue_type == "Pending":
        # Remove the unsupported image because no complaint was created.
        image_path.unlink(missing_ok=True)

        raise HTTPException(
            status_code=400,
            detail=(
                "No supported civic issue detected. "
                "Please upload an image showing a pothole, "
                "garbage accumulation, or waterlogging."
            ),
        )

    # Always use the AI-detected issue instead of trusting the submitted issue type.
    final_issue_type = detected_issue_type

    # Calculate severity and priority from AI confidence.
    severity, priority = calculate_priority(
        confidence=confidence
    )

    # Store the valid AI-detected complaint in MongoDB.
    complaint = Complaint(
        issue_type=final_issue_type,
        description=description,
        latitude=latitude,
        longitude=longitude,
        image_path=str(image_path),
        ai_confidence=confidence,
        severity=severity,
        priority=priority,
        created_by=str(current_user.id),
    )

    await complaint.insert()

    # Return the newly created complaint information.
    return {
        "message": "Complaint submitted successfully",
        "complaint_id": str(complaint.id),
        "issue_type": final_issue_type,
        "ai_confidence": confidence,
        "severity": severity,
        "priority": priority,
        "created_by": str(current_user.id),
    }


# Get complaints submitted by the current citizen.
@router.get("/")
async def get_complaints(
    current_user: User = Depends(get_current_user),
):

    # Return only complaints belonging to this citizen.
    complaints = await Complaint.find(
        Complaint.created_by == str(current_user.id)
    ).to_list()

    return complaints


# Get all complaints for the admin dashboard with citizen information.
@router.get("/admin/all")
async def get_all_complaints(
    current_admin: User = Depends(get_current_admin),
):

    # Fetch all complaints and show newest complaints first.
    complaints = await Complaint.find_all(
        sort=[("-created_at", 1)]
    ).to_list()

    # Build the admin response with complaint and citizen details.
    result = []

    for complaint in complaints:

        # Find the user who submitted this complaint.
        user = await User.get(complaint.created_by)

        # Return both complaint ID and citizen information.
        result.append({
            "complaint_id": str(complaint.id),
            "user_id": complaint.created_by,
            "user_name": user.name if user else "Unknown",
            "issue_type": complaint.issue_type,
            "description": complaint.description,
            "latitude": complaint.latitude,
            "longitude": complaint.longitude,
            "image_path": complaint.image_path,
            "ai_confidence": complaint.ai_confidence,
            "severity": complaint.severity,
            "priority": complaint.priority,
            "status": complaint.status,
            "created_at": complaint.created_at,
        })

    return result


# Get one complaint by ID for the logged-in citizen or an admin.
@router.get("/{complaint_id}")
async def get_complaint_by_id(
    complaint_id: str,
    current_user: User = Depends(get_current_user),
):
    # Find the requested complaint using its MongoDB ID.
    complaint = await Complaint.get(complaint_id)

    # Return an error when the complaint does not exist.
    if not complaint:
        raise HTTPException(
            status_code=404,
            detail="Complaint not found"
        )

    # Allow admins to view any complaint.
    if current_user.role != "admin":
        # Allow citizens to view only complaints they submitted.
        if complaint.created_by != str(current_user.id):
            raise HTTPException(
                status_code=403,
                detail="You can only view your own complaints"
            )

    # Find the citizen who submitted the complaint.
    user = await User.get(complaint.created_by)

    # Return complaint details together with citizen information.
    return {
        "complaint_id": str(complaint.id),
        "user_id": complaint.created_by,
        "user_name": user.name if user else "Unknown",
        "issue_type": complaint.issue_type,
        "description": complaint.description,
        "latitude": complaint.latitude,
        "longitude": complaint.longitude,
        "image_path": complaint.image_path,
        "ai_confidence": complaint.ai_confidence,
        "severity": complaint.severity,
        "priority": complaint.priority,
        "status": complaint.status,
        "created_at": complaint.created_at,
    }


# Update complaint status for admins.
@router.put("/{complaint_id}/status")
async def update_complaint_status(
    complaint_id: str,
    status: str = Form(...),
    current_admin: User = Depends(get_current_admin),
):

    # Define the valid complaint workflow statuses.
    valid_statuses = {
        "Submitted",
        "Under Review",
        "Assigned",
        "Resolved",
    }

    # Reject invalid status values.
    if status not in valid_statuses:
        raise HTTPException(
            status_code=400,
            detail="Invalid complaint status",
        )

    # Find the requested complaint.
    complaint = await Complaint.get(complaint_id)

    # Return an error when the complaint does not exist.
    if not complaint:
        raise HTTPException(
            status_code=404,
            detail="Complaint not found",
        )

    # Update and save the complaint status.
    complaint.status = status
    await complaint.save()

    return {
        "message": "Complaint status updated successfully",
        "complaint_id": str(complaint.id),
        "status": complaint.status,
    }