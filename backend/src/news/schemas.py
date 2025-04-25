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
    image_1: str | None
    image_2: str | None
    image_3: str | None
    image_4: str | None
    image_5: str | None
    image_6: str | None
    image_7: str | None
    image_8: str | None
    image_9: str | None
    image_10: str | None


class PaginatedResponse(BaseModel):
    items: list[NewsSchema]
    total_items: int
    total_pages: int
    current_page: int
    page_size: int
