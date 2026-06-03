from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app.database import get_db
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


@router.post("/thumbnail/{slug}", status_code=201)
def upload_thumbnail(slug: str, file: UploadFile = File(...), db: Session = Depends(get_db)):
    project = _get_project_or_404(db, slug)
    url = upload_service.upload_thumbnail(slug, file)
    project.thumbnail_url = url
    db.commit()
    return {"url": url}


@router.post("/image/{slug}", status_code=201)
def upload_image(slug: str, file: UploadFile = File(...), db: Session = Depends(get_db)):
    project = _get_project_or_404(db, slug)
    index = len(project.images or []) + 1
    url = upload_service.upload_image(slug, file, index)
    project.images = (project.images or []) + [url]
    db.commit()
    return {"url": url}


@router.post("/video/{slug}", status_code=201)
def upload_video(slug: str, file: UploadFile = File(...), db: Session = Depends(get_db)):
    project = _get_project_or_404(db, slug)
    url = upload_service.upload_video(slug, file)
    project.video_url = url
    db.commit()
    return {"url": url}
