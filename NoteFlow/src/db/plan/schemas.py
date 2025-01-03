from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field, Column, Integer, String, Text, DateTime, ForeignKey



class Plan(SQLModel, table=True):
    planid: Optional[int] = Field(
        default=None, primary_key=True
    )
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
    createDate: datetime
    dueDate: Optional[datetime]
    content: Optional[str]


class PlanUpdateModel(SQLModel):
    dueDate: Optional[datetime]
    content: Optional[str]



class PlanResponseModel(SQLModel):
    planId: int
    createDate: datetime
    dueDate: Optional[datetime]
    content: Optional[str]
