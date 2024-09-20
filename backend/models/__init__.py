#!/usr/bin/python3
from models.engine.db_storage import DBStorage
from models.engine.redis_storage import Memory

# Import models here to avoid circular imports
from models.user import User
from models.place import Place
from models.weather import Weather
from models.plan_trip import PlanTrip


storage = DBStorage()
weather_memory = Memory("weather")

storage.reload()
