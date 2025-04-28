from datetime import datetime, timedelta, timezone

from sqlalchemy import Boolean, DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from src.database import Base

UTC_PLUS_4 = timezone(timedelta(hours=4))


class News(Base):
    __tablename__ = "news"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(Text, nullable=False)
    slug: Mapped[str] = mapped_column(Text, nullable=False, unique=True)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    image_id: Mapped[str] = mapped_column(String(36), nullable=False, unique=True)
    image_1: Mapped[str] = mapped_column(
        String(36), nullable=True, unique=True, default=None
    )
    image_2: Mapped[str] = mapped_column(
        String(36), nullable=True, unique=True, default=None
    )
    image_3: Mapped[str] = mapped_column(
        String(36), nullable=True, unique=True, default=None
    )
    image_4: Mapped[str] = mapped_column(
        String(36), nullable=True, unique=True, default=None
    )
    image_5: Mapped[str] = mapped_column(
        String(36), nullable=True, unique=True, default=None
    )
    image_6: Mapped[str] = mapped_column(
        String(36), nullable=True, unique=True, default=None
    )
    image_7: Mapped[str] = mapped_column(
        String(36), nullable=True, unique=True, default=None
    )
    image_8: Mapped[str] = mapped_column(
        String(36), nullable=True, unique=True, default=None
    )
    image_9: Mapped[str] = mapped_column(
        String(36), nullable=True, unique=True, default=None
    )
    image_10: Mapped[str] = mapped_column(
        String(36), nullable=True, unique=True, default=None
    )
    is_draft: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC_PLUS_4),
        nullable=False,
    )
