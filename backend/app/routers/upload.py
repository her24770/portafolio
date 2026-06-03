from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app.database import get_db
from app.config import get_settings
from app.services import project_service, upload_service

router = APIRouter(prefix="/api/upload", tags=["upload"])


def _get_project_or_404(db: Session, slug: str):
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


def _full_url(path: str) -> str:
    return f"{get_settings().r2_public_url}/{path}"


@router.post("/thumbnail/{slug}", status_code=201)
def upload_thumbnail(slug: str, file: UploadFile = File(...), db: Session = Depends(get_db)):
    project = _get_project_or_404(db, slug)
    path = upload_service.upload_thumbnail(slug, file)
    project.thumbnail_url = path
    db.commit()
    return {"url": _full_url(path)}


@router.post("/image/{slug}", status_code=201)
def upload_image(slug: str, file: UploadFile = File(...), db: Session = Depends(get_db)):
    project = _get_project_or_404(db, slug)
    index = len(project.images or []) + 1
    path = upload_service.upload_image(slug, file, index)
    project.images = (project.images or []) + [path]
    db.commit()
    return {"url": _full_url(path)}


@router.post("/video/{slug}", status_code=201)
def upload_video(slug: str, file: UploadFile = File(...), db: Session = Depends(get_db)):
    project = _get_project_or_404(db, slug)
    path = upload_service.upload_video(slug, file)
    project.video_url = path
    db.commit()
    return {"url": _full_url(path)}
