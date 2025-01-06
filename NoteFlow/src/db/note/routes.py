from fastapi import APIRouter, Depends, status
from sqlmodel.ext.asyncio.session import AsyncSession
from src.db.main import get_session
from .service import NoteService
from src.db.auth.dependencies import AccessTokenBearer
from .schemas import NoteCreateModel,PermissionEnum

note_router = APIRouter()
note_helper = NoteService()
access_token_bearer = AccessTokenBearer()

# user_details = {'user': {'user_id': 1}, 'exp': 1735550010, 'refresh': False, 'jti': 'b59408fa-ff94-4d8e-9453-9a8c38adfbd2'}
@note_router.get('/notes/{note_id}')
async def get_note_by_id(note_id:int,session:AsyncSession=Depends(get_session),user_details=Depends(access_token_bearer)):
    try:
        user_id = int(user_details['user']['user_id'])
        print('user_id: ',user_id)

        result = await note_helper.get_note(note_id,user_id,session)
        if result:
            return result 
    except Exception as e: 
        return e
    
@note_router.post('/create',status_code=status.HTTP_201_CREATED)
async def create_note(note_data:NoteCreateModel,session:AsyncSession=Depends(get_session),user_details=Depends(access_token_bearer)):
    try: 
        user_id = int(user_details['user']['user_id'])
        print('user_id: ',user_id)
        note_id = await note_helper.create_new_note(user_id,note_data,session)
        return note_id
    except Exception as e: 
        return e
    
@note_router.get('/notes')
async def get_notes(session:AsyncSession=Depends(get_session),user_details=Depends(access_token_bearer)): 
    try:
        user_id = int(user_details['user']['user_id'])
        notes = await note_helper.get_all_notes(user_id,session)
        return notes
    except Exception as e:
        return e
    
@note_router.delete('/notes/{note_id}',status_code=status.HTTP_200_OK)
async def delete_note(note_id:int,session:AsyncSession=Depends(get_session),user_details=Depends(access_token_bearer)):
    try: 
        user_id = int(user_details['user']['user_id'])
        note = await note_helper.delete_note(user_id,note_id,session)
        return note
    except Exception as e:
        return e

#Change note content and title
@note_router.put('/notes/content/{note_id}',status_code=status.HTTP_200_OK)
async def update_note_content(note_id:int,content:str,session:AsyncSession=Depends(get_session),user_details=Depends(access_token_bearer)):
    try:
        user_id = int(user_details['user']['user_id'])
        note = await note_helper.update_note_content(user_id,note_id,content,session)
        return note
    except Exception as e:
        return e
@note_router.put('/notes/title/{note_id}',status_code=status.HTTP_200_OK)
async def update_note_title(note_id:int,title:str,session:AsyncSession=Depends(get_session),user_details=Depends(access_token_bearer)):
    try:
        user_id = int(user_details['user']['user_id'])
        note = await note_helper.update_title(user_id,note_id,title,session)
        return note
    except Exception as e:
        return e

#Change note visibility
@note_router.put('/notes/visibility/{note_id}',status_code=status.HTTP_200_OK)
async def update_note_visibility(note_id:int,visibility:bool,session:AsyncSession=Depends(get_session),user_details=Depends(access_token_bearer)):
    try:
        user_id = int(user_details['user']['user_id'])
        note = await note_helper.update_note_visibility(user_id,note_id,session,visibility)
        return note
    except Exception as e:
        return e
    


#Share note with user
@note_router.post("/notes/share/{note_id}")
async def share_note(
    note_id: int,
    shared_with_email: str,
    permission: PermissionEnum,
    session: AsyncSession = Depends(get_session),
    user_details=Depends(access_token_bearer)
):
    try:
        user_id = int(user_details["user"]["user_id"])
        return await note_helper.share_note(
            user_id, note_id, shared_with_email, permission, session
        )
    except Exception as e:
        return e

#Get all shared notes
@note_router.get('/shared_notes')
async def get_all_shared_notes(session:AsyncSession=Depends(get_session),user_details=Depends(access_token_bearer)): 
    try:
        user_id = int(user_details['user']['user_id'])
        notes = await note_helper.get_all_shared_notes(user_id,session)
        return notes
    except Exception as e:
        return e


    
