import uuid
from sqlalchemy import Column, String, Text, Boolean, Integer, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from app.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, nullable=False)
    description = Column(Text, nullable=True)
    content = Column(Text, nullable=True)
    thumbnail_url = Column(String, nullable=True)
    images = Column(JSONB, default=list, server_default="[]")
    tech_stack = Column(JSONB, default=list, server_default="[]")
    category = Column(String, nullable=True)
    demo_url = Column(String, nullable=True)
    repo_url = Column(String, nullable=True)
    featured = Column(Boolean, default=False, server_default="false")
    order = Column(Integer, default=0, server_default="0")
    status = Column(String, default="completed", server_default="completed")
    created_at = Column(TIMESTAMP, server_default=func.now())
