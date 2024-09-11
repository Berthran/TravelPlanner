#!/usr/bin/python3
"""User Model to handle users"""
from backend.models.base import BaseModel, Base
import re
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship


class User(BaseModel, Base):
	"""User model

	Args:
		BaseModel (class): the base model of class
		Base (declarative base): the table model
	"""
	__tablename__ = 'users'
	firstname = Column(String(128), nullable=False)
	lastname = Column(String(128), nullable=False)
	__password = Column('password', String(1024), nullable=False)
	__email = Column('email', String(128), nullable=False)
	
	trips = relationship("Trip", back_populates="users")

	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		if kwargs:
			for key, value in kwargs.items():
				if key != "__class__" and hasattr(self, key):
					setattr(self, key, value)

	@property
	def password(self):
		"""Retrieves the users password"""
		return self.password

	@password.setter
	def password(self, value: str):
		"""Set new password of user

		Args:
			value (str): the new password of user
		"""
		self.password = generate_password_hash(value)

	def check_password(self, password):
		"""Validate user's password

		Args:
			password (hashed_password): the password to check

		Returns:
			bool: True | False
		"""
		return check_password_hash(self._password, password)

	@property
	def email(self):
		"""Retrieves user email"""
		return self._email

	@email.setter
	def email(self, value: str):
		"""Sets email of user

		Args:
			value (str): the new email

		Raises:
			ValueError: Invalid email
		"""
		regex = r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+$'
		if re.match(regex, value):
			self._email = value
		else:
			raise ValueError('Invalid Email')

	def from_dict(self):
		"""Dictionary repr of password with password removed"""
		dictionary = self.to_dict()
		del dictionary['__password']
		return dictionary
