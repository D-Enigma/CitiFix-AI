from pydantic import BaseModel
from typing import Optional


class ComplaintResponse(BaseModel):
    id: str
    issue_type: str
    description: Optional[str] = None
    latitude: float
    longitude: float
    image_path: str
    ai_confidence: Optional[float] = None
    severity: str
    priority: str
    status: str
    created_by: str