from sqlmodel.ext.asyncio.session import AsyncSession
from src.db.auth.schemas import UserLoginModel
from sqlmodel import select
from sqlalchemy.sql import func
from sqlalchemy import and_, distinct, text
from .utils import create_access_token, load_invalid_tokens, save_invalid_tokens, is_token_valid
from passlib.context import CryptContext
from datetime import timedelta, datetime
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
from .dependencies import RefreshTokenBearer, AccessTokenBearer
from fastapi import APIRouter, Depends, status

REFRESH_TOKEN_EXPIRY = 2
pwd_context = CryptContext(
    schemes=['bcrypt']
)

class LoginService: 
    async def login(self,userdata:UserLoginModel,session:AsyncSession): 
        query = text('SELECT * FROM USERS WHERE EMAIL = :email')
        results = await session.execute(query,{'email':userdata.email})
        user = results.fetchone()
        if not user: 
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Wrong email")
        else:
            query = text('SELECT * FROM USERS WHERE EMAIL=:email and PASSWORD=:pwd')
            results = await session.execute(query,{'email':userdata.email,'pwd':userdata.password})
            user = results.fetchone()
            if not user: 
                raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Wrong password")
            else: 
                access_token = create_access_token(
                    user_data={
                        'email': userdata.email,
                    }
                )
                refresh_token = create_access_token(
                    user_data={
                        'email': userdata.email,
                    },
                    refresh=True,
                    expiry= timedelta(days=REFRESH_TOKEN_EXPIRY)
                )
                return JSONResponse(
                    content={
                        "message": "Log in successful",
                        "access_token": access_token.decode("utf-8"),
                        "refresh_token": refresh_token.decode("utf-8"),
                        "user":{
                            "email": userdata.email
                        }
                    }
                )
    
    