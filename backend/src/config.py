from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DB_HOST: str
    DB_PORT: int
    DB_USER: str
    DB_PASS: str
    DB_NAME: str

    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    REFRESH_TOKEN_EXPIRE_DAYS: int

    POSTGRES_DB: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str

    ADMIN_LOGIN: str
    ADMIN_PASSWORD: str

    @property
    def async_pg_db_url(self):
        return f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

    model_config = SettingsConfigDict(env_file=".env")


class StaticSettings:
    IMAGES_PATH: str = "src/static/images"
    DOCUMENTS_PATH: str = "src/static/documents"
    BASE_IMAGE_EXTENSION: str = "webp"
    ALLOW_IMAGE_EXTENSIONS: list[str] = ["jpg", "png", "jpeg", "webp"]
    # ALLOW_DOCUMENT_EXTENSIONS: list[str] = ["jpg", "png", "jpeg", "webp"]


settings = Settings()
static_settings = StaticSettings()
