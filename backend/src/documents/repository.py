from sqlalchemy import select, func, update

from src.database import async_session_factory
from src.documents.models import Documents
from src.documents.schemas import DocumentsSchema
from src.repository.base import BaseRepository


class DocumentsRepository(BaseRepository):
    model = Documents

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

    @classmethod
    async def get_total_items(cls, **filter_by) -> int:
        async with async_session_factory() as session:
            smtp = select(func.count(cls.model.id)).filter_by(**filter_by)
            result = await session.execute(smtp)

            return result.scalar()

    @classmethod
    async def update_data(cls, slug: str, model_data: DocumentsSchema):
        async with async_session_factory() as session:
            smtp = update(
                cls.model
            ).values(
                title=model_data.title,
                description=model_data.description,
                is_draft=model_data.is_draft,
                slug=model_data.slug,
            ).filter_by(
                slug=slug
            ).returning(
                cls.model.__table__.columns
            )

            result = await session.execute(smtp)
            await session.commit()

            return result.mappings().one()
