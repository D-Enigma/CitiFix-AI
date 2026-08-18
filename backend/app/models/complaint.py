from datetime import datetime

from beanie import Document
from pydantic import Field


class Complaint(Document):

    issue_type: str
    description: str

    latitude: float
    longitude: float

    image_path: str | None = None

    ai_confidence: float | None = None

    severity: str = "Pending"
    priority: str = "Pending"

    status: str = "Submitted"

    created_by: str

    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )

    class Settings:
        name = "complaints"