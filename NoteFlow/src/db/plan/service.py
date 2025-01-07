from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import text
from fastapi import HTTPException
from datetime import datetime
 
from .schemas import (
    Plan,
    PlanCreateModel,
    PlanUpdateModel,
    PlanResponseModel
)

class PlanService:
    async def get_plan(self, plan_id: int, user_id: int, session: AsyncSession):
        try:
            print('hi')  # Ensure this print is placed before query execution
            query = text("SELECT * FROM plan WHERE planid = :plan_id")

            result = await session.execute(query, {"plan_id": plan_id})

            plan = result.fetchone()

            if plan:
                plan = dict(plan) if isinstance(plan, tuple) else plan

                if plan.userid != user_id:
                    raise HTTPException(status_code=401, detail='UnAuthorized')
                
                return {
                    "planId": plan.planid,
                    "createDate": plan.createddate,
                    "dueDate": plan.duedate,
                    "content": plan.content,
                    "importance": plan.importance
                }

            else:
                raise HTTPException(status_code=404, detail="Plan not found")
        except Exception as e:
            print(f"Error in get_plan: {e}")
            raise e
        
    async def get_plans_by_specific_week(
        self, user_id: int, year: int, month: int, week_number: int, session: AsyncSession
    ):
        try:
            query = text("""
                SELECT *
                FROM plan
                WHERE userid = :user_id
                AND EXTRACT(YEAR FROM duedate) = :year
                AND EXTRACT(MONTH FROM duedate) = :month
                AND EXTRACT(WEEK FROM duedate) = :week_number
            """)

            results = await session.execute(
                query,
                {
                    "user_id": user_id,
                    "year": year,
                    "month": month,
                    "week_number": week_number
                }
            )
            rows = results.mappings().all()

            plans = [
                PlanResponseModel(
                    planId=row["planid"],
                    createDate=row["createddate"],
                    dueDate=row["duedate"],
                    content=row["content"],
                    importance=row["importance"]
                )
                for row in rows
            ]
            return plans

        except Exception as e:
            print(f"Error in get_plans_by_specific_week: {e}")
            raise e
    async def get_plans_today(
        self, user_id: int, year: int, month: int, day: int, session: AsyncSession
    ):
        try:
            query = text("""
                SELECT *
                FROM plan
                WHERE userid = :user_id
                AND EXTRACT(YEAR FROM duedate) = :year
                AND EXTRACT(MONTH FROM duedate) = :month
                AND EXTRACT(DAY FROM duedate) = :day
            """)

            results = await session.execute(
                query,
                {
                    "user_id": user_id,
                    "year": year,
                    "month": month,
                    "day": day
                }
            )
            rows = results.mappings().all()

            plans = [
                PlanResponseModel(
                    planId=row["planid"],
                    createDate=row["createddate"],
                    dueDate=row["duedate"],
                    content=row["content"],
                    importance=row["importance"]
                )
                for row in rows
            ]
            return plans

        except Exception as e:
            print(f"Error in get_plans_today: {e}")
            raise e
    async def get_plans_by_specific_month(
        self, user_id: int, year: int, month: int, session: AsyncSession
    ):
        try:
            query = text("""
                SELECT *
                FROM plan
                WHERE userid = :user_id
                AND EXTRACT(YEAR FROM duedate) = :year
                AND EXTRACT(MONTH FROM duedate) = :month
            """)

            results = await session.execute(
                query,
                {
                    "user_id": user_id,
                    "year": year,
                    "month": month
                }
            )
            rows = results.mappings().all()

            plans = [
                PlanResponseModel(
                    planId=row["planid"],
                    createDate=row["createddate"],
                    dueDate=row["duedate"],
                    content=row["content"],
                    importance=row["importance"]
                )
                for row in rows
            ]
            return plans

        except Exception as e:
            print(f"Error in get_plans_by_specific_month: {e}")
            raise e
        
    
    async def create_new_plan(
        self, user_id: int, plan_data: PlanCreateModel, session: AsyncSession
    ):
        try:
            plan_data.to_naive()
            new_plan = Plan(
                userid=user_id,
                createddate=plan_data.createddate,  
                duedate=plan_data.dueDate,
                content=plan_data.content,
                importance=plan_data.importance
            )
            session.add(new_plan)
            await session.commit()
            await session.refresh(new_plan)

            return {"planId": new_plan.planid}
        except Exception as e:
            print(f"Error in create_new_plan: {e}")
            raise e

    async def get_all_plans(self, user_id: int, session: AsyncSession):
        try:
            query = text("SELECT * FROM plan WHERE userid = :user_id")
            results = await session.execute(query, {"user_id": user_id})
            rows = results.mappings().all()

            plans = [
                PlanResponseModel(
                    planId=row["planid"],
                    createDate=row["createddate"],
                    dueDate=row["duedate"],
                    content=row["content"],
                    importance=row["importance"]
                )
                for row in rows
            ]
            return plans
        except Exception as e:
            print(f"Error in get_all_plans: {e}")
            raise e

    async def delete_plan(self, plan_id: int, user_id: int, session: AsyncSession):
        try:
            delete_query = text(
                "DELETE FROM plan WHERE planid = :plan_id AND userid = :user_id"
            )
            result = await session.execute(
                delete_query,
                {"plan_id": plan_id, "user_id": user_id}
            )
            await session.commit()

            return result.rowcount > 0
        except Exception as e:
            print(f"Error in delete_plan: {e}")
            raise e


    async def update_plan(
        self, plan_id: int, user_id: int, plan_data: PlanUpdateModel, session: AsyncSession
    ):
        try:
            plan_data.to_naive()
            query = text("SELECT * FROM plan WHERE planid = :plan_id")
            result = await session.execute(query, {"plan_id": plan_id})
            plan = result.fetchone()

            if not plan:
                raise HTTPException(status_code=404, detail="Plan not found")

            plan = dict(plan) if isinstance(plan, tuple) else plan

            if plan.userid != user_id:
                raise HTTPException(status_code=401, detail="Unauthorized access to plan")


            update_query = text("""
                UPDATE plan
                SET duedate = :duedate,
                    content = :content,
                    importance = :importance
                WHERE planid = :plan_id
            """)

            await session.execute(
                update_query,
                {
                    "duedate": plan_data.dueDate,
                    "content": plan_data.content,
                    "importance": plan_data.importance,
                    "plan_id": plan_id
                }
            )
            await session.commit()

            return await self.get_plan(plan_id, user_id, session)

        except Exception as e:
            print(f"Error in update_plan: {e}")
            raise e
