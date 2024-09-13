#!/usr/bin/python3
import requests
from dotenv import load_dotenv
from os import getenv
from api.v1.utils.ai import generate_weather_desc

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
	return tuple(lat, lon)


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
	weather['description'] = generate_weather_desc(data, city_name)
	return weather
