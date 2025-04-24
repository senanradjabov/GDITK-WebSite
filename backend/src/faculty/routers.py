from os import remove as remove_file
from typing import Annotated
from uuid import uuid4

from fastapi import APIRouter, Depends, File, Form, UploadFile
from slugify import slugify

from src.config import static_settings
from src.exceptions import (
    CanNotAddNews,
    FacultyNotFind,
    ImageExtensionsIsNotAllow,
    StaffNotFind,
)
from src.faculty.repository import DepartmentRepository, StaffRepository
from src.faculty.schemas import (
    DepartmentFullResponse,
    DepartmentResponse,
    DepartmentSchema,
    StaffResponse,
    StaffSchema,
)
from src.users.dependencies import get_current_moder_user
from src.users.schemas import UserBase

router = APIRouter(prefix="", tags=["Department & Staff"])


@router.get("/department")
async def get_all_faculties():
    # -> list[DepartmentResponse]:
    return await DepartmentRepository.find_all()


@router.get("/department/{slug}")
async def get_department(slug: str):
    department = await DepartmentRepository.get_full_data(slug=slug)

    if department is None:
        raise FacultyNotFind

    return department


@router.post("/department/add")
async def adding_faculty(
    name: Annotated[str, Form()],
    head_of_department_id: Annotated[int, Form()],
    description: Annotated[str, Form()],
    user: Annotated[UserBase, Depends(get_current_moder_user)],
) -> DepartmentResponse:
    slug: str = slugify(name.lower().replace("ə", "e"))

    department: DepartmentResponse = await DepartmentRepository.insert_data(
        name=name,
        description=description,
        head_of_department_id=head_of_department_id,
        slug=slug,
    )

    return department


@router.put("/department/update/{slug}")
async def update_news(
    user: Annotated[UserBase, Depends(get_current_moder_user)],
    slug: str,
    name: Annotated[str, Form()],
    description: Annotated[str, Form()],
    head_of_department_id: Annotated[int, Form()],
):
    department: DepartmentResponse | None = await DepartmentRepository.find_one_or_none(
        slug=slug
    )

    if department is None:
        raise FacultyNotFind

    new_slug: str = slugify(name.lower().replace("ə", "e"))

    try:
        department: DepartmentSchema = DepartmentSchema(
            name=name,
            description=description,
            head_of_department_id=head_of_department_id,
            slug=new_slug,
        )

    except Exception as e:
        print(e)

        raise CanNotAddNews

    result = await DepartmentRepository.update_data(slug, department)

    return result


@router.delete("/department/delete/{slug}")
async def delete_slid_for_main_page_slider(
    slug: str, user: Annotated[UserBase, Depends(get_current_moder_user)]
):
    department: StaffSchema | None = await DepartmentRepository.find_one_or_none(
        slug=slug
    )

    if department is None:
        raise StaffNotFind

    await DepartmentRepository.delete_data(slug=slug)


# Staff


@router.get("/staff")
async def get_all_faculties() -> list[StaffResponse]:
    return await StaffRepository.find_all()


@router.get("/staff/{staff_id}")
async def get_department(staff_id: int) -> StaffResponse:
    staff: StaffResponse | None = await StaffRepository.find_one_or_none(id=staff_id)

    if staff is None:
        raise FacultyNotFind

    return staff


@router.post("/staff/add")
async def adding_faculty(
    first_name: Annotated[str, Form()],
    last_name: Annotated[str, Form()],
    position: Annotated[str, Form()],
    phone_number: Annotated[str, Form()],
    email: Annotated[str, Form()],
    description: Annotated[str, Form()],
    image: Annotated[UploadFile, File()],
    user: Annotated[UserBase, Depends(get_current_moder_user)],
    department_id: Annotated[int | None, Form()] = None,
) -> StaffResponse:
    department_id = None if department_id in (-1, 0) else department_id

    image_extensions = image.filename.split(".")[-1]

    if image_extensions not in static_settings.ALLOW_IMAGE_EXTENSIONS:
        raise ImageExtensionsIsNotAllow

    image_id: str = str(uuid4())

    image_path: str = (
        f"{static_settings.IMAGES_PATH}/{image_id}.{static_settings.BASE_IMAGE_EXTENSION}"
    )

    try:
        with open(image_path, "wb+") as file_object:
            content = await image.read()
            file_object.write(content)
    except Exception as e:
        print(e)

    staff: StaffResponse = await StaffRepository.insert_data(
        first_name=first_name,
        last_name=last_name,
        position=position,
        phone_number=phone_number,
        email=email,
        description=description,
        department_id=department_id,
        image=image_id,
    )

    return staff


@router.put("/staff/update/{staff_id}")
async def update_news(
    staff_id: int,
    first_name: Annotated[str, Form()],
    last_name: Annotated[str, Form()],
    position: Annotated[str, Form()],
    phone_number: Annotated[str, Form()],
    email: Annotated[str, Form()],
    description: Annotated[str, Form()],
    user: Annotated[UserBase, Depends(get_current_moder_user)],
    image: Annotated[UploadFile, File()] = None,
    department_id: Annotated[int | None, Form()] = None,
) -> StaffResponse:
    staff: StaffResponse | None = await StaffRepository.find_one_or_none(id=staff_id)

    if staff is None:
        raise StaffNotFind

    try:
        if image is not None:
            # Checking for the correct image extension
            image_extensions: str = image.filename.split(".")[-1]

            if image_extensions not in static_settings.ALLOW_IMAGE_EXTENSIONS:
                raise ImageExtensionsIsNotAllow

            image_path: str = (
                f"{static_settings.IMAGES_PATH}/{staff.image}.{static_settings.BASE_IMAGE_EXTENSION}"
            )

            with open(image_path, "wb+") as file_object:
                content = await image.read()
                file_object.write(content)

        staff: StaffSchema = StaffSchema(
            first_name=first_name,
            last_name=last_name,
            position=position,
            phone_number=phone_number,
            email=email,
            description=description,
            department_id=department_id,
            image=staff.image,
        )

    except Exception as e:
        print(e)

        raise CanNotAddNews

    result = await StaffRepository.update_data(staff_id, staff)

    return result


@router.delete("/staff/delete/{staff_id}")
async def delete_slid_for_main_page_slider(
    staff_id: int, user: Annotated[UserBase, Depends(get_current_moder_user)]
):
    staff: StaffSchema | None = await StaffRepository.find_one_or_none(id=staff_id)

    if staff is None:
        raise StaffNotFind

    await StaffRepository.delete_data(id=staff_id)

    file_path: str = (
        f"{static_settings.IMAGES_PATH}/{staff.image}.{static_settings.BASE_IMAGE_EXTENSION}"
    )

    try:
        remove_file(file_path)
        print(f"File {file_path} deleted successfully.")
    except FileNotFoundError:
        print(f"File {file_path} not found.")
    except PermissionError:
        print(f"No permission to delete {file_path}.")
    except Exception as e:
        print(f"An error occurred while deleting {file_path}: {e}")

    return True
