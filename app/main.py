from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import games, users
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from pathlib import Path
app = FastAPI()

app.mount("/static", StaticFiles(directory="frontend"), name="static")

@app.get("/", response_class=HTMLResponse)
def read_root():
    index_path = Path('frontend/index.html').resolve()
    return HTMLResponse(content=index_path.read_text(), status_code=200)
origins = [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(games.router, prefix="/games", tags=["games"])
app.include_router(users.router, prefix="/users", tags=["users"])
