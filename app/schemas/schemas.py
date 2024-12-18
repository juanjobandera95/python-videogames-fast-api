from pydantic import BaseModel

class GameBase(BaseModel):
    name: str
    genre: str
    platform: str
    year: int

class GameCreate(GameBase):
    pass

class Game(GameBase):
    id: int

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    name: str
    role: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True
