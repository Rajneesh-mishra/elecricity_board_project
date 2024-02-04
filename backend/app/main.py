# main.py

from fastapi import FastAPI
from applicants.router import router
from database import Base, engine
from fastapi.middleware.cors import CORSMiddleware





app = FastAPI()

origins = [
   
      "*"  # Add the actual frontend URL where your app is hosted
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the routers and create the database tables on startup
app.include_router(router)
Base.metadata.create_all(bind=engine)
