from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.services import contact_service
from app.schemas.contact_message import ContactMessageCreate

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("", status_code=201)
def send_message(data: ContactMessageCreate, db: Session = Depends(get_db)):
    if not data.name.strip() or not data.message.strip():
        raise HTTPException(
            status_code=400,
            detail={
                "error": True,
                "code": "VALIDATION_ERROR",
                "message": "Todos los campos son requeridos",
            },
        )
    contact_service.create_contact_message(db, data)
    return {"success": True, "message": "Mensaje recibido"}
