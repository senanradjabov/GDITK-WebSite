from sqlalchemy import func, select, update

from src.database import async_session_factory
from src.news.models import News
from src.news.schemas import NewsSchema
from src.repository.base import BaseRepository


class NewsRepository(BaseRepository):
    model = News

    @classmethod
    async def get_pagination_items(
        cls, page: int, limit: int, **filter_by
    ) -> list[NewsSchema]:
        async with async_session_factory() as session:
            smtp = (
                select(cls.model.__table__.columns)
                .filter_by(**filter_by)
                .order_by(cls.model.created_at.desc())
                .offset((page - 1) * limit)
                .limit(limit)
            )

            result = await session.execute(smtp)

            return result.mappings().all()

    @classmethod
    async def get_total_items(cls, **filter_by) -> int:
        async with async_session_factory() as session:
            smtp = select(func.count(cls.model.id)).filter_by(**filter_by)
            result = await session.execute(smtp)

            return result.scalar()

    @classmethod
    async def get_images(cls, slug: str) -> int:
        async with async_session_factory() as session:
            result = await session.execute(select(News).where(News.slug == slug))
            return result.scalar_one_or_none()

            # return result.scalar_one()

    @classmethod
    async def update_data(cls, slug: str, model_data: NewsSchema):
        async with async_session_factory() as session:
            smtp = (
                update(cls.model)
                .values(
                    title=model_data.title,
                    description=model_data.description,
                    is_draft=model_data.is_draft,
                    slug=model_data.slug,
                    image_1=model_data.image_1,
                    image_2=model_data.image_2,
                    image_3=model_data.image_3,
                    image_4=model_data.image_4,
                    image_5=model_data.image_5,
                    image_6=model_data.image_6,
                    image_7=model_data.image_7,
                    image_8=model_data.image_8,
                    image_9=model_data.image_9,
                    image_10=model_data.image_10,
                )
                .filter_by(slug=slug)
                .returning(cls.model.__table__.columns)
            )

            result = await session.execute(smtp)
            await session.commit()

            return result.mappings().one()

    @classmethod
    async def get_search_pagination_items(
        cls, query: str, page: int, limit: int, **filter_by
    ) -> list[NewsSchema]:
        async with async_session_factory() as session:
            smtp = (
                select(cls.model.__table__.columns)
                .filter_by(**filter_by)
                .filter(
                    cls.model.title.ilike(f"%{query}%")
                    # (cls.model.title.ilike(f"%{query}%")) | (cls.model.description.ilike(f"%{query}%"))
                )
                .order_by(cls.model.created_at.desc())
                .offset((page - 1) * limit)
                .limit(limit)
            )
            # stmt = select(News).order_by(News.created_at.desc()).offset((page - 1) * limit).limit(limit)

            # Если передан поисковый запрос, фильтруем по заголовку и описанию
            # if query:
            #     stmt = stmt.filter(
            #         (News.title.ilike(f"%{query}%")) | (News.description.ilike(f"%{query}%"))
            #     )
            result = await session.execute(smtp)

            return result.mappings().all()
