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


@router.get("/default/images/{slug}")
async def get_news_by_id(slug: str):
    news = await NewsRepository.get_images(slug=slug)

    images = []
    current_id = 1
    for field in [
        "image_id",
        "image_1",
        "image_2",
        "image_3",
        "image_4",
        "image_5",
        "image_6",
        "image_7",
        "image_8",
        "image_9",
        "image_10",
    ]:
        image_value = getattr(news, field)
        if image_value:
            images.append({"id": current_id, "image_id": image_value})
            current_id += 1

    return images


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
    image_1: Annotated[UploadFile | None, File()] = None,
    image_2: Annotated[UploadFile | None, File()] = None,
    image_3: Annotated[UploadFile | None, File()] = None,
    image_4: Annotated[UploadFile | None, File()] = None,
    image_5: Annotated[UploadFile | None, File()] = None,
    image_6: Annotated[UploadFile | None, File()] = None,
    image_7: Annotated[UploadFile | None, File()] = None,
    image_8: Annotated[UploadFile | None, File()] = None,
    image_9: Annotated[UploadFile | None, File()] = None,
    image_10: Annotated[UploadFile | None, File()] = None,
    is_draft: Annotated[bool, Form()] = False,
):
    # Checking for the correct image extension
    image_extensions: str = image.filename.split(".")[-1]

    if image_extensions not in static_settings.ALLOW_IMAGE_EXTENSIONS:
        raise ImageExtensionsIsNotAllow

    image_id: str = str(uuid4())
    image_id_1: str = str(uuid4())
    image_id_2: str = str(uuid4())
    image_id_3: str = str(uuid4())
    image_id_4: str = str(uuid4())
    image_id_5: str = str(uuid4())
    image_id_6: str = str(uuid4())
    image_id_7: str = str(uuid4())
    image_id_8: str = str(uuid4())
    image_id_9: str = str(uuid4())
    image_id_10: str = str(uuid4())

    image_path: str = (
        f"{static_settings.IMAGES_PATH}/{image_id}.{static_settings.BASE_IMAGE_EXTENSION}"
    )
    slug: str = slugify(title.lower().replace("ə", "e"))
    slug: str = f"{slug}-{image_id}"

    try:
        with open(image_path, "wb+") as file_object:
            content = await image.read()
            file_object.write(content)

        if image_1 is not None:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{image_id_1}.{static_settings.BASE_IMAGE_EXTENSION}"
            )

            with open(path_c, "wb+") as file_object:
                content = await image_1.read()
                file_object.write(content)

        if image_2 is not None:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{image_id_2}.{static_settings.BASE_IMAGE_EXTENSION}"
            )

            with open(path_c, "wb+") as file_object:
                content = await image_2.read()
                file_object.write(content)

        if image_3 is not None:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{image_id_3}.{static_settings.BASE_IMAGE_EXTENSION}"
            )

            with open(path_c, "wb+") as file_object:
                content = await image_3.read()
                file_object.write(content)

        if image_4 is not None:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{image_id_4}.{static_settings.BASE_IMAGE_EXTENSION}"
            )

            with open(path_c, "wb+") as file_object:
                content = await image_4.read()
                file_object.write(content)

        if image_5 is not None:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{image_id_5}.{static_settings.BASE_IMAGE_EXTENSION}"
            )

            with open(path_c, "wb+") as file_object:
                content = await image_5.read()
                file_object.write(content)

        if image_6 is not None:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{image_id_6}.{static_settings.BASE_IMAGE_EXTENSION}"
            )

            with open(path_c, "wb+") as file_object:
                content = await image_6.read()
                file_object.write(content)

        if image_7 is not None:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{image_id_7}.{static_settings.BASE_IMAGE_EXTENSION}"
            )

            with open(path_c, "wb+") as file_object:
                content = await image_7.read()
                file_object.write(content)

        if image_8 is not None:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{image_id_8}.{static_settings.BASE_IMAGE_EXTENSION}"
            )

            with open(path_c, "wb+") as file_object:
                content = await image_8.read()
                file_object.write(content)

        if image_9 is not None:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{image_id_9}.{static_settings.BASE_IMAGE_EXTENSION}"
            )

            with open(path_c, "wb+") as file_object:
                content = await image_9.read()
                file_object.write(content)

        if image_10 is not None:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{image_id_10}.{static_settings.BASE_IMAGE_EXTENSION}"
            )

            with open(path_c, "wb+") as file_object:
                content = await image_10.read()
                file_object.write(content)

        news_model_data: dict[str, str | int | None] = {
            "title": title,
            "description": description,
            "image_id": image_id,
            "is_draft": is_draft,
            "slug": slug,
            "image_1": image_id_1 if image_1 else None,
            "image_2": image_id_2 if image_2 else None,
            "image_3": image_id_3 if image_3 else None,
            "image_4": image_id_4 if image_4 else None,
            "image_5": image_id_5 if image_5 else None,
            "image_6": image_id_6 if image_6 else None,
            "image_7": image_id_7 if image_7 else None,
            "image_8": image_id_8 if image_8 else None,
            "image_9": image_id_9 if image_9 else None,
            "image_10": image_id_10 if image_10 else None,
        }

        result = await NewsRepository.insert_data(**news_model_data)
        return result
    except Exception as e:
        print(e)
        raise CanNotAddNews


