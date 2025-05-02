from os import remove as remove_file
from typing import Annotated
from uuid import uuid4

from fastapi import APIRouter, Depends, File, Form, UploadFile

from src.config import static_settings
from src.exceptions import ImageExtensionsIsNotAllow, SliderNotFind
from src.gallery.repository import CooperationRepository, MainPageSliderRepository
from src.gallery.schemas import SliderResponse
from src.users.dependencies import get_current_moder_user
from src.users.schemas import UserBase

router = APIRouter(prefix="/gallery", tags=["Gallery"])


@router.get("/slider/images")
async def get_all_images_for_main_page_slider() -> list[SliderResponse]:
    return await MainPageSliderRepository.find_all()


@router.get("/slider/id/{slider_id}")
async def get_slide_by_id(
    slider_id: str, user: Annotated[UserBase, Depends(get_current_moder_user)]
) -> SliderResponse:
    result: SliderResponse | None = await MainPageSliderRepository.find_one_or_none(
        image_id=slider_id
    )

    if result is None:
        raise SliderNotFind

    return result


@router.post("/slider/add")
async def add_new_slid_for_main_page_slider(
    image: Annotated[UploadFile, File()],
    title: Annotated[str, Form()],
    user: Annotated[UserBase, Depends(get_current_moder_user)],
    is_first: Annotated[bool, Form()] = False,
) -> SliderResponse:
    image_extensions = image.filename.lower().split(".")[-1]

    if image_extensions not in static_settings.ALLOW_IMAGE_EXTENSIONS:
        raise ImageExtensionsIsNotAllow

    image_id: str = str(uuid4())

    image_path: str = f"{static_settings.IMAGES_PATH}/{image_id}.{static_settings.BASE_IMAGE_EXTENSION}"

    try:
        with open(image_path, "wb+") as file_object:
            content = await image.read()
            file_object.write(content)
    except Exception as e:
        print(e)

    return await MainPageSliderRepository.insert_data(
        image_id=image_id, title=title, is_first=is_first
    )


@router.delete("/slider/delete/{image_id}")
async def delete_slid_for_main_page_slider(
    image_id: str, user: Annotated[UserBase, Depends(get_current_moder_user)]
):
    await MainPageSliderRepository.delete_data(image_id=image_id)

    file_path: str = f"{static_settings.IMAGES_PATH}/{image_id}.{static_settings.BASE_IMAGE_EXTENSION}"

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


@router.put("/slider/update/{image_id}")
async def delete_slid_for_main_page_slider(
    image_id: str,
    title: Annotated[str, Form()],
    user: Annotated[UserBase, Depends(get_current_moder_user)],
    is_first: Annotated[bool, Form()] = False,
    image: Annotated[UploadFile, File()] = None,
):
    slider: SliderResponse | None = await MainPageSliderRepository.find_one_or_none(
        image_id=image_id
    )

    if slider is None:
        raise SliderNotFind

    if image is not None:
        image_extensions = image.filename.lower().split(".")[-1]

        if image_extensions not in static_settings.ALLOW_IMAGE_EXTENSIONS:
            raise ImageExtensionsIsNotAllow

        image_path: str = f"{static_settings.IMAGES_PATH}/{image_id}.{static_settings.BASE_IMAGE_EXTENSION}"

        try:
            with open(image_path, "wb+") as file_object:
                content = await image.read()
                file_object.write(content)
        except Exception as e:
            print(e)

    if slider.title != title or slider.is_first != is_first:
        return await MainPageSliderRepository.update_data(
            image_id=image_id, title=title, is_first=is_first
        )

    return None


#  Cooperation


@router.get("/cooperation/images")
async def get_all_images_for_main_page_slider() -> list[SliderResponse]:
    return await CooperationRepository.find_all()


@router.get("/cooperation/id/{slider_id}")
async def get_slide_by_id(
    slider_id: str, user: Annotated[UserBase, Depends(get_current_moder_user)]
) -> SliderResponse:
    result: SliderResponse | None = await CooperationRepository.find_one_or_none(
        image_id=slider_id
    )

    if result is None:
        raise SliderNotFind

    return result


@router.post("/cooperation/add")
async def add_new_slid_for_main_page_slider(
    image: Annotated[UploadFile, File()],
    title: Annotated[str, Form()],
    user: Annotated[UserBase, Depends(get_current_moder_user)],
) -> SliderResponse:
    image_extensions = image.filename.lower().split(".")[-1]

    if image_extensions not in static_settings.ALLOW_IMAGE_EXTENSIONS:
        raise ImageExtensionsIsNotAllow

    image_id: str = str(uuid4())

    image_path: str = f"{static_settings.IMAGES_PATH}/{image_id}.{static_settings.BASE_IMAGE_EXTENSION}"

    try:
        with open(image_path, "wb+") as file_object:
            content = await image.read()
            file_object.write(content)
    except Exception as e:
        print(e)

    return await CooperationRepository.insert_data(image_id=image_id, title=title)


@router.delete("/cooperation/delete/{image_id}")
async def delete_slid_for_main_page_slider(
    image_id: str, user: Annotated[UserBase, Depends(get_current_moder_user)]
):
    await CooperationRepository.delete_data(image_id=image_id)

    file_path: str = f"{static_settings.IMAGES_PATH}/{image_id}.{static_settings.BASE_IMAGE_EXTENSION}"

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


@router.put("/cooperation/update/{image_id}")
async def delete_slid_for_main_page_slider(
    image_id: str,
    title: Annotated[str, Form()],
    user: Annotated[UserBase, Depends(get_current_moder_user)],
    image: Annotated[UploadFile, File()] = None,
):
    slider: SliderResponse | None = await CooperationRepository.find_one_or_none(
        image_id=image_id
    )

    if slider is None:
        raise SliderNotFind

    if image is not None:
        image_extensions = image.filename.lower().split(".")[-1]

        if image_extensions not in static_settings.ALLOW_IMAGE_EXTENSIONS:
            raise ImageExtensionsIsNotAllow

        image_path: str = f"{static_settings.IMAGES_PATH}/{image_id}.{static_settings.BASE_IMAGE_EXTENSION}"

        try:
            with open(image_path, "wb+") as file_object:
                content = await image.read()
                file_object.write(content)
        except Exception as e:
            print(e)

    if slider.title != title:
        return await CooperationRepository.update_data(image_id=image_id, title=title)

    return None
