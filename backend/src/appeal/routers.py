from datetime import datetime, timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, Form, HTTPException, Query, Request, status
from src.appeal.repository import AppealRepository
from src.appeal.schemas import AppealPaginatedResponse, AppealResponse
from src.exceptions import FacultyNotFind, StaffNotFind
from src.users.dependencies import get_current_moder_user
from src.users.schemas import UserBase

router = APIRouter(prefix="/appeal", tags=["Appeal"])

rate_limit_cache = {}

LIMIT_DURATION = timedelta(minutes=10)


@router.get("/all")
async def get_slugs_list(
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1),
) -> AppealPaginatedResponse:
    total_items: int = await AppealRepository.get_total_items()

    if total_items:
        slugs: list[AppealResponse] = await AppealRepository.get_pagination_items(
            page, size
        )
        total_pages: int = total_items if size == 1 else (total_items // size) + 1
    else:
        slugs: list[AppealResponse] = list()
        total_pages: int = 0

    return AppealPaginatedResponse(
        items=slugs,
        total_items=total_items,
        total_pages=total_pages,
        current_page=page,
        page_size=size,
    )


@router.get("/{slug}")
async def get_appeal_by_slug(
    slug: int, user: Annotated[UserBase, Depends(get_current_moder_user)]
):
    appeal = await AppealRepository.find_one_or_none(id=slug)

    if appeal is None:
        raise FacultyNotFind

    return appeal


@router.post("/add")
async def adding_faculty(
    request: Request,
    first_name: Annotated[str, Form()],
    last_name: Annotated[str, Form()],
    phone: Annotated[str, Form()],
    email: Annotated[str, Form()],
    message: Annotated[str, Form()],
):
    ip = request.client.host

    now = datetime.utcnow()
    last_access = rate_limit_cache.get(ip)

    if last_access and now - last_access < LIMIT_DURATION:
        seconds_left = int((LIMIT_DURATION - (now - last_access)).total_seconds())
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Too many requests. Try again in {seconds_left} seconds.",
        )

    # Сохраняем текущее время как последнее обращение
    rate_limit_cache[ip] = now

    # Здесь ваша логика вставки в БД
    appeal = await AppealRepository.insert_data(
        first_name=first_name,
        last_name=last_name,
        phone=phone,
        email=email,
        message=message,
    )

    return appeal


@router.delete("/delete/{slug}")
async def delete_slid_for_main_page_slider(
    slug: int, user: Annotated[UserBase, Depends(get_current_moder_user)]
):
    appeal: AppealResponse | None = await AppealRepository.find_one_or_none(id=slug)

    if appeal is None:
        raise StaffNotFind

    await AppealRepository.delete_data(id=slug)


@router.delete("/delete-all")
async def delete_slid_for_main_page_slider(
    user: Annotated[UserBase, Depends(get_current_moder_user)],
):
    appeals: list[AppealResponse] = await AppealRepository.find_all()

    for appeal in appeals:
        await AppealRepository.delete_data(id=appeal.id)
