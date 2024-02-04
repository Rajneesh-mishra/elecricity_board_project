# routers.py

from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from models import ElectricityConnection
from database import get_db
from datetime import date  
from typing import Optional
from datetime import date
from sqlalchemy import desc, String
from sqlalchemy import func

router = APIRouter()

# Pydantic model for request payload in the PUT endpoint
class UpdateConnection(BaseModel):
    applicant_name: str = Field(..., description="Updated applicant name")
    gender: str = Field(..., description="Updated gender")
    district: str = Field(..., description="Updated district")
    state: str = Field(..., description="Updated state")
    pincode: int = Field(..., description="Updated pincode")
    ownership: str = Field(..., description="Updated ownership")
    govt_id_type: str = Field(..., description="Updated government ID type")
    id_number: float = Field(..., description="Updated ID number")
    category: str = Field(..., description="Updated category")
    load_applied_in_kv: int = Field(..., description="Updated load applied in KV")
    date_of_application: date = Field(..., description="Updated date of application")
    date_of_approval: date = Field(None, description="Updated date of approval")
    modified_date: date = Field(..., description="Updated modified date")
    status: str = Field(..., description="Updated status")
    reviewer_id: int = Field(..., description="Updated reviewer ID")
    reviewer_name: str = Field(..., description="Updated reviewer name")
    reviewer_comments: str = Field(..., description="Updated reviewer comments")


@router.get("/electricity-connection/")
def get_electricity_connections(
    skip: int = Query(None, ge=0),
    limit: int = Query(None, gt=0),
    applicant_id: Optional[int] = None,
    start_date: Optional[date] = None,  
    end_date: Optional[date] = None,  
    db: Session = Depends(get_db)
):
    query = db.query(ElectricityConnection)
    total_records=query.count()
    query = query.order_by(desc(ElectricityConnection.date_of_application))

    # Filter by applicant_id if provided
    if applicant_id is not None:
        query = query.filter(func.cast(ElectricityConnection.id_number, String).ilike(f'%{applicant_id}%'))
    # Filter by date range if provided
    if start_date is not None:
        query = query.filter(ElectricityConnection.date_of_application >= start_date)
    if end_date is not None:
        query = query.filter(ElectricityConnection.date_of_application <= end_date)

    if query is not None and skip is not None:
        query = query.offset(skip).limit(limit)

    connections = query.all()
    return {"count":total_records,"data":connections}



@router.put("/electricity-connection/{connection_id}")
def update_electricity_connection(
    connection_id: int, connection_update: UpdateConnection,
    db: Session = Depends(get_db)
):
    db_connection = db.query(ElectricityConnection).filter(ElectricityConnection.id == connection_id).first()
    if db_connection:
        # Update all the fields
        db_connection.applicant_name = connection_update.applicant_name
        db_connection.gender = connection_update.gender
        db_connection.district = connection_update.district
        db_connection.state = connection_update.state
        db_connection.pincode = connection_update.pincode
        db_connection.ownership = connection_update.ownership
        db_connection.govt_id_type = connection_update.govt_id_type
        db_connection.id_number = connection_update.id_number
        db_connection.category = connection_update.category
        db_connection.load_applied_in_kv = connection_update.load_applied_in_kv
        db_connection.date_of_application = connection_update.date_of_application
        db_connection.date_of_approval = connection_update.date_of_approval
        db_connection.modified_date = date.today()
        db_connection.status = connection_update.status
        db_connection.reviewer_id = connection_update.reviewer_id
        db_connection.reviewer_name = connection_update.reviewer_name
        db_connection.reviewer_comments = connection_update.reviewer_comments

        db.commit()
        return {"status":"success"}

    raise HTTPException(status_code=404, detail="Connection not found")
