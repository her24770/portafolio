from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.config import get_settings
from app.services import project_service
from app.schemas.technology import TechnologyResponse, TechnologyWithImportance
from app.schemas.project import ProjectFeaturedResponse, ProjectListItem, ProjectDetailResponse

router = APIRouter(prefix="/api/projects", tags=["projects"])


def _url(path: str | None) -> str | None:
    if not path:
        return None
    return f"{get_settings().r2_public_url}/{path}"


def _urls(paths: list) -> list:
    return [_url(p) for p in paths if p]


def _build_techs_with_importance(project) -> List[TechnologyWithImportance]:
    return [
        TechnologyWithImportance(
            id=pt.technology.id,
            name=pt.technology.name,
            icon=pt.technology.icon,
            category=pt.technology.category,
            color=pt.technology.color,
            importance=pt.importance,
        )
        for pt in project.project_techs
    ]


def _build_primary_techs(project) -> List[TechnologyResponse]:
    return [
        TechnologyResponse(
            id=pt.technology.id,
            name=pt.technology.name,
            icon=pt.technology.icon,
            category=pt.technology.category,
        )
        for pt in project.project_techs
        if pt.importance == "primary"
    ]


@router.get("/featured", response_model=List[ProjectFeaturedResponse])
def get_featured(db: Session = Depends(get_db)):
    projects = project_service.get_featured_projects(db)
    return [
        ProjectFeaturedResponse(
            id=p.id,
            title=p.title,
            slug=p.slug,
            description=p.description,
            thumbnail_url=_url(p.thumbnail_url),
            order=p.order,
            technologies=_build_primary_techs(p),
        )
        for p in projects
    ]


@router.get("", response_model=List[ProjectListItem])
def list_projects(
    featured: Optional[bool] = None,
    category: Optional[str] = None,
    db: Session = Depends(get_db),
):
    projects = project_service.get_all_projects(db, featured=featured, category=category)
    return [
        ProjectListItem(
            id=p.id,
            title=p.title,
            slug=p.slug,
            description=p.description,
            content=p.content,
            thumbnail_url=_url(p.thumbnail_url),
            category=p.category,
            demo_url=p.demo_url,
            repo_urls=p.repo_urls or [],
            featured=p.featured,
            order=p.order,
            status=p.status,
            year=p.year,
            role=p.role,
            team_size=p.team_size,
            technologies=_build_techs_with_importance(p),
        )
        for p in projects
    ]


@router.get("/{slug}", response_model=ProjectDetailResponse)
def get_project(slug: str, db: Session = Depends(get_db)):
    p = project_service.get_project_by_slug(db, slug)
    if not p:
        raise HTTPException(
            status_code=404,
            detail={
                "error": True,
                "code": "NOT_FOUND",
                "message": f"El proyecto con slug '{slug}' no existe",
            },
        )
    return ProjectDetailResponse(
        id=p.id,
        title=p.title,
        slug=p.slug,
        description=p.description,
        content=p.content,
        thumbnail_url=_url(p.thumbnail_url),
        images=_urls(p.images or []),
        video_url=_url(p.video_url),
        category=p.category,
        demo_url=p.demo_url,
        repo_urls=p.repo_urls or [],
        featured=p.featured,
        order=p.order,
        status=p.status,
        year=p.year,
        problem_solved=p.problem_solved,
        architecture=p.architecture,
        challenges=p.challenges,
        what_i_learned=p.what_i_learned,
        would_do_different=p.would_do_different,
        setup_instructions=p.setup_instructions,
        team_size=p.team_size,
        team_description=p.team_description,
        role=p.role,
        technologies=_build_techs_with_importance(p),
        created_at=p.created_at,
    )
