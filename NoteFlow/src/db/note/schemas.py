from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey,Boolean
from sqlalchemy.orm import relationship
from pydantic import BaseModel
from ..models import Users
from sqlalchemy import Enum
import enum


class Note(SQLModel, table=True): 
    pageid: int = Field(sa_column=Column(Integer, primary_key=True, autoincrement=True)) 
    createddate: datetime = Field(default_factory=datetime.utcnow, sa_column=Column(DateTime, nullable=False)) 
    content: Optional[str] = Field(sa_column=Column(Text, nullable=True)) 
    title: str = Field(sa_column=Column(String(255), nullable=False)) 
    document: Optional[int] = Field(sa_column=Column(Integer, nullable=True)) 
    updateddate: Optional[datetime] = Field(sa_column=Column(DateTime, nullable=True)) 
    userid: int = Field(sa_column=Column(Integer, ForeignKey("users.userid"), nullable=False))
    visibility: bool = Field(default=False, sa_column=Column(Boolean, nullable=False, default=False))

class PermissionEnum(str, enum.Enum):
    view = "view"
    update = "update"


class NoteCreateModel(BaseModel):
    title: str = Field(max_length=255)

class NoteResponseModel(BaseModel):
    pageid: int
    title: str
    createddate: datetime
    visibility: bool
    document: Optional[int]

    class Config:
            orm_mode = True

class NoteResponseModel2(BaseModel):
    pageid: int
    title: str
    createddate: datetime
    permission: PermissionEnum
    visibility: bool
    
    class Config:
            orm_mode = True

class ChangeTitleModel(BaseModel):
     title: str

class ChangeVisibilityModel(BaseModel):
     visibility: bool

class ChangeContentModel(BaseModel):
     content: str
class ChangeCoverModel(BaseModel):
     cover: int