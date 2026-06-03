import logging
from sqlalchemy.orm import Session
from app.models.contact_message import ContactMessage
from app.schemas.contact_message import ContactMessageCreate
from app.services.email_service import send_contact_notification

logger = logging.getLogger(__name__)


def create_contact_message(db: Session, data: ContactMessageCreate) -> ContactMessage:
    message = ContactMessage(
        name=data.name,
        email=data.email,
        message=data.message,
    )
    db.add(message)
    db.commit()
    db.refresh(message)

    try:
        send_contact_notification(data.name, data.email, data.message)
    except Exception as exc:
        logger.error(f"Error enviando email de contacto: {exc}")

    return message
