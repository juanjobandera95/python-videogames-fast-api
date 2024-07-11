from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Game(Base):
    __tablename__ = "games"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    genre = Column(String(100))
    release_date = Column(Date)
    developer = Column(String(100))
