import uuid
from sqlalchemy import Column, String, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base


class ProjectTechnology(Base):
    __tablename__ = "project_technologies"

    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id", ondelete="CASCADE"), primary_key=True)
    technology_id = Column(UUID(as_uuid=True), ForeignKey("technologies.id", ondelete="CASCADE"), primary_key=True)
    importance = Column(String, default="secondary", server_default="secondary")

    technology = relationship("Technology", lazy="joined")


class Technology(Base):
    __tablename__ = "technologies"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, unique=True, nullable=False)
    icon = Column(String, nullable=True)
    category = Column(String, nullable=True)
    my_stack = Column(Boolean, default=False, server_default="false")
    level = Column(String(20), default="Básico", server_default="Básico")
    color = Column(String(20), nullable=True)
