#!/usr/bin/python3
"""Trip Model to handle users"""
from models.base import BaseModel, Base
from sqlalchemy import Column, String, Float


class Place(BaseModel, Base):
    """Trip model

    Args:
            BaseModel (class): the base model of class
            Base (declarative base): the table model
    """

    __tablename__ = "places"
    city = Column(String(128), nullable=False)
    latitude = Column(Float)
    longitude = Column(Float)
    description = Column(String(2040))
    keywords = Column(String(500))
    url_link = Column(String(128))

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if kwargs:
            for key, value in kwargs.items():
                if key != "__class__" and hasattr(self, key):
                    setattr(self, key, value)
