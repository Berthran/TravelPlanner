#!/usr/bin/python3
"""
Base Model to handle all models
"""
import uuid
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, DateTime
from dotenv import load_dotenv


time = "%Y-%m-%dT%H:%M:%S.%f"


Base = declarative_base()


class BaseModel(Base):
    """The Base model

    Args:
            Base (sqlalchemy base()):
                    declarative base to inherit.
    """

    __abstract__ = True
    id = Column(
        String(100), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    def __init__(self, *args, **kwargs):
        if kwargs:
            for key, value in kwargs.items():
                if key != "__class__":
                    setattr(self, key, value)
            if "created_at" in kwargs:
                self.created_at = datetime.strptime(kwargs["created_at"], time)
            if "updated_at" in kwargs:
                self.updated_at = datetime.strptime(kwargs["updated_at"], time)

    def __str__(self) -> str:
        """string representation of class models

        Returns:
                str: string representation of class
        """
        classname = self.__class__.__name__
        return "[{}] ({}) {}".format(classname, self.id, self.to_dict())

    def save(self):
        from models import storage

        self.updated_at = datetime.utcnow()
        storage.new(self)
        storage.save()

    def to_dict(self) -> dict:
        """Converts object to dict format"""
        dictionary = self.__dict__.copy()
        dictionary["__class__"] = self.__class__.__name__
        if isinstance(dictionary["created_at"], datetime):
            dictionary["created_at"] = self.created_at.strftime(time)
        if isinstance(dictionary["updated_at"], datetime):
            dictionary["updated_at"] = self.updated_at.strftime(time)
        del dictionary["_sa_instance_state"]
        return dictionary

    def delete(self):
        """Delete an instance from the storage"""
        from backend.models import storage

        storage.delete(self)
        storage.save()
