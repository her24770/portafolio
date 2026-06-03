from uuid import UUID
from pydantic import BaseModel


class TechnologyResponse(BaseModel):
    id: UUID
    name: str
    icon: str | None = None
    category: str | None = None

    model_config = {"from_attributes": True}


class TechnologyWithImportance(BaseModel):
    id: UUID
    name: str
    icon: str | None = None
    category: str | None = None
    importance: str  # "primary" | "secondary"
