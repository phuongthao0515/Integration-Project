from fastapi import APIRouter, Depends, status
from sqlmodel.ext.asyncio.session import AsyncSession
from src.db.main import get_session
from src.db.auth.dependencies import AccessTokenBearer
from .service import UserService
from .schemas import ChangeUsernameModel, ChangeEmailModel

user_router = APIRouter()
user_helper = UserService()
access_token_bearer = AccessTokenBearer()

@user_router.get('/user', status_code=status.HTTP_200_OK)
async def get_user(
    session: AsyncSession = Depends(get_session),
    user_details = Depends(access_token_bearer)
):
    try:
        user_id = int(user_details["user"]["user_id"])
        user = await user_helper.get_user(user_id, session)
        return user
    except Exception as e:
        return {"error": str(e)}

@user_router.put('/user/username', status_code=status.HTTP_200_OK)
async def change_username(
    username_data: ChangeUsernameModel,
    session: AsyncSession = Depends(get_session),
    user_details = Depends(access_token_bearer)
):
    try:
        user_id = int(user_details["user"]["user_id"])
        updated_username = await user_helper.change_username(user_id, username_data, session)
        return updated_username
    except Exception as e:
        return {"error": str(e)}

@user_router.put('/user/email', status_code=status.HTTP_200_OK)
async def change_email(
    email_data: ChangeEmailModel,
    session: AsyncSession = Depends(get_session),
    user_details = Depends(access_token_bearer)
):
    try:
        user_id = int(user_details["user"]["user_id"])
        updated_email = await user_helper.change_email(user_id, email_data, session)
        return updated_email
    except Exception as e:
        return {"error": str(e)}

@user_router.delete('/user', status_code=status.HTTP_200_OK)
async def delete_user(
    session: AsyncSession = Depends(get_session),
    user_details = Depends(access_token_bearer)
):
    try:
        user_id = int(user_details["user"]["user_id"])
        result = await user_helper.delete_user(user_id, session)
        return result
    except Exception as e:
        return {"error": str(e)}