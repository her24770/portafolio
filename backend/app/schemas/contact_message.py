from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, EmailStr


class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    message: str


class ContactMessageResponse(BaseModel):
    id: UUID
    name: str
    email: str
    message: str
    read: bool
    created_at: datetime

    model_config = {"from_attributes": True}
