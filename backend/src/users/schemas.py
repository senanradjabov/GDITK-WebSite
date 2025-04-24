from datetime import datetime

from pydantic import BaseModel


class UserBase(BaseModel):
    id: int
    username: str


class UserCreate(UserBase):
    password: str


class UserResponse(UserBase):
    create_at: datetime


class UserSessionResponse(BaseModel):
    id: int
    user_id: int
    user: UserBase


class UserAuthForm(BaseModel):
    username: str
    password: str


class UserAuthResponse(BaseModel):
    refresh_token: str
    scheme: str
