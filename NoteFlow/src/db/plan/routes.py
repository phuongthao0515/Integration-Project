from fastapi import APIRouter, Depends, status
from sqlmodel.ext.asyncio.session import AsyncSession
from src.db.main import get_session
from .service import PlanService
from src.db.auth.dependencies import AccessTokenBearer
from .schemas import PlanCreateModel, PlanUpdateModel
from datetime import datetime

plan_router = APIRouter()
plan_helper = PlanService()
access_token_bearer = AccessTokenBearer()

# Example: user_details might look like:
# {"user": {"user_id": 1}, "exp": 1735550010, "refresh": False, "jti": "some-uuid"}

@plan_router.get("/plans/today")
async def get_plans_for_today(
    session: AsyncSession = Depends(get_session),
    user_details=Depends(access_token_bearer)
):
    """
    e.g. GET /plans/today → Plans for today
    """
    try:
        user_id = int(user_details["user"]["user_id"])
        print('ajsdkasdjk')
        today = datetime.today()
        plans = await plan_helper.get_plans_today(
            user_id=user_id,
            year=today.year,
            month=today.month,
            day=today.day,
            session=session
        )
        return plans
    except Exception as e:
        return {"error": str(e)}


@plan_router.get('/plans/{plan_id}')
async def get_plan_by_id(
    plan_id: int,
    session: AsyncSession = Depends(get_session),
    user_details = Depends(access_token_bearer)
):
    try:
        user_id = int(user_details["user"]["user_id"])
        print("user_id: ", user_id)

        result = await plan_helper.get_plan(plan_id, user_id, session)
        if result:
            return result
    except Exception as e:
        return e


@plan_router.get("/plans/month/{year}/{month}")
async def get_plans_for_specific_month(
    year: int,
    month: int,
    session: AsyncSession = Depends(get_session),
    user_details=Depends(access_token_bearer)
):
    """
    e.g. GET /plans/month/2025/2 → All plans for February 2025
    """
    try:
        user_id = int(user_details["user"]["user_id"])
        plans = await plan_helper.get_plans_by_specific_month(
            user_id=user_id,
            year=year,
            month=month,
            session=session
        )
        return plans
    except Exception as e:
        return {"error": str(e)}



#create plan
@plan_router.post('/plans', status_code=status.HTTP_201_CREATED)
async def create_plan(
    plan_data: PlanCreateModel,
    session: AsyncSession = Depends(get_session),
    user_details = Depends(access_token_bearer)
):
    try:
        user_id = int(user_details["user"]["user_id"])
        print("user_id: ", user_id)

        plan_id = await plan_helper.create_new_plan(user_id, plan_data, session)
        return plan_id
    except Exception as e:
        return e

#update plan
@plan_router.put('/plans/{plan_id}', status_code=status.HTTP_200_OK)
async def update_plan(
    plan_id: int,
    plan_data: PlanUpdateModel,
    session: AsyncSession = Depends(get_session),
    user_details = Depends(access_token_bearer)
):
    try:
        user_id = int(user_details["user"]["user_id"])
        plan = await plan_helper.update_plan(plan_id, user_id, plan_data, session)
        return plan
    except Exception as e:
        return e
    
@plan_router.get('/plans')
async def get_plans(
    session: AsyncSession = Depends(get_session),
    user_details = Depends(access_token_bearer)
):
    try:
        user_id = int(user_details["user"]["user_id"])
        plans = await plan_helper.get_all_plans(user_id, session)
        return plans
    except Exception as e:
        return e


@plan_router.delete('/plans/{plan_id}', status_code=status.HTTP_200_OK)
async def delete_plan(
    plan_id: int,
    session: AsyncSession = Depends(get_session),
    user_details = Depends(access_token_bearer)
):
    try:
        user_id = int(user_details["user"]["user_id"])
        plan = await plan_helper.delete_plan(plan_id, user_id, session)
        return plan
    except Exception as e:
        return e