@router.put("/admin/update/{slug}")
async def update_news(
    user: Annotated[UserBase, Depends(get_current_moder_user)],
    slug: str,
    title: Annotated[str, Form()],
    description: Annotated[str, Form()],
    is_draft: Annotated[bool, Form()],
    image: Annotated[UploadFile, File()] = None,
    image_1: Annotated[UploadFile | None, File()] = None,
    image_2: Annotated[UploadFile | None, File()] = None,
    image_3: Annotated[UploadFile | None, File()] = None,
    image_4: Annotated[UploadFile | None, File()] = None,
    image_5: Annotated[UploadFile | None, File()] = None,
    image_6: Annotated[UploadFile | None, File()] = None,
    image_7: Annotated[UploadFile | None, File()] = None,
    image_8: Annotated[UploadFile | None, File()] = None,
    image_9: Annotated[UploadFile | None, File()] = None,
    image_10: Annotated[UploadFile | None, File()] = None,
    del_image_1: Annotated[bool, Form()] = False,
    del_image_2: Annotated[bool, Form()] = False,
    del_image_3: Annotated[bool, Form()] = False,
    del_image_4: Annotated[bool, Form()] = False,
    del_image_5: Annotated[bool, Form()] = False,
    del_image_6: Annotated[bool, Form()] = False,
    del_image_7: Annotated[bool, Form()] = False,
    del_image_8: Annotated[bool, Form()] = False,
    del_image_9: Annotated[bool, Form()] = False,
    del_image_10: Annotated[bool, Form()] = False,
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
    try:
        if image_1 is not None:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{news.image_1}.{static_settings.BASE_IMAGE_EXTENSION}"
            )

            with open(path_c, "wb+") as file_object:
                content = await image_1.read()
                file_object.write(content)

        if image_2 is not None:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{news.image_2}.{static_settings.BASE_IMAGE_EXTENSION}"
            )

            with open(path_c, "wb+") as file_object:
                content = await image_2.read()
                file_object.write(content)

        if image_3 is not None:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{news.image_3}.{static_settings.BASE_IMAGE_EXTENSION}"
            )

            with open(path_c, "wb+") as file_object:
                content = await image_3.read()
                file_object.write(content)

        if image_4 is not None:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{news.image_4}.{static_settings.BASE_IMAGE_EXTENSION}"
            )

            with open(path_c, "wb+") as file_object:
                content = await image_4.read()
                file_object.write(content)

        if image_5 is not None:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{news.image_5}.{static_settings.BASE_IMAGE_EXTENSION}"
            )

            with open(path_c, "wb+") as file_object:
                content = await image_5.read()
                file_object.write(content)

        if image_6 is not None:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{news.image_6}.{static_settings.BASE_IMAGE_EXTENSION}"
            )

            with open(path_c, "wb+") as file_object:
                content = await image_6.read()
                file_object.write(content)

        if image_7 is not None:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{news.image_7}.{static_settings.BASE_IMAGE_EXTENSION}"
            )

            with open(path_c, "wb+") as file_object:
                content = await image_7.read()
                file_object.write(content)

        if image_8 is not None:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{news.image_8}.{static_settings.BASE_IMAGE_EXTENSION}"
            )

            with open(path_c, "wb+") as file_object:
                content = await image_8.read()
                file_object.write(content)

        if image_9 is not None:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{news.image_9}.{static_settings.BASE_IMAGE_EXTENSION}"
            )

            with open(path_c, "wb+") as file_object:
                content = await image_9.read()
                file_object.write(content)

        if image_10 is not None:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{news.image_10}.{static_settings.BASE_IMAGE_EXTENSION}"
            )

            with open(path_c, "wb+") as file_object:
                content = await image_10.read()
                file_object.write(content)

        if del_image_1 is True:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{news.image_1}.{static_settings.BASE_IMAGE_EXTENSION}"
            )
            remove_file(path_c)

        if del_image_2 is True:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{news.image_2}.{static_settings.BASE_IMAGE_EXTENSION}"
            )
            remove_file(path_c)

        if del_image_3 is True:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{news.image_3}.{static_settings.BASE_IMAGE_EXTENSION}"
            )
            remove_file(path_c)

        if del_image_4 is True:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{news.image_4}.{static_settings.BASE_IMAGE_EXTENSION}"
            )
            remove_file(path_c)

        if del_image_5 is True:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{news.image_5}.{static_settings.BASE_IMAGE_EXTENSION}"
            )
            remove_file(path_c)

        if del_image_6 is True:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{news.image_6}.{static_settings.BASE_IMAGE_EXTENSION}"
            )
            remove_file(path_c)

        if del_image_7 is True:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{news.image_7}.{static_settings.BASE_IMAGE_EXTENSION}"
            )
            remove_file(path_c)

        if del_image_8 is True:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{news.image_8}.{static_settings.BASE_IMAGE_EXTENSION}"
            )
            remove_file(path_c)

        if del_image_9 is True:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{news.image_9}.{static_settings.BASE_IMAGE_EXTENSION}"
            )
            remove_file(path_c)

        if del_image_10 is True:
            path_c: str = (
                f"{static_settings.IMAGES_PATH}/{news.image_10}.{static_settings.BASE_IMAGE_EXTENSION}"
            )
            remove_file(path_c)
    except Exception as e:
        pass
    news_slug: str = slugify(title.lower().replace("ə", "e"))
    news_slug: str = f"{news_slug}-{news.image_id}"

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
            image_1=news.image_1 if del_image_1 is False else None,
            image_2=news.image_2 if del_image_2 is False else None,
            image_3=news.image_3 if del_image_3 is False else None,
            image_4=news.image_4 if del_image_4 is False else None,
            image_5=news.image_5 if del_image_5 is False else None,
            image_6=news.image_6 if del_image_6 is False else None,
            image_7=news.image_7 if del_image_7 is False else None,
            image_8=news.image_8 if del_image_8 is False else None,
            image_9=news.image_9 if del_image_9 is False else None,
            image_10=news.image_10 if del_image_10 is False else None,
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

        for i in range(1, 11):
            file_path: str = (
                f"{static_settings.IMAGES_PATH}/{getattr(news, f'image_{i}')}.{static_settings.BASE_IMAGE_EXTENSION}"
            )
            remove_file(file_path)

        print(f"File {file_path} deleted successfully.")
    except FileNotFoundError:
        print(f"File {file_path} not found.")
    except PermissionError:
        print(f"No permission to delete {file_path}.")
    except Exception as e:
        print(f"An error occurred while deleting {file_path}: {e}")

    return True
