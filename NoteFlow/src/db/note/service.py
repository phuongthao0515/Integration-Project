from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import text
from fastapi import HTTPException
from .schemas import NoteCreateModel, Note, NoteResponseModel
from datetime import datetime
class NoteService: 
    async def get_note(self,note_id:int,user_id:int,session:AsyncSession):
        try:
            print('hi')  # Ensure this print is placed before query execution
            query = text('SELECT * FROM NOTE WHERE PAGEID = :id')
            result = await session.execute(query, {'id': note_id})
            note = result.fetchone()
            if note:
                note = dict(note) if isinstance(note, tuple) else note
                if note.userid != user_id:
                    raise HTTPException(status_code=401, detail='UnAuthorized')
                return {
                            'created_date': note.createddate,
                            'content': note.content,
                            'title': note.title,
                            'document': note.document,
                            'updated_date': note.updateddate
                }
            else:
                raise HTTPException(status_code=404, detail='Not found')
        except Exception as e:
            print(f"Error occurred: {str(e)}")
            raise e

    async def create_new_note(self,user_id:int,note_data:NoteCreateModel,session:AsyncSession):
        try:
            new_note = Note(
                title=note_data.title,
                userid=user_id,
                createddate=datetime.utcnow()
            )
            session.add(new_note)
            await session.commit()
            await session.refresh(new_note)
            return {"note_id": new_note.pageid}
        
        except Exception as e:
            print(f"Error in create_new_note: {e}")  
            raise e  
    
    async def get_all_notes(self,user_id:int,session:AsyncSession):
        try: 
            query = text('SELECT * FROM NOTE WHERE USERID = :id')
            results = await session.execute(query,{'id':user_id})
            rows = results.mappings().all()
            notes = [
                NoteResponseModel(pageid=row['pageid'], title=row['title'], createddate=row['createddate'])
                for row in rows
            ]
            return notes
        except Exception as e:
            print(f"Error in get all notes: {e}")  
            raise e  
        
    async def delete_note(self,user_id:int,note_id:int,session:AsyncSession):
        try: 
            query = text('DELETE FROM NOTE WHERE pageid = :note_id AND USERID = :user_id')
            result = await session.execute(query, {'note_id': note_id, 'user_id': user_id})
            await session.commit()
            if result.rowcount == 0:
                return False
            return True
        except Exception as e:
            print(f"Error in delete notes: {e}")  
            raise e  