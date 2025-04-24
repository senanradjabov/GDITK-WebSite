from datetime import datetime

from pydantic import BaseModel


class SchedulesSchema(BaseModel):
    id: int
    title: str
    file_id: str
    extension: str
    created_at: datetime


class PaginatedResponse(BaseModel):
    items: list[SchedulesSchema]
    total_items: int
    total_pages: int
    current_page: int
    page_size: int
