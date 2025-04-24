from os import remove as remove_file
from typing import Annotated
from uuid import uuid4

from fastapi import APIRouter, Depends, File, Form, Query, UploadFile
from slugify import slugify

from src.config import static_settings
from src.exceptions import CanNotAddNews, ImageExtensionsIsNotAllow, NewsNotFind
from src.news.repository import NewsRepository
from src.news.schemas import NewsSchema, PaginatedResponse
from src.users.dependencies import get_current_moder_user
from src.users.schemas import UserBase

router = APIRouter(prefix="/news", tags=["News"])


@router.get("/default")
async def get_slugs_list(
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1),
) -> PaginatedResponse:
    total_items: int = await NewsRepository.get_total_items(is_draft=False)

    if total_items:
        slugs: list[NewsSchema] = await NewsRepository.get_pagination_items(
            page, size, is_draft=False
        )
        total_pages: int = total_items if size == 1 else (total_items // size) + 1
    else:
        slugs: list[NewsSchema] = list()
        total_pages: int = 0

    return PaginatedResponse(
        items=slugs,
        total_items=total_items,
        total_pages=total_pages,
        current_page=page,
        page_size=size,
    )


@router.get("/search")
async def search_news(
    query: str = Query(None, min_length=3, description="Поисковый запрос"),
    page: int = Query(1, ge=1, description="Номер страницы"),
    size: int = Query(10, ge=1, le=100, description="Количество элементов на странице"),
) -> PaginatedResponse:
    total_items: int = await NewsRepository.get_total_items(is_draft=False)

    if total_items:
        slugs: list[NewsSchema] = await NewsRepository.get_search_pagination_items(
            query, page, size, is_draft=False
        )
        total_pages: int = total_items if size == 1 else (total_items // size) + 1
    else:
        slugs: list[NewsSchema] = list()
        total_pages: int = 0

    return PaginatedResponse(
        items=slugs,
        total_items=total_items,
        total_pages=total_pages,
        current_page=page,
        page_size=size,
    )


@router.get("/admin")
async def get_slugs_list(
    user: Annotated[UserBase, Depends(get_current_moder_user)],
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1),
) -> PaginatedResponse:
    total_items: int = await NewsRepository.get_total_items()

    if total_items:
        slugs: list[NewsSchema] = await NewsRepository.get_pagination_items(page, size)
        total_pages: int = total_items if size == 1 else (total_items // size) + 1
    else:
        slugs: list[NewsSchema] = list()
        total_pages: int = 0

    return PaginatedResponse(
        items=slugs,
        total_items=total_items,
        total_pages=total_pages,
        current_page=page,
        page_size=size,
    )


@router.get("/default/{slug}")
async def get_news_by_id(slug: str) -> NewsSchema:
    news: NewsSchema | None = await NewsRepository.find_one_or_none(
        slug=slug, is_draft=False
    )

    if not news:
        raise NewsNotFind

    return news


@router.get("/admin/{slug}")
async def get_news_by_id(
    user: Annotated[UserBase, Depends(get_current_moder_user)], slug: str
) -> NewsSchema:
    news: NewsSchema | None = await NewsRepository.find_one_or_none(slug=slug)

    if not news:
        raise NewsNotFind

    return news


@router.post("/admin/add")
async def add_news(
    user: Annotated[UserBase, Depends(get_current_moder_user)],
    title: Annotated[str, Form()],
    description: Annotated[str, Form()],
    image: Annotated[UploadFile, File()],
    is_draft: Annotated[bool, Form()] = False,
):
    # Checking for the correct image extension
    image_extensions: str = image.filename.split(".")[-1]

    if image_extensions not in static_settings.ALLOW_IMAGE_EXTENSIONS:
        raise ImageExtensionsIsNotAllow

    image_id: str = str(uuid4())

    image_path: str = (
        f"{static_settings.IMAGES_PATH}/{image_id}.{static_settings.BASE_IMAGE_EXTENSION}"
    )
    slug: str = slugify(title.lower().replace("ə", "e"))

    try:
        with open(image_path, "wb+") as file_object:
            content = await image.read()
            file_object.write(content)

        news_model_data: dict[str : str | int | None] = {
            "title": title,
            "description": description,
            "image_id": image_id,
            "is_draft": is_draft,
            "slug": slug,
        }

        result = await NewsRepository.insert_data(**news_model_data)
        return result
    except Exception as e:
        raise CanNotAddNews


@router.put("/admin/update/{slug}")
async def update_news(
    user: Annotated[UserBase, Depends(get_current_moder_user)],
    slug: str,
    title: Annotated[str, Form()],
    description: Annotated[str, Form()],
    is_draft: Annotated[bool, Form()],
    image: Annotated[UploadFile, File()] = None,
):
    news: NewsSchema | None = await NewsRepository.find_one_or_none(slug=slug)

    if news is None:
        raise NewsNotFind

    if image is not None:
        # Checking for the correct image extension
        image_extensions: str = image.filename.split(".")[-1]

        if image_extensions not in static_settings.ALLOW_IMAGE_EXTENSIONS:
            raise ImageExtensionsIsNotAllow

        image_path: str = (
            f"{static_settings.IMAGES_PATH}/{news.image_id}.{static_settings.BASE_IMAGE_EXTENSION}"
        )

    news_slug: str = slugify(title.lower().replace("ə", "e"))

    try:
        if image is not None:
            with open(image_path, "wb+") as file_object:
                content = await image.read()
                file_object.write(content)

        news_data: NewsSchema = NewsSchema(
            id=news.id,
            title=title,
            description=description,
            image_id=news.image_id,
            is_draft=is_draft,
            slug=news_slug,
            created_at=news.created_at,
        )

    except Exception as e:
        print(e)

        raise CanNotAddNews

    result = await NewsRepository.update_data(slug, news_data)

    return result


@router.delete("/admin/delete/{slug}")
async def delete_slid_for_main_page_slider(
    slug: str, user: Annotated[UserBase, Depends(get_current_moder_user)]
):
    news: NewsSchema = await NewsRepository.find_one_or_none(slug=slug)

    file_path: str = (
        f"{static_settings.IMAGES_PATH}/{news.image_id}.{static_settings.BASE_IMAGE_EXTENSION}"
    )

    try:
        await NewsRepository.delete_data(slug=slug)
        remove_file(file_path)
        print(f"File {file_path} deleted successfully.")
    except FileNotFoundError:
        print(f"File {file_path} not found.")
    except PermissionError:
        print(f"No permission to delete {file_path}.")
    except Exception as e:
        print(f"An error occurred while deleting {file_path}: {e}")

    return True
