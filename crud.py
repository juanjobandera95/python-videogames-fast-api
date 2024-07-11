from sqlalchemy.orm import Session
import models
import schemas

def get_game(db: Session, game_id: int):
    return db.query(models.Game).filter(models.Game.id == game_id).first()

def get_games(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Game).offset(skip).limit(limit).all()

def create_game(db: Session, game: schemas.GameCreate):
    db_game = models.Game(**game.dict())
    db.add(db_game)
    db.commit()
    db.refresh(db_game)
    return db_game

def delete_game(db: Session, game_id: int):
    db_game = get_game(db, game_id)
    if db_game:
        db.delete(db_game)
        db.commit()
    return db_game

def update_game(db: Session, game_id: int, game: schemas.GameCreate):
    db_game = get_game(db, game_id)
    if db_game:
        for key, value in game.dict().items():
            setattr(db_game, key, value)
        db.commit()
        db.refresh(db_game)
    return db_game
