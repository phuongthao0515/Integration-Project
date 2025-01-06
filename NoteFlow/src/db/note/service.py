from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import text
from fastapi import HTTPException
from .schemas import NoteCreateModel, Note, NoteResponseModel, PermissionEnum, NoteResponseModel2
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
                if note.userid != user_id and note.visibility == False:
                    raise HTTPException(status_code=401, detail='UnAuthorized')
                elif note.userid != user_id:
                    shared_query = text("""
                        SELECT permission 
                        FROM note_shares 
                        WHERE NoteID = :note_id AND SharedWithUserID = :user_id
                    """)
                    shared_result = await session.execute(shared_query, {'note_id': note_id, 'user_id': user_id})
                    shared = shared_result.fetchone()
                    print(shared)
                    if shared:
                        permission = shared.permission
                        return {
                            'created_date': note.createddate,
                            'content': note.content,
                            'title': note.title,
                            'document': note.document,
                            'updated_date': note.updateddate,
                            'visibility': note.visibility,
                            'permission': permission,
                            'is_shared': True
                        }
                    else:
                        raise HTTPException(status_code=401, detail='UnAuthorized')
                else:
                    return {
                        'created_date': note.createddate,
                        'content': note.content,
                        'title': note.title,
                        'document': note.document,
                        'updated_date': note.updateddate,
                        'visibility': note.visibility,
                        'is_shared': False
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
                NoteResponseModel(pageid=row['pageid'], title=row['title'], createddate=row['createddate'], visibility=row['visibility'])
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
    
    async def update_note_content(self, user_id: int, note_id: int, new_content: str, session:AsyncSession):
        try:
            query = text("SELECT * FROM NOTE WHERE PageID = :note_id")
            result = await session.execute(query, {'note_id': note_id})
            note = result.fetchone()

            if not note:
                raise HTTPException(status_code=404, detail="Note not found.")
            note = dict(note) if isinstance(note, tuple) else note
            if note.userid != user_id and note.visibility == False:
                raise HTTPException(status_code=401, detail="Unauthorized to update this note.")
            elif note.userid != user_id:
                shared_query = text("""
                    SELECT permission 
                    FROM note_shares 
                    WHERE NoteID = :note_id AND SharedWithUserID = :user_id
                """)
                shared_result = await session.execute(shared_query, {'note_id': note_id, 'user_id': user_id})
                shared = shared_result.fetchone()
                if not shared or shared.permission != 'update':
                    raise HTTPException(status_code=401, detail='Unauthorized to update this note.')
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
            query = text("SELECT * FROM NOTE WHERE PageID = :note_id")
            result = await session.execute(query, {'note_id': note_id})
            note = result.fetchone()

            if not note:
                raise HTTPException(status_code=404, detail="Note not found.")

            note = dict(note) if isinstance(note, tuple) else note
            if note.userid != user_id and note.visibility == False:
                raise HTTPException(status_code=401, detail="Unauthorized to update this note.")
            elif note.userid != user_id:
                shared_query = text("""
                    SELECT permission 
                    FROM note_shares 
                    WHERE NoteID = :note_id AND SharedWithUserID = :user_id
                """)
                shared_result = await session.execute(shared_query, {'note_id': note_id, 'user_id': user_id})
                shared = shared_result.fetchone()
                if not shared or shared.permission != 'update':
                    raise HTTPException(status_code=401, detail='Unauthorized to update this note.')
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





    async def update_note_visibility(self, user_id: int, note_id: int, session: AsyncSession, visibility: bool):
        """update a note visibility."""
        try:
            query = text("SELECT * FROM NOTE WHERE PageID = :note_id")
            result = await session.execute(query, {'note_id': note_id})
            note = result.fetchone()
            if not note:
                raise HTTPException(status_code=404, detail="Note not found.")
            note = dict(note) if isinstance(note, tuple) else note

            if note.userid != user_id:
                raise HTTPException(status_code=401, detail="Unauthorized to change visibility of this note.")

            update_query = text("UPDATE NOTE SET Visibility = :visibility WHERE PageID = :note_id")
            await session.execute(update_query, {'visibility': visibility, 'note_id': note_id})
            await session.commit()

            return {"message": f"Note {note_id} visibility updated to {visibility}."}

        except Exception as e:
            print(f"Error in share_note: {e}")
            raise e

 

    async def share_note(
        self,
        user_id: int,
        note_id: int,
        shared_with_email: str,
        permission: PermissionEnum,
        session: AsyncSession
    ):
        note_query = text("SELECT userid FROM note WHERE pageid = :note_id")
        result = await session.execute(note_query, {"note_id": note_id})
        note_row = result.fetchone()
        if not note_row:
            raise HTTPException(status_code=404, detail="Note not found.")

        if note_row.userid != user_id:
            raise HTTPException(
                status_code=401, detail="Unauthorized to share this note."
            )

        user_query = text("SELECT userid FROM users WHERE email = :shared_with_email")
        user_result = await session.execute(user_query, {"shared_with_email": shared_with_email})
        shared_user = user_result.fetchone()
        if not shared_user:
            raise HTTPException(status_code=404, detail="User with given email does not exist.")

        insert_query = text("""
            INSERT INTO note_shares (NoteID, SharedWithUserID, Permission)
            VALUES (:note_id, :shared_with_user_id, :permission)
            ON CONFLICT (NoteID, SharedWithUserID) DO UPDATE
            SET Permission = :permission
        """)
        await session.execute(
            insert_query,
            {
                "note_id": note_id,
                "shared_with_user_id": shared_user.userid,
                "permission": permission.value,
            },
        )
        await session.commit()
        return {"message": f"Note {note_id} shared with {shared_with_email}."}
    

    async def get_all_shared_notes(self, user_id: int, session: AsyncSession):
        try: 
            shared_query = text("""
            SELECT n.*, ns.Permission 
            FROM NOTE n
            JOIN note_shares ns ON n.pageid = ns.NoteID
            WHERE ns.SharedWithUserID = :user_id
            """)
            shared_results = await session.execute(shared_query, {'user_id': user_id})
            shared_rows = shared_results.mappings().all()
            notes = [
            NoteResponseModel2(
                pageid=row['pageid'], 
                title=row['title'], 
                createddate=row['createddate'],
                permission=row.permission,
                visibility=row['visibility']
            )
            for row in shared_rows
            ]
            return notes
        except Exception as e:
            print(f"Error in get_shared_notes: {e}")  
            raise e  
