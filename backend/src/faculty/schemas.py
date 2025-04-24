from pydantic import BaseModel


class StaffSchema(BaseModel):
    first_name: str
    last_name: str
    position: str
    department_id: int | None
    phone_number: str | None
    email: str | None
    description: str | None
    image: str | None


class StaffResponse(StaffSchema):
    id: int


class DepartmentSchema(BaseModel):
    name: str
    description: str | None
    head_of_department_id: int | None
    slug: str


class DepartmentResponse(DepartmentSchema):
    id: int


class DepartmentFullResponse(DepartmentSchema):
    id: int

    head_of_department: StaffResponse
    staff: list[StaffResponse]
