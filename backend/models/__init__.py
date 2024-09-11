#!/usr/bin/python3
from backend.models.engine.db_storage import DBStorage


storage = DBStorage()

storage.reload()

# Import models here to avoid circular imports
from backend.models.user import User
from backend.models.trip import Trip
