from sqlalchemy import Boolean, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.database import Base


class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(256), unique=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(60), nullable=False)
    is_admin: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    is_moder: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    # sessions: Mapped[list["UserSession"]] = relationship(
    #     "UserSession", back_populates="user"
    # )


# class UserSession(Base):
#     __tablename__ = "user_session"

#     id: Mapped[int] = mapped_column(primary_key=True)

#     user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
#     user: Mapped["User"] = relationship("User", back_populates="sessions")

#     refresh_token: Mapped[str] = mapped_column(String, nullable=False)
