from sqlalchemy import func, select, update

from src.database import async_session_factory
from src.repository.base import BaseRepository
from src.specialties.models import Specialties
from src.specialties.schemas import SpecialtiesSchema


class SpecialtiesRepository(BaseRepository):
    model = Specialties

    @classmethod
    async def get_total_items(cls, **filter_by) -> int:
        async with async_session_factory() as session:
            smtp = select(func.count(cls.model.id)).filter_by(**filter_by)
            result = await session.execute(smtp)

            return result.scalar()

    @classmethod
    async def update_data(cls, spec_id: str, title: str):
        async with async_session_factory() as session:
            smtp = (
                update(cls.model)
                .values(
                    title=title,
                )
                .filter_by(id=spec_id)
                .returning(cls.model.__table__.columns)
            )

            result = await session.execute(smtp)
            await session.commit()

            return result.mappings().one()
