#!/usr/bin/python3
import json
import logging
import requests
import urllib.parse
from dotenv import load_dotenv
from os import getenv, mkdir
from api.v1.utils.ai import (
    generate_city_desc,
    generate_city_keyword,
    generate_tourist_places,
)
from models.user import User
from flask_jwt_extended import get_jwt_identity
from models import storage

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
            tuple: (lat, lon)
    """

    r = requests.get(f"{LOCATION_URL}?q={city_name}&appid={API_KEY}")
    data = r.json()
    lat = data[0].get("lat")
    lon = data[0].get("lon")
    return (lat, lon)


def get_weather_details(latitude: float, longitude: float, city: str) -> dict:
    """get the weather details of location

    Args:
            latitude (float): the latitude of the place
            longitude (float): the longitude of the place

    Returns:
            dict: dictionary rep of weather condition
    """
    weather = {}
    r = requests.get(
        f"{WEATHER_URL}?lat={latitude}&lon={longitude}&appid={API_KEY}"
    )
    data = r.json()
    weather["temperature"] = data.get("main").get("temp")
    weather["weather"] = data.get("weather")[0].get("main")
    weather["wind_speed"] = data.get("wind").get("speed")
    weather["humidity"] = data.get("main").get("humidity")
    weather["description"] = generate_city_desc(city)
    weather["keywords"] = generate_city_keyword(city)
    return weather


def get_picture_of_places(city):
    """
        Get the picture of places in city

    Args:
        city(str): Name of place

    Returns:
        Dict containing information and pictures
        about places in the city

    """
    city_places = generate_tourist_places(city)
    city = city_places["city"]
    places = city_places["places"]
    try:
        assert city is not None
        assert places is not None
        file_path = f"{IMAGE_LOCATION}/{city}"
        mkdir(file_path)
    except Exception as e:
        if isinstance(e, FileExistsError):
            pass
        else:
            print(e)
            return {"information": None}

    information = {"city": city, "places": []}

    log.info(f"Getting pictures of {places} in {city} using google maps")
    for place in places:
        information["places"].append(get_picture_of_place(city, place))
        try:
            assert information["places"][-1]["url_link"] is not None
            desc = generate_city_desc(city, place)
            information["places"][-1]["Description"] = desc
        except Exception as e:
            print(e)
            log.error(f"No picture of {place} in {city}")
            information["places"].pop()

    return information


def get_picture_of_place(city, place):
    """
        Get the picture of a place using the
        Google maps API and save the picture

    Args:
        city(str): City in which place is located
        place(str): Place in which picture is required

    Returns:
        Dict containing place and image name
    """
    log.info(f"Getting picture of {place} in {city}")
    response = requests.get(
        MAP_LOCATION_URL,
        params={
            "fields": "formatted_address,name,place_id,photos",
            "input": f"{place} {city}",
            "inputtype": "textquery",
            "key": MAP_API_KEY,
        },
    )

    if response.status_code != 200:
        return None

    response = response.json()
    try:
        assert response["status"] == "OK"
    except Exception:
        return {"Place": place, "url_link": None}

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

    file_name = f"{place.split(' ')[0]}.png"
    save_image(city, file_name, response.content)
    url_link = create_url_link(city, file_name)
    log.info(f"Got picture of {place} in {city}")

    return {"Place": place, "url_link": url_link}


def save_image(dir, file_name, image_data):
    """
        Save image data with file_name

    Args:
        dir(str): Directory to save image
        file_name(str): Name of the image
        image_data(bytes): Image Data
    """
    with open(f"{IMAGE_LOCATION}/{dir}/{file_name}", "wb") as image:
        image.write(image_data)


def create_url_link(dir, file_name):
    """
        Create Url link to access image

    Args:
        file_name(str): Name of the image
        dir(str): Directory to save image

    Returns:
        Url link
    """
    params = {"city": dir, "place": file_name[:-4]}
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


def save_information(place_info, file_name):
    """
        Save place information

    Args:
        place_info(dict): Information about Place
        file_name(str): Name of file information is saved
    """
    with open(f"{PLACE_INFO_LOCATION}/{file_name}.json", 'w') as f:
        json.dump(place_info, f)
        log.info(f"{file_name} information saved")
        return 0

    return -1


def load_information(file_name):
    """
        Load information about place

    Args:
        file_name(str): Name of file

    Returns:
        data if present else None
    """
    try:
        with open(f"{PLACE_INFO_LOCATION}/{file_name}.json") as f:
            data = json.load(f)
            return data
    except Exception:
        log.warning(f"No information about {file_name} yet")
        return None
