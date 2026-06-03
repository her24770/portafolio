"""crear tablas iniciales

Revision ID: 001
Revises:
Create Date: 2024-01-01 00:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = "001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute('CREATE EXTENSION IF NOT EXISTS "pgcrypto"')

    op.create_table(
        "projects",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            server_default=sa.text("gen_random_uuid()"),
            primary_key=True,
        ),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("slug", sa.String(), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("content", sa.Text(), nullable=True),
        sa.Column("thumbnail_url", sa.String(), nullable=True),
        sa.Column("images", postgresql.JSONB(), server_default="[]"),
        sa.Column("category", sa.String(), nullable=True),
        sa.Column("demo_url", sa.String(), nullable=True),
        sa.Column("repo_urls", postgresql.JSONB(), server_default="[]"),
        sa.Column("featured", sa.Boolean(), server_default="false"),
        sa.Column("order", sa.Integer(), server_default="0"),
        sa.Column("status", sa.String(), server_default="completed"),
        sa.Column("year", sa.Integer(), nullable=True),
        sa.Column("problem_solved", sa.Text(), nullable=True),
        sa.Column("architecture", sa.Text(), nullable=True),
        sa.Column("challenges", sa.Text(), nullable=True),
        sa.Column("what_i_learned", sa.Text(), nullable=True),
        sa.Column("would_do_different", sa.Text(), nullable=True),
        sa.Column("setup_instructions", sa.Text(), nullable=True),
        sa.Column("team_size", sa.Integer(), nullable=True),
        sa.Column("team_description", sa.Text(), nullable=True),
        sa.Column("role", sa.String(), nullable=True),
        sa.Column("video_url", sa.String(), nullable=True),
        sa.Column("created_at", sa.TIMESTAMP(), server_default=sa.text("now()")),
        sa.UniqueConstraint("slug"),
    )

    op.create_table(
        "contact_messages",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            server_default=sa.text("gen_random_uuid()"),
            primary_key=True,
        ),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("email", sa.String(), nullable=False),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("read", sa.Boolean(), server_default="false"),
        sa.Column("created_at", sa.TIMESTAMP(), server_default=sa.text("now()")),
    )


def downgrade() -> None:
    op.drop_table("contact_messages")
    op.drop_table("projects")
