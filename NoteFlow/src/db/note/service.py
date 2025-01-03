from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import text
from fastapi import HTTPException
from .schemas import NoteCreateModel, Note, NoteResponseModel
from datetime import datetime
from ..models import Users
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
    
    async def share_note(self, user_id:int, note_id:int, session:AsyncSession, visibility: str):
        try:
            query = text('SELECT * FROM NOTE WHERE pageid = :note_id')
            result = await session.execute(query, {'note_id'})
            note =result.fetchone()
            if not note:
                raise HTTPException(status_code=404, detail="Note not found.")
            note = dict(note) if isinstance(note, tuple) else note
            if note['userid'] != user_id:
                raise HTTPException(status_code=401, detail="Unauthorized to share this note.")
            update_query = text("UPDATE NOTE SET Visibility = :visibility WHERE PageID = :note_id")
            await session.execute(update_query, {'visibility': visibility, 'note_id': note_id})
            await session.commit()
            return {"message": f"Note {note_id} visibility updated to {visibility}."}
            
        except Exception as e:
            print(f"Error in share note: {e}")
            raise e
        
    async def get_share_note(self, note_id: int, session: AsyncSession):
        try:
            query = text("SELECT * FROM NOTE WHERE pageid = :note_id")
            result = await session.execute(query, {'note_id': note_id})
            note = result.fetchone()
            if not note:
                raise HTTPException(status_code=404, detail="Note not found.")
            note = dict(note) if isinstance(note, tuple) else note
            if note['visibility'] != 'public':
                raise HTTPException(status_code=403, detail="This note is not public.")
            return {
                "page_id": note['pageid'],
                "title": note['title'],
                "content": note['content'],
                "document": note['document'],
                "created_date": note['createddate'],
                "updated_date": note.get('updateddate'),
            }

        except Exception as e:
            print(f"Error in get_share_note: {e}")
            raise e
    
    async def update_note_content(self, user_id: int, note_id: int, new_content: str, session:AsyncSession):
        try:
            query = text("SELECT * FROM NOTE WHERE PageID = :note_id")
            result = await session.execute(query, {'note_id': note_id})
            note = result.fetchone()

            if not note:
                raise HTTPException(status_code=404, detail="Note not found.")
            note = dict(note) if isinstance(note, tuple) else note
            if note['userid'] != user_id:
                raise HTTPException(status_code=401, detail="Unauthorized to update this note.")
            update_query = text("""
                UPDATE NOTE 
                SET Content = :new_content, UpdatedDate = :updated_date
                WHERE PageID = :note_id
            """)
            await session.execute(update_query, {
                'new_content': new_content,
                'updated_date': datetime.utcnow(),
                'note_id': note_id,
            })
            await session.commit()
            return {"message": f"Note {note_id} content updated successfully."}

        except Exception as e:
            print(f"Error in update_note_content: {e}")
            raise e
        
    async def update_title(self, user_id: int, note_id: int, new_title: str, session: AsyncSession):
        try:
            # Fetch the note to ensure it exists and belongs to the user
            query = text("SELECT * FROM NOTE WHERE PageID = :note_id")
            result = await session.execute(query, {'note_id': note_id})
            note = result.fetchone()

            if not note:
                raise HTTPException(status_code=404, detail="Note not found.")

            note = dict(note) if isinstance(note, tuple) else note
            if note['userid'] != user_id:
                raise HTTPException(status_code=401, detail="Unauthorized to update this note.")

            # Update the title and updated_date
            update_query = text("""
                UPDATE NOTE 
                SET Title = :new_title, UpdatedDate = :updated_date
                WHERE PageID = :note_id
            """)
            await session.execute(update_query, {
                'new_title': new_title,
                'updated_date': datetime.utcnow(),
                'note_id': note_id,
            })
            await session.commit()

            return {"message": f"Note {note_id} title updated successfully."}
        except Exception as e:
            print(f"Error in update_title: {e}")
            raise e