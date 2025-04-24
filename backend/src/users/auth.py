from datetime import datetime, timedelta, timezone

import jwt
from passlib.context import CryptContext

from src.config import settings
from src.exceptions import IncorrectUserNameOrPasswordException
from src.users.repository import UserRepository
from src.users.schemas import UserBase

ALGORITHM: str = settings.ALGORITHM
SECRET_KEY: str = settings.SECRET_KEY

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password) -> str:
    return pwd_context.hash(password)


def create_jwt_token(data: dict, expires_delta: timedelta) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt


async def authenticate_user(username: str, password: str) -> UserBase:
    user = await UserRepository.find_one_or_none(username=username)

    if not user:
        raise IncorrectUserNameOrPasswordException

    password_is_valid = verify_password(password, user.hashed_password)

    if not password_is_valid:
        raise IncorrectUserNameOrPasswordException

    return user
