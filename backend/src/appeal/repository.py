from sqlalchemy import func, select

from src.appeal.models import Appeal
from src.database import async_session_factory
from src.repository.base import BaseRepository


class AppealRepository(BaseRepository):
    model = Appeal

    @classmethod
    async def get_total_items(cls, **filter_by) -> int:
        async with async_session_factory() as session:
            smtp = select(func.count(cls.model.id)).filter_by(**filter_by)
            result = await session.execute(smtp)

            return result.scalar()

    @classmethod
    async def get_pagination_items(cls, page: int, limit: int, **filter_by):
        async with async_session_factory() as session:
            smtp = select(
                cls.model.__table__.columns
            ).filter_by(
                **filter_by
            ).offset(
                (page - 1) * limit
            ).limit(
                limit
            )
            result = await session.execute(smtp)

            return result.mappings().all()