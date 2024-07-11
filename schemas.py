from pydantic import BaseModel
from typing import Optional
from datetime import date

class GameBase(BaseModel):
    title: str
    genre: Optional[str] = None
    release_date: Optional[date] = None
    developer: Optional[str] = None

class GameCreate(GameBase):
    pass

class Game(GameBase):
    id: int
    
    class Config:
        from_attributes = True
