from sqlalchemy import update, select
from sqlalchemy.orm import selectinload

from src.database import async_session_factory
from src.faculty.models import Manager
from src.repository.base import BaseRepository
from src.universty.models import History


class HistoryRepository(BaseRepository):
    model = History

    @classmethod
    async def get_history(cls):
        async with async_session_factory() as session:
            smtp = select(cls.model.__table__.columns).where(cls.model.id == 1)

            result = await session.execute(smtp)

            return result.mappings().one()

    @classmethod
    async def update_data(cls, description: str):
        async with async_session_factory() as session:
            smtp = update(
                cls.model
            ).values(
                description=description
            ).where(
                cls.model.id == 1
            ).returning(
                cls.model.__table__.columns
            )

            result = await session.execute(smtp)
            await session.commit()

            return result.mappings().one()


class ManagerRepository(BaseRepository):
    model = Manager

    @classmethod
    async def find_all(cls, **filter_by):
        async with async_session_factory() as session:
            smtp = select(
                cls.model
            ).options(
                selectinload(cls.model.staff)
            )

            result = await session.execute(smtp)

            return result.scalars().all()

    @classmethod
    async def get_leader(cls):
        async with async_session_factory() as session:
            smtp = select(
                cls.model
            ).options(
                selectinload(cls.model.staff)
            ).where(cls.model.is_leader == True)

            result = await session.execute(smtp)

            return result.scalar_one_or_none()

    @classmethod
    async def get_manager_data(cls):
        async with async_session_factory() as session:
            smtp = select(
                cls.model
            ).options(
                selectinload(cls.model.staff)
            ).where(cls.model.is_leader == False)

            result = await session.execute(smtp)

            return result.scalars().all()

    @classmethod
    async def update_data(cls, management_id: int, title: str, staff_id: int):
        async with async_session_factory() as session:
            smtp = update(
                cls.model
            ).values(
                title=title,
                staff_id=staff_id
            ).filter_by(
                id=management_id,
            ).returning(
                cls.model.__table__.columns
            )

            result = await session.execute(smtp)
            await session.commit()

            return result.mappings().one()
