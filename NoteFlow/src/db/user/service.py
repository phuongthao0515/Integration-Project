from typing import Optional
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import text
from fastapi import HTTPException
from .schemas import ChangeUsernameModel, ChangeEmailModel

class UserService:

    async def get_user(self, user_id: int, session: AsyncSession) -> dict:
        try:
            query = text("SELECT * FROM users WHERE userid = :user_id")
            result = await session.execute(query, {"user_id": user_id})
            user = result.fetchone()
            if user:
                user = dict(user) if isinstance(user, tuple) else user
            if not user:
                raise HTTPException(status_code=404, detail="User not found")

            return {
                    "name": user.name,
                    "email": user.email,
                    "password": user.password
            }
        except Exception as e:
            print(f"Error in get_user: {e}")
            raise e

    async def change_username(self, user_id: int, data: ChangeUsernameModel, session: AsyncSession) -> dict:
        try:
            query = text("SELECT * FROM users WHERE userid = :user_id")
            result = await session.execute(query, {"user_id": user_id})
            user = result.fetchone()

            if not user:
                raise HTTPException(status_code=404, detail="User not found")

            update_query = text("""
                UPDATE "users"
                SET name = :new_username
                WHERE userid = :user_id
            """)

            await session.execute(
                update_query,
                {
                    "new_username": data.username,
                    "user_id": user_id
                }
            )
            await session.commit()

            return {"username": data.username}
        except Exception as e:
            print(f"Error in change_username: {e}")
            raise e

    async def change_email(self, user_id: int, data: ChangeEmailModel, session: AsyncSession) -> dict:
        try:
            query = text("SELECT * FROM users WHERE userid = :user_id")
            result = await session.execute(query, {"user_id": user_id})
            user = result.fetchone()

            if not user:
                raise HTTPException(status_code=404, detail="User not found")

            update_query = text("""
                UPDATE "users"
                SET email = :new_email
                WHERE userid = :user_id
            """)

            await session.execute(
                update_query,
                {
                    "new_email": data.email,
                    "user_id": user_id
                }
            )
            await session.commit()

            return {"email": data.email}
        except Exception as e:
            print(f"Error in change_email: {e}")
            raise e

    async def delete_user(self, user_id: int, session: AsyncSession) -> dict:
        try:
            delete_query = text("DELETE FROM users WHERE userid = :user_id")
            result = await session.execute(delete_query, {"user_id": user_id})
            await session.commit()

            if result.rowcount == 0:
                raise HTTPException(status_code=404, detail="User not found")

            return {"message": "User deleted successfully"}
        except Exception as e:
            print(f"Error in delete_user: {e}")
            raise e