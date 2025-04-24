from pydantic import BaseModel


class HistorySchema(BaseModel):
    description: str


class HistoryResponse(HistorySchema):
    id: int


class ManagementSchema(BaseModel):
    title: str
    is_leader: bool
    staff_id: int


class ManagementResponse(ManagementSchema):
    id: int
