from sqlalchemy import Text
from sqlalchemy.orm import Mapped, mapped_column

from src.database import Base


class History(Base):
    __tablename__ = "history"

    id: Mapped[int] = mapped_column(primary_key=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
