from sqlmodel import SQLModel, Field
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship

class Users(SQLModel, table=True):
    userid: int = Field(
        sa_column=Column(Integer, primary_key=True, autoincrement=True)
    )
    name: str = Field(
        sa_column=Column(String(255), nullable=False)
    )
    password: str = Field(
        sa_column=Column(String(255), nullable=False)
    )
    email: str = Field(
        sa_column=Column(String(255), nullable=False, unique=True)
    )
