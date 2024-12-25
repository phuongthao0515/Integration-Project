from passlib.context import CryptContext
from fastapi import APIRouter, Depends, status

pwd_context = CryptContext(
    schemes=['bcrypt']
)

auth_router = APIRouter()
REFRESH_TOKEN_EXPIRY = 2

