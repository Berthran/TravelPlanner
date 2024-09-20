#!/usr/bin/python3
import logging
import requests
import urllib.parse
from dotenv import load_dotenv
from os import getenv
from api.v1.utils.ai import (
    generate_city_desc,
    generate_city_keyword,
)
from models import User
from flask_jwt_extended import get_jwt_identity
from models import storage, weather_memory

load_dotenv()
log = logging.getLogger()


# Weather Parameters
LOCATION_URL = getenv("LOCATION_API_URL")
API_KEY = getenv("WEATHER_KEY")
WEATHER_URL = getenv("WEATHER_API_URL")

# Map Parameters
MAP_LOCATION_URL = getenv("MAP_LOCATION_URL")
MAP_API_KEY = getenv("MAP_API_KEY")
MAP_PICTURE_URL = getenv("MAP_PICTURE_URL")

# IMAGE_URL
IMAGE_URL = getenv("IMAGE_URL")
IMAGE_LOCATION = getenv("IMAGE_LOCATION")

# PLACE INFO
PLACE_INFO_LOCATION = getenv("PLACE_INFO_LOCATION")


def get_lat_lon(city_name: str) -> tuple:
    """Get city latitude and longitude

    Args:
            city_name (str): the city name

    Returns:
            Dict: (lat, lon)
    """
    log.info(f"Getting coordinates of {city_name}")
    response = requests.get(
        LOCATION_URL, params={"q": city_name, "appid": API_KEY}
    )
    if response.status_code != 200:
        log.error(f"Unable to get coordinates of {city_name}: {response}")
        return None
    response = response.json()

    try:
        assert len(response) != 0
        lat = response[0].get("lat")
        lon = response[0].get("lon")
        return {"lat": lat, "lon": lon}
    except Exception as e:
        log.error(f"Unable to get coordinates of {city_name}: {e}")
        return None


def get_place_info(city: str) -> dict:
    """
        Get the  details of location (weather, picture, description)

    Args:
        city(str): Place

    Returns:
        Dict of information about place
    """
    log.info(f"Getting info about {city}")
    place_info = {}
    coordinates = get_lat_lon(city)
    if coordinates is None:
        return None
    latitude = coordinates["lat"]
    longitude = coordinates["lon"]
    picture = get_picture_of_place(city)
    weather_info = get_weather_info(latitude, longitude, city)
    description = generate_city_desc(city)
    keywords = generate_city_keyword(city)

    if (
        weather_info is None
        or description is None
        or keywords is None
        or picture is None
    ):
        return None

    place_info["city"] = city
    place_info["latitude"] = latitude
    place_info["longitude"] = longitude
    place_info["temperature"] = weather_info["temperature"]
    place_info["weather"] = weather_info["weather"]
    place_info["wind_speed"] = weather_info["wind_speed"]
    place_info["humidity"] = weather_info["humidity"]
    place_info["description"] = description
    place_info["keywords"] = keywords
    place_info["url_link"] = picture
    return place_info


def get_weather_info(latitude, longitude, city):
    """
        Get weather information about a place

    Args:
        latitude(float): Latitude of Place
        longitude(float): Longitude of place
        city(str): Place

    Returns:
        Dict of weather info
    """
    log.info(f"Getting weather information about {city}")

    weather_info = weather_memory.get_info(city)
    if weather_info is not None:
        return weather_info

    response = requests.get(
        WEATHER_URL,
        params={
            "lat": latitude,
            "lon": longitude,
            "appid": API_KEY,
        },
    )

    if response.status_code != 200:
        log.error(
            f"Unable to get weather information about {city}: {response}"
        )
        return None

    response = response.json()
    weather_info = {}
    weather_info["temperature"] = response.get("main").get("temp")
    weather_info["humidity"] = response.get("main").get("humidity")
    weather_info["weather"] = response.get("weather")[0].get("main")
    weather_info["wind_speed"] = response.get("wind").get("speed")

    log.info(f"Got weather information about {city}")

    weather_memory.store_info(city, weather_info, 600)

    return weather_info


def get_picture_of_place(city, place=None):
    """
        Get the picture of a place using the
        Google maps API and save the picture

    Args:
        city(str): City in which place is located
        place(str): Place in which picture is required

    Returns:
        Dict containing place and image name
    """
    log.info(f"Getting picture of {city}")

    response = requests.get(
        MAP_LOCATION_URL,
        params={
            "fields": "formatted_address,name,place_id,photos",
            "input": f"{city}",
            "inputtype": "textquery",
            "key": MAP_API_KEY,
        },
    )

    if response.status_code != 200:
        log.info(f"Unable to get picture of {city}")
        return None

    response = response.json()
    try:
        assert "photos" in response.get("candidates", {})[0]
    except Exception as e:
        log.error(f"Unable to get picture of {city}: {e}")
        return None

    photos = response["candidates"][0]["photos"]
    photo_reference = photos[0]["photo_reference"]

    response = requests.get(
        MAP_PICTURE_URL,
        params={
            "maxwidth": 400,
            "maxheight": 400,
            "photo_reference": photo_reference,
            "key": MAP_API_KEY,
        },
    )

    file_name = f"{city}.png"
    save_image(file_name, response.content)
    url_link = create_url_link(file_name)
    log.info(f"Got picture of {city}")

    return url_link


def save_image(file_name, image_data):
    """
        Save image data with file_name

    Args:
        file_name(str): Name of the image
        image_data(bytes): Image Data
    """
    with open(f"{IMAGE_LOCATION}/{file_name}", "wb") as image:
        image.write(image_data)


def create_url_link(file_name):
    """
        Create Url link to access image

    Args:
        file_name(str): Name of the image
        dir(str): Directory to save image

    Returns:
        Url link
    """
    params = {"city": file_name[:-4]}
    query_string = urllib.parse.urlencode(params, quote_via=urllib.parse.quote)

    return f"{IMAGE_URL}?{query_string}"


def get_current_user():
    """gets the current user's details

    Returns:
        object: the user's object from database
    """
    user = get_jwt_identity()

    user_id = user.get("id")
    if user_id:
        return storage.get(User, user_id)
    return None


def load_information(place):
    """
        Load information about place

    Args:
        place(str): Name of place

    Returns:
        data if present else None
    """
    try:
        place = storage.get_place(place)
        assert place is not None
        weather_info = get_weather_info(
            place.latitude, place.longitude, place.city
        )
        place_info = place.to_dict()
        place_info.update(weather_info)

        return place_info
    except Exception as e:
        log.warning(f"No information about {place} yet, {e}")
        return None
