from sqlalchemy import Column, Integer, String
from app.database import Base

class Game(Base):
    __tablename__ = "games"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    genre = Column(String)
    platform = Column(String)
    year = Column(Integer)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    role = Column(String)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
