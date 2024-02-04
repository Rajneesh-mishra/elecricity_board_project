# models.py

from sqlalchemy import Column, Integer, String, BigInteger, Date
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class ElectricityConnection(Base):
    __tablename__ = 'electricity_connections'

    id = Column(Integer, primary_key=True, nullable=False)
    applicant_name = Column(String(50), nullable=False)
    gender = Column(String(6), nullable=False)
    district = Column(String(30), nullable=False)
    state = Column(String(20), nullable=False)
    pincode = Column(Integer, nullable=False)
    ownership = Column(String(20), nullable=False)
    govt_id_type = Column(String(20), nullable=False)
    id_number = Column(BigInteger, nullable=False)
    category = Column(String(11), nullable=False)
    load_applied_in_kv = Column(Integer, nullable=False)
    date_of_application = Column(Date, nullable=False)
    date_of_approval = Column(Date)
    modified_date = Column(Date, nullable=False)
    status = Column(String(19), nullable=False)
    reviewer_id = Column(Integer, nullable=False)
    reviewer_name = Column(String(15), nullable=False)
    reviewer_comments = Column(String(100), nullable=False)
