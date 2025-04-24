from pydantic import BaseModel


class SliderResponse(BaseModel):
    id: int
    image_id: str
    title: str
    is_first: bool
