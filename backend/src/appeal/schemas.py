from datetime import datetime

from pydantic import BaseModel


class AppealSchema(BaseModel):
    first_name: str
    last_name: str
    phone: str
    email: str
    message: str
    created_at: datetime


class AppealResponse(AppealSchema):
    id: int


class AppealPaginatedResponse(BaseModel):
    items: list[AppealResponse]
    total_items: int
    total_pages: int
    current_page: int
    page_size: int
