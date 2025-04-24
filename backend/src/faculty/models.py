from sqlalchemy import ForeignKey, String, Text, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.database import Base


class Department(Base):
    __tablename__ = "department"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(256), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    slug: Mapped[str] = mapped_column(String(300), nullable=False, unique=True)

    head_of_department_id: Mapped[int | None] = mapped_column(
        ForeignKey("staff.id", ondelete="SET NULL"), nullable=True
    )

    # Relationships
    staff: Mapped[list["Staff"]] = relationship("Staff", back_populates="department",
                                                foreign_keys="[Staff.department_id]")
    head_of_department: Mapped["Staff"] = relationship(
        "Staff", back_populates="department", foreign_keys=[head_of_department_id],
    )


class Staff(Base):
    __tablename__ = "staff"

    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(50), nullable=False)
    last_name: Mapped[str] = mapped_column(String(50), nullable=False)
    image: Mapped[str] = mapped_column(String(36), nullable=True, unique=True)
    position: Mapped[str] = mapped_column(String(100), nullable=False)
    phone_number: Mapped[str | None] = mapped_column(String(20), nullable=True)
    email: Mapped[str | None] = mapped_column(String(100), nullable=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    department_id: Mapped[int | None] = mapped_column(
        ForeignKey("department.id", ondelete="SET NULL", use_alter=True), nullable=True,
    )

    # Relationships
    department: Mapped["Department"] = relationship("Department",
                                                    back_populates="staff",
                                                    foreign_keys="[Staff.department_id]")

    manager: Mapped[list["Manager"]] = relationship("Manager",
                                                    back_populates="staff")


class Manager(Base):
    __tablename__ = "manager"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(256), nullable=False)
    is_leader: Mapped[bool] = mapped_column(Boolean, default=False)

    staff_id: Mapped[int] = mapped_column(
        ForeignKey('staff.id', ondelete="CASCADE"), nullable=False
    )

    staff: Mapped["Staff"] = relationship("Staff", foreign_keys=[staff_id], back_populates="manager")
