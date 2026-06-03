from datetime import datetime
from typing import Optional, List
from uuid import UUID
from pydantic import BaseModel
from app.schemas.technology import TechnologyResponse, TechnologyWithImportance


class ProjectFeaturedResponse(BaseModel):
    id: UUID
    title: str
    slug: str
    description: Optional[str] = None
    thumbnail_url: Optional[str] = None
    order: int = 0
    technologies: List[TechnologyResponse] = []


class ProjectListItem(BaseModel):
    id: UUID
    title: str
    slug: str
    description: Optional[str] = None
    content: Optional[str] = None
    thumbnail_url: Optional[str] = None
    category: Optional[str] = None
    demo_url: Optional[str] = None
    repo_urls: List[str] = []
    featured: bool = False
    order: int = 0
    status: str = "completed"
    year: Optional[int] = None
    role: Optional[str] = None
    team_size: Optional[int] = None
    technologies: List[TechnologyWithImportance] = []


class ProjectDetailResponse(BaseModel):
    id: UUID
    title: str
    slug: str
    description: Optional[str] = None
    content: Optional[str] = None
    thumbnail_url: Optional[str] = None
    images: List[str] = []
    video_url: Optional[str] = None
    category: Optional[str] = None
    demo_url: Optional[str] = None
    repo_urls: List[str] = []
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
    technologies: List[TechnologyWithImportance] = []
    created_at: datetime
