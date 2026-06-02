from typing import Optional, List
from sqlalchemy.orm import Session
from app.models.project import Project


def get_all_projects(
    db: Session,
    featured: Optional[bool] = None,
    category: Optional[str] = None,
) -> List[Project]:
    query = db.query(Project)
    if featured is not None:
        query = query.filter(Project.featured == featured)
    if category:
        query = query.filter(Project.category == category)
    return query.order_by(Project.order.asc()).all()


def get_project_by_slug(db: Session, slug: str) -> Optional[Project]:
    return db.query(Project).filter(Project.slug == slug).first()
