# create_db.py
from sqlalchemy import create_engine
from models import Base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv


load_dotenv()

password = os.environ.get("DB_PASSWORD")
host = os.environ.get("DB_HOST")
database = os.environ.get("DB_DATABASE")

# Create the database engine
engine = create_engine(f'postgresql://postgres:{password}@{host}/{database}?sslmode=prefer&connect_timeout=10')

def SessionLocal():
     session =  sessionmaker(autocommit=False, autoflush=False, bind=engine)
     return session()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()