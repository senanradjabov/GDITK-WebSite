from sqlalchemy import insert

from src.database import async_session_factory
from src.repository.base import BaseRepository
from src.users.models import User


class UserRepository(BaseRepository):
    model = User

    @classmethod
    async def insert_data(
        cls,
        user_name: str,
        password: str,
        is_admin: bool = False,
        is_moder: bool = False,
    ):
        async with async_session_factory() as session:
            from src.users.auth import get_password_hash

            hashed_password = get_password_hash(password=password)

            smtp = (
                insert(cls.model)
                .values(
                    username=user_name,
                    hashed_password=hashed_password,
                    is_admin=is_admin,
                    is_moder=is_moder,
                )
                .returning(cls.model.__table__.columns)
            )
            result = await session.execute(smtp)
            await session.commit()

            return result.mappings().one()


# class UserSessionRepository(BaseRepository):
#     model = UserSession

#     @classmethod
#     async def insert_data(cls, user_id: int, refresh_token: str):
#         async with async_session_factory() as session:
#             smtp = (
#                 insert(cls.model)
#                 .values(
#                     user_id=user_id,
#                     refresh_token=refresh_token,
#                 )
#                 .returning(cls.model.__table__)
#             )
#             result = await session.execute(smtp)
#             await session.commit()

#             return result.mappings().one()
