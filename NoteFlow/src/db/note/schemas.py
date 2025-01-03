from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from pydantic import BaseModel



class Note(SQLModel, table=True): 
    pageid: int = Field(sa_column=Column(Integer, primary_key=True, autoincrement=True)) 
    createddate: datetime = Field(default_factory=datetime.utcnow, sa_column=Column(DateTime, nullable=False)) 
    content: Optional[str] = Field(sa_column=Column(Text, nullable=True)) 
    title: str = Field(sa_column=Column(String(255), nullable=False)) 
    document: Optional[str] = Field(sa_column=Column(Text, nullable=True)) 
    updateddate: Optional[datetime] = Field(sa_column=Column(DateTime, nullable=True)) 
    userid: int = Field(sa_column=Column(Integer, ForeignKey("users.userid"), nullable=False))
    


class NoteCreateModel(BaseModel):
    title: str = Field(max_length=255)

class NoteResponseModel(BaseModel):
    pageid: int
    title: str
    createddate: datetime

    class Config:
        orm_mode = True

