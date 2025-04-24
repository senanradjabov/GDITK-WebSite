import os
from os import remove as remove_file
from typing import Annotated
from uuid import uuid4

from fastapi import APIRouter, Depends, File, Form, HTTPException, Query, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.util import await_only

from src.config import static_settings
from src.exceptions import CanNotAddNews
from src.schedules.repository import SchedulesRepository
from src.schedules.schemas import SchedulesSchema
from src.users.dependencies import get_current_moder_user
from src.users.schemas import UserBase

router = APIRouter(prefix="/schedule", tags=["Schedules"])


@router.get("/all")
async def get_slugs_list() -> list[SchedulesSchema]:
    return await SchedulesRepository.find_all()


@router.get("/get/{slug}")
async def get_document_by_id(slug: str):
    document: SchedulesSchema | None = await SchedulesRepository.find_one_or_none(
        file_id=slug
    )

    if not document:
        raise HTTPException(status_code=404, detail="Файл не найден")

    file_path: str = f"{static_settings.DOCUMENTS_PATH}/{slug}.{document.extension}"

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Файл отсутствует на сервере")
    print(file_path)
    return FileResponse(file_path, filename=f"{document.title}.{document.extension}")


@router.get("/admin/{slug}")
async def get_document_by_id(
    user: Annotated[UserBase, Depends(get_current_moder_user)], slug: str
):
    document: SchedulesSchema | None = await SchedulesRepository.find_one_or_none(
        file_id=slug
    )

    if not document:
        raise HTTPException(status_code=404, detail="Файл не найден")

    return document


@router.post("/admin/add")
async def document_news(
    user: Annotated[UserBase, Depends(get_current_moder_user)],
    title: Annotated[str, Form()],
    document: Annotated[UploadFile, File()],
):
    document_extension: str = document.filename.split(".")[-1].lower()
    file_id: str = str(uuid4())
    document_path: str = (
        f"{static_settings.DOCUMENTS_PATH}/{file_id}.{document_extension}"
    )

    try:
        with open(document_path, "wb+") as file_object:
            content = await document.read()
            file_object.write(content)

        model_data: dict[str : str | int | None] = {
            "title": title,
            "file_id": file_id,
            "extension": document_extension,
        }

        result = await SchedulesRepository.insert_data(**model_data)
        return result
    except Exception as e:
        raise CanNotAddNews


@router.delete("/admin/delete/{slug}")
async def delete_document(
    slug: str, user: Annotated[UserBase, Depends(get_current_moder_user)]
):
    document: SchedulesSchema | None = await SchedulesRepository.find_one_or_none(
        file_id=slug
    )

    if not document:
        raise HTTPException(status_code=404, detail="Файл не найден")

    file_path: str = f"{static_settings.DOCUMENTS_PATH}/{slug}.{document.extension}"

    try:
        await SchedulesRepository.delete_data(file_id=slug)
        remove_file(file_path)
        print(f"File {file_path} deleted successfully.")
    except FileNotFoundError:
        print(f"File {file_path} not found.")
    except PermissionError:
        print(f"No permission to delete {file_path}.")
    except Exception as e:
        print(f"An error occurred while deleting {file_path}: {e}")

    return True
