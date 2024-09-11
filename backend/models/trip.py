#!/usr/bin/python3
"""Trip Model to handle users"""
from backend.models.base import BaseModel, Base
from sqlalchemy import Column, String, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship

class Trip(BaseModel, Base):
	"""Trip model

	Args:
		BaseModel (class): the base model of class
		Base (declarative base): the table model
	"""
	__tablename__ = 'trips'
	city_name = Column(String(128), nullable=False)
	country = Column(String(128))
	state_code = Column(Integer)
	country_code = Column(Integer)
	latitude = Column(Float)
	longitude = Column(Float)

	user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

	user = relationship("User", back_populates="trips")

	weather = relationship("Weather", back_populates="trips")

	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		if kwargs:
			for key, value in kwargs.items():
				if key != "__class__" and hasattr(self, key):
					setattr(self, key, value)

	