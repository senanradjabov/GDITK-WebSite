from typing import Annotated

from fastapi import APIRouter, Depends, Form, HTTPException

from src.specialties.repository import SpecialtiesRepository
from src.specialties.schemas import SpecialtiesSchema
from src.users.dependencies import get_current_moder_user
from src.users.schemas import UserBase

router = APIRouter(prefix="/specialties", tags=["Specialties"])


@router.get("/all")
async def get_slugs_list():
    return await SpecialtiesRepository.find_all()


@router.get("/admin/{spec_id}")
async def get_document_by_id(
    spec_id: int, user: Annotated[UserBase, Depends(get_current_moder_user)]
):
    document: SpecialtiesSchema | None = await SpecialtiesRepository.find_one_or_none(
        id=spec_id
    )

    if not document:
        raise HTTPException(status_code=404, detail="Файл не найден")

    return document


@router.post("/admin/add")
async def document_news(
    title: Annotated[str, Form()],
    user: Annotated[UserBase, Depends(get_current_moder_user)],
):
    await SpecialtiesRepository.insert_data(title=title)
    return True


@router.put("/update/{spec_id}")
async def delete_slid_for_main_page_slider(
    spec_id: int,
    title: Annotated[str, Form()],
    user: Annotated[UserBase, Depends(get_current_moder_user)],
):
    slider: SpecialtiesSchema | None = await SpecialtiesRepository.find_one_or_none(
        id=spec_id
    )

    if slider is None:
        raise HTTPException(status_code=404, detail="Файл не найден")

    return await SpecialtiesRepository.update_data(
        spec_id=spec_id,
        title=title,
    )


@router.delete("/admin/delete/{spec_id}")
async def delete_document(
    spec_id: int, user: Annotated[UserBase, Depends(get_current_moder_user)]
):
    document: SpecialtiesSchema | None = await SpecialtiesRepository.find_one_or_none(
        id=spec_id
    )

    if not document:
        raise HTTPException(status_code=404, detail="Файл не найден")

    await SpecialtiesRepository.delete_data(id=spec_id)

    return True
