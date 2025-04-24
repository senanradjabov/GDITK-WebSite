import os
from typing import Annotated

from fastapi import APIRouter, Path
from fastapi.responses import FileResponse

from src.config import static_settings
from src.exceptions import FileNotFind

router = APIRouter(prefix="/images", tags=["Images"])


@router.get("/id/{image_id}")
async def get_image_by_id(image_id: str):
    file_path: str = (
        f"{static_settings.IMAGES_PATH}/{image_id}.{static_settings.BASE_IMAGE_EXTENSION}"
    )

    if os.path.exists(file_path):
        return FileResponse(file_path)

    raise FileNotFind
