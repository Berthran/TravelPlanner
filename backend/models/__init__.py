#!/usr/bin/python3
from models.engine.db_storage import DBStorage


storage = DBStorage()

storage.reload()

# Import models here to avoid circular imports
from models.user import User
from models.trip import Trip
from models.weather import Weather
from models.plan_trip import PlanTrip
