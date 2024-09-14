#!/usr/bin/python3
import requests
from dotenv import load_dotenv
from os import getenv
from backend.api.v1.utils.ai import generate_city_desc, generate_city_keyword
from backend.models.user import User
from flask_jwt_extended import get_jwt_identity
from backend.models import storage

load_dotenv()

LOCATION_URL = getenv('LOCATION_API_URL')
API_KEY = getenv('WEATHER_KEY')
WEATHER_URL = getenv('WEATHER_API_URL')

def get_lat_lon(city_name: str) -> tuple:
	"""Get city latitude and longitude

	Args:
		city_name (str): the city name

	Returns:
		tuple: (lat, lon)
	"""
	
	r = requests.get(f'{LOCATION_URL}?q={city_name}&appid={API_KEY}')
	data = r.json()
	lat = data[0].get('lat')
	lon = data[0].get('lon')
	return lat, lon


def get_weather_details(latitude: float, longitude: float, city_name: str) -> dict:
	"""get the weather details of location

	Args:
		latitude (float): the latitude of the place
		longitude (float): the longitude of the place

	Returns:
		dict: dictionary rep of weather condition
	"""
	weather = {}
	r = requests.get(f'{WEATHER_URL}?lat={latitude}&lon={longitude}&appid={API_KEY}')
	data = r.json()
	weather['temperature'] = data.get('main').get('temp')
	weather['weather'] = data.get('weather')[0].get('main')
	weather['wind_speed'] = data.get('wind').get('speed')
	weather['humidity'] = data.get('main').get('humidity')
	weather['description'] = generate_city_desc(city_name)
	weather['keywords'] = generate_city_keyword(city_name)
	return weather


def get_current_user():
	"""gets the current user's details

	Returns:
		object: the user's object from database
	"""
	user = get_jwt_identity()
	user_id = user.get('id')
	if user_id:
		return storage.get(User, user_id)
	return None
