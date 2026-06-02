from datetime import datetime
from typing import Optional, List
from uuid import UUID
from pydantic import BaseModel, Field


class ProjectBase(BaseModel):
    title: str
    slug: str
    description: Optional[str] = None
    content: Optional[str] = None
    thumbnail_url: Optional[str] = None
    images: List[str] = Field(default_factory=list)
    tech_stack: List[str] = Field(default_factory=list)
    category: Optional[str] = None
    demo_url: Optional[str] = None
    repo_url: Optional[str] = None
    featured: bool = False
    order: int = 0
    status: str = "completed"


class ProjectCreate(ProjectBase):
    pass


class ProjectResponse(ProjectBase):
    id: UUID
    created_at: datetime

    model_config = {"from_attributes": True}
