from sqlalchemy import Integer, Text
from sqlalchemy.orm import Mapped, mapped_column

from src.database import Base


class Specialties(Base):
    __tablename__ = "specialties"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(Text, nullable=False)
