from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field
from ..models import Users
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey

class Plan(SQLModel, table=True):
    planid: int = Field(sa_column=Column(Integer, primary_key=True, autoincrement=True)) 
    userid: int = Field(
        sa_column=Column(Integer, ForeignKey("users.userid"), nullable=False)
    )
    createddate: datetime = Field(
        default_factory=datetime.utcnow,
        sa_column=Column(DateTime, nullable=False)
    )
    duedate: Optional[datetime] = Field(
        sa_column=Column(DateTime, nullable=True)
    )
    content: Optional[str] = Field(
        sa_column=Column(Text, nullable=True)
    )

class PlanCreateModel(SQLModel):
    """
    This is what the client sends.
    
    Example JSON:
    {
      "createDate": "1/9/2004",
      "dueDate": "2025-01-03T10:00:00",
      "content": "jifnfnf.txt"
    }
    """
    createddate: datetime
    dueDate: Optional[datetime]
    content: Optional[str]
    def to_naive(self):
        self.createddate = self.createddate.replace(tzinfo=None) if self.createddate.tzinfo else self.createddate
        if self.dueDate:
            self.dueDate = self.dueDate.replace(tzinfo=None) if self.dueDate.tzinfo else self.dueDate

class PlanUpdateModel(SQLModel):
    dueDate: Optional[datetime]
    content: Optional[str]
    def to_naive(self):
        if self.dueDate:
            self.dueDate = self.dueDate.replace(tzinfo=None) if self.dueDate.tzinfo else self.dueDate


class PlanResponseModel(SQLModel):
    planId: int
    createDate: datetime
    dueDate: Optional[datetime]
    content: Optional[str]
