from datetime import datetime
from typing import Optional, List
from uuid import UUID
from pydantic import BaseModel, Field
from app.schemas.technology import TechnologyResponse


class ProjectBase(BaseModel):
    title: str
    slug: str
    description: Optional[str] = None
    content: Optional[str] = None
    thumbnail_url: Optional[str] = None
    images: List[str] = Field(default_factory=list)
    category: Optional[str] = None
    demo_url: Optional[str] = None
    repo_urls: List[str] = Field(default_factory=list)
    featured: bool = False
    order: int = 0
    status: str = "completed"
    year: Optional[int] = None
    problem_solved: Optional[str] = None
    architecture: Optional[str] = None
    challenges: Optional[str] = None
    what_i_learned: Optional[str] = None
    would_do_different: Optional[str] = None
    setup_instructions: Optional[str] = None
    team_size: Optional[int] = None
    team_description: Optional[str] = None
    role: Optional[str] = None


class ProjectCreate(ProjectBase):
    pass


class ProjectResponse(ProjectBase):
    id: UUID
    created_at: datetime
    technologies: List[TechnologyResponse] = Field(default_factory=list)

    model_config = {"from_attributes": True}
