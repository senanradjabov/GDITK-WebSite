from datetime import datetime, timezone
from typing import Annotated

import jwt
from fastapi import Depends, Request
from jwt.exceptions import InvalidTokenError
from src.config import settings
from src.exceptions import (
    CredentialsException,
    DontHavePermissionException,
    TokenIsNotFoundException,
)
from src.users.models import User
from src.users.repository import UserRepository

ALGORITHM = settings.ALGORITHM
SECRET_KEY = settings.SECRET_KEY


def get_token_from_cookies(request: Request) -> str:
    cookie = request.cookies.get("refresh_token")
    if cookie is None:
        raise TokenIsNotFoundException

    scheme, token = cookie.split(" ")

    if scheme.lower() != "bearer" or not token:
        raise CredentialsException

    return token


def validate_token(token: str) -> str:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        expire: str | None = payload.get("exp")

        if expire is None or int(expire) < datetime.now(timezone.utc).timestamp():
            raise CredentialsException

        user_info: str | None = payload.get("sub")

        if user_info is None:
            raise CredentialsException

    except InvalidTokenError as e:
        raise CredentialsException

    return user_info


async def get_current_user(
    token: Annotated[str, Depends(get_token_from_cookies)],
) -> User:
    user_name: str = validate_token(token)

    user = await UserRepository.find_one_or_none(username=user_name)

    if user is None:
        raise CredentialsException

    return user


async def get_current_admin_user(user: Annotated[User, Depends(get_current_user)]):
    if not user.is_admin:
        raise DontHavePermissionException

    return user


async def get_current_moder_user(user: Annotated[User, Depends(get_current_user)]):
    if not user.is_moder:
        raise DontHavePermissionException

    return user
