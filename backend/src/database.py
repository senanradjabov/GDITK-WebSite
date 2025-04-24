from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from .config import settings

async_engine = create_async_engine(url=settings.async_pg_db_url)
async_session_factory = async_sessionmaker(async_engine)


class Base(DeclarativeBase):
    pass
