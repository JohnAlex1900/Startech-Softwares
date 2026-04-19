from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


InputType = Literal["website", "instagram"]
LeadActionType = Literal["standard", "advanced"]


class AnalyzeRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    phone: str = Field(..., min_length=7, max_length=30)
    business_name: str = Field(..., min_length=2, max_length=160)
    input_type: InputType
    input_value: str = Field(..., min_length=2, max_length=400)


class LeadRecord(BaseModel):
    id: str
    name: str
    phone: str
    business_name: str
    input_type: InputType
    input_value: str
    timestamp: datetime


class LeadActionRequest(BaseModel):
    lead_id: str = Field(..., min_length=8, max_length=80)
    action_type: LeadActionType
    business_name: str = Field(..., min_length=2, max_length=160)
    score: float = Field(..., ge=0, le=10)


class LeadActionContactUpdateRequest(BaseModel):
    contacted: bool
