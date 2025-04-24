from datetime import datetime

from pydantic import BaseModel


class NewsSchema(BaseModel):
    id: int
    title: str
    slug: str
    description: str
    image_id: str
    is_draft: bool
    created_at: datetime


class PaginatedResponse(BaseModel):
    items: list[NewsSchema]
    total_items: int
    total_pages: int
    current_page: int
    page_size: int
