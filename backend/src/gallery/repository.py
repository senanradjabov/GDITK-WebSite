from sqlalchemy import desc, select, update

from src.database import async_session_factory
from src.gallery.models import Cooperation, MainPageSlider
from src.repository.base import BaseRepository


class MainPageSliderRepository(BaseRepository):
    model = MainPageSlider

    @classmethod
    async def find_all(cls, **filter_by):
        async with async_session_factory() as session:
            smtp = (
                select(cls.model.__table__.columns)
                .filter_by(**filter_by)
                .order_by(desc(cls.model.is_first))
            )
            result = await session.execute(smtp)

            return result.mappings().all()

    @classmethod
    async def update_data(cls, image_id: str, title: str, is_first: bool):
        async with async_session_factory() as session:
            smtp = (
                update(cls.model)
                .values(title=title, is_first=is_first)
                .filter_by(image_id=image_id)
                .returning(cls.model.__table__.columns)
            )
            result = await session.execute(smtp)
            await session.commit()

            return result.mappings().one()


class CooperationRepository(BaseRepository):
    model = Cooperation

    @classmethod
    async def update_data(cls, image_id: str, title: str):
        async with async_session_factory() as session:
            smtp = (
                update(cls.model)
                .values(title=title)
                .filter_by(image_id=image_id)
                .returning(cls.model.__table__.columns)
            )
            result = await session.execute(smtp)
            await session.commit()

            return result.mappings().one()
