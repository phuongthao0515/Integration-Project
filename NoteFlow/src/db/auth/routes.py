
from fastapi import APIRouter, Depends, status
from src.db.auth.schemas import UserLoginModel, UserSignupModel
from sqlmodel.ext.asyncio.session import AsyncSession
from src.db.main import get_session
from .service import LoginService
from .dependencies import RefreshTokenBearer, AccessTokenBearer
from .utils import create_access_token, load_invalid_tokens, save_invalid_tokens, is_token_valid
from fastapi.responses import JSONResponse


auth_router = APIRouter()
login_helper = LoginService()


@auth_router.post('/login')
async def login_user(user:UserLoginModel,session:AsyncSession = Depends(get_session)):
    """
    Example user data:
    username: alice@example.com
    password: password123
    """
    try: 
        login = await login_helper.login(user,session)
        return login
    except Exception as e: 
        return e
    
@auth_router.get('/logout')
async def logout(token_details: dict = Depends(AccessTokenBearer())):
        jti = token_details['jti']
        invalid_tokens = load_invalid_tokens()
        
        
        invalid_tokens[jti] = True
        
        
        save_invalid_tokens(invalid_tokens)
        
        return JSONResponse(content={"message": "Logged out successfully"},status_code=status.HTTP_200_OK)


@auth_router.post('/signup')
async def signup(user:UserSignupModel,session:AsyncSession = Depends(get_session),status_code=status.HTTP_201_CREATED):
     try:
          new_user = await login_helper.create_new_user(user,session)
          return {'user_id':new_user}
     except Exception as e: 
          return e
    
     

