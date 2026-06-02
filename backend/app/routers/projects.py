from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.services import project_service
from app.schemas.project import ProjectResponse

router = APIRouter(prefix="/api/projects", tags=["projects"])


@router.get("", response_model=List[ProjectResponse])
def list_projects(
    featured: Optional[bool] = None,
    category: Optional[str] = None,
    db: Session = Depends(get_db),
):
    return project_service.get_all_projects(db, featured=featured, category=category)


@router.get("/{slug}", response_model=ProjectResponse)
def get_project(slug: str, db: Session = Depends(get_db)):
    project = project_service.get_project_by_slug(db, slug)
    if not project:
        raise HTTPException(
            status_code=404,
            detail={
                "error": True,
                "code": "NOT_FOUND",
                "message": f"El proyecto con slug '{slug}' no existe",
            },
        )
    return project
