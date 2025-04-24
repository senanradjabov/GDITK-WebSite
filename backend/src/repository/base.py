from sqlalchemy import insert, select, update

from src.database import Base, async_session_factory


class BaseRepository:
    model: Base | None = None

    @classmethod
    async def find_all(cls, **filter_by):
        async with async_session_factory() as session:
            smtp = select(cls.model.__table__.columns).filter_by(**filter_by)
            result = await session.execute(smtp)

            return result.mappings().all()

    @classmethod
    async def find_one_or_none(cls, **filter_by):
        async with async_session_factory() as session:
            smtp = select(cls.model.__table__.columns).filter_by(**filter_by)
            result = await session.execute(smtp)

            return result.mappings().one_or_none()

    @classmethod
    async def insert_data(cls, **model_data):
        async with async_session_factory() as session:
            smtp = (
                insert(cls.model)
                .values(**model_data)
                .returning(cls.model.__table__.columns)
            )
            result = await session.execute(smtp)
            await session.commit()

            return result.mappings().one()

    @classmethod
    async def delete_data(cls, **filter_by):
        async with async_session_factory() as session:
            smtp = select(cls.model).filter_by(**filter_by)
            result = await session.execute(smtp)

            item = result.scalar_one_or_none()

            if not item:
                return False

            await session.delete(item)
            await session.commit()

            return True
