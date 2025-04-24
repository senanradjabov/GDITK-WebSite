from src.config import settings
from src.faculty.repository import StaffRepository
from src.universty.repository import HistoryRepository, ManagerRepository
from src.users.repository import UserRepository


async def start():
    if not await UserRepository.find_one_or_none(username="admin"):
        await UserRepository.insert_data(
            user_name=settings.ADMIN_LOGIN,
            password=settings.ADMIN_PASSWORD,
            is_admin=True,
            is_moder=True,
        )

    if not await HistoryRepository.find_one_or_none(id=1):
        await HistoryRepository.insert_data(description=" ")

    if not await StaffRepository.find_one_or_none(id=1):
        await StaffRepository.insert_data(
            first_name="Default",
            last_name="Default",
            position="Default",
            phone_number="Default",
            email="Default",
            description="Default",
            department_id=None,
            image="Default",
        )

    if not await ManagerRepository.find_one_or_none(is_leader=True):
        await ManagerRepository.insert_data(title="leader", staff_id=1, is_leader=True)
