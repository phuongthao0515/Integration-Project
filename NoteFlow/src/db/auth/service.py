from sqlmodel.ext.asyncio.session import AsyncSession
from src.db.auth.schemas import UserLoginModel, UserSignupModel
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
        query = text('SELECT * FROM public."users" WHERE EMAIL = :email')
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
                user = dict(user) if isinstance(user, tuple) else user
                access_token = create_access_token(
                    user_data={
                        'user_id': user.userid,
                    }
                )
                refresh_token = create_access_token(
                    user_data={
                        'user_id': user.userid,
                    },
                    refresh=True,
                    expiry= timedelta(days=REFRESH_TOKEN_EXPIRY)
                )
                return JSONResponse(
                    content={
                        "message": "Log in successful",
                        "access_token": access_token,
                        "refresh_token": refresh_token,
                        "user":{
                            'user_id': user.userid,
                        }
                    }
                )
    
    
    async def create_new_user(self,user_data:UserSignupModel,session:AsyncSession):
        get_user_id_query = text('SELECT userid FROM USERS WHERE email = :email')
        
        result = await session.execute(get_user_id_query, {'email': user_data.email})
        user_id = result.scalar()
        if user_id: 
            raise HTTPException(status_code=403, detail="Email already exists")
        query = text('INSERT INTO USERS(NAME,PASSWORD,EMAIL) VALUES(:name,:password,:email)')
        result = await session.execute(query,{'name':user_data.name,'password':user_data.password,'email':user_data.email})
        await session.commit()
        get_user_id_query = text('SELECT userid FROM USERS WHERE email = :email')
        result = await session.execute(get_user_id_query, {'email': user_data.email})
        new_user_id = result.scalar()
        return new_user_id