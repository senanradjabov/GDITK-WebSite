from pydantic import BaseModel


class SpecialtiesSchema(BaseModel):
    id: int
    title: str
