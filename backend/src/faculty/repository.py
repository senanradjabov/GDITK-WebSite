from sqlalchemy import insert, select, update
from sqlalchemy.future import select as f_select
from sqlalchemy.orm import joinedload, selectinload
from src.database import async_session_factory
from src.exceptions import DepartmentNotFind, StaffNotFind
from src.faculty.models import Department, Staff
from src.faculty.schemas import DepartmentFullResponse, DepartmentSchema, StaffSchema
from src.repository.base import BaseRepository


class StaffRepository(BaseRepository):
    model = Staff

    @classmethod
    async def insert_data(
        cls,
        first_name: str,
        last_name: str,
        position: str,
        image: str,
        department_id: int | None,
        phone_number: str | None,
        email: str | None,
        description: str | None,
    ):
        async with async_session_factory() as session:
            if department_id:
                check_department_id: DepartmentSchema | None = (
                    await DepartmentRepository.find_one_or_none(id=department_id)
                )

                if check_department_id is None:
                    raise DepartmentNotFind

            smtp = (
                insert(cls.model)
                .values(
                    first_name=first_name,
                    last_name=last_name,
                    position=position,
                    department_id=department_id,
                    phone_number=phone_number,
                    email=email,
                    description=description,
                    image=image,
                )
                .returning(cls.model.__table__.columns)
            )

            result = await session.execute(smtp)
            await session.commit()

            return result.mappings().one()

    @classmethod
    async def update_data(cls, slug: int, model_data: StaffSchema):
        async with async_session_factory() as session:
            smtp = (
                update(cls.model)
                .values(
                    first_name=model_data.first_name,
                    last_name=model_data.last_name,
                    position=model_data.position,
                    department_id=model_data.department_id,
                    phone_number=model_data.phone_number,
                    email=model_data.email,
                    description=model_data.description,
                    image=model_data.image,
                )
                .filter_by(
                    id=slug,
                )
                .returning(cls.model.__table__.columns)
            )

            result = await session.execute(smtp)
            await session.commit()

            return result.mappings().one()


class DepartmentRepository(BaseRepository):
    model = Department

    @classmethod
    async def find_all(cls, **filter_by):
        async with async_session_factory() as session:
            result = await session.execute(
                f_select(cls.model).options(
                    joinedload(cls.model.head_of_department),
                )
            )
            departments: list[DepartmentFullResponse] = result.scalars().unique().all()

            # return departments
            return [
                {
                    "id": department.id,
                    "name": department.name,
                    # "description": department.description,
                    "slug": department.slug,
                    "head_of_department": (
                        {
                            "id": department.head_of_department.id,
                            "first_name": department.head_of_department.first_name,
                            "last_name": department.head_of_department.last_name,
                            "position": department.head_of_department.position,
                            "email": department.head_of_department.email,
                            "phone_number": department.head_of_department.phone_number,
                        }
                        if department.head_of_department
                        else None
                    ),
                }
                for department in departments
            ]

    @classmethod
    async def insert_data(
        cls,
        name: str,
        description: str,
        head_of_department_id: int,
        slug: str,
    ):
        async with async_session_factory() as session:
            check_staff_id: StaffSchema | None = await StaffRepository.find_one_or_none(
                id=head_of_department_id
            )

            if check_staff_id is None:
                raise StaffNotFind

            smtp = (
                insert(cls.model)
                .values(
                    name=name,
                    description=description,
                    head_of_department_id=head_of_department_id,
                    slug=slug,
                )
                .returning(cls.model.__table__.columns)
            )

            result = await session.execute(smtp)
            await session.commit()

            return result.mappings().one()

    @classmethod
    async def update_data(cls, slug: str, model_data: DepartmentSchema):
        async with async_session_factory() as session:
            smtp = (
                update(cls.model)
                .values(
                    name=model_data.name,
                    description=model_data.description,
                    head_of_department_id=model_data.head_of_department_id,
                    slug=model_data.slug,
                )
                .filter_by(slug=slug)
                .returning(cls.model.__table__.columns)
            )

            result = await session.execute(smtp)
            await session.commit()

            return result.mappings().one()

    @classmethod
    async def get_one_data(cls, slug: str):
        async with async_session_factory() as session:
            smtp = (
                select(cls.model)
                .options(selectinload(cls.model.head_of_department))
                .where(cls.model.slug == slug)
            )

            result = await session.execute(smtp)

            return result.scalars().one_or_none()

    @classmethod
    async def get_full_data(cls, slug: str):
        async with async_session_factory() as session:
            smtp = (
                select(cls.model)
                .options(
                    selectinload(
                        cls.model.head_of_department
                    ),  # Загрузка главы департамента
                    selectinload(cls.model.staff),  # Загрузка сотрудников департамента
                )
                .where(cls.model.slug == slug)
            )

            result = await session.execute(smtp)

            return result.scalars().one_or_none()
