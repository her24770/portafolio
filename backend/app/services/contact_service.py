from sqlalchemy.orm import Session
from app.models.contact_message import ContactMessage
from app.schemas.contact_message import ContactMessageCreate


def create_contact_message(db: Session, data: ContactMessageCreate) -> ContactMessage:
    message = ContactMessage(
        name=data.name,
        email=data.email,
        message=data.message,
    )
    db.add(message)
    db.commit()
    db.refresh(message)
    return message
