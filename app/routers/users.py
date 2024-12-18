from fastapi import APIRouter, Depends, HTTPException, status,BackgroundTasks
from sqlalchemy.orm import Session
from app.schemas import schemas
from app.crud import crud_users
from app.database import get_db
from app.security import verify_password,get_password_hash
from app.email import send_reset_password_email
from fastapi.security import OAuth2PasswordRequestForm
router = APIRouter()



@router.post("/register", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud_users.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    user.hashed_password = get_password_hash(user.password)
    return crud_users.create_user(db=db, user=user)

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud_users.get_user_by_email(db, email=form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"message": "Login successful!"}

@router.post("/forgot-password")
def forgot_password(email: str, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    user = crud_users.get_user_by_email(db, email=email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    token = "fake-token"  # Generate actual token in production
    background_tasks.add_task(send_reset_password_email, user.email, token)
    return {"message": "Password reset email sent"}

