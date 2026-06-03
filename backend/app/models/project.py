import uuid
from sqlalchemy import Column, String, Text, Boolean, Integer, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
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
    video_url = Column(String, nullable=True)
    category = Column(String, nullable=True)
    demo_url = Column(String, nullable=True)
    repo_urls = Column(JSONB, default=list, server_default="[]")
    featured = Column(Boolean, default=False, server_default="false")
    order = Column(Integer, default=0, server_default="0")
    status = Column(String, default="completed", server_default="completed")
    year = Column(Integer, nullable=True)
    problem_solved = Column(Text, nullable=True)
    architecture = Column(Text, nullable=True)
    challenges = Column(Text, nullable=True)
    what_i_learned = Column(Text, nullable=True)
    would_do_different = Column(Text, nullable=True)
    setup_instructions = Column(Text, nullable=True)
    team_size = Column(Integer, nullable=True)
    team_description = Column(Text, nullable=True)
    role = Column(String, nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now())

    project_techs = relationship("ProjectTechnology", lazy="joined", cascade="all, delete-orphan")

    @property
    def technologies(self):
        return [pt.technology for pt in self.project_techs]
