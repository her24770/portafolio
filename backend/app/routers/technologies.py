from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.technology import Technology
from app.schemas.technology import TechnologyResponse

router = APIRouter(prefix="/api/technologies", tags=["technologies"])


@router.get("/stack", response_model=List[TechnologyResponse])
def get_my_stack(db: Session = Depends(get_db)):
    return (
        db.query(Technology)
        .filter(Technology.my_stack == True)
        .order_by(Technology.category, Technology.name)
        .all()
    )
