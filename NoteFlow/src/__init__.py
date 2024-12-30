from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from .db.main import init_db
from .db.auth.routes import auth_router
from .db.note.routes import note_router

@asynccontextmanager
async def life_span(app:FastAPI):
    print(f"Server is starting...")
    await init_db()

    yield
    print(f"Server has been stopped")

version = "v1"
app = FastAPI(
    title="NoteFlow",
    version=version,
    lifespan=life_span
)
origins = [
    "*" 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# include router 
app.include_router(auth_router,prefix=f"/api/{version}/auth",tags=['account'])
app.include_router(note_router,prefix=f"/api/{version}/note",tags=['account'])