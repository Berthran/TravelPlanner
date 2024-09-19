#!/usr/bin/python3
"""Weather Model to handle users"""
from models.base import BaseModel, Base
from sqlalchemy import Column, String, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship


class PlanTrip(BaseModel, Base):
    """Weather model

    Args:
                    BaseModel (class): the base model of class
                    Base (declarative base): the table model
    """

    __tablename__ = "plan_trips"

    city = Column(String(1020), nullable=False)

    start_date = Column(String(128), nullable=False)
    end_date = Column(String(128), nullable=False)
    number_of_people = Column(Integer, nullable=False)

    accommodation_name = Column(String(1020), nullable=False)
    accommodation_price = Column(Float, nullable=False)

    flight_departure_price = Column(Float, nullable=False)
    flight_return_price = Column(Float, nullable=False)

    transport_cost = Column(Float, nullable=False)

    meals_snack_price = Column(Float, nullable=False)

    activities_tourist_sport_price = Column(Float, nullable=False)

    total_budget = Column(Float, nullable=False)

    user_id = Column(String(100), ForeignKey("users.id"), nullable=False)

    plan_trips = relationship("User", back_populates="plan_trips")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if kwargs:
            for key, value in kwargs.items():
                if key != "__class__" and hasattr(self, key):
                    setattr(self, key, value)
