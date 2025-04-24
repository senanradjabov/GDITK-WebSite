from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, Request, Response
from src.config import settings
from src.core.limiter import limiter
from src.exceptions import UserAlreadyExistsException, UserNotFound
from src.users.auth import authenticate_user, create_jwt_token
from src.users.dependencies import get_current_admin_user, get_current_user
from src.users.repository import UserRepository
from src.users.schemas import UserAuthForm, UserAuthResponse, UserBase

router = APIRouter(prefix="/auth", tags=["Auth & Users"])


@router.post("/register")
async def register_user(
    user_data: UserAuthForm, user: Annotated[UserBase, Depends(get_current_admin_user)]
):
    existing_user = await UserRepository.find_one_or_none(username=user_data.username)

    if existing_user:
        raise UserAlreadyExistsException

    await UserRepository.insert_data(
        user_name=user_data.username, password=user_data.password, is_moder=True
    )


@router.delete("/delete/{username}")
async def delete_user(
    username: str, user: Annotated[UserBase, Depends(get_current_admin_user)]
) -> bool:
    existing_user = await UserRepository.find_one_or_none(username=username)

    if not existing_user:
        raise UserNotFound

    if existing_user.id == 1:
        raise UserNotFound

    await UserRepository.delete_data(username=username)

    return True


@router.get("/user/{username}")
async def read_users(
    username: str,
    user: Annotated[UserBase, Depends(get_current_user)],
) -> UserBase:
    get_user: UserBase | None = await UserRepository.find_one_or_none(username=username)

    if get_user is None:
        raise UserNotFound

    return get_user


@router.post("/login")
@limiter.limit("5/minute")
async def login_user(
    request: Request, response: Response, user_data: UserAuthForm
) -> UserAuthResponse:
    user: UserBase = await authenticate_user(
        username=user_data.username, password=user_data.password
    )

    refresh_token = create_jwt_token(
        {"sub": user.username}, timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    )

    response.set_cookie(
        key="refresh_token",
        value=f"Bearer {refresh_token}",
        httponly=True,
        samesite="strict",
        # secure=True
    )

    return UserAuthResponse(refresh_token=refresh_token, scheme="Bearer")


@router.post("/logout")
async def logout_user(response: Response):
    response.delete_cookie(key="refresh_token")

    return {"message": "LogOut's successfully"}


@router.get("/me")
async def read_users_me(
    user: Annotated[UserBase, Depends(get_current_user)],
) -> UserBase:
    return user


@router.get("/all")
async def get_all_users(
    user: Annotated[UserBase, Depends(get_current_admin_user)],
) -> list[UserBase]:
    return await UserRepository.find_all()
