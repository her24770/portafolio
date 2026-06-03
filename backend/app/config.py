from functools import lru_cache
from pathlib import Path
from pydantic_settings import BaseSettings

# En local apunta a portafolio/.env — en Docker las vars vienen inyectadas por docker-compose
_ENV_FILE = Path(__file__).resolve().parent.parent.parent / ".env"


class Settings(BaseSettings):
    database_url: str
    openai_api_key: str
    app_port: int = 8000
    app_env: str = "development"
    cors_origins: str = "http://localhost:5173"

    r2_account_id: str = ""
    r2_access_key_id: str = ""
    r2_secret_access_key: str = ""
    r2_bucket_name: str = ""
    r2_public_url: str = ""

    gmail_user: str = ""
    gmail_app_password: str = ""
    gmail_to: str = ""

    @property
    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",")]

    model_config = {"env_file": str(_ENV_FILE), "env_file_encoding": "utf-8", "extra": "ignore"}


@lru_cache()
def get_settings() -> Settings:
    return Settings()
