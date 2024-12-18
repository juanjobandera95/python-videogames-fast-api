from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas import schemas
from app.crud import crud_games
from app.database import get_db
from typing import List

router = APIRouter()

@router.get("/", response_model=List[schemas.Game])
def read_games(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    games = crud_games.get_games(db, skip=skip, limit=limit)
    return games

@router.post("/", response_model=schemas.Game)
def create_game(game: schemas.GameCreate, db: Session = Depends(get_db)):
    return crud_games.create_game(db=db, game=game)

@router.put("/{game_id}", response_model=schemas.Game)
def update_game(game_id: int, game: schemas.GameCreate, db: Session = Depends(get_db)):
    return crud_games.update_game(db=db, game_id=game_id, game=game)

@router.delete("/{game_id}", response_model=schemas.Game)
def delete_game(game_id: int, db: Session = Depends(get_db)):
    return crud_games.delete_game(db=db, game_id=game_id)
