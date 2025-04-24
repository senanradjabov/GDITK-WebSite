from sqlalchemy import Boolean, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from src.database import Base


class MainPageSlider(Base):
    __tablename__ = "main_page_slider"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, nullable=False)
    image_id: Mapped[str] = mapped_column(String(36), nullable=True, unique=True)
    title: Mapped[str] = mapped_column(String(256), nullable=True)
    is_first: Mapped[str] = mapped_column(Boolean, nullable=False, default=False)


class Cooperation(Base):
    __tablename__ = "cooperation"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, nullable=False)
    image_id: Mapped[str] = mapped_column(String(36), nullable=True, unique=True)
    title: Mapped[str] = mapped_column(String(256), nullable=True)
