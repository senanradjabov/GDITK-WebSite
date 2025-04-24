from typing import Annotated

from fastapi import APIRouter, Depends, Form

from src.exceptions import StaffNotFind
from src.faculty.repository import StaffRepository
from src.faculty.schemas import StaffResponse
from src.universty.repository import HistoryRepository, ManagerRepository
from src.universty.schemas import HistoryResponse, ManagementResponse
from src.users.dependencies import get_current_moder_user
from src.users.schemas import UserBase

router = APIRouter(prefix="", tags=["Uni"])


# History


@router.get("/history")
async def get_all_faculties() -> HistoryResponse:
    return await HistoryRepository.get_history()


@router.post("/history/update")
async def adding_faculty(
    description: Annotated[str, Form()],
    user: Annotated[UserBase, Depends(get_current_moder_user)],
) -> HistoryResponse:
    history: HistoryResponse = await HistoryRepository.update_data(
        description=description,
    )

    return history


# Staff


@router.get("/management")
async def get_all_faculties():
    # managers = await ManagerRepository.get_manager_data()
    # leader = await  ManagerRepository.get_leader()
    all_managers = await ManagerRepository.find_all()

    return all_managers


@router.get("/management/manager")
async def get_all_faculties():
    managers = await ManagerRepository.get_manager_data()

    return managers


@router.get("/management/leader")
async def get_all_faculties():
    leader = await ManagerRepository.get_leader()

    return [leader]


@router.get("/management/get/{manager_id}")
async def get_all_faculties(manager_id: int):
    manager = await ManagerRepository.find_one_or_none(id=manager_id)

    return manager


@router.post("/management/add")
async def adding_faculty(
    title: Annotated[str, Form()],
    staff_id: Annotated[int, Form()],
    user: Annotated[UserBase, Depends(get_current_moder_user)],
) -> ManagementResponse:
    staff: StaffResponse | None = await StaffRepository.find_one_or_none(id=staff_id)

    if staff is None:
        raise StaffNotFind

    manager: ManagementResponse = await ManagerRepository.insert_data(
        title=title, staff_id=staff_id
    )

    return manager


@router.put("/management/update/{management_id}")
async def update_news(
    management_id: int,
    title: Annotated[str, Form()],
    staff_id: Annotated[int, Form()],
    user: Annotated[UserBase, Depends(get_current_moder_user)],
) -> ManagementResponse:
    staff: StaffResponse | None = await StaffRepository.find_one_or_none(id=staff_id)

    if staff is None:
        raise StaffNotFind

    manager: ManagementResponse | None = await ManagerRepository.find_one_or_none(
        id=management_id
    )

    if manager is None:
        raise StaffNotFind

    new_manager: ManagementResponse = await ManagerRepository.update_data(
        management_id=management_id,
        title=title,
        staff_id=staff_id,
    )

    return new_manager


@router.delete("/management/delete/{management_id}")
async def delete_slid_for_main_page_slider(
    management_id: int, user: Annotated[UserBase, Depends(get_current_moder_user)]
):
    manger: ManagementResponse | None = await ManagerRepository.find_one_or_none(
        id=management_id
    )

    if manger is None:
        raise StaffNotFind

    await ManagerRepository.delete_data(id=management_id)

    return True
