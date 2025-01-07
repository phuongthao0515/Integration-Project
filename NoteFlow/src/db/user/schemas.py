from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field
from ..models import Users
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean



class ChangeUsernameModel(SQLModel):
    """
    Used for partial updates of the Plan.
    Example JSON:
    {
      "username": "newUsername"
    }
    """
    username: str
class ChangeEmailModel(SQLModel):
    """
    Used for partial updates of the Plan.
    Example JSON:
    {
      "email": "newEmail"
    }
    """
    email: str
  