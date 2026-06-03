from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database import get_db
from app.services import chat_service

router = APIRouter(prefix="/api/chat", tags=["chat"])


class HistoryMessage(BaseModel):
    role: str
    text: str


class ChatRequest(BaseModel):
    message: str
    history: list[HistoryMessage] = []


@router.post("")
def chat(request: ChatRequest, db: Session = Depends(get_db)):
    if not request.message.strip():
        raise HTTPException(
            status_code=400,
            detail={
                "error": True,
                "code": "VALIDATION_ERROR",
                "message": "El mensaje no puede estar vacío",
            },
        )
    history = [{"role": m.role, "text": m.text} for m in request.history]
    response = chat_service.process_chat(db, request.message, history)
    return {"response": response}
